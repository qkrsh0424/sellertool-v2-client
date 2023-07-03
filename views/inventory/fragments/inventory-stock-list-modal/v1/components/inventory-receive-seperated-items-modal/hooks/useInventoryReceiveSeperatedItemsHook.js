import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { inventoryReceiveDataConnect } from "../../../../../../../../data_connect/inventoryReceiveDataConnect";
import { customToast, defaultOptions } from "../../../../../../../../components/toast/custom-react-toastify/v1";
import { getRemovedPrefixZero } from "../../../../../../../../utils/numberFormatUtils";

export default function useInventoryReceiveSeperatedItemsHook({
    inventoryReceiveId
}) {
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const [inventoryReceiveSeperatedItems, setInventoryReceiveSeperatedItems] = useState(null);

    useEffect(() => {
        if (!workspaceRedux?.workspaceInfo?.id || !inventoryReceiveId) {
            return;
        }

        reqFetchInventoryReceiveSeperatedItems();
    }, [workspaceRedux?.workspaceInfo?.id, inventoryReceiveId])

    const reqFetchInventoryReceiveSeperatedItems = async () => {
        const headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        let params = {
            inventoryReceiveId: inventoryReceiveId
        }

        await inventoryReceiveDataConnect().searchSeperatedItems(params, headers)
            .then(res => {
                if (res.status === 200) {
                    setInventoryReceiveSeperatedItems(res?.data?.data);
                }
            })
            .catch(err => {
                const res = err.response;
                console.log(res);
                customToast.error(res?.data?.memo, {
                    ...defaultOptions,
                    toastId: res?.data?.memo
                });
            })

    }

    const reqChangePurchaseCost = async (body, successCallback) => {
        const headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        await inventoryReceiveDataConnect().changePurchaseCost_InventoryReceiveSeperatedItems(body, headers)
            .then(res => {
                if (res.status === 200) {
                    successCallback();
                }
            })
            .catch(err => {
                const res = err.response;
                console.log(res);
                customToast.error(res?.data?.memo, {
                    ...defaultOptions,
                    toastId: res?.data?.memo
                });
            })
    }

    const onChangePurchaseCost = (e, reqIndex) => {
        let value = e.target.value;

        value = value.replaceAll(',', '');
        value = getRemovedPrefixZero(value);

        if (value.match(/^[0-9]{0,8}$/)) {
            setInventoryReceiveSeperatedItems(inventoryReceiveSeperatedItems?.map((r, index) => {
                if (reqIndex === index) {
                    return {
                        ...r,
                        purchaseCost: value
                    }
                }

                return {
                    ...r
                }
            }));
        }
    }

    const checkPurchaseCostFormatValid = () => {
        inventoryReceiveSeperatedItems.forEach((r, index) => {
            if (r.purchaseCost < 1 || r.purchaseCost > 99999999) {
                throw new Error(`${index + 1}행, 입고코드 : ${r.id}\n\n매입단가를 정확히 입력해 주세요.\n\n허용 범위 [1-99,999,999]`);
            }
        })
    }

    return {
        inventoryReceiveSeperatedItems,
        onChangePurchaseCost,
        checkPurchaseCostFormatValid,
        reqChangePurchaseCost
    }
}