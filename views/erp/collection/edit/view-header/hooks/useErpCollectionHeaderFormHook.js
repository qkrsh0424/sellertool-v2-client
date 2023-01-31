import _ from "lodash";
import { useEffect, useState } from "react";

export default function useErpCollectionHeaderFormHook({
    erpCollectionHeader
}) {
    const [erpCollectionHeaderForm, setErpCollectionHeaderForm] = useState(null);

    useEffect(() => {
        if (!erpCollectionHeader) {
            return;
        }

        onInitErpCollectionHeaderForm();
    }, [erpCollectionHeader]);

    const onInitErpCollectionHeaderForm = () => {
        setErpCollectionHeaderForm(_.cloneDeep({
            id: erpCollectionHeader.id,
            name: erpCollectionHeader.name,
            description: erpCollectionHeader.description,
            workspaceId: erpCollectionHeader.workspaceId
        }));
    }

    const onChangeName = (e) => {
        let value = e.target.value;

        setErpCollectionHeaderForm({
            ...erpCollectionHeaderForm,
            name: value
        })
    }

    const onChangeDescription = (e) => {
        let value = e.target.value;

        setErpCollectionHeaderForm({
            ...erpCollectionHeaderForm,
            description: value
        })
    }

    const checkErpCollectionHeaderFormValid = () => {
        if (erpCollectionHeaderForm?.name?.length < 1 || erpCollectionHeaderForm?.name?.length > 20) {
            throw new Error('뷰헤더명은 1-20자로 작성해 주세요.');
        }

        if (erpCollectionHeaderForm?.description?.length > 50) {
            throw new Error('설명은 50자 이내로 작성해 주세요.');
        }
    }

    return {
        erpCollectionHeaderForm,
        onChangeName,
        onChangeDescription,
        checkErpCollectionHeaderFormValid
    }
}