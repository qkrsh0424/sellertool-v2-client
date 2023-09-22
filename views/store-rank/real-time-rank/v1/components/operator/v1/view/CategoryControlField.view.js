import SingleBlockButton from "../../../../../../../modules/button/SingleBlockButton";
import { Wrapper } from "../styles/CategoryControl.styled";

export function CategoryControlFieldView({
    handleOpenCategoryControlModal
}) {
    return (
        <Wrapper>
            <SingleBlockButton
                className='button-item'
                onClick={() => handleOpenCategoryControlModal()}
            >
                카테고리 설정
            </SingleBlockButton>
        </Wrapper>
    )
}