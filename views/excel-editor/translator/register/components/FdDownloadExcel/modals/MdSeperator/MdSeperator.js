import CustomBlockButton from "../../../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import { CustomDialog } from "../../../../../../../../components/dialog/v1/CustomDialog";
import { SeperatorUtils } from "../../../../../../utils/SeperatorUtils";
import * as St from './MdSeperator.styled';

export function MdSeperator({
    open,
    onClose,
    currentSeperator,
    onChangeSeperator
}) {
    const seperatorUtils = SeperatorUtils();

    const handleSelect = (value) => {
        onChangeSeperator(value);
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
                <St.SeperatorContainer>
                    <div className='wrapper'>
                        {seperatorUtils.getValueList()?.map(r => {
                            return (
                                <CustomBlockButton
                                    key={r}
                                    type='button'
                                    className={`${currentSeperator === r ? 'button__isActive' : ''}`}
                                    onClick={() => handleSelect(r)}
                                >
                                    {seperatorUtils?.getValueString(r)}
                                </CustomBlockButton>
                            );
                        })}
                    </div>
                </St.SeperatorContainer>
            </CustomDialog >
        </>
    );
}