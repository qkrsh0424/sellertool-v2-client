import { fieldTypes } from "../../../../../../../static-data/erp-collection-excel-download-form/RefExcelDownloadForm";
import SingleBlockButton from "../../../../../../modules/button/SingleBlockButton";
import CustomImage from "../../../../../../modules/image/CustomImage";
import { Container, ContentWrapper } from "./EditFieldTypeModal.styled";

export default function EditFieldTypeModalComponent({
    targetFormDetail,
    fieldTypes,
    onClose,
    onChangeFieldType
}) {
    const handleChangeFieldType = (value) => {
        onChangeFieldType(value, targetFormDetail?.id);
        onClose();
    }

    return (
        <>
            <Container>
                <div className='header-close-button-box'>
                    <button
                        type='button'
                        className='header-close-button-el'
                        onClick={() => onClose()}
                    >
                        <CustomImage
                            src='/images/icon/close_default_959eae.svg'
                        />
                    </button>
                </div>
                <ContentWrapper>
                    {fieldTypes?.map(fieldType => {
                        return (
                            <SingleBlockButton
                                key={fieldType}
                                type='button'
                                className={`button-item ${targetFormDetail?.fieldType === fieldType ? 'button-item-active' : ''}`}
                                onClick={() => handleChangeFieldType(fieldType)}
                            >
                                {fieldType}
                            </SingleBlockButton>
                        );
                    })}
                </ContentWrapper>
            </Container>
        </>
    );
}