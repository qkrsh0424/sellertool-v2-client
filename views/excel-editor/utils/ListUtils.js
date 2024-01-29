export const ListUtils = () => {
    return {
        reorder: reorder,
        pushAt: pushAt
    }
}

function reorder(list, startIndex, endIndex) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

function pushAt(item, indexAt, list) {
    if (item === undefined || !indexAt === undefined || !list === undefined) {
        throw new Error('item, indexAt, list 는 필수 파라미터 입니다.');
    }

    const beforeList = list.slice(0, indexAt);
    const afterList = list.slice(indexAt, list?.length);
    const newList = [
        ...beforeList,
        item,
        ...afterList
    ];

    return newList;
}