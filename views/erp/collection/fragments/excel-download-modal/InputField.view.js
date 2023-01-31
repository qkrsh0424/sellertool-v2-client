import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import CustomInput from "../../../../modules/input/CustomInput";
import { InputFieldWrapper } from "./ExcelDownloadModal.styled";

const InputFieldView = ({
    onChangeDownloadExcelFileName,
    downloadExcelFileName,
    onActionDownloadExcel
}) => {
    return (
        <>
            <InputFieldWrapper>
                <div className="label">다운로드 엑셀 명</div>
                <div className="mgl-flex">
                    <CustomInput
                        type='text'
                        className='input-el'
                        onChange={onChangeDownloadExcelFileName}
                        value={downloadExcelFileName || ''}
                    />
                    <SingleBlockButton
                        type='button'
                        className='button-item'
                        onClick={() => onActionDownloadExcel()}
                    >
                        엑셀 내려받기
                    </SingleBlockButton>
                </div>
            </InputFieldWrapper>
        </>
    );
}
export default InputFieldView;