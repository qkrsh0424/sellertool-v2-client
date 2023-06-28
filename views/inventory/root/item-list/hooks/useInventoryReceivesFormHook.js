import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { inventoryReceiveDataConnect } from "../../../../../data_connect/inventoryReceiveDataConnect";
import { getRemovedPrefixZero } from "../../../../../utils/numberFormatUtils";
import { v4 as uuidv4 } from 'uuid';

export default function useInventoryReceivesFormHook({
    selectedProductOptions
}) {
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const [inventoryReceivesForm, setInventoryReceivesForm] = useState(null);

    useEffect(() => {
        if (!selectedProductOptions) {
            setInventoryReceivesForm(null);
            return;
        }

        onInitInventoryReceivesForm();
    }, [selectedProductOptions]);

    const reqCreateInventoryReceives = async ({
        body,
        successCallback
    }) => {
        const headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }
        await inventoryReceiveDataConnect().createAll(body, headers)
            .then(res => {
                if (res.status === 200) {
                    successCallback();
                }
            })
            .catch(err => {
                let res = err.response;

                if (!res) {
                    alert('네트워크 연결이 원활하지 않습니다.');
                    return;
                }

                if (res.status === 500) {
                    alert('undefined error. 관리자에 문의해 주세요.');
                    return;
                }

                alert(res.data.memo);
            })
            ;
    }

    const onInitInventoryReceivesForm = () => {

        setInventoryReceivesForm(selectedProductOptions?.map(r => {
            return {
                id: uuidv4(),
                productCategoryName: r?.productCategory?.name,
                productSubCategoryName: r?.productSubCategory?.name,
                productName: r?.product?.name,
                productOptionName: r?.name,
                productOptionId: r?.id,
                unit: '0',
                memo: ''
            }
        }));
    }

    const onActionBatchChangeUnit = (unit) => {
        if (!inventoryReceivesForm) {
            return;
        }

        setInventoryReceivesForm(inventoryReceivesForm?.map(r => {
            return {
                ...r,
                unit: unit
            }
        }));
    }

    const onActionBatchChangeMemo = (memo) => {
        if (!inventoryReceivesForm) {
            return;
        }

        setInventoryReceivesForm(inventoryReceivesForm?.map(r => {
            return {
                ...r,
                memo: memo
            }
        }));
    }

    const onChangeUnit = (e, reqIndex) => {
        let value = e.target.value;

        value = value.replaceAll(',', '');
        value = getRemovedPrefixZero(value);

        if (value.match(/^[0-9]{0,5}$/)) {
            setInventoryReceivesForm(inventoryReceivesForm?.map((r, index) => {
                if (reqIndex === index) {
                    return {
                        ...r,
                        unit: value
                    }
                }

                return {
                    ...r
                }
            }));
        }
    }

    const onChangeMemo = (e, reqIndex) => {
        let value = e.target.value;

        setInventoryReceivesForm(inventoryReceivesForm?.map((r, index) => {
            if (reqIndex === index) {
                return {
                    ...r,
                    memo: value
                }
            }

            return {
                ...r
            }
        }));
    }

    const checkUnitFormatValid = () => {
        inventoryReceivesForm.forEach((r, index) => {
            if (r.unit < 1 || r.unit > 99999) {
                throw new Error(`${index + 1}행, ${r.productCategoryName} / ${r.productSubCategoryName} / ${r.productName} / ${r.productOptionName}\n수량을 정확히 입력해 주세요.\n허용 범위 [1-99999]`);
            }
        })
    }

    const checkMemoFormatValid = () => {
        inventoryReceivesForm.forEach((r, index) => {
            if (r.memo.length < 1 || r.memo.length > 50) {
                throw new Error(`${index + 1}행, ${r.productCategoryName} / ${r.productSubCategoryName} / ${r.productName} / ${r.productOptionName}\n메모를 정확히 입력해 주세요.\n허용 범위 [1-50]`);
            }
        })
    }

    return {
        inventoryReceivesForm,
        reqCreateInventoryReceives,
        onChangeUnit,
        onChangeMemo,
        onActionBatchChangeUnit,
        onActionBatchChangeMemo,
        checkUnitFormatValid,
        checkMemoFormatValid
    }
}