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

export default function DeleteWorkspaceModalComponent({
    open = false,
    onClose = () => { },
    workspace,
    onSubmitDeleteWorkspace
}) {
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();
    const inputValueRef = useRef();

    const handleSubmit = (e) => {
        setDisabledBtn(true);
        const inputValue = inputValueRef.current.value;

        if (inputValue !== '영구 삭제') {
            toast.error('워크스페이스를 삭제하시려면 "영구 삭제"를 정확히 입력해 주세요.');
            return;
        }

        onSubmitDeleteWorkspace();
    }

    return (
        <>
            <CustomDialog
                open={open}
                onClose={() => onClose()}
            >
                <CustomDialog.CloseButton onClose={() => onClose()} />
                <CustomDialog.Title>
                    <b>{workspace?.name}</b> 을 삭제
                </CustomDialog.Title>
                <ContentContainer>
                    <div className='description'>
                        <div>워크스페이스를 한번 삭제하시면 <b>복구가 불가능</b> 합니다.</div>
                        <div>또한 연관된 <b>하위 데이터들도 모두 삭제됩니다.</b></div>
                        <div>위 내용을 완전히 이해했으며 워크스페이스를 삭제하시려면 <b><i>&quot;영구 삭제&quot;</i></b> 를 입력해 주세요.</div>
                    </div>
                    <CustomInput
                        ref={inputValueRef}
                        type='text'
                        className='input-el'
                        placeholder='영구 삭제'
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
                            background: 'var(--defaultRedColor)',
                            color: '#fff'
                        }}
                        onClick={(e) => handleSubmit(e)}
                        disabled={disabledBtn}
                    >영구 삭제</CustomDialog.FooterButton>
                </CustomDialog.FooterButtonGroup>
            </CustomDialog>
        </>
    );
}