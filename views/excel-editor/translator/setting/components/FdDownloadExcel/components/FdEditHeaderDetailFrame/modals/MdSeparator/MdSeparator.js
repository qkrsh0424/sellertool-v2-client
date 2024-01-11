import CustomBlockButton from "../../../../../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import { CustomDialog } from "../../../../../../../../../../components/dialog/v1/CustomDialog";
import { SeparatorUtils } from "../../../../../../../../utils/SeparatorUtils";
import * as St from './MdSeparator.styled';

export function MdSeparator({
    open,
    onClose,
    currentSeparator,
    onChangeSeparator
}) {
    const separatorUtils = SeparatorUtils();

    const handleSelect = (value) => {
        onChangeSeparator(value);
        onClose();
    }

    return (
        <>
            <CustomDialog
                open={open}
                onClose={() => onClose()}
            >
                <CustomDialog.CloseButton onClose={() => onClose()} />
                <CustomDialog.Title>매핑값 구분자 선택</CustomDialog.Title>
                <St.SeparatorContainer>
                    <div className='wrapper'>
                        {separatorUtils.getValueList()?.map(r => {
                            return (
                                <CustomBlockButton
                                    key={r}
                                    type='button'
                                    className={`${currentSeparator === r ? 'button__isActive' : ''}`}
                                    onClick={() => handleSelect(r)}
                                >
                                    {separatorUtils?.getValueString(r)}
                                </CustomBlockButton>
                            );
                        })}
                    </div>
                </St.SeparatorContainer>
            </CustomDialog >
        </>
    );
}