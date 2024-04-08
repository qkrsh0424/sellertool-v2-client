import { useState } from 'react';
import CustomBlockButton from '../../../../../../components/buttons/block-button/v1/CustomBlockButton';
import CustomImage from '../../../../../../components/image/CustomImage';
import { useViewOptionsActionsHook, useViewOptionsValueHook } from '../../contexts/ViewOptionsProvider';
import * as St from './FdViewOptions.styled';
import { CustomURIEncoderUtils } from '../../../../../../utils/CustomURIEncoderUtils';
import { SortFormatUtils } from '../../../../../../utils/sortFormatUtils';
import { useRouter } from 'next/router';
import { CircularProgress } from '@mui/material';
import { MdSelectSortTypes } from './modals/MdSelectSortTypes';
import { SORT_METHODS } from '../../References';

const customURIEncoderUtils = CustomURIEncoderUtils();
const sortFormatUtils = SortFormatUtils();

export function FdViewOptions({
    isLoading
}) {
    const router = useRouter();
    const query = router?.query
    const sortTypes = query?.sortTypes;

    const viewOptionsValueHook = useViewOptionsValueHook();
    const viewOptionsActionsHook = useViewOptionsActionsHook();

    const [sortSelectModalOpen, setSortSelectModalOpen] = useState(false);

    const sortMethodList = sortTypes ? sortFormatUtils.convertSortTypesToSortMethodList(customURIEncoderUtils.decodeJSONList(sortTypes)) : [];

    const toggleSortSelectModalOpen = (bool) => {
        setSortSelectModalOpen(bool);
    }

    const handleClearSortTypes = () => {
        let newQuery = { ...query };

        delete newQuery.sortTypes;

        router?.replace({
            pathname: router?.pathname,
            query: {
                ...newQuery,
            }
        }, undefined, { scroll: false })
    }

    const handleChangeViewOptions = (type, value) => {
        switch (type) {
            case 'stockOption':
                viewOptionsActionsHook.onSet({
                    ...viewOptionsValueHook,
                    stockOptionType: value
                })
                break;
            case 'receiverOption':
                viewOptionsActionsHook.onSet({
                    ...viewOptionsValueHook,
                    receiverOptionType: value
                })
                break;
        }
    }

    return (
        <>
            <St.Container>
                <St.Wrapper>
                    <St.ViewOptionContainer>
                        <h3 className='title'>보기옵션</h3>
                        <div className='gridWrapper'>
                            <section className='mgl-flex mgl-flex-alignItems-center mgl-flex-gap-10'>
                                <label>재고:</label>
                                <div className='mgl-flex'>
                                    <CustomBlockButton
                                        type='button'
                                        onClick={() => handleChangeViewOptions('stockOption', 'ALL')}
                                        className={`${viewOptionsValueHook?.stockOptionType === 'ALL' ? 'active' : ''}`}
                                    >
                                        전체
                                    </CustomBlockButton>
                                    <CustomBlockButton
                                        type='button'
                                        onClick={() => handleChangeViewOptions('stockOption', 'EXIST')}
                                        className={`${viewOptionsValueHook?.stockOptionType === 'EXIST' ? 'active' : ''}`}
                                    >
                                        있음
                                    </CustomBlockButton>
                                    <CustomBlockButton
                                        type='button'
                                        onClick={() => handleChangeViewOptions('stockOption', 'NOT_EXIST')}
                                        className={`${viewOptionsValueHook?.stockOptionType === 'NOT_EXIST' ? 'active' : ''}`}
                                    >
                                        없음
                                    </CustomBlockButton>
                                </div>
                            </section>
                            <section className='mgl-flex mgl-flex-alignItems-center mgl-flex-gap-10'>
                                <label>수취인:</label>
                                <div className='mgl-flex'>
                                    <CustomBlockButton
                                        type='button'
                                        onClick={() => handleChangeViewOptions('receiverOption', 'ALL')}
                                        className={`${viewOptionsValueHook?.receiverOptionType === 'ALL' ? 'active' : ''}`}
                                    >
                                        전체
                                    </CustomBlockButton>
                                    <CustomBlockButton
                                        type='button'
                                        onClick={() => handleChangeViewOptions('receiverOption', 'SINGLE')}
                                        className={`${viewOptionsValueHook?.receiverOptionType === 'SINGLE' ? 'active' : ''}`}
                                    >
                                        단일주문
                                    </CustomBlockButton>
                                    <CustomBlockButton
                                        type='button'
                                        onClick={() => handleChangeViewOptions('receiverOption', 'MULTI')}
                                        className={`${viewOptionsValueHook?.receiverOptionType === 'MULTI' ? 'active' : ''}`}
                                    >
                                        복수주문
                                    </CustomBlockButton>
                                </div>
                            </section>
                        </div>
                    </St.ViewOptionContainer>
                    <St.SortContainer>
                        <div className='sortFlexWrapper'>
                            <h3>정렬:</h3>
                            <div className='selectWrapper'>
                                <CustomBlockButton
                                    type='button'
                                    onClick={() => toggleSortSelectModalOpen(true)}
                                    disabled={isLoading}
                                >
                                    {isLoading ? <CircularProgress size={20} />
                                        :
                                        <>추가</>
                                    }
                                </CustomBlockButton>
                            </div>
                            <div className='clearButtonWrapper'>
                                <CustomBlockButton
                                    type='button'
                                    onClick={() => handleClearSortTypes()}
                                    disabled={isLoading}
                                >
                                    {isLoading ? <CircularProgress size={20} />
                                        :
                                        <>초기화</>
                                    }
                                </CustomBlockButton>
                            </div>
                        </div>
                        <div className='sortItemsWrapper'>
                            {(sortMethodList && sortMethodList?.length > 0) &&
                                <div className='itemList__box'>
                                    {sortMethodList?.map((sortMethod, index) => {
                                        const sortName = SORT_METHODS?.find(r => r.sortTarget === sortMethod.sortTarget)?.name;
                                        return (
                                            <div key={index} className='item__box'>
                                                <div className='text'>{sortName}</div>
                                                <div
                                                    className='deleteIconBtn'
                                                >
                                                    {sortMethod.sortDirection === 'DESC' ?
                                                        <CustomImage
                                                            src={'/images/icon/arrow_downward_808080.svg'}
                                                        />
                                                        :
                                                        <CustomImage
                                                            src={'/images/icon/arrow_upward_808080.svg'}
                                                        />
                                                    }
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            }
                        </div>
                    </St.SortContainer>
                </St.Wrapper>
            </St.Container>

            {sortSelectModalOpen &&
                <MdSelectSortTypes
                    open={sortSelectModalOpen}
                    onClose={() => toggleSortSelectModalOpen(false)}
                    SORT_METHODS={SORT_METHODS}
                />
            }
        </>
    );
}