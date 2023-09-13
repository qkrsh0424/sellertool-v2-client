import useDisabledBtn from "../../../../../../../../../hooks/button/useDisabledBtn";
import SingleBlockButton from "../../../../../../../../modules/button/SingleBlockButton";
import { Wrapper } from "../styles/CreateField.styled";

export default function CreateFieldView({
    onChagnePageToMain,
    inputValue,
    onChangeInputValue,
    onCreateNRankRecordCategory
}) {
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();

    const handleSubmit = (e) => {
        e.preventDefault();

        setDisabledBtn(true);
        onCreateNRankRecordCategory();
    }

    const onClose = () => {
        onChagnePageToMain()
    }

    return (
        <Wrapper>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className='content-box'>
                    <input
                        className='input-el'
                        name='name'
                        onChange={(e) => onChangeInputValue(e)}
                        value={inputValue || ''}
                        placeholder="카테고리명"
                        required
                    />
                </div>
                <div className='button-group'>
                    <SingleBlockButton
                        type='button'
                        className='button-el'
                        style={{
                            background: '#959eae',
                            flex: 1
                        }}
                        onClick={typeof (onClose) === 'function' ? () => onClose() : () => { ; }}
                    >
                        취소
                    </SingleBlockButton>
                    <SingleBlockButton
                        type='submit'
                        className='button-el'
                        style={{
                            background: 'var(--mainColor)',
                            width: '60%',
                        }}
                        disabled={disabledBtn}
                    >
                        확인
                    </SingleBlockButton>
                </div>
            </form>
        </Wrapper>
    )
}