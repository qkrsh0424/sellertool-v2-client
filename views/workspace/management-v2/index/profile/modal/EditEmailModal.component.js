import { CustomDialog } from "../../../../../../components/dialog/v1/CustomDialog";
import styled from 'styled-components';
import { useState } from "react";
import CustomInput from "../../../../../../components/input/default/v1/CustomInput";
import _ from "lodash";
import formatValidUtils from "../../../../../../utils/formatValidUtils";

const ContentContainer = styled.div`
    padding: 40px 20px;
    
    .input{
        border-radius: 5px;
    }
`;

export default function EditEmailModalComponent({
    open,
    onClose,
    email,
    onSubmit,
    onOpenBackdrop
}) {
    const [editEmail, setEditEmail] = useState(email);

    const handleChangeEditEmail = (e) => {
        const value = e.target.value;

        setEditEmail(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        onOpenBackdrop();
        let value = _.cloneDeep(editEmail);

        value = value.trim();
        if (!formatValidUtils.isEmailFormatValid(value)) {
            alert(`이메일을 형식을 정확히 입력해 주세요. ex) example@example.com`);
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
                    <CustomDialog.Title>이메일 수정</CustomDialog.Title>
                    <ContentContainer>
                        <CustomInput
                            type='email'
                            className='input'
                            value={editEmail || ''}
                            onChange={(e) => handleChangeEditEmail(e)}
                            placeholder={`ex) example@example.com`}
                            required
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