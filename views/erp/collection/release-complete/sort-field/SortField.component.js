import { useRouter } from "next/router";
import { useState } from "react";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import CommonModalComponent from "../../../../modules/modal/CommonModalComponent";
import SortModalComponent from "./modal/SortModal.component";
import { Container } from "./styles/SortField.styled";

export default function SortFieldComponent(props) {
    const router = useRouter();
    const [sortModalOpen, setSortModalOpen] = useState(false);

    const handleOpenSortModal = () => {
        setSortModalOpen(true);
    }

    const handleCloseSortModal = () => {
        setSortModalOpen(false);
    }

    return (
        <>
            <Container>
                <SingleBlockButton
                    type='button'
                    className='button-item'
                    onClick={() => handleOpenSortModal()}
                >
                    <div>{FLATTEN_SORT_LIST?.find(r => r.sort === router?.query?.sort)?.name || '[M] 출고등록일'} | <span className='bold'>{FLATTEN_SORT_LIST?.find(r => r.sort === router?.query?.sort)?.direction || '오름차순'}</span></div>
                </SingleBlockButton>
            </Container>
            {sortModalOpen &&
                <CommonModalComponent
                    open={sortModalOpen}
                    onClose={handleCloseSortModal}
                >
                    <SortModalComponent
                        SORT_TYPES={SORT_TYPES}
                        onClose={handleCloseSortModal}
                    />
                </CommonModalComponent>
            }
        </>
    );
}

const SORT_TYPES = [
    {
        name: '[M] 주문등록일',
        sortList: [
            {
                sort: ['createdAt_asc'],
                direction: '오름차순'
            },
            {
                sort: ['createdAt_desc'],
                direction: '내림차순'
            }
        ]
    },
    {
        name: '판매채널 주문일시',
        sortList: [
            {
                sort: ['channelOrderDate_asc'],
                direction: '오름차순'
            },
            {
                sort: ['channelOrderDate_desc'],
                direction: '내림차순'
            }
        ]
    },
    {
        name: '[M] 판매등록일',
        sortList: [
            {
                sort: ['salesAt_asc'],
                direction: '오름차순'
            },
            {
                sort: ['salesAt_desc'],
                direction: '내림차순'
            }
        ]
    },
    {
        name: '[M] 출고등록일',
        sortList: [
            {
                sort: ['releaseAt_asc'],
                direction: '오름차순'
            },
            {
                sort: ['releaseAt_desc'],
                direction: '내림차순'
            }
        ]
    },
    {
        name: '[M] 상품명 > [M] 옵션명',
        sortList: [
            {
                sort: ['productName_asc', 'productOptionName_asc'],
                direction: '오름차순'
            },
            {
                sort: ['productName_desc', 'productOptionName_desc'],
                direction: '내림차순'
            }
        ]
    },
    {
        name: '[M] 상품명',
        sortList: [
            {
                sort: ['productName_asc'],
                direction: '오름차순'
            },
            {
                sort: ['productName_desc'],
                direction: '내림차순'
            }
        ]
    },
    {
        name: '[M] 상품태그',
        sortList: [
            {
                sort: ['productTag_asc'],
                direction: '오름차순'
            },
            {
                sort: ['productTag_desc'],
                direction: '내림차순'
            }
        ]
    },
    {
        name: '[M] 옵션명',
        sortList: [
            {
                sort: ['productOptionName_asc'],
                direction: '오름차순'
            },
            {
                sort: ['productOptionName_desc'],
                direction: '내림차순'
            }
        ]
    },
    {
        name: '[M] 옵션태그',
        sortList: [
            {
                sort: ['productOptionTag_asc'],
                direction: '오름차순'
            },
            {
                sort: ['productOptionTag_desc'],
                direction: '내림차순'
            }
        ]
    },
    {
        name: '[M] 출고지',
        sortList: [
            {
                sort: ['productOptionReleaseLocation_asc'],
                direction: '오름차순'
            },
            {
                sort: ['productOptionReleaseLocation_desc'],
                direction: '내림차순'
            }
        ]
    },
    {
        name: '상품명',
        sortList: [
            {
                sort: ['prodName_asc'],
                direction: '오름차순'
            },
            {
                sort: ['prodName_desc'],
                direction: '내림차순'
            }
        ]
    },
    {
        name: '옵션명',
        sortList: [
            {
                sort: ['optionName_asc'],
                direction: '오름차순'
            },
            {
                sort: ['optionName_desc'],
                direction: '내림차순'
            }
        ]
    },
    {
        name: '판매채널',
        sortList: [
            {
                sort: ['salesChannel_asc'],
                direction: '오름차순'
            },
            {
                sort: ['salesChannel_desc'],
                direction: '내림차순'
            }
        ]
    },
    {
        name: '수취인명',
        sortList: [
            {
                sort: ['receiver_asc'],
                direction: '오름차순'
            },
            {
                sort: ['receiver_desc'],
                direction: '내림차순'
            }
        ]
    },
    {
        name: '[M] 옵션코드',
        sortList: [
            {
                sort: ['optionCode_asc'],
                direction: '오름차순'
            },
            {
                sort: ['optionCode_desc'],
                direction: '내림차순'
            }
        ]
    },
    {
        name: '[M] 출고옵션코드',
        sortList: [
            {
                sort: ['releaseOptionCode_asc'],
                direction: '오름차순'
            },
            {
                sort: ['releaseOptionCode_desc'],
                direction: '내림차순'
            }
        ]
    },
]

const FLATTEN_SORT_LIST = [];

SORT_TYPES.forEach(r => {
    r.sortList.forEach(r2 => {
        FLATTEN_SORT_LIST.push({
            name: r.name,
            sort: r2.sort.join(),
            direction: r2.direction
        })
    })
})