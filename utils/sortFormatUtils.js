const sortDirections = ['desc', 'asc']
const SortFormatUtils = () => {
    return {
        getSortWithSortElements(sortElements, sortBy, sortDirection) {
            if (!sortElements.includes(sortBy)) {
                return null;
            }

            if (!sortDirections.includes(sortDirection)) {
                return null;
            }

            return [sortBy, sortDirection].join();
        },
        convertSortMethodListToSortTypes(sortMethodList) {
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
        },

        convertSortTypesToSortMethodList(sortTypes) {
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
    }
}

export {
    SortFormatUtils
}