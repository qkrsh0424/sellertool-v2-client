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

export default function EditPhoneNumberModalComponent({
    open,
    onClose,
    phoneNumber,
    onSubmit
}) {
    const [editPhoneNumber, setEditPhoneNumber] = useState(phoneNumber);

    const handleChangeEditPhoneNumber = (e) => {
        const value = e.target.value;

        const regex = /^[0-9]{0,11}$/;
        if(regex.test(value)){
            setEditPhoneNumber(value);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let value = _.cloneDeep(editPhoneNumber);

        value = value.trim();
        if (!formatValidUtils.isPhoneNumberFormatValid(value)) {
            alert(`'-'를 제외한 11자리로 입력해 주세요. ex)01012341234`);
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
                    <CustomDialog.Title>휴대전화 수정</CustomDialog.Title>
                    <ContentContainer>
                        <CustomInput
                            type='text'
                            className='input'
                            value={editPhoneNumber || ''}
                            onChange={(e) => handleChangeEditPhoneNumber(e)}
                            placeholder={`'-'를 제외한 11자리를 입력해 주세요. ex)01012341234`}
                            minLength={11}
                            maxLength={11}
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
                            onClose={() => onClose()}
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