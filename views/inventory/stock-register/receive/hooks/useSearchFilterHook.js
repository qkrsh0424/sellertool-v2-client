import { useState } from "react";
import { CustomURIEncoderUtils } from "../../../../../utils/CustomURIEncoderUtils";

const customURIEncoderUtils = CustomURIEncoderUtils();

export function useSearchFilterHook(props) {
    const [searchFilter, setSearchFilter] = useState(null);

    const onSetSearchFilter = (value) => {
        if (!value) {
            setSearchFilter(null);
            return;
        }

        setSearchFilter(customURIEncoderUtils.encodeJSONList(value));
    }
    return {
        searchFilter,
        onSetSearchFilter
    }
}