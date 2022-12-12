import { useEffect, useState } from "react";
import valueUtils from "../../../../../../utils/valueUtils";
import { v4 as uuidv4 } from 'uuid';
import { erpCollectionHeaderDataConnect } from "../../../../../../data_connect/erpCollectionHeaderDataConnect";
import _ from "lodash";

export default function useErpCollectionHeaderDetailsFormHook({
    erpCollectionHeader,
    refErpCollectionHeaders
}) {
    const [erpCollectionHeaderDetailsForm, setErpCollectionHeaderDetailsForm] = useState([]);

    useEffect(() => {
        if (!erpCollectionHeader?.erpCollectionHeaderDetails) {
            return;
        }

        onInitErpCollectionHeaderDetailsForm();
    }, [erpCollectionHeader?.erpCollectionHeaderDetails]);

    const onInitErpCollectionHeaderDetailsForm = () => {
        setErpCollectionHeaderDetailsForm(_.cloneDeep(erpCollectionHeader?.erpCollectionHeaderDetails));
    }

    const onActionSelectErpCollectionHeader = (refItem) => {
        let existed = erpCollectionHeaderDetailsForm.find(r => r.refErpCollectionHeaderId === refItem.id);

        if (existed) {
            setErpCollectionHeaderDetailsForm(erpCollectionHeaderDetailsForm.filter(r => r.refErpCollectionHeaderId !== refItem.id));
            return;
        }

        setErpCollectionHeaderDetailsForm([
            ...erpCollectionHeaderDetailsForm,
            {
                id: uuidv4(),
                originHeaderName: refItem.originHeaderName,
                originOrder: refItem.originOrder,
                customHeaderName: refItem.originHeaderName,
                customOrder: erpCollectionHeaderDetailsForm.length,
                matchedFieldName: refItem.matchedFieldName,
                refErpCollectionHeaderId: refItem.id,
                erpCollectionHeaderId: erpCollectionHeader?.id
            }
        ])
    }

    const onActionReorderForm = (result) => {
        if (!result.destination) return;

        let targetForm = [...erpCollectionHeaderDetailsForm];

        const newForm = valueUtils.reorder(
            targetForm,
            result.source.index,
            result.destination.index
        );

        setErpCollectionHeaderDetailsForm(newForm);
    }

    const onChangeCustomHeaderName = (e, reqIndex) => {
        let value = e.target.value;

        setErpCollectionHeaderDetailsForm(erpCollectionHeaderDetailsForm.map((r, index) => {
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
        setErpCollectionHeaderDetailsForm(erpCollectionHeaderDetailsForm.filter((r, index) => index !== reqIndex))
    }

    const onActionSelectAll = () => {
        if (!refErpCollectionHeaders) {
            return;
        }

        if (confirm('헤더명지정 및 정렬 순서가 초기화 됩니다. 적용하시겠습니까?')) {
            setErpCollectionHeaderDetailsForm(refErpCollectionHeaders.map((refItem, index) => {
                return {
                    id: uuidv4(),
                    originHeaderName: refItem.originHeaderName,
                    originOrder: refItem.originOrder,
                    customHeaderName: refItem.originHeaderName,
                    customOrder: index,
                    matchedFieldName: refItem.matchedFieldName,
                    refErpCollectionHeaderId: refItem.id,
                    erpCollectionHeaderId: erpCollectionHeader?.id
                }
            }))
        }
    }

    const onActionSelectClearAll = () => {
        setErpCollectionHeaderDetailsForm([]);
    }

    const checkErpCollectionHeaderDetailsFormValid = () => {
        if (!erpCollectionHeaderDetailsForm || valueUtils.isEmptyValues(erpCollectionHeaderDetailsForm)) {
            throw new Error('뷰헤더를 최소 1개 이상 선택해 주세요.');
        }

        erpCollectionHeaderDetailsForm?.forEach((r, index) => {
            if (!r?.customHeaderName || r?.customHeaderName?.length > 20) {
                throw new Error(`헤더명지정은 1-20자로 입력해 주세요. (행: ${index + 1})`);
            }
        })
    }

    const getSubmitValue = () => {
        return erpCollectionHeaderDetailsForm.map((item, index) => {
            return {
                id: item.id,
                customHeaderName: item.customHeaderName,
                customOrder: index,
                matchedFieldName: item.matchedFieldName,
                originHeaderName: item.originHeaderName,
                originOrder: item.originOrder,
                refErpCollectionHeaderId: item.refErpCollectionHeaderId,
                erpCollectionHeaderId: erpCollectionHeader?.id
            }
        })
    }

    return {
        erpCollectionHeaderDetailsForm,
        onActionSelectErpCollectionHeader,
        onActionReorderForm,
        onChangeCustomHeaderName,
        onActionDeleteErpCollectionHeader,
        onActionSelectAll,
        onActionSelectClearAll,
        checkErpCollectionHeaderDetailsFormValid,
        getSubmitValue
    }
}