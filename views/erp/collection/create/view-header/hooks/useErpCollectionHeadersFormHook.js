import { useState } from "react";
import valueUtils from "../../../../../../utils/valueUtils";
import { v4 as uuidv4 } from 'uuid';
import { erpCollectionHeaderDataConnect } from "../../../../../../data_connect/erpCollectionHeaderDataConnect";

export default function useErpCollectionHeadersFormHook({
    refErpCollectionHeaders
}) {
    const [erpCollectionHeadersForm, setErpCollectionHeaderForm] = useState([]);

    const reqCreateErpCollectionHeader = async ({
        body,
        successCallback
    }) => {
        await erpCollectionHeaderDataConnect().create(body)
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
    }

    const onActionSelectErpCollectionHeader = (refItem) => {
        let existed = erpCollectionHeadersForm.find(r => r.refErpCollectionHeaderId === refItem.id);

        if (existed) {
            setErpCollectionHeaderForm(erpCollectionHeadersForm.filter(r => r.refErpCollectionHeaderId !== refItem.id));
            return;
        }

        setErpCollectionHeaderForm([
            ...erpCollectionHeadersForm,
            {
                originHeaderName: refItem.originHeaderName,
                originOrder: refItem.originOrder,
                customHeaderName: refItem.originHeaderName,
                customOrder: erpCollectionHeadersForm.length,
                matchedFieldName: refItem.matchedFieldName,
                refErpCollectionHeaderId: refItem.id,
                draggableId: uuidv4()
            }
        ])
    }

    const onActionReorderForm = (result) => {
        if (!result.destination) return;

        let targetForm = [...erpCollectionHeadersForm];

        const newForm = valueUtils.reorder(
            targetForm,
            result.source.index,
            result.destination.index
        );

        setErpCollectionHeaderForm(newForm);
    }

    const onChangeCustomHeaderName = (e, reqIndex) => {
        let value = e.target.value;

        setErpCollectionHeaderForm(erpCollectionHeadersForm.map((r, index) => {
            if (index === reqIndex) {
                return {
                    ...r,
                    customHeaderName: value
                }
            }
            return {
                ...r
            }
        }))
    }

    const onActionDeleteErpCollectionHeader = (reqIndex) => {
        setErpCollectionHeaderForm(erpCollectionHeadersForm.filter((r, index) => index !== reqIndex))
    }

    const onActionSelectAll = () => {
        if (!refErpCollectionHeaders) {
            return;
        }

        if (confirm('헤더명지정 및 정렬 순서가 초기화 됩니다. 적용하시겠습니까?')) {
            setErpCollectionHeaderForm(refErpCollectionHeaders.map((refItem, index) => {
                return {
                    originHeaderName: refItem.originHeaderName,
                    originOrder: refItem.originOrder,
                    customHeaderName: refItem.originHeaderName,
                    customOrder: index,
                    matchedFieldName: refItem.matchedFieldName,
                    refErpCollectionHeaderId: refItem.id,
                    draggableId: uuidv4()
                }
            }))
        }
    }

    const onActionSelectClearAll = () => {
        setErpCollectionHeaderForm([]);
    }

    const checkSubmitValid = () => {
        if (!erpCollectionHeadersForm || valueUtils.isEmptyValues(erpCollectionHeadersForm)) {
            throw new Error('뷰헤더를 최소 1개 이상 선택해 주세요.');
        }

        erpCollectionHeadersForm?.forEach((r, index) => {
            if (!r?.customHeaderName || r?.customHeaderName?.length > 20) {
                throw new Error(`헤더명지정은 1-20자로 입력해 주세요. (행: ${index + 1})`);
            }
        })
    }

    const getSubmitValue = () => {
        return erpCollectionHeadersForm.map((item, index) => {
            return {
                customHeaderName: item.customHeaderName,
                customOrder: index,
                matchedFieldName: item.matchedFieldName,
                originHeaderName: item.originHeaderName,
                originOrder: item.originOrder,
                refErpCollectionHeaderId: item.refErpCollectionHeaderId
            }
        })
    }

    return {
        erpCollectionHeadersForm,
        reqCreateErpCollectionHeader,
        onActionSelectErpCollectionHeader,
        onActionReorderForm,
        onChangeCustomHeaderName,
        onActionDeleteErpCollectionHeader,
        onActionSelectAll,
        onActionSelectClearAll,
        checkSubmitValid,
        getSubmitValue
    }
}