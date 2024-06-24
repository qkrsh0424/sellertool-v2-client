import { useState } from "react";
import { CustomDialog } from "../../../../../../../../components/dialog/v1/CustomDialog";
import CustomInput from "../../../../../../../../components/input/default/v1/CustomInput";
import * as St from './MdBulkUpdateForTargetFieldName.styled';
import StaticValues from "./config/StaticValues";

const FIELD_VALUES = StaticValues.ORDER_INFO_HEADERS.concat(StaticValues.RECEIEVR_INFO_HEADERS).concat(StaticValues.MANAGEMENT_MEMO_HEADERS);
export function MdBulkUpdateForTargetFieldName({
    open,
    onChangeBulkUpdateTargetFieldName,
    targetFieldName,
    onChangeFieldNameAll
}) {
    const targetFieldValue = FIELD_VALUES.find(r => r.name === targetFieldName);

    const [inputValue, setInputValue] = useState('');

    const handleModalClose = () => {
        onChangeBulkUpdateTargetFieldName(null);
    }

    const handleChangeInputValue = (e) => {
        let value = e.target.value;

        setInputValue(value);
    }

    const handleConfirm = () => {
        onChangeFieldNameAll(inputValue, targetFieldName);
        handleModalClose();
    }

    return (
        <>
            <CustomDialog
                open={open}
                onClose={() => handleModalClose(null)}
            >
                <CustomDialog.CloseButton onClose={() => handleModalClose(null)} />
                <St.BodyContainer>
                    <CustomInput
                        type={targetFieldValue.valueType === 'number' ? 'number' : 'text'}
                        placeholder={`${targetFieldValue?.headerName}을 입력하세요.`}
                        value={inputValue || ''}
                        onChange={(e) => handleChangeInputValue(e)}
                    />
                </St.BodyContainer>
                <CustomDialog.FooterButtonGroup isFlex>
                    <CustomDialog.FooterButton backgroundColor={'var(--defaultModalCloseColor)'} fontColor={'#fff'} width={'40%'} onClick={() => handleModalClose()}>취소</CustomDialog.FooterButton>
                    <CustomDialog.FooterButton backgroundColor={'var(--mainColor)'} fontColor={'#fff'} flex={1} onClick={() => handleConfirm()}>적용</CustomDialog.FooterButton>
                </CustomDialog.FooterButtonGroup>
            </CustomDialog>
        </>
    );
}