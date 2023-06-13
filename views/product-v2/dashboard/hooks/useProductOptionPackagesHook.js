import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { productOptionPackageDataConnect } from "../../../../data_connect/productOptionPackageDataConnect";
import { getRemovedPrefixZero } from "../../../../utils/numberFormatUtils";
import { customToast, defaultOptions } from "../../../../components/toast/custom-react-toastify/v1";

export default function useProductOptionPackagesHook({
    selectedOptionId
}) {
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const [productOptionPackages, setProductOptionPackages] = useState([]);

    useEffect(() => {
        if (!workspaceRedux?.workspaceInfo?.id || !selectedOptionId) {
            setProductOptionPackages();
            return;
        }

        reqFetchProductOptionPackages();
    }, [workspaceRedux?.workspaceInfo?.id, selectedOptionId]);

    const reqFetchProductOptionPackages = async () => {
        let headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        await productOptionPackageDataConnect().searchList(selectedOptionId, headers)
            .then(res => {
                if (res.status === 200) {
                    setProductOptionPackages(res.data.data);
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
    };

    const reqUpdateProductOptionPackages = async ({ body, successCallback }) => {
        const headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }
        await productOptionPackageDataConnect().updateAll(body, headers)
            .then(res => {
                if (res.status === 200) {
                    alert('패키지를 등록했습니다.');
                    successCallback();
                    return;
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
    };

    const onActionPushProductOptionPackage = () => {
        let data = {
            cid: null,
            id: null,
            targetOptionId: null,
            targetOptionCode: null,
            tag: '',
            unit: '0',
            productOptionId: selectedOptionId
        }
        setProductOptionPackages([
            ...productOptionPackages,
            data
        ])
    }

    const onActionDeleteProductOptionPackage = (index) => {
        let data = [...productOptionPackages];
        data = data.filter((r, idx) => idx !== index);
        setProductOptionPackages([
            ...data
        ])
    }

    const onChangeProductOptionPackageTag = (e, index) => {
        let value = e.target.value;

        let data = [...productOptionPackages];

        setProductOptionPackages(
            data.map((r, idx) => {
                if (idx === index) {
                    return {
                        ...r,
                        tag: value
                    }
                }

                return {
                    ...r
                }
            })
        );
    }

    const onChangeProductOptionPackageUnit = (e, index) => {
        let value = e.target.value;

        let regex = /[^0-9]/g;
        value = value.replaceAll(regex, '');
        value = getRemovedPrefixZero(value);
        let data = [...productOptionPackages];

        setProductOptionPackages(
            data.map((r, idx) => {
                if (idx === index) {
                    return {
                        ...r,
                        unit: value
                    }
                }

                return {
                    ...r
                }
            })
        );
    }

    const onChangeTargetOption = (optionId, optionCode, selectedPackageIndex) => {
        let data = [...productOptionPackages];

        setProductOptionPackages(
            data.map((r, idx) => {
                if (idx === selectedPackageIndex) {
                    return {
                        ...r,
                        targetOptionId: optionId,
                        targetOptionCode: optionCode
                    }
                }

                return {
                    ...r
                }
            })
        );
    }

    const checkSubmitFormValid = () => {
        try {
            productOptionPackages?.forEach((r, index) => {
                let tag = r.tag.trim();

                if (tag.length < 1 || tag.length > 50) {
                    throw new Error(`패키지 태그는 1-50자 이내로 입력해주세요. (행: ${index + 1})`);
                }

                if (!r.targetOptionId) {
                    throw new Error(`타겟 옵션코드를 지정해 주세요. (행: ${index + 1})`);
                }

                if (!r.targetOptionCode) {
                    throw new Error(`타겟 옵션코드를 지정해 주세요. (행: ${index + 1})`);
                }

                if (r.unit < 1 || r.unit > 999) {
                    throw new Error(`수량은 1-999 이내로 입력해 주세요. (행: ${index + 1})`);
                }
            })
        } catch (err) {
            throw new Error(err.message);
        }
    }

    const getSubmitForm = () => {
        return productOptionPackages?.map(r => {
            return {
                cid: null,
                id: null,
                targetOptionId: r.targetOptionId,
                targetOptionCode: r.targetOptionCode,
                tag: r.tag.trim(),
                unit: !r.unit ? '0' : new String(r.unit).trim(),
                productOptionId: r.productOptionId
            }
        })
    }

    return {
        productOptionPackages,
        reqUpdateProductOptionPackages,
        onActionPushProductOptionPackage,
        onActionDeleteProductOptionPackage,
        onChangeProductOptionPackageTag,
        onChangeProductOptionPackageUnit,
        onChangeTargetOption,
        checkSubmitFormValid,
        getSubmitForm
    }
}