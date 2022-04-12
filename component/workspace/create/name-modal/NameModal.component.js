import { useState } from "react";
import Ripple from "../../../modules/Ripple";
import { ButtonFieldWrapper, Container, FormFieldWrapper, TitleFieldWrapper } from "./NameModal.styled";

const NameModalComponent = (props) => {
    const [disabledBtn, setDisabledBtn] = useState(false);

    const onConfirm = (e) => {
        e.preventDefault();
        if (!props.workspace.name) {
            alert('워크스페이스 이름을 지정해주세요.');
            return;
        }
        setDisabledBtn(true);
        props.onConfirm();
    }
    return (
        <>
            <Container>
                <TitleFieldWrapper>
                    워크스페이스 이름을 지정해주세요.
                </TitleFieldWrapper>
                <form onSubmit={onConfirm}>
                    <FormFieldWrapper>
                        <div className='input-box'>
                            <div className='input-label'>워크스페이스</div>
                            <input
                                type='text'
                                className='input-el'
                                value={props.workspace.name || ''}
                                onChange={props.onChangeName}
                            // required
                            ></input>
                            <div className='input-notice'>
                                {props.workspace.name.length} / 20 자
                            </div>
                        </div>
                    </FormFieldWrapper>
                    <ButtonFieldWrapper>
                        <button
                            type='button'
                            className='button-el'
                            style={{ color: '#ff6961' }}
                            onClick={props.onClose}
                        >
                            취소
                            <Ripple color={'#ff696160'} duration={1000}></Ripple>
                        </button>
                        <button
                            type='submit'
                            className='button-el'
                            style={{ color: '#2C73D2' }}
                            disabled={disabledBtn}
                        >
                            생성
                            <Ripple color={'#2C73D260'} duration={1000}></Ripple>
                        </button>
                    </ButtonFieldWrapper>
                </form>
            </Container>
        </>
    );
}
export default NameModalComponent;