import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import useDisabledBtn from "../../../../../hooks/button/useDisabledBtn";
import FormDetailListComponent from "./form-detail-list/FormDetailList.component";
import useCreateFormDetailsHook from "./hooks/useCreateFormDetailsHook";
import useErpcExcelDownloadFormHook from "./hooks/useErpcExcelDownloadFormHook";
import useRefErpCollectionHeadersHook from "./hooks/useRefErpCollectionHeadersHook";
import { Container, HeadContainer, Wrapper } from "./index.styled";
import NameFieldComponent from "./name-field/NameField.component";
import SubmitFieldComponent from "./submit-field/SubmitField.component";

export default function MainComponent(props) {
    const router = useRouter();
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const {
        reqCreateErpcExcelDownloadForm
    } = useErpcExcelDownloadFormHook();

    const {
        refErpCollectionHeaders,
    } = useRefErpCollectionHeadersHook();

    const {
        createFormDetails,
        onAddFormDetail,
        onDeleteFormDetail,
        onChangeCustomCellName,
        onChangeFieldType,
        onChangeValueSplitter,
        onChangeMergeSplitter,
        onChangeMergeYn,
        onChangeFixedValue,
        onChangeViewDetails,
        checkFormDetailsFormatValid,
        returnSubmitFormat
    } = useCreateFormDetailsHook();


    const handleChangeName = (e) => {
        let value = e.target.value;

        setName(value);
    }

    const handleChangeDescription = (e) => {
        let value = e.target.value;

        setDescription(value);
    }

    const checkNameFormatValid = () => {
        if (name?.length < 1 || name?.length > 20) {
            throw new Error('뷰헤더명은 1-20자로 작성해 주세요.');
        }
    }

    const checkDescriptionFormatValid = () => {
        if (description?.length > 50) {
            throw new Error('설명은 50자 이내로 작성해 주세요.');
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabledBtn(true);
        try {
            checkNameFormatValid();
            checkDescriptionFormatValid();
            checkFormDetailsFormatValid();
        } catch (err) {
            alert(err.message);
            return;
        }

        let body = {
            name: name,
            description: description,
            erpcExcelDownloadFormDetails: returnSubmitFormat(),
            workspaceId: workspaceRedux?.workspaceInfo?.id
        }

        await reqCreateErpcExcelDownloadForm(
            body,
            () => {
                router.back();
            }
        );
    }

    return (
        <>
            <Container>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <Wrapper>
                        <HeadContainer>
                            <div className='title'>다운로드 폼 생성</div>
                        </HeadContainer>
                        <NameFieldComponent
                            name={name}
                            onChangeName={handleChangeName}
                            description={description}
                            onChangeDescription={handleChangeDescription}
                        />
                        <FormDetailListComponent
                            refErpCollectionHeaders={refErpCollectionHeaders}
                            createFormDetails={createFormDetails}
                            onAddFormDetail={onAddFormDetail}
                            onDeleteFormDetail={onDeleteFormDetail}
                            onChangeCustomCellName={onChangeCustomCellName}
                            onChangeFieldType={onChangeFieldType}
                            onChangeValueSplitter={onChangeValueSplitter}
                            onChangeMergeSplitter={onChangeMergeSplitter}
                            onChangeMergeYn={onChangeMergeYn}
                            onChangeFixedValue={onChangeFixedValue}
                            onChangeViewDetails={onChangeViewDetails}
                        />
                    </Wrapper>
                    <SubmitFieldComponent
                        disabledBtn={disabledBtn}
                    />
                </form>
            </Container>
        </>
    );
}