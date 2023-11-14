import CustomBlockButton from "../../../../../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import { St } from "./FdFooterAppBar.styled";

export function FdFooterAppBar({
    onClose
}) {
    return (
        <>
            <St.Container>
                <div className="wrapper">
                    <CustomBlockButton
                        type='button'
                        className='cancel-button'
                        onClick={() => onClose()}
                    >
                        취소
                    </CustomBlockButton>
                    <CustomBlockButton
                        type='button'
                        className='confirm-button'
                    >
                        확인
                    </CustomBlockButton>
                </div>
            </St.Container>
        </>
    );
}