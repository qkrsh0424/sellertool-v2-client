import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import { Wrapper } from "../style/SubmitButton.styled";

export default function SubmitButtonFieldView({
    handleClearAll
}) {
    return (
        <Wrapper>
            <div className='button-group'>
                <SingleBlockButton
                    type='button'
                    className='button-item'
                    onClick={() => handleClearAll()}
                >
                    초기화
                </SingleBlockButton>
                <SingleBlockButton
                    type='submit'
                    className='button-item'
                    style={{
                        background: 'var(--mainColor)'
                    }}
                >
                    조회
                </SingleBlockButton>
            </div>
        </Wrapper>
    )
}