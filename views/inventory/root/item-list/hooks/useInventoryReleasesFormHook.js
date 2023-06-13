import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { inventoryReleaseDataConnect } from "../../../../../data_connect/inventoryReleaseDataConnect";
import { getRemovedPrefixZero } from "../../../../../utils/numberFormatUtils";

export default function useInventoryReleasesFormHook({
    selectedProductOptions
}) {
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const [inventoryReleasesForm, setInventoryReleasesForm] = useState(null);

    useEffect(() => {
        if (!selectedProductOptions) {
            setInventoryReleasesForm(null);
            return;
        }

        onInitInventoryReleasesForm();
    }, [selectedProductOptions]);

    const reqCreateInventoryReleases = async ({
        body,
        successCallback
    }) => {
        const headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        await inventoryReleaseDataConnect().createAll(body, headers)
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

    const onInitInventoryReleasesForm = () => {

        setInventoryReleasesForm(selectedProductOptions?.map(r => {
            return {
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
        if (!inventoryReleasesForm) {
            return;
        }

        setInventoryReleasesForm(inventoryReleasesForm?.map(r => {
            return {
                ...r,
                unit: unit
            }
        }));
    }

    const onActionBatchChangeMemo = (memo) => {
        if (!inventoryReleasesForm) {
            return;
        }

        setInventoryReleasesForm(inventoryReleasesForm?.map(r => {
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
            setInventoryReleasesForm(inventoryReleasesForm?.map((r, index) => {
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

        setInventoryReleasesForm(inventoryReleasesForm?.map((r, index) => {
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
        inventoryReleasesForm.forEach((r, index) => {
            if (r.unit < 1 || r.unit > 99999) {
                throw new Error(`${index + 1}행, ${r.productCategoryName} / ${r.productSubCategoryName} / ${r.productName} / ${r.productOptionName}\n수량을 정확히 입력해 주세요.\n허용 범위 [1-99999]`);
            }
        })
    }

    const checkMemoFormatValid = () => {
        inventoryReleasesForm.forEach((r, index) => {
            if (r.memo.length < 1 || r.memo.length > 50) {
                throw new Error(`${index + 1}행, ${r.productCategoryName} / ${r.productSubCategoryName} / ${r.productName} / ${r.productOptionName}\n메모를 정확히 입력해 주세요.\n허용 범위 [1-50]`);
            }
        })
    }

    return {
        inventoryReleasesForm,
        reqCreateInventoryReleases,
        onChangeUnit,
        onChangeMemo,
        onActionBatchChangeUnit,
        onActionBatchChangeMemo,
        checkUnitFormatValid,
        checkMemoFormatValid
    }
}