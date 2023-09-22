import styled from "styled-components"
import useDisabledBtn from "../../../../../../../../hooks/button/useDisabledBtn";
import SingleBlockButton from "../../../../../../../modules/button/SingleBlockButton";

const ButtonGroup = styled.div`
    margin-top: 40px;
    display: flex;

    .button-el{
        margin:0;
        padding:0;
        height: 48px;
        border:none;
        color:#fff;
        font-size: 18px;
        font-weight: 500;
    }
`;

export function CustomCancelConfirmButton({
    onCancel,
    onConfirm,
    confirmBtnStyle,
    ...props
}) {
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();

    const handleActionCancel = () => {
        onCancel();
    }

    const handleActionConfirm = (e) => {
        e.preventDefault();

        setDisabledBtn(true);
        onConfirm();
    }

    return (
        <ButtonGroup {...props} >
            <SingleBlockButton
                type='button'
                className='button-el'
                style={{
                    background: '#959eae',
                    flex: 1
                }}
                onClick={typeof (onCancel) === 'function' ? () => handleActionCancel() : () => { ; }}
            >
                취소
            </SingleBlockButton>
            <SingleBlockButton
                type='button'
                className='button-el'
                style={{
                    background: 'var(--mainColor)',
                    width: '60%',
                    ...confirmBtnStyle
                }}
                onClick={typeof (onConfirm) === 'function' ? (e) => handleActionConfirm(e) : () => { ; }}
                disabled={disabledBtn}
            >
                확인
            </SingleBlockButton>
        </ButtonGroup>
    )
}