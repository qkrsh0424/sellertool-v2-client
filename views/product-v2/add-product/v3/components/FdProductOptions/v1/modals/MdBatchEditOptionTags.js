import { useRef } from "react";
import useDisabledBtn from "/hooks/button/useDisabledBtn";
import CustomBlockButton from "/components/buttons/block-button/v1/CustomBlockButton";
import { CustomDialog } from "../../../../../../../../components/dialog/v1/CustomDialog";
import styled from 'styled-components';

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

export function MdBatchEditOptionTags({
    open = false,
    onClose = () => { },
    onBatchChangeOptionTagsWithOptionName,
    onConfirm
}) {
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();
    const inputValueRef = useRef();

    const handleCoverWithOptionName = () => {
        setDisabledBtn(true);
        onBatchChangeOptionTagsWithOptionName();
        onClose();
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setDisabledBtn(true);

        let value = inputValueRef.current.value;
        if (value.length > 50) {
            alert('옵션 태그를 50자 이내로 입력해 주세요.');
            return;
        }

        value = value.trim();
        onConfirm(value);
        onClose();
    }
    return (
        <CustomDialog
            open={open}
            onClose={() => onClose()}
        >
            <CustomDialog.CloseButton onClose={() => onClose()} />
            <CustomDialog.Title>옵션 태그를 일괄 변경합니다.</CustomDialog.Title>
            <form onSubmit={(e) => handleSubmit(e)}>
                <Container>
                    <div className='content-group'>
                        <div className='content-box'>
                            <CustomBlockButton
                                type='button'
                                className='event-button-item'
                                onClick={() => handleCoverWithOptionName()}
                            >
                                옵션명으로 덮어쓰기
                            </CustomBlockButton>
                        </div>
                    </div>
                    <div className='content-group'>
                        <div className='content-box'>
                            <input
                                ref={inputValueRef}
                                type='text'
                                className='input-item'
                                placeholder="옵션 태그"
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