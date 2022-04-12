import { useState } from "react";
import Ripple from "../../../modules/Ripple";
import { ButtonFieldWrapper, Container, FormFieldWrapper, HeadFieldWrapper } from "./InviteModal.styled";

const InviteModalComponent = (props) => {
    const [disabledBtn, setDisabledBtn] = useState(true);
    return (
        <>
            <Container>
                <HeadFieldWrapper>
                    멤버 초대하기
                </HeadFieldWrapper>
                <FormFieldWrapper>
                    <div className='input-box'>
                        <div className='input-label'>회원 아이디</div>
                        <input
                            className='input-el'
                            placeholder='회원 아이디를 입력해 주세요.'
                        ></input>
                    </div>
                    <div
                        className='check-button-box'
                    >
                        <button
                            type='button'
                            className='check-button-el'
                        >회원 검색</button>
                    </div>
                </FormFieldWrapper>
                <ButtonFieldWrapper>
                    <button
                        type='button'
                        className='button-el'
                        style={{ color: '#ff6961' }}
                    >
                        취소
                        <Ripple color={'#ff696160'} duration={1000}></Ripple>
                    </button>
                    <button
                        type='submit'
                        className='button-el'
                        style={{ color: `${disabledBtn ? '#e0e0e0' : '#2C73D2'}` }}
                        disabled={disabledBtn}
                    >
                        초대
                        {!disabledBtn &&
                            <Ripple color={'#2C73D260'} duration={1000}></Ripple>
                        }
                    </button>
                </ButtonFieldWrapper>
            </Container>
        </>
    );
}
export default InviteModalComponent;