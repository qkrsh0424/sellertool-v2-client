import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import SingleBlockButton from "../../../modules/button/SingleBlockButton";
import CommonModalComponent from "../../../modules/modal/CommonModalComponent";
import ConfirmModalComponentV2 from "../../../modules/modal/ConfirmModalComponentV2";
import CustomSelect from "../../../modules/select/CustomSelect";
import useProductSubCategoriesHook from "../hooks/useProductSubCategoriesHook";
import ModifyCategoryNameModalComponent from "./modal/ModifyCategoryNameModal.component";
import ModifySubCategoryNameModalComponent from "./modal/ModifySubCategoryNameModal.component";
import SelectCategoryModalComponent from "./modal/SelectCategoryModal.component";
import SelectSubCategoryModalComponent from "./modal/SelectSubCategoryModal.component";
import SettingCategoryModalComponent from "./modal/SettingCategoryModal.component";
import SettingSubCategoryModalComponent from "./modal/SettingSubCategoryModal.component";
import { CategoryWrapper, Container, ContentWrapper, LinkButton, SearchButtonWrapper, SearchConsoleWrapper, Title } from "./styles/SearchField.styled";

export default function SearchFieldComponent({
    productCategories,
    productCategory,
    onSubmitModifyProductCategoryName,
    onSubmitDeleteProductCategory
}) {
    const router = useRouter();

    const [selectCategoryModalOpen, setSelectCategoryModalOpen] = useState(false);
    const [settingCategoryModalOpen, setSettingCategoryModalOpen] = useState(false);
    const [modifyCategoryNameModalOpen, setModifyCategoryNameModalOpen] = useState(false);
    const [deleteCategoryModalOpen, setDeleteCategoryModalOpen] = useState(false);

    const [selectSubCategoryModalOpen, setSelectSubCategoryModalOpen] = useState(false);
    const [settingSubCategoryModalOpen, setSettingSubCategoryModalOpen] = useState(false);
    const [modifySubCategoryNameModalOpen, setModifySubCategoryNameModalOpen] = useState(false);
    const [deleteSubCategoryModalOpen, setDeleteSubCategoryModalOpen] = useState(false);

    const {
        productSubCategories,
        productSubCategory,
        reqChangeName,
        reqDeleteProductSubCategory
    } = useProductSubCategoriesHook({
        productCategory
    });

    const __handle = {
        action: {
            openSelectCategoryModal: () => {
                setSelectCategoryModalOpen(true);
            },
            closeSelectCategoryModal: () => {
                setSelectCategoryModalOpen(false);
            },
            openSettingCategoryModal: () => {
                if (!productCategory) {
                    alert('카테고리를 먼저 선택해 주세요.');
                    return;
                }
                setSettingCategoryModalOpen(true);
            },
            closeSettingCategoryModal: () => {
                setSettingCategoryModalOpen(false);
            },
            openModifyCategoryNameModal: () => {
                __handle.action.closeSettingCategoryModal();
                if (!productCategory) {
                    alert('카테고리를 먼저 선택해 주세요.');
                    return;
                }

                setModifyCategoryNameModalOpen(true);
            },
            closeModifyCategoryNameModal: () => {
                setModifyCategoryNameModalOpen(false);
            },
            openDeleteCategoryModal: () => {
                __handle.action.closeSettingCategoryModal();
                if (!productCategory) {
                    alert('카테고리를 먼저 선택해 주세요.');
                    return;
                }
                setDeleteCategoryModalOpen(true);
            },
            closeDeleteCategoryModal: () => {
                setDeleteCategoryModalOpen(false);
            },
            openSelectSubCategoryModal: () => {
                setSelectSubCategoryModalOpen(true);
            },
            closeSelectSubCategoryModal: () => {
                setSelectSubCategoryModalOpen(false);
            },
            openSettingSubCategoryModal: () => {
                if (!productSubCategory) {
                    alert('서브 카테고리를 먼저 선택해 주세요.');
                    return;
                }
                setSettingSubCategoryModalOpen(true);
            },
            closeSettingSubCategoryModal: () => {
                setSettingSubCategoryModalOpen(false);
            },
            openModifySubCategoryNameModal: () => {
                __handle.action.closeSettingSubCategoryModal();
                if (!productSubCategory) {
                    alert('서브 카테고리를 먼저 선택해 주세요.');
                    return;
                }

                setModifySubCategoryNameModalOpen(true);
            },
            closeModifySubCategoryNameModal: () => {
                setModifySubCategoryNameModalOpen(false);
            },
            openDeleteSubCategoryModal: () => {
                __handle.action.closeSettingSubCategoryModal();
                if (!productSubCategory) {
                    alert('카테고리를 먼저 선택해 주세요.');
                    return;
                }
                setDeleteSubCategoryModalOpen(true);
            },
            closeDeleteSubCategoryModal: () => {
                setDeleteSubCategoryModalOpen(false);
            },
        },
        submit: {
            modifyProductCategoryName: (name) => {
                if (!productCategory) {
                    alert('카테고리를 먼저 선택해 주세요.');
                    return;
                }

                let body = {
                    productCategoryId: productCategory.id,
                    name: name
                }

                onSubmitModifyProductCategoryName({
                    body: body,
                    successCallback: () => {
                        __handle.action.closeModifyCategoryNameModal();
                    }
                })
            },
            deleteProductCategory: () => {
                if (!productCategory) {
                    alert('카테고리를 먼저 선택해 주세요.');
                    return;
                }

                let body = {
                    productCategoryId: productCategory.id
                }

                onSubmitDeleteProductCategory({
                    body: body,
                    successCallback: () => {
                        __handle.action.closeDeleteCategoryModal()
                    }
                });
            },
            modifyProductSubCategoryName: async (name) => {
                if (!productSubCategory) {
                    alert('서브 카테고리를 먼저 선택해 주세요.');
                    return;
                }

                let body = {
                    productSubCategoryId: productSubCategory.id,
                    name: name
                }

                await reqChangeName({
                    body: body,
                    successCallback: () => {
                        __handle.action.closeModifySubCategoryNameModal();
                    }
                })
            },
            deleteProductSubCategory: async () => {
                if (!productSubCategory) {
                    alert('서브 카테고리를 먼저 선택해 주세요.');
                    return;
                }

                let body = {
                    productSubCategoryId: productSubCategory.id
                }

                await reqDeleteProductSubCategory({
                    body: body,
                    successCallback: () => {
                        __handle.action.closeDeleteSubCategoryModal();
                        let newQuery = { ...router.query };
                        delete newQuery.productSubCategoryId;

                        router.replace({
                            pathname: router.pathname,
                            query: { ...newQuery }
                        })
                    }
                });
            },
        }
    }

    return (
        <>
            <Container>
                <Title>
                    상품조회
                </Title>
                <ContentWrapper>
                    <CategoryWrapper>
                        <div className='group'>
                            <div className='title'>카테고리</div>
                            <div className='mgl-flex'>
                                <SingleBlockButton
                                    type='button'
                                    className='select-button'
                                    onClick={() => __handle.action.openSelectCategoryModal()}
                                >
                                    {productCategory?.name || '전체'}
                                </SingleBlockButton>
                                {productCategory &&
                                    (
                                        <SingleBlockButton
                                            type='button'
                                            className='icon-button'
                                            onClick={() => __handle.action.openSettingCategoryModal()}
                                        >
                                            <div
                                                className='icon-figure'
                                            >
                                                <Image
                                                    loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                                    src='/images/icon/settings_default_808080.svg'
                                                    layout='responsive'
                                                    width={1}
                                                    height={1}
                                                    objectFit={'cover'}
                                                    alt='image'
                                                    loading='lazy'
                                                ></Image>
                                            </div>
                                        </SingleBlockButton>
                                    )
                                }
                            </div>
                        </div>
                        <div className='group'>
                            <div className='title'>서브 카테고리</div>
                            <div className='mgl-flex'>
                                <SingleBlockButton
                                    type='button'
                                    className='select-button'
                                    onClick={() => __handle.action.openSelectSubCategoryModal()}
                                >
                                    {productSubCategory?.name || '전체'}
                                </SingleBlockButton>
                                {productSubCategory &&
                                    (
                                        <SingleBlockButton
                                            type='button'
                                            className='icon-button'
                                            onClick={() => __handle.action.openSettingSubCategoryModal()}
                                        >
                                            <div
                                                className='icon-figure'
                                            >
                                                <Image
                                                    loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                                    src='/images/icon/settings_default_808080.svg'
                                                    layout='responsive'
                                                    width={1}
                                                    height={1}
                                                    objectFit={'cover'}
                                                    alt='image'
                                                    loading='lazy'
                                                ></Image>
                                            </div>
                                        </SingleBlockButton>
                                    )
                                }
                            </div>
                        </div>
                    </CategoryWrapper>
                    <SearchConsoleWrapper>
                        <div className='title'>조회 조건</div>
                        <CustomSelect
                            className='select-button'
                        >
                            <option>선택</option>
                            <option>상품명</option>
                            <option>옵션명</option>
                            <option>상품코드</option>
                            <option>옵션코드</option>
                        </CustomSelect>
                        <div className='input-box'>
                            <input
                                type='text'
                                className='input-el'
                                placeholder="검색어를 입력하세요."
                            ></input>
                        </div>
                        <SingleBlockButton
                            type='button'
                            className='search-button'
                        >
                            조회
                        </SingleBlockButton>
                    </SearchConsoleWrapper>
                </ContentWrapper>
            </Container>

            {selectCategoryModalOpen &&
                (
                    <CommonModalComponent
                        open={selectCategoryModalOpen}

                        onClose={__handle.action.closeSelectCategoryModal}
                    >
                        <SelectCategoryModalComponent
                            productCategory={productCategory}
                            productCategories={productCategories}
                            onClose={__handle.action.closeSelectCategoryModal}
                        />
                    </CommonModalComponent>
                )
            }

            {settingCategoryModalOpen &&
                (
                    <CommonModalComponent
                        open={settingCategoryModalOpen}

                        onClose={__handle.action.closeSettingCategoryModal}
                    >
                        <SettingCategoryModalComponent
                            onActionOpenModifyCategoryNameModal={__handle.action.openModifyCategoryNameModal}
                            onActionOpenDeleteCategoryModal={__handle.action.openDeleteCategoryModal}
                            onClose={__handle.action.closeSettingCategoryModal}
                        />
                    </CommonModalComponent>
                )
            }

            {modifyCategoryNameModalOpen &&
                (
                    <CommonModalComponent
                        open={modifyCategoryNameModalOpen}

                        onClose={__handle.action.closeModifyCategoryNameModal}
                    >
                        <ModifyCategoryNameModalComponent
                            productCategory={productCategory}
                            onClose={__handle.action.closeModifyCategoryNameModal}
                            onConfirm={__handle.submit.modifyProductCategoryName}
                        />
                    </CommonModalComponent>
                )
            }

            {deleteCategoryModalOpen &&
                (
                    <ConfirmModalComponentV2
                        open={deleteCategoryModalOpen}
                        onClose={__handle.action.closeDeleteCategoryModal}
                        message={
                            (
                                <>
                                    <div>카테고리를 삭제하면 <span style={{ color: 'var(--defaultRedColor)' }}>하위 데이터(서브 카테고리, 상품, 상품옵션 등)도 모두 삭제됩니다.</span></div>
                                    <div>정말로 해당 카테고리를 삭제하시겠습니까?</div>
                                </>
                            )
                        }
                        confirmBtnStyle={{
                            background: 'var(--defaultRedColor)',
                            width: '40%'
                        }}
                        onConfirm={() => __handle.submit.deleteProductCategory()}
                    />
                )
            }

            {selectSubCategoryModalOpen &&
                (
                    <CommonModalComponent
                        open={selectSubCategoryModalOpen}

                        onClose={__handle.action.closeSelectSubCategoryModal}
                    >
                        <SelectSubCategoryModalComponent
                            category={productSubCategory}
                            categories={productSubCategories}
                            onClose={__handle.action.closeSelectSubCategoryModal}
                        />
                    </CommonModalComponent>
                )
            }

            {settingSubCategoryModalOpen &&
                (
                    <CommonModalComponent
                        open={settingSubCategoryModalOpen}

                        onClose={__handle.action.closeSettingSubCategoryModal}
                    >
                        <SettingSubCategoryModalComponent
                            onActionOpenModifySubCategoryNameModal={__handle.action.openModifySubCategoryNameModal}
                            onActionOpenDeleteSubCategoryModal={__handle.action.openDeleteSubCategoryModal}
                            onClose={__handle.action.closeSettingSubCategoryModal}
                        />
                    </CommonModalComponent>
                )
            }

            {modifySubCategoryNameModalOpen &&
                (
                    <CommonModalComponent
                        open={modifySubCategoryNameModalOpen}

                        onClose={__handle.action.closeModifySubCategoryNameModal}
                    >
                        <ModifySubCategoryNameModalComponent
                            productCategories={productCategories}
                            productSubCategory={productSubCategory}
                            onClose={__handle.action.closeModifySubCategoryNameModal}
                            onConfirm={__handle.submit.modifyProductSubCategoryName}
                        />
                    </CommonModalComponent>
                )
            }

            {deleteSubCategoryModalOpen &&
                (
                    <ConfirmModalComponentV2
                        open={deleteSubCategoryModalOpen}
                        onClose={__handle.action.closeDeleteSubCategoryModal}
                        message={
                            (
                                <>
                                    <div>서브 카테고리를 삭제하면 <span style={{ color: 'var(--defaultRedColor)' }}>하위 데이터(상품, 상품옵션 등)도 모두 삭제됩니다.</span></div>
                                    <div>정말로 해당 카테고리를 삭제하시겠습니까?</div>
                                </>
                            )
                        }
                        confirmBtnStyle={{
                            background: 'var(--defaultRedColor)',
                            width: '40%'
                        }}
                        onConfirm={() => __handle.submit.deleteProductSubCategory()}
                    />
                )
            }
        </>
    );
}