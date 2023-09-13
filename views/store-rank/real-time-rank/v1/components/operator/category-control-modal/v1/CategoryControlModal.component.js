import { useEffect, useState } from "react";
import { CustomDialog } from "../../../../../../../../components/dialog/v1/CustomDialog";
import SingleBlockButton from "../../../../../../../modules/button/SingleBlockButton";
import { Container, Wrapper } from "./styles/CategoryControlModal.styled";
import CreateFieldView from "./view/CreateField.view";
import { useApiHook } from "./hooks/useApiHook";
import { useSelector } from "react-redux";
import { customToast, defaultOptions } from "../../../../../../../../components/toast/custom-react-toastify/v1";
import EditFieldView from "./view/EditField.view";
import DeleteFieldView from "./view/DeleteField.view";
import { customBackdropController } from "../../../../../../../../components/backdrop/default/v1";
import { useCategoryControlHook } from "./hooks/useCategoryControlHook";

const PAGE_CONTROL = {
    MAIN: 'main',
    CREATE: 'create',
    EDIT: 'edit',
    DELETE: 'delete'
}

const customBackdropControl = customBackdropController();

export function CategoryControlModalComponent({
    open,
    onClose
}) {
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const { onReqCreateNRankRecordCategory, onReqSearchNRankRecordCategory, onReqUpdateNRankRecordCategory, onReqDeleteNRankRecordCategory } = useApiHook();
    const { categories, pageControl, inputValue, selectedCategory, onSetCategories, handleChangePage, handleChangePageToMain, handleChangeInputValue, handleChangeSelectedCategory, checkFormat } = useCategoryControlHook(); 

    useEffect(() => {
        if(!wsId) {
            return;
        }

        async function initialize() {
            await handleSearchNRankRecordCategories()
        }

        initialize()
    }, [wsId])

    const handleSearchNRankRecordCategories = async () => {
        await onReqSearchNRankRecordCategory({
            headers: { wsId: wsId }
        }, {
            success: (results) => {
                onSetCategories(results);
            }
        })
    }

    const handleCreateNRankRecordCategory = async () => {
        let body = {
            name: inputValue.trim()
        }

        try {
            checkFormat(body);
        } catch (err) {
            customToast.error(err?.message, {
                ...defaultOptions,
                toastId: err?.message
            })
            return;
        }

        customBackdropControl.showBackdrop();
        await onReqCreateNRankRecordCategory({
            headers: { wsId: wsId },
            body
        }, {
            success: () => {
                handleChangePageToMain();
                handleSearchNRankRecordCategories();
            }
        })
        customBackdropControl.hideBackdrop();
    }

    const handleUpdateNRankRecordCategory = async () => {
        let body = {
            id: selectedCategory.id,
            name: inputValue.trim()
        }

        try {
            checkDuplication(body);
        } catch (err) {
            customToast.error(err?.message, {
                ...defaultOptions,
                toastId: err?.message
            })
            return;
        }

        customBackdropControl.showBackdrop();
        await onReqUpdateNRankRecordCategory({
            headers: { wsId: wsId },
            body
        }, {
            success: () => {
                handleChangePageToMain();
                handleSearchNRankRecordCategories();
            }
        })
        customBackdropControl.hideBackdrop();
    }

    const handleDeleteNRankRecordCategory = async () => {
        customBackdropControl.showBackdrop();
        await onReqDeleteNRankRecordCategory({
            headers: { wsId: wsId },
            params: { id: selectedCategory.id }
        }, {
            success: () => {
                handleChangePageToMain();
                handleSearchNRankRecordCategories();
            }
        })
        customBackdropControl.hideBackdrop();
    }

    return (
        <>
            <CustomDialog
                open={open}
                onClose={() => onClose()}
                maxWidth="xs"
            >
                <CustomDialog.CloseButton onClose={() => onClose()} />
                <CustomDialog.Title>카테고리 설정</CustomDialog.Title>
                <Container>
                    {pageControl === PAGE_CONTROL.MAIN &&
                        <Wrapper>
                            <div>
                                <SingleBlockButton
                                    className='button-el'
                                    onClick={() => handleChangePage(PAGE_CONTROL.CREATE)}
                                >
                                    카테고리 생성
                                </SingleBlockButton>
                            </div>
                            <div>
                                <SingleBlockButton
                                    className='button-el'
                                    onClick={() => handleChangePage(PAGE_CONTROL.EDIT)}
                                >
                                    카테고리 수정
                                </SingleBlockButton>
                            </div>
                            <div>
                                <SingleBlockButton
                                    className='button-el'
                                    onClick={() => handleChangePage(PAGE_CONTROL.DELETE)}
                                >
                                    카테고리 삭제
                                </SingleBlockButton>
                            </div>
                        </Wrapper>
                    }
                    {pageControl === PAGE_CONTROL.CREATE &&
                        <CreateFieldView
                            inputValue={inputValue}
                            onChagnePageToMain={handleChangePageToMain}
                            onChangeInputValue={handleChangeInputValue}
                            onCreateNRankRecordCategory={handleCreateNRankRecordCategory}
                        />
                    }
                    {pageControl === PAGE_CONTROL.EDIT &&
                        <EditFieldView
                            categories={categories}
                            inputValue={inputValue}
                            selectedCategory={selectedCategory}
                            onChagnePageToMain={handleChangePageToMain}
                            onChangeInputValue={handleChangeInputValue}
                            onChangeSelectedCategory={handleChangeSelectedCategory}
                            onUpdateNRankRecordCategory={handleUpdateNRankRecordCategory}
                        />
                    }
                    {pageControl === PAGE_CONTROL.DELETE && 
                        <DeleteFieldView
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onChagnePageToMain={handleChangePageToMain}
                            onChangeSelectedCategory={handleChangeSelectedCategory}
                            onDeleteNRankRecordCategory={handleDeleteNRankRecordCategory}
                        />
                    }
                </Container>
            </CustomDialog>
        </>
    )
}
