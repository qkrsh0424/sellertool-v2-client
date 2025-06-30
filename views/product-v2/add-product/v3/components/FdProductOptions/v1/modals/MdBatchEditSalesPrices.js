import styled from 'styled-components';
import useDisabledBtn from '../../../../../../../../hooks/button/useDisabledBtn';
import { useState } from 'react';
import { CustomDialog } from '../../../../../../../../components/dialog/v1/CustomDialog';
import { getRemovedPrefixZero, numberFormatUtils } from '../../../../../../../../utils/numberFormatUtils';

const Container = styled.div`
    padding: 30px 0;
    .content-group{
        padding: 0 20px;
        margin-top: 20px;
        &:first-child{
            margin-top: 0;
        }
    }

    .content-box{
        .event-button-item{
            padding:0;
            margin:0;
            height: 48px;
            border: 1px solid var(--mainColor);
            color:var(--mainColor);
            border-radius: 10px;

            &:hover{
                background:var(--mainColor);
                color:white;
            }
        }
        
        .input-item{
            box-sizing: border-box;
            width:100%;
            height: 48px;
            padding: 0 10px;
            border: 1px solid #e0e0e0;
            border-radius: 10px;
            outline:none;
        }
    }
`;

export function MdBatchEditSalesPrices({
    open = false,
    onClose = () => { },
    onConfirm
}) {
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();
    const [inputValue, setInputValue] = useState('');

    const handleChangeInputValue = (e) => {
        let value = e.target.value;

        if (!value) {
            setInputValue('');
            return;
        }

        value = value.replaceAll(',', '');
        value = getRemovedPrefixZero(value);

        if (value.match(/^[0-9]{0,9}$/)) {
            setInputValue(value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setDisabledBtn(true);

        if (!inputValue || inputValue < 0 || inputValue > 999999999) {
            alert('판매가격은 0-999999999 이내의 숫자만 입력가능 합니다.');
            return;
        }

        onConfirm(inputValue);
        onClose();
    }

    return (
        <CustomDialog
            open={open}
            onClose={() => onClose()}
        >
            <CustomDialog.CloseButton onClose={() => onClose()} />
            <CustomDialog.Title>판매가격을 일괄 변경합니다.</CustomDialog.Title>
            <form onSubmit={(e) => handleSubmit(e)}>
                <Container>
                    <div className='content-group'>
                        <div className='content-box'>
                            <input
                                type='text'
                                className='input-item'
                                placeholder="판매가격"
                                value={numberFormatUtils.numberWithCommas(inputValue) || ''}
                                onChange={(e) => handleChangeInputValue(e)}
                            ></input>
                        </div>
                    </div>
                </Container>
                <CustomDialog.FooterButtonGroup isFlex>
                    <CustomDialog.FooterButton
                        type='button'
                        style={{
                            color: '#fff',
                            background: '#959eae',
                            flex: 1
                        }}
                        onClick={() => onClose()}
                    >
                        취소
                    </CustomDialog.FooterButton>
                    <CustomDialog.FooterButton
                        type='submit'
                        style={{
                            color: '#fff',
                            background: 'var(--mainColor)',
                            width: '60%'
                        }}
                        disabled={disabledBtn}
                    >
                        확인
                    </CustomDialog.FooterButton>
                </CustomDialog.FooterButtonGroup>
            </form>
        </CustomDialog>
    );
}