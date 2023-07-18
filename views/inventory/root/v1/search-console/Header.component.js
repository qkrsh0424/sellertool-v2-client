import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import CustomImage from "../../../../modules/image/CustomImage";
import { Wrapper } from "../styles/Header.styled";

export default function HeaderComponent({
    fieldViewOpen,
    onActionOpenFieldView,
    onActionCloseFieldView
}) {
    return (
        <>
            <Wrapper>
                <div className='title'>상세조회</div>
                {fieldViewOpen ?
                    (
                        <SingleBlockButton
                            type='button'
                            className='dropdown-button-item'
                            onClick={() => onActionCloseFieldView()}
                        >
                            <CustomImage
                                src='/images/icon/arrowDropUp_default_808080.svg'
                            />
                        </SingleBlockButton>
                    )
                    :
                    (
                        <SingleBlockButton
                            type='button'
                            className='dropdown-button-item'
                            onClick={() => onActionOpenFieldView()}
                        >
                            <CustomImage
                                src='/images/icon/arrowDropDown_default_808080.svg'
                            />
                        </SingleBlockButton>
                    )
                }
            </Wrapper>
        </>
    );
}