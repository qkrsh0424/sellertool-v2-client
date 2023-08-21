export function returnMberValue(currentMber, mberList) {
    if (!currentMber) {
        throw new Error('currentMber is missing');
    }

    if (!mberList) {
        throw new Error('mberList is missing');
    }

    if (currentMber?.valueType === 'STATIC') {
        return currentMber?.staticValue;
    } else if (currentMber?.valueType === 'DYNAMIC') {
        let relatedRate = mberList?.find(r => r.id === currentMber?.dynamicValueRelatedId);
        return relatedRate?.staticValue + currentMber?.extraValue;
    } else {
        return 'NN';
    }
}