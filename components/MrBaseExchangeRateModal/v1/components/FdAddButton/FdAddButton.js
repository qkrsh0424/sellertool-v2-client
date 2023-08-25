import CustomBlockButton from "../../../../buttons/block-button/v1/CustomBlockButton";
import CustomImage from "../../../../image/CustomImage";
import { St } from "./FdAddButton.styled";

export function FdAddButton({
    onClick
}) {
    return (
        <>
            <St.Container>
                <CustomBlockButton
                    type='button'
                    className='addBtn'
                    onClick={onClick}
                >
                    <CustomImage
                        src={'/images/icon/add_default_ffffff.svg'}
                    />
                </CustomBlockButton>
            </St.Container>
        </>
    );
}