import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import usePopperHook from '../../../hooks/popper/usePopperHook';
import Ripple from '../button/Ripple';
import SingleBlockButton from '../button/SingleBlockButton';
import CustomImage from '../image/CustomImage';
import CustomPopper from '../popper/CustomPopper';

const Container = styled.div`

`;

const Wrapper = styled.div`
    .flex-box{
        display: flex;
        justify-content: ${props => {
        if (!props.align) {
            return 'flex-start'
        }
        switch (props.align) {
            case 'left': return 'flex-start';
            case 'center': return 'center';
            case 'right': return 'flex-end';
            default: return 'flex-start'
        }
    }};
        align-items: center;
    }

    .number-box{
        margin:0 3px;
        font-size: 14px;
        font-weight: 600;
        color: #404040;

        @media all and (max-width:992px){
            font-size: 12px;
        }
    }

    .button-box{
        margin:0 3px;
    }

    .circle-button-el{
        margin:0;
        padding:0;
        position: relative;
        overflow: hidden;
        width: 34px; 
        height: 34px;
        border-radius: 50%;
        border: none;
        background: none;
        box-sizing: border-box;

        cursor: pointer;

        &:hover{
            background: #e0e0e040;
        }

        &:disabled{
            opacity: 0.5;
            cursor: not-allowed;
        }

        @media all and (max-width:992px){
            width: 28px; 
            height: 28px;
        }
    }

    .button-icon-figure{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 24px;
        height: 24px;

        @media all and (max-width:992px){
            width: 20px; 
            height: 20px;
        }
    }

    .button-disabled{
        cursor:default;

        &:hover{
            background: none;
        }
    }

    .select-box{
        margin:0 3px;
    }

    .select-el{
        width: 70px;
        height: 30px;
        padding: 5px;
        border: 1px solid #e0e0e0;
        background: #fafafa;
        color:#404040;
        border-radius: 5px;
        box-sizing: border-box;
        text-align: center;
        font-size: 11px;
        -webkit-appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;

        cursor: pointer;

        &:focus{
            outline: none;
        }
    }

    .current-number-tag{
        display:inline-block;
        border:1px solid #e0e0e0;
        box-sizing:border-box;
        width: 30px;
        background: #f9f9f9;
        border-radius: 3px;
        text-align:center;
        background:#ffffff;
        cursor: pointer;
        margin-right: 5px;
    }
`;

const PageInputWrapper = styled.div`
    padding: 10px;

    .input-item{
        padding: 0 10px;
        box-sizing: border-box;
        height: 30px;
        width:100px;
        border: 1px solid #e0e0e0;
        border-radius: 5px;
        outline: none;

        &:focus{
            border: 1px solid var(--mainColor);
        }
    }

    .button-group{
        margin-top: 10px;
    }

    .button-item{
        padding:0;
        margin:0;
        color:white;
        height: 25px;
        border:none;
        font-size: 12px;
        border-radius: 5px;

        &:last-child{
            margin-left: 5px;
        }
    }
`;

/**
 * 
 * @param {string} align 컴포넌트의 위치를 결정 [left, center, right] default: center
 * @param {number} pageIndex 현재 페이지의 숫자 값 default: 0
 * @param {number} totalPages 총 페이지의 숫자 값 default: 1
 * @param {boolean} isFirst 현재 페이지가 첫번째인지에 대한 여부 default: true
 * @param {boolean} isLast 현재 페이지가 마지막인지에 대한 여부 default: true
 * @param {number} totalElements 총 아이템 개수의 숫자 값 default: 0
 * @param {array} sizeElements 페이지 사이즈 선택에 대한 배열 값 default: []
 * @param {boolean} viewTotal 총 아이템 개수를 표시하는 필드의 전시 여부 default: false
 * @returns 
 */
const PagenationComponentStateV2 = ({
    align = 'center',
    pageIndex = 0,
    totalPages = 1,
    isFirst = true,
    isLast = true,
    totalElements = 0,
    sizeElements = [],
    size = 0,
    viewTotal = false,
    onChangePage = () => { },
    onChangeSize = () => { },
    ...props
}) => {
    const pageInputRef = useRef();
    const {
        popperAnchorEl: pageInputPopperAnchorEl,
        popperOpen: pageInputPopperOpen,
        onActionOpenPopper: onActionOpenPageInputPopper,
        onActionClosePopper: onActionClosePageInputPopper
    } = usePopperHook();

    const handlePrev = () => {
        if (isFirst) {
            return;
        }

        let newPage = pageIndex;

        onChangePage(newPage);

    }

    const handleNext = () => {
        if (isLast) {
            return;
        }

        let newPage = pageIndex + 2;

        onChangePage(newPage);
    }

    const handleChangeSize = (e) => {
        let value = e.target.value;

        onChangeSize(value);
    }

    const handleSubmitChangePageNumber = (e) => {
        e.preventDefault();
        let newPage = pageInputRef.current.value;


        if (newPage > totalPages) {
            alert('총 페이지 수 보다 적은 숫자를 입력해 주세요.');
            return;
        }

        onChangePage(newPage);

        onActionClosePageInputPopper();
    }

    return (
        <>
            <Container {...props}>
                <Wrapper
                    align={align}
                    isFirst={isFirst}
                    isLast={isLast}
                >
                    <div className='flex-box'>
                        {sizeElements &&
                            <div className='select-box'>
                                <select
                                    className='select-el'
                                    onChange={handleChangeSize}
                                    value={sizeElements?.find(r => r == size) ? size : sizeElements[0]}
                                >
                                    {sizeElements.map((r, index) => {
                                        return (
                                            <option key={index} value={r}>{r} 개 보기</option>
                                        );
                                    })}
                                </select>
                            </div>
                        }
                        <div className='button-box' >
                            <SingleBlockButton
                                type='button'
                                className={`circle-button-el`}
                                onClick={handlePrev}
                                disabled={isFirst}
                            >
                                <div className='button-icon-figure'>
                                    <CustomImage
                                        src='/images/icon/arrowLeft_chevron_808080.svg'
                                    />
                                </div>
                            </SingleBlockButton>
                        </div>
                        <div className='number-box'>
                            <span className='current-number-tag' onClick={(e) => onActionOpenPageInputPopper(e)}>{pageIndex + 1 || ''}</span>/ <span>{totalPages || ''}</span>
                        </div>
                        <div className='button-box'>
                            <SingleBlockButton
                                type='button'
                                className={`circle-button-el`}
                                onClick={handleNext}
                                disabled={isLast}
                            >
                                <div className='button-icon-figure'>
                                    <CustomImage
                                        src='/images/icon/arrowRight_chevron_808080.svg'
                                    />
                                </div>
                            </SingleBlockButton>
                        </div>
                        {totalElements && viewTotal &&
                            <div className='number-box'>
                                총 {totalElements}
                            </div>
                        }

                    </div>
                </Wrapper>
            </Container>

            {pageInputPopperOpen &&
                (
                    <CustomPopper
                        open={pageInputPopperOpen}
                        anchorEl={pageInputPopperAnchorEl}
                        disablePortal={true}
                        placement={'top'}
                        element={(
                            <>
                                <PageInputWrapper>
                                    <form onSubmit={(e) => handleSubmitChangePageNumber(e)}>
                                        <div>
                                            <input
                                                ref={pageInputRef}
                                                type='number'
                                                className='input-item'
                                                defaultValue={pageIndex + 1}
                                                max={totalPages}
                                                min={1}
                                                required
                                            ></input>
                                        </div>
                                        <div className='button-group mgl-flex'>
                                            <SingleBlockButton
                                                type='button'
                                                className='button-item'
                                                style={{
                                                    background: 'var(--defaultModalCloseColor)'
                                                }}
                                                onClick={() => onActionClosePageInputPopper()}
                                            >
                                                닫기
                                            </SingleBlockButton>
                                            <SingleBlockButton
                                                type='submit'
                                                className='button-item'
                                                style={{
                                                    background: 'var(--mainColor)'
                                                }}
                                            >
                                                확인
                                            </SingleBlockButton>
                                        </div>
                                    </form>
                                </PageInputWrapper>
                            </>
                        )}
                    ></CustomPopper>
                )
            }
        </>
    );
}
export default PagenationComponentStateV2;