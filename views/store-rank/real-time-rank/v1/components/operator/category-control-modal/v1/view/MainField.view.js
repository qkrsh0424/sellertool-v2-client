import SingleBlockButton from "../../../../../../../../modules/button/SingleBlockButton";
import { Wrapper } from "../styles/MainField.styled";

const PAGE_CONTROL = {
    MAIN: 'main',
    CREATE: 'create',
    EDIT: 'edit',
    DELETE: 'delete'
}

export default function MainFieldView({
    handleChangePage
}) {
    return (
        <Wrapper>
            <div>
                <SingleBlockButton
                    className='button-el'
                    onClick={() => handleChangePage(PAGE_CONTROL.CREATE)}
                >
                    카테고리 생성
                </SingleBlockButton>
            </div>
            <div>
                <SingleBlockButton
                    className='button-el'
                    onClick={() => handleChangePage(PAGE_CONTROL.EDIT)}
                >
                    카테고리 수정
                </SingleBlockButton>
            </div>
            <div>
                <SingleBlockButton
                    className='button-el'
                    onClick={() => handleChangePage(PAGE_CONTROL.DELETE)}
                >
                    카테고리 삭제
                </SingleBlockButton>
            </div>
        </Wrapper>
    )
}