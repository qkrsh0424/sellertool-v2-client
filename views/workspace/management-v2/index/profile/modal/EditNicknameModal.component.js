import { CustomDialog } from "../../../../../../components/dialog/v1/CustomDialog";
import styled from 'styled-components';
import { useState } from "react";
import CustomInput from "../../../../../../components/input/default/v1/CustomInput";
import _ from "lodash";

const ContentContainer = styled.div`
    padding: 40px 20px;
    
    .input{
        border-radius: 5px;
    }
`;

export default function EditNicknameModalComponent({
    open,
    onClose,
    nickname,
    onSubmit,
    onOpenBackdrop
}) {
    const [editNickname, setEditNickname] = useState(nickname);

    const handleChangeEditNickname = (e) => {
        const value = e.target.value;

        setEditNickname(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        onOpenBackdrop();
        let value = _.cloneDeep(editNickname);

        value = value.trim();
        if (!value || value?.length < 2 || value?.length > 15) {
            alert('닉네임을 2~15자로 입력해 주세요.');
            return;
        }

        onSubmit(value);
    }

    return (
        <>
            <CustomDialog
                open={open}
                onClose={() => onClose()}
            >
                <form onSubmit={(e) => handleSubmit(e)}>
                    <CustomDialog.CloseButton onClose={() => onClose()} />
                    <CustomDialog.Title>닉네임 수정</CustomDialog.Title>
                    <ContentContainer>
                        <CustomInput
                            type='text'
                            className='input'
                            value={editNickname || ''}
                            onChange={(e) => handleChangeEditNickname(e)}
                            placeholder={`2~15자로 입력해 주세요.`}
                            required
                            minLength={2}
                            maxLength={15}
                        ></CustomInput>
                    </ContentContainer>
                    <CustomDialog.FooterButtonGroup isFlex>
                        <CustomDialog.FooterButton
                            type='button'
                            style={{
                                background: 'var(--defaultModalCloseColor)',
                                color: '#fff',
                                width: '40%'
                            }}
                            onClick={() => onClose()}
                        >취소</CustomDialog.FooterButton>
                        <CustomDialog.FooterButton
                            type='submit'
                            style={{
                                background: 'var(--mainColor)',
                                color: '#fff',
                                flex: 1
                            }}
                        >확인</CustomDialog.FooterButton>
                    </CustomDialog.FooterButtonGroup>
                </form>
            </CustomDialog>
        </>
    );
}