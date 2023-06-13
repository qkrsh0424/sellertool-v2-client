import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import SingleBlockButton from "../../modules/button/SingleBlockButton";
import CommonModalComponent from "../../modules/modal/CommonModalComponent";
import ConfirmModalComponentV2 from "../../modules/modal/ConfirmModalComponentV2";
import CustomSelect from "../../modules/select/CustomSelect";
import CreateExcelTranslatorHeaderModalComponent from "./modal/CreateExcelTranslatorHeaderModal.component";
import ModifyExcelTranslatorHeaderModalComponent from "./modal/ModifyExcelTranslatorHeaderModal.component";
import ModifyViewExcelTranslatorHeadersModalComponent from "./modal/ModifyViewExcelTranslatorHeadersModal.component";
import { ButtonGroup, Container, ContentWrapper, SelectBox, SettingGroup, Title, Wrapper } from "./styles/HeaderSelector.styled";

export default function HeaderSelectorComponent({
    excelTranslatorHeaders,
    excelTranslatorHeader,
    viewExcelTranslatorHeaderIds,
    onSubmitCreateExcelTranslatorHeader,
    onSubmitModifyExcelTranslatorHeader,
    onSubmitDeleteExcelTranslatorHeader,
    onSubmitModifyViewExcelTranslatorHeaderIds
}) {
    const router = useRouter();
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const [createExcelTranslatorHeaderModalOpen, setCreateExcelTranslatorHeaderModalOpen] = useState(false);
    const [modifyExcelTranslatorHeaderModalOpen, setModifyExcelTranslatorHeaderModalOpen] = useState(false);
    const [deleteExcelTranslatorHeaderModalOpen, setDeleteExcelTranslatorHeaderModalOpen] = useState(false);
    const [modifyViewExcelTranslatorHeadersModalOpen, setModifyViewExcelTranslatorHeadersModalOpen] = useState(false);

    const __handle = {
        action: {
            openCreateExcelTranslatorHeaderModal: () => {
                setCreateExcelTranslatorHeaderModalOpen(true);
            },
            closeCreateExcelTranslatorHeaderModal: () => {
                setCreateExcelTranslatorHeaderModalOpen(false);
            },
            openModifyExcelTranslatorHeaderModal: () => {
                setModifyExcelTranslatorHeaderModalOpen(true);
            },
            closeModifyExcelTranslatorHeaderModal: () => {
                setModifyExcelTranslatorHeaderModalOpen(false);
            },
            openDeleteExcelTranslatorHeaderModal: () => {
                setDeleteExcelTranslatorHeaderModalOpen(true);
            },
            closeDeleteExcelTranslatorHeaderModal: () => {
                setDeleteExcelTranslatorHeaderModalOpen(false);
            },
            openModifyViewExcelTranslatorHeadersModal: () => {
                setModifyViewExcelTranslatorHeadersModalOpen(true);
            },
            closeModifyViewExcelTranslatorHeadersModal: () => {
                setModifyViewExcelTranslatorHeadersModalOpen(false);
            },
            selectExcelTranslator: (e) => {
                let value = e.target.value;

                if (!value) {
                    router.replace({
                        pathname: router.pathname,
                        query: {}
                    })
                    return;
                }

                router.replace({
                    pathname: router.pathname,
                    query: {
                        ...router.query,
                        excelTranslatorHeaderId: value
                    }
                })
            }
        },
        submit: {
            createExcelTranslatorHeader: (form) => {
                if (!workspaceRedux?.workspaceInfo) {
                    return;
                }

                let body = {
                    ...form,
                }

                onSubmitCreateExcelTranslatorHeader({
                    body: body,
                    successCallback: () => {
                        __handle.action.closeCreateExcelTranslatorHeaderModal();
                    }
                })
            },
            modifyExcelTranslatorHeader: (form) => {
                if (!workspaceRedux?.workspaceInfo) {
                    return;
                }

                let body = {
                    ...form
                }

                onSubmitModifyExcelTranslatorHeader({
                    body: body,
                    successCallback: () => {
                        __handle.action.closeModifyExcelTranslatorHeaderModal();
                    }
                })
            },
            deleteExcelTranslatorHeader: () => {
                if (!workspaceRedux?.workspaceInfo) {
                    return;
                }

                let body = {
                    id: excelTranslatorHeader?.id
                }

                onSubmitDeleteExcelTranslatorHeader({
                    body: body,
                    successCallback: () => {
                        __handle.action.closeDeleteExcelTranslatorHeaderModal();
                        router.replace({
                            pathname: router.pathname,
                            query: {}
                        })
                    }
                })
            },
            modifyViewExcelTranslatorHeaderIds: (form) => {
                let body = [...form];

                onSubmitModifyViewExcelTranslatorHeaderIds({
                    body: body,
                    successCallback: () => {
                        __handle.action.closeModifyViewExcelTranslatorHeadersModal();
                    }
                })
            }
        }
    }

    return (
        <>
            <Container>
                <Wrapper>
                    <Title>엑셀 헤더 선택</Title>
                    <ContentWrapper className='mgl-flex mgl-flex-justifyContent-spaceBetween mgl-flex-alignItems-center'>
                        <SettingGroup className='mgl-flex mgl-flex-alignItems-center'>
                            <SelectBox>
                                <CustomSelect
                                    className='select'
                                    onChange={(e) => __handle.action.selectExcelTranslator(e)}
                                    value={router?.query?.excelTranslatorHeaderId || ''}
                                >
                                    <option value=''>선택</option>
                                    {viewExcelTranslatorHeaderIds?.map(r => {
                                        let data = excelTranslatorHeaders?.find(r2 => r2.id === r);

                                        if (data) {
                                            return (
                                                <option
                                                    key={data.id}
                                                    value={data.id}
                                                >{data.uploadHeaderTitle} &gt; {data.downloadHeaderTitle}</option>
                                            );
                                        }
                                    })}
                                </CustomSelect>
                            </SelectBox>
                            <SingleBlockButton
                                type='button'
                                className='icon-button'
                                onClick={() => __handle.action.openModifyViewExcelTranslatorHeadersModal()}
                            >
                                <div className='button-icon-figure'>
                                    <Image
                                        loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                        src={'/images/icon/settings_default_808080.svg'}
                                        layout='responsive'
                                        width={1}
                                        height={1}
                                        objectFit={'cover'}
                                        alt='image'
                                        loading='lazy'
                                    ></Image>
                                </div>
                            </SingleBlockButton>
                        </SettingGroup>
                        <ButtonGroup className='mgl-flex'>
                            <SingleBlockButton
                                type='button'
                                className='icon-button'
                                onClick={() => __handle.action.openCreateExcelTranslatorHeaderModal()}
                            >
                                <div className='button-icon-figure'>
                                    <Image
                                        loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                        src={'/images/icon/add_default_808080.svg'}
                                        layout='responsive'
                                        width={1}
                                        height={1}
                                        objectFit={'cover'}
                                        alt='image'
                                        loading='lazy'
                                    ></Image>
                                </div>
                            </SingleBlockButton>

                            {excelTranslatorHeader &&
                                (
                                    <>
                                        <SingleBlockButton
                                            type='button'
                                            className='icon-button'
                                            onClick={() => __handle.action.openModifyExcelTranslatorHeaderModal()}
                                        >
                                            <div className='button-icon-figure'>
                                                <Image
                                                    loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                                    src={'/images/icon/rename_default_808080.svg'}
                                                    layout='responsive'
                                                    width={1}
                                                    height={1}
                                                    objectFit={'cover'}
                                                    alt='image'
                                                    loading='lazy'
                                                ></Image>
                                            </div>
                                        </SingleBlockButton>
                                        <SingleBlockButton
                                            type='button'
                                            className='icon-button'
                                            onClick={() => __handle.action.openDeleteExcelTranslatorHeaderModal()}
                                        >
                                            <div className='button-icon-figure'>
                                                <Image
                                                    loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                                    src={'/images/icon/delete_default_e56767.svg'}
                                                    layout='responsive'
                                                    width={1}
                                                    height={1}
                                                    objectFit={'cover'}
                                                    alt='image'
                                                    loading='lazy'
                                                ></Image>
                                            </div>
                                        </SingleBlockButton>
                                    </>
                                )
                            }
                        </ButtonGroup>
                    </ContentWrapper>
                </Wrapper>
            </Container>

            {createExcelTranslatorHeaderModalOpen &&
                (
                    <CommonModalComponent
                        open={createExcelTranslatorHeaderModalOpen}

                        onClose={__handle.action.closeCreateExcelTranslatorHeaderModal}
                    >
                        <CreateExcelTranslatorHeaderModalComponent
                            onClose={__handle.action.closeCreateExcelTranslatorHeaderModal}
                            onConfirm={__handle.submit.createExcelTranslatorHeader}
                        />
                    </CommonModalComponent>
                )
            }

            {modifyExcelTranslatorHeaderModalOpen &&
                (
                    <CommonModalComponent
                        open={modifyExcelTranslatorHeaderModalOpen}

                        onClose={__handle.action.closeModifyExcelTranslatorHeaderModal}
                    >
                        <ModifyExcelTranslatorHeaderModalComponent
                            excelTranslatorHeader={excelTranslatorHeader}
                            onClose={__handle.action.closeModifyExcelTranslatorHeaderModal}
                            onConfirm={__handle.submit.modifyExcelTranslatorHeader}
                        />
                    </CommonModalComponent>
                )
            }

            {deleteExcelTranslatorHeaderModalOpen &&
                (
                    <ConfirmModalComponentV2
                        open={deleteExcelTranslatorHeaderModalOpen}

                        onClose={__handle.action.closeDeleteExcelTranslatorHeaderModal}
                        onConfirm={__handle.submit.deleteExcelTranslatorHeader}
                        title={(
                            <>
                                엑셀 변환기 <span style={{ color: 'var(--mainColor)' }}>삭제</span> 확인 메세지
                            </>
                        )}
                        message={`해당 엑셀 변환기를 정말로 삭제하시겠습니까?`}
                    />
                )
            }
            {modifyViewExcelTranslatorHeadersModalOpen &&
                (
                    <CommonModalComponent
                        open={modifyViewExcelTranslatorHeadersModalOpen}
                        maxWidth={'md'}

                        onClose={__handle.action.closeModifyViewExcelTranslatorHeadersModal}
                    >
                        <ModifyViewExcelTranslatorHeadersModalComponent
                            excelTranslatorHeaders={excelTranslatorHeaders}
                            viewExcelTranslatorHeaderIds={viewExcelTranslatorHeaderIds}

                            onClose={__handle.action.closeModifyViewExcelTranslatorHeadersModal}
                            onConfirm={__handle.submit.modifyViewExcelTranslatorHeaderIds}
                        />
                    </CommonModalComponent>
                )
            }
        </>
    );
}