import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import { Wrapper } from "../style/SearchModalBox.styled";

export default function SearchControlFieldView ({
    onActionOpenModal
}) {
    return (
        <Wrapper>
            <SingleBlockButton
                type='button'
                className='button-item'
                onClick={() => onActionOpenModal()}
            >
                순위별 조회
            </SingleBlockButton>
        </Wrapper>
    )
}