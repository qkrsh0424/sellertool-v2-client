import CustomBlockButton from "../../../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import { CustomDialog } from "../../../../../../../../components/dialog/v1/CustomDialog";
import styled from 'styled-components';
import CustomImage from "../../../../../../../../components/image/CustomImage";
import { useSellertoolDatasActionsHook, useSellertoolDatasValueHook } from "../../../../../../../../contexts/SellertoolDatasGlobalProvider";

const StyledHeader = styled.div`
    padding: 10px;
`;

const StyledBody = styled.div`
    padding: 10px;

    .group{
        margin-bottom: 20px;
        .title{
            font-size: 16px;
            font-weight: 700;
        }

        .list{
            margin-top: 10px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            .item{
                padding: 10px;
                display: flex;
                align-items: center;
                gap: 10px;
                border: 1px solid #e0e0e0;
                border-radius: 3px;
                font-size: 14px;

                .startButton{
                    width: 24px;
                    height: 24px;
                    background: none;
                    border: none;
                }
            }
        }
    }
`;

export function ModalSearchConditionBookmark({
    open,
    onClose,
    M_SEARCH_CONDITIONS,
    ORDER_SEARCH_CONDITIONS,
    RECEIVER_SEARCH_CONDITIONS,
    DELIVERY_SEARCH_CONDITIONS,
    MEMO_SEARCH_CONDITIONS,
}) {
    const sellertoolDatasValueHook = useSellertoolDatasValueHook();
    const sellertoolDatasActionsHook = useSellertoolDatasActionsHook();

    const handleClickBookmark = (searchCondition) => {
        if (!searchCondition) {
            return;
        }
        let newBookmarkSearchConditionsForErpc = [...sellertoolDatasValueHook.bookmarkSearchConditionsForErpc];

        const isExisted = newBookmarkSearchConditionsForErpc?.some(r => r.fieldName === searchCondition.fieldName);
        if (isExisted) {
            newBookmarkSearchConditionsForErpc = newBookmarkSearchConditionsForErpc?.filter((item) => item.fieldName !== searchCondition.fieldName);
            sellertoolDatasActionsHook.erpcActions.onSetBookmarkSearchConditionsForErpc(newBookmarkSearchConditionsForErpc);
        } else {
            newBookmarkSearchConditionsForErpc?.push(searchCondition);
            sellertoolDatasActionsHook.erpcActions.onSetBookmarkSearchConditionsForErpc(newBookmarkSearchConditionsForErpc);
        }
    }

    return (
        <>
            <CustomDialog
                open={open}
                onClose={onClose}
            >
                <StyledHeader>
                    <CustomDialog.Header>
                        <CustomDialog.Header.Fake />
                        <CustomDialog.Header.Title>조건 검색 북마크</CustomDialog.Header.Title>
                        <CustomDialog.Header.Close onClick={onClose} />
                    </CustomDialog.Header>
                </StyledHeader>
                <StyledBody>
                    <div className='group'>
                        <div className='title'>관리상품정보</div>
                        <div className='list'>
                            {
                                M_SEARCH_CONDITIONS.map((item, index) => {
                                    const isInclude = sellertoolDatasValueHook.bookmarkSearchConditionsForErpc?.some(r => r.fieldName === item.fieldName);
                                    return (
                                        <div
                                            key={index}
                                            className='item'
                                        >
                                            <CustomBlockButton
                                                type='button'
                                                className='startButton'
                                                onClick={() => handleClickBookmark(item)}
                                            >
                                                {isInclude ?
                                                    <CustomImage src='/images/icon/star_default_ffdf00.svg' />
                                                    :
                                                    <CustomImage src='/images/icon/star_border_808080.svg' />
                                                }
                                            </CustomBlockButton>
                                            {item.name}
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                    <div className='group'>
                        <div className='title'>수취인정보</div>
                        <div className='list'>
                            {
                                RECEIVER_SEARCH_CONDITIONS.map((item, index) => {
                                    const isInclude = sellertoolDatasValueHook.bookmarkSearchConditionsForErpc?.some(r => r.fieldName === item.fieldName);
                                    return (
                                        <div
                                            key={index}
                                            className='item'
                                        >
                                            <CustomBlockButton
                                                type='button'
                                                className='startButton'
                                                onClick={() => handleClickBookmark(item)}
                                            >
                                                {isInclude ?
                                                    <CustomImage src='/images/icon/star_default_ffdf00.svg' />
                                                    :
                                                    <CustomImage src='/images/icon/star_border_808080.svg' />
                                                }
                                            </CustomBlockButton>
                                            {item.name}
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                    <div className='group'>
                        <div className='title'>배송정보</div>
                        <div className='list'>
                            {
                                DELIVERY_SEARCH_CONDITIONS.map((item, index) => {
                                    const isInclude = sellertoolDatasValueHook.bookmarkSearchConditionsForErpc?.some(r => r.fieldName === item.fieldName);
                                    return (
                                        <div
                                            key={index}
                                            className='item'
                                        >
                                            <CustomBlockButton
                                                type='button'
                                                className='startButton'
                                                onClick={() => handleClickBookmark(item)}
                                            >
                                                {isInclude ?
                                                    <CustomImage src='/images/icon/star_default_ffdf00.svg' />
                                                    :
                                                    <CustomImage src='/images/icon/star_border_808080.svg' />
                                                }
                                            </CustomBlockButton>
                                            {item.name}
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                    <div className='group'>
                        <div className='title'>주문정보</div>
                        <div className='list'>
                            {
                                ORDER_SEARCH_CONDITIONS.map((item, index) => {
                                    const isInclude = sellertoolDatasValueHook.bookmarkSearchConditionsForErpc?.some(r => r.fieldName === item.fieldName);
                                    return (
                                        <div
                                            key={index}
                                            className='item'
                                        >
                                            <CustomBlockButton
                                                type='button'
                                                className='startButton'
                                                onClick={() => handleClickBookmark(item)}
                                            >
                                                {isInclude ?
                                                    <CustomImage src='/images/icon/star_default_ffdf00.svg' />
                                                    :
                                                    <CustomImage src='/images/icon/star_border_808080.svg' />
                                                }
                                            </CustomBlockButton>
                                            {item.name}
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                    <div className='group'>
                        <div className='title'>관리메모</div>
                        <div className='list'>
                            {
                                MEMO_SEARCH_CONDITIONS.map((item, index) => {
                                    const isInclude = sellertoolDatasValueHook.bookmarkSearchConditionsForErpc?.some(r => r.fieldName === item.fieldName);
                                    return (
                                        <div
                                            key={index}
                                            className='item'
                                        >
                                            <CustomBlockButton
                                                type='button'
                                                className='startButton'
                                                onClick={() => handleClickBookmark(item)}
                                            >
                                                {isInclude ?
                                                    <CustomImage src='/images/icon/star_default_ffdf00.svg' />
                                                    :
                                                    <CustomImage src='/images/icon/star_border_808080.svg' />
                                                }
                                            </CustomBlockButton>
                                            {item.name}
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </StyledBody>
            </CustomDialog>
        </>
    );
}