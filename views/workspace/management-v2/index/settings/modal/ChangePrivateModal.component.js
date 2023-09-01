import styled from 'styled-components';
import { CustomDialog } from '../../../../../../components/dialog/v1/CustomDialog';
import CustomInput from '../../../../../../components/input/default/v1/CustomInput';
import { useRef, useState } from 'react';
import useDisabledBtn from '../../../../../../hooks/button/useDisabledBtn';
import { toast } from 'react-toastify';

const ContentContainer = styled.div`
    padding: 40px 20px;
    .description{
        font-size: 14px;
        font-weight: 500;

        div{
            margin-bottom: 5px;
        }
    }

    .input-el{
        margin-top: 10px;
        height: 40px;
        border-radius: 5px;
    }
`;

export default function ChangePrivateModalComponent({
    open = false,
    onClose = () => { },
    workspace,
    onSubmitChangePrivate
}) {
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();
    const inputValueRef = useRef();

    const handleSubmit = (e) => {
        setDisabledBtn(true);
        const inputValue = inputValueRef.current.value;

        if (inputValue !== '확인') {
            toast.error('워크스페이스를 개인화 모드로 전환하시려면 "확인"를 정확히 입력해 주세요.');
            return;
        }

        onSubmitChangePrivate();
    }

    return (
        <>
            <CustomDialog
                open={open}
                onClose={() => onClose()}
            >
                <CustomDialog.CloseButton onClose={() => onClose()} />
                <CustomDialog.Title>
                    개인 워크스페이스로 전환
                </CustomDialog.Title>
                <ContentContainer>
                    <div className='description'>
                        <div>워크스페이스를 개인화 모드로 전환하면 내부 데이터를 다른 멤버들과 공유할 수 없게됩니다.</div>
                        <div>위 내용을 완전히 이해했으며 워크스페이스를 개인화 모드로 전환하시려면 <b><i>&quot;확인&quot;</i></b> 을 입력해 주세요.</div>
                    </div>
                    <CustomInput
                        ref={inputValueRef}
                        type='text'
                        className='input-el'
                        placeholder='확인'
                    />
                </ContentContainer>
                <CustomDialog.FooterButtonGroup isFlex>
                    <CustomDialog.FooterButton
                        type='button'
                        style={{
                            width: '40%',
                            background: 'var(--defaultModalCloseColor)',
                            color: '#fff'
                        }}
                        onClick={() => onClose()}
                    >취소</CustomDialog.FooterButton>
                    <CustomDialog.FooterButton
                        type='button'
                        style={{
                            flex: 1,
                            background: 'var(--defaultYellowColor)',
                            color: '#fff'
                        }}
                        onClick={(e) => handleSubmit(e)}
                        disabled={disabledBtn}
                    >개인화 전환</CustomDialog.FooterButton>
                </CustomDialog.FooterButtonGroup>
            </CustomDialog>
        </>
    );
}