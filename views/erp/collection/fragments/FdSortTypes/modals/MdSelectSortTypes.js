import { useRouter } from "next/router";
import CustomBlockButton from "../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import { CustomDialog } from "../../../../../../components/dialog/v1/CustomDialog";
import CustomImage from "../../../../../../components/image/CustomImage";
import * as St from './MdSelectSortTypes.styled';
import { useState } from "react";
import { CustomURIEncoderUtils } from "../../../../../../utils/CustomURIEncoderUtils";
import { SortFormatUtils } from "../../../../../../utils/sortFormatUtils";
import { customToast } from "../../../../../../components/toast/custom-react-toastify/v1";

const customURIEncoderUtils = CustomURIEncoderUtils();
const sortFormatUtils = SortFormatUtils();

const SORT_DIRECTION_ASC = 'ASC';
const SORT_DIRECTION_DESC = 'DESC';
const DEFAULT_SORT_DIRECTION = SORT_DIRECTION_ASC;

export function MdSelectSortTypes({
    open = false,
    onClose = () => { },
    SORT_METHODS
}) {
    const router = useRouter();
    const query = router?.query
    const sortTypes = query?.sortTypes;

    const [selectedSortMethodList, setSelectedSortMethodList] = useState(sortTypes ? sortFormatUtils.convertSortTypesToSortMethodList(customURIEncoderUtils.decodeJSONList(sortTypes)) : []);

    const handleChangeSortTypes = (sortMethodList) => {
        let newQuery = { ...query };

        if (!sortMethodList || sortMethodList?.length <= 0) {
            delete newQuery?.sortTypes;
        } else {
            newQuery.sortTypes = customURIEncoderUtils.encodeJSONList(sortFormatUtils.convertSortMethodListToSortTypes(sortMethodList));
        }

        if(sortMethodList?.length > 5){
            customToast.error('한번에 정렬 가능한 조건은 최대 5개 까지 입니다.');
            return;
        }

        router?.replace({
            pathname: router?.pathname,
            query: {
                ...newQuery,
            }
        }, undefined, { scroll: false })
        onClose();
    }

    const handlePushSortMethod = (sortTarget) => {
        if (!sortTarget) {
            return;
        }

        let newSortMethodList = [...selectedSortMethodList];
        let duplicatedSortMethod = newSortMethodList?.some(r => r.sortTarget === sortTarget);
        if (duplicatedSortMethod) {
            return;
        }

        newSortMethodList.push({
            sortTarget: sortTarget,
            sortDirection: DEFAULT_SORT_DIRECTION
        })

        setSelectedSortMethodList(newSortMethodList);
    }

    const handleChangeSortDirection = (sortTarget) => {
        let newSortMethodList = [...selectedSortMethodList].map(sortMethod => {
            if (sortMethod.sortTarget === sortTarget) {
                return {
                    ...sortMethod,
                    sortDirection: sortMethod.sortDirection === SORT_DIRECTION_ASC ? SORT_DIRECTION_DESC : SORT_DIRECTION_ASC
                }
            } else { return { ...sortMethod } }
        })

        setSelectedSortMethodList(newSortMethodList);
    }

    const handleRemoveSortMethod = (sortTarget) => {
        let newSortMethodList = [...selectedSortMethodList].filter(r => r.sortTarget !== sortTarget);
        setSelectedSortMethodList(newSortMethodList);
    }

    const handleClear = () => {
        handleChangeSortTypes([]);
    }

    return (
        <>
            <CustomDialog open={open} onClose={() => onClose()} maxWidth='md'>
                <CustomDialog.CloseButton onClose={() => onClose()} />
                <St.Container>
                    <section className='wrapper'>
                        <div className='leftWrapper'>
                            <h3>정렬종류</h3>
                            {SORT_METHODS?.filter(r => !selectedSortMethodList?.some(r2 => r2.sortTarget === r.sortTarget))?.map(r => {
                                return (
                                    <CustomBlockButton
                                        type='button'
                                        key={r.sortTarget}
                                        onClick={() => handlePushSortMethod(r.sortTarget)}
                                    >
                                        {r.name}
                                    </CustomBlockButton>
                                );
                            })}
                        </div>
                        <div className='middleWrapper'></div>
                        <div className='rightWrapper'>
                            <h3>정렬순서</h3>
                            {selectedSortMethodList?.map(sortMethod => {
                                const sortMethodName = SORT_METHODS?.find(r => sortMethod?.sortTarget === r.sortTarget)?.name;

                                if (sortMethodName) {
                                    return (
                                        <div
                                            key={sortMethod.sortTarget}
                                            className='itemBox'
                                        >
                                            <div className='itemBox__nameWrapper'>
                                                <div className='itemBox__nameWrapper__name'>{sortMethodName}</div>
                                                <CustomBlockButton
                                                    type='button'
                                                    onClick={() => handleRemoveSortMethod(sortMethod?.sortTarget)}
                                                >
                                                    <CustomImage src='/images/icon/close_default_959eae.svg' />
                                                </CustomBlockButton>
                                            </div>
                                            <div className='itemBox__directionWrapper'>
                                                <CustomBlockButton
                                                    type='button'
                                                    className={sortMethod?.sortDirection === 'ASC' ? 'active' : ''}
                                                    onClick={() => handleChangeSortDirection(sortMethod?.sortTarget)}
                                                >
                                                    오름차순
                                                </CustomBlockButton>
                                                <CustomBlockButton
                                                    type='button'
                                                    className={sortMethod?.sortDirection === 'DESC' ? 'active' : ''}
                                                    onClick={() => handleChangeSortDirection(sortMethod?.sortTarget)}
                                                >
                                                    내림차순
                                                </CustomBlockButton>
                                            </div>
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </section>
                    <section className='buttonGroup'>
                        <CustomBlockButton type='button' className='clear' onClick={() => handleClear()}>초기화</CustomBlockButton>
                        <CustomBlockButton type='button' className='adopt' onClick={() => handleChangeSortTypes(selectedSortMethodList)}>적용</CustomBlockButton>
                    </section>
                </St.Container>
            </CustomDialog>
        </>
    );
}