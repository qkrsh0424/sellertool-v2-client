import { useEffect, useState } from "react";
import { CustomURIEncoderUtils } from "../../../utils/CustomURIEncoderUtils";

const SORT_DIRECTION_ASC = "ASC";
const SORT_DIRECTION_DESC = "DESC";
const DEFAULT_SORT_DIRECTION = SORT_DIRECTION_ASC;

const customURIEncoderUtils = CustomURIEncoderUtils();
/**
 * ===== sortMethodList =====
 * [
 *  {
 *      sortTarget: ...,
 *      sortDirection: ...
 *  }
 * ]
 * @param {*} props 
 */
export function useSortTypeGlobalHook(props) {
    const [sortMethodList, setSortMethodList] = useState([]);
    const [sortTypes, setSortTypes] = useState([]);

    useEffect(() => {
        onSetSortTypes(convertSortMethodListToSortTypes(sortMethodList));
    }, [sortMethodList]);

    const onPushSortMethod = (sortTarget) => {
        let newSortMethodList = [...sortMethodList];
        let duplicatedSortMethod = newSortMethodList?.some(r => r.sortTarget === sortTarget);
        if (duplicatedSortMethod) {
            return;
        }

        newSortMethodList.push({
            sortTarget: sortTarget,
            sortDirection: DEFAULT_SORT_DIRECTION
        })

        setSortMethodList(newSortMethodList);
    }

    const onRemoveSortMethod = (sortTarget) => {
        let newSortMethodList = [...sortMethodList].filter(r => r.sortTarget !== sortTarget);
        setSortMethodList(newSortMethodList);
    }

    const onClearAll = () => {
        setSortMethodList([]);
    }

    const onChangeSortDirection = (sortTarget) => {
        let newSortMethodList = [...sortMethodList].map(sortMethod => {
            if (sortMethod.sortTarget === sortTarget) {
                return {
                    ...sortMethod,
                    sortDirection: sortMethod.sortDirection === SORT_DIRECTION_ASC ? SORT_DIRECTION_DESC : SORT_DIRECTION_ASC
                }
            } else { return { ...sortMethod } }
        })

        setSortMethodList(newSortMethodList);
    }

    const onSetSortTypes = (sortTypes) => {
        setSortTypes(sortTypes);
    }

    const convertSortMethodListToSortTypes = (sortMethodList) => {
        let sortTypes = [];

        if (!sortMethodList) {
            return sortTypes;
        }

        try {
            sortTypes = sortMethodList.map(sortMethod => {
                return `${sortMethod.sortTarget}$${sortMethod.sortDirection}`;
            })
        } catch (err) {
            return [];
        }

        return sortTypes;
    }

    const convertSortTypesToSortMethodList = (sortTypes) => {
        let sml = [];
        if (!sortTypes) {
            return [];
        }

        try {
            sml = sortTypes.map(sortType => {
                let sortTypeSplit = sortType.split('$');

                return {
                    sortTarget: sortTypeSplit[0],
                    sortDirection: sortTypeSplit[1]
                }
            })
        } catch (err) {
            return [];
        }

        return sml;
    }

    const encodeURI = (value) => {
        return customURIEncoderUtils.encodeJSONList(value);
    }

    const decodeURI = (value) => {
        return customURIEncoderUtils.decodeJSONList(value);
    }

    return {
        sortMethodList,
        sortTypes,
        onPushSortMethod,
        onRemoveSortMethod,
        onClearAll,
        onChangeSortDirection,
        convertSortMethodListToSortTypes,
        convertSortTypesToSortMethodList,
        encodeURI,
        decodeURI
    }
}