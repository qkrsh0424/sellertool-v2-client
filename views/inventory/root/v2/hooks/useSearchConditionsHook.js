import { useState } from "react";

export function useSearchConditionsHook(props) {
    const [searchCondition, setSearchCondition] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const onSetSearchCondition = (value) => {
        setSearchCondition(value);
    }

    const onSetSearchQuery = (value) => {
        setSearchQuery(value);
    }

    return {
        SEARCH_CONDITIONS,
        searchCondition,
        searchQuery,
        onSetSearchCondition,
        onSetSearchQuery
    }
}

const SEARCH_CONDITIONS = [
    {
        fieldName: 'PRODUCT_NAME',
        name: '상품명',
    },
    {
        fieldName: 'PRODUCT_CODE',
        name: '상품코드',
    },
    {
        fieldName: 'PRODUCT_TAG',
        name: '상품태그',
    },
    {
        fieldName: 'PRODUCT_OPTION_NAME',
        name: '옵션명',
    },
    {
        fieldName: 'PRODUCT_OPTION_CODE',
        name: '옵션코드',
    },
    {
        fieldName: 'PRODUCT_OPTION_TAG',
        name: '옵션태그',
    },
    {
        fieldName: 'PRODUCT_OPTION_STATUS',
        name: '옵션상태',
    },
    {
        fieldName: 'PRODUCT_OPTION_RELEASE_LOCATION',
        name: '출고지',
    }
]
