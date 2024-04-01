import { useRouter } from 'next/router';
import CustomBlockButton from '../../../../../components/buttons/block-button/v1/CustomBlockButton';
import * as St from './FdSortTypes.styled';
import { SortFormatUtils } from '../../../../../utils/sortFormatUtils';
import { CustomURIEncoderUtils } from '../../../../../utils/CustomURIEncoderUtils';
import CustomImage from '../../../../../components/image/CustomImage';
import FieldCircleLoading from '../../../../../components/loading/field-loading/v1/FieldCircleLoading';
import { useState } from 'react';
import { MdSelectSortTypes } from './modals/MdSelectSortTypes';

const customURIEncoderUtils = CustomURIEncoderUtils();
const sortFormatUtils = SortFormatUtils();

export function FdSortTypes({
    isLoading
}) {
    const router = useRouter();
    const query = router?.query
    const sortTypes = query?.sortTypes;

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
    return (
        <>
            <St.Container>
                <St.Wrapper>
                    <St.FlexGroup>
                        <div className='selectWrapper'>
                            <CustomBlockButton
                                type='button'
                                onClick={() => toggleSortSelectModalOpen(true)}
                            >
                                정렬추가
                            </CustomBlockButton>
                        </div>
                        <div className='clearButtonWrapper'>
                            <CustomBlockButton
                                type='button'
                                onClick={() => handleClearSortTypes()}
                            >
                                초기화
                            </CustomBlockButton>
                        </div>
                    </St.FlexGroup>
                    <St.SortItemsWrapper>
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
                    </St.SortItemsWrapper>

                    {isLoading &&
                        <FieldCircleLoading />
                    }
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

const SORT_METHODS = [
    {
        name: '[M] 주문수집일시',
        sortTarget: 'CREATED_AT'
    },
    {
        name: '채널주문일시',
        sortTarget: 'CHANNEL_ORDER_DATE'
    },
    {
        name: '[M] 주문확정일시',
        sortTarget: 'SALES_AT'
    },
    {
        name: '[M] 출고완료일시',
        sortTarget: 'RELEASE_AT'
    },
    {
        name: '[M] 보류등록일시',
        sortTarget: 'HOLD_AT'
    },
    {
        name: '[M] 상품명',
        sortTarget: 'PRODUCT_NAME'
    },
    {
        name: '[M] 상품태그',
        sortTarget: 'PRODUCT_TAG'
    },
    {
        name: '[M] 옵션명',
        sortTarget: 'PRODUCT_OPTION_NAME'
    },
    {
        name: '[M] 옵션태그',
        sortTarget: 'PRODUCT_OPTION_TAG'
    },
    {
        name: '[M] 출고지',
        sortTarget: 'RELEASE_LOCATION'
    },
    {
        name: '상품명',
        sortTarget: 'PROD_NAME'
    },
    {
        name: '옵션명',
        sortTarget: 'OPTION_NAME'
    },
    {
        name: '판매채널',
        sortTarget: 'SALES_CHANNEL'
    },
    {
        name: '수취인명',
        sortTarget: 'RECEIVER'
    },
    {
        name: '[M] 옵션코드',
        sortTarget: 'OPTION_CODE'
    },
    {
        name: '[M] 출고옵션코드',
        sortTarget: 'RELEASE_OPTION_CODE'
    },
    {
        name: '관리메모1',
        sortTarget: 'MANAGEMENT_MEMO1'
    },
    {
        name: '관리메모2',
        sortTarget: 'MANAGEMENT_MEMO2'
    },
    {
        name: '관리메모3',
        sortTarget: 'MANAGEMENT_MEMO3'
    },
    {
        name: '관리메모4',
        sortTarget: 'MANAGEMENT_MEMO4'
    },
    {
        name: '관리메모5',
        sortTarget: 'MANAGEMENT_MEMO5'
    },
    {
        name: '관리메모6',
        sortTarget: 'MANAGEMENT_MEMO6'
    },
    {
        name: '관리메모7',
        sortTarget: 'MANAGEMENT_MEMO7'
    },
    {
        name: '관리메모8',
        sortTarget: 'MANAGEMENT_MEMO8'
    },
    {
        name: '관리메모9',
        sortTarget: 'MANAGEMENT_MEMO9'
    },
    {
        name: '관리메모10',
        sortTarget: 'MANAGEMENT_MEMO10'
    },
]