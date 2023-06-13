import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useDisabledBtn from "../../../../../hooks/button/useDisabledBtn";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import ConfirmModalComponentV2 from "../../../../modules/modal/ConfirmModalComponentV2";
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
    const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);

    const {
        erpcExcelDownloadForm,
        reqUpdateErpcExcelDownloadForm,
        reqDeleteErpcExcelDownloadForm
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
    } = useCreateFormDetailsHook(erpcExcelDownloadForm);

    useEffect(() => {
        if (!erpcExcelDownloadForm?.name) {
            setName('');
            return;
        }

        setName(erpcExcelDownloadForm?.name);
    }, [erpcExcelDownloadForm?.name]);

    useEffect(() => {
        if (!erpcExcelDownloadForm?.description) {
            setDescription('');
            return;
        }

        setDescription(erpcExcelDownloadForm?.description);
    }, [erpcExcelDownloadForm?.description]);

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
            id: erpcExcelDownloadForm?.id,
            name: name,
            description: description,
            erpcExcelDownloadFormDetails: returnSubmitFormat(),
            workspaceId: workspaceRedux?.workspaceInfo?.id
        }

        await reqUpdateErpcExcelDownloadForm(
            body,
            () => {
                router.back();
            }
        );
    }

    const handleOpenDeleteConfirmModal = () => {
        setDeleteConfirmModalOpen(true);
    }

    const handleCloseDeleteConfirmModal = () => {
        setDeleteConfirmModalOpen(false);
    }

    const handleSubmitDelete = async () => {
        let body = {
            id: erpcExcelDownloadForm?.id,
            workspaceId: workspaceRedux?.workspaceInfo?.id
        }

        await reqDeleteErpcExcelDownloadForm(
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
                            <div className='mgl-flex mgl-flex-justifyContent-spaceBetween mgl-flex-alignItems-center'>
                                <div className='title'>다운로드 폼 수정</div>
                                <SingleBlockButton
                                    type='button'
                                    className='delete-button-item'
                                    onClick={() => handleOpenDeleteConfirmModal()}
                                >
                                    삭제
                                </SingleBlockButton>
                            </div>
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

            {deleteConfirmModalOpen &&
                <ConfirmModalComponentV2
                    open={deleteConfirmModalOpen}
                    onClose={handleCloseDeleteConfirmModal}
                    title={'삭제 확인메세지'}
                    message={'현재 뷰헤더를 정말로 삭제 하시겠습니까?'}
                    confirmBtnStyle={{ background: 'var(--defaultRedColor)' }}
                    onConfirm={handleSubmitDelete}
                />
            }
        </>
    );
}