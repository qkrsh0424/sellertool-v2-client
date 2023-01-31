import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';
import CommonModalComponent from '../../../modules/modal/CommonModalComponent';
import LineBreakerBottom from '../../../modules/fragment/LineBreakerBottom';
import Ripple from '../../../modules/button/Ripple';
import { CategoryModalWrapper, CategorySelectorFieldWrapper, Container, SelectedCategoryFieldWrapper } from './Category.styled';
import ConfirmModalComponent from '../../../modules/modal/ConfirmModalComponent';

export default function CategoryComponent(props) {
    const router = useRouter();

    const [newCategory, dispatchNewCategory] = useReducer(newCategoryReducer, initialNewCategory);
    const [editCategory, dispatchEditCategory] = useReducer(editCategoryReducer, initialEditCategory);

    const [addNewCategoryModalOpen, setAddNewCategoryModalOpen] = useState(false);
    const [editCategoryModalOpen, setEditCategoryModalOpen] = useState(false);
    const [deleteCategoryModalOpen, setDeleteCategoryModalOpen] = useState(false);
    const [disabledBtn, setDisabledBtn] = useState(false);

    useEffect(() => {
        if (!disabledBtn) {
            return;
        }

        let timeout = setTimeout(() => {
            setDisabledBtn(false);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [disabledBtn]);

    const __category = {
        action: {
            openAddModal: () => {
                setAddNewCategoryModalOpen(true);
            },
            closeAddModal: () => {
                setAddNewCategoryModalOpen(false);
                dispatchNewCategory({
                    type: 'CLEAR'
                })
            },
            openEditModal: () => {
                if (!props.category) {
                    return;
                }
                dispatchEditCategory({
                    type: 'SET_DATA',
                    payload: props.category
                });
                setEditCategoryModalOpen(true);
            },
            closeEditModal: () => {
                setEditCategoryModalOpen(false);
                dispatchEditCategory({
                    type: 'CLEAR'
                })
            },
            confirmAdd: (e) => {
                e.preventDefault();
                setDisabledBtn(true);
                props.onSubmitAddCategory(newCategory);
                __category.action.closeAddModal();
            },
            confirmEdit: (e) => {
                e.preventDefault();
                setDisabledBtn(true);
                props.onSubmitEditCategory(editCategory);
                __category.action.closeEditModal();
            },
            select: (e) => {
                let categoryId = e.target.value;

                if (categoryId) {
                    router.replace(
                        {
                            pathname: router.pathname,
                            query: {
                                ...router.query,
                                cId: categoryId
                            }
                        },
                        undefined,
                        {}
                    )
                } else {
                    delete router.query.cId
                    router.replace(
                        {
                            pathname: router.pathname,
                            query: {
                                ...router.query
                            }
                        },
                        undefined,
                        {}
                    )
                }
            },
            openDeleteModal: () => {
                setDeleteCategoryModalOpen(true);
            },
            closeDeleteModal: () => {
                setDeleteCategoryModalOpen(false);
            },
            confirmDelete: () => {
                setDisabledBtn(true);
                props.onSubmitDeleteCategory();
                __category.action.closeDeleteModal();
            }
        },
        change: {
            newCategoryValueOfName: (e) => {
                let name = e.target.name;
                let value = e.target.value;

                dispatchNewCategory({
                    type: 'CHANGE_DATA',
                    payload: {
                        name: name,
                        value: value
                    }
                })
            },
            editCategoryValueOfName: (e) => {
                let name = e.target.name;
                let value = e.target.value;

                dispatchEditCategory({
                    type: 'CHANGE_DATA',
                    payload: {
                        name: name,
                        value: value
                    }
                })
            }
        }
    }

    return (
        <>
            <Container>
                <CategorySelectorField
                    categories={props.categories}
                    category={props.category}
                    onActionSelect={__category.action.select}
                    onActionOpenAddModal={__category.action.openAddModal}
                />
                {props.category &&
                    <>
                        <SelectedCategoryField
                            category={props.category}
                            onActionOpenEditModal={__category.action.openEditModal}
                            onActionDelete={__category.action.openDeleteModal}
                            disabledBtn={disabledBtn}
                        />
                        <LineBreakerBottom
                            gapTop={30}
                        />
                    </>
                }
            </Container>

            {/* Modal */}
            {/* Add Category Modal */}
            {(addNewCategoryModalOpen && newCategory) &&
                <CommonModalComponent
                    open={addNewCategoryModalOpen}

                    onClose={__category.action.closeAddModal}
                >
                    <AddCategoryModal
                        category={newCategory}
                        onChangeValueOfName={__category.change.newCategoryValueOfName}
                        disabledBtn={disabledBtn}

                        onConfirm={__category.action.confirmAdd}
                        onClose={__category.action.closeAddModal}
                    />
                </CommonModalComponent>
            }

            {/* Edit Category Modal */}
            {(editCategoryModalOpen && editCategory) &&
                <CommonModalComponent
                    open={editCategoryModalOpen}

                    onClose={__category.action.closeEditModal}
                >
                    <EditCategoryModal
                        category={editCategory}
                        onChangeValueOfName={__category.change.editCategoryValueOfName}
                        disabledBtn={disabledBtn}

                        onConfirm={__category.action.confirmEdit}
                        onClose={__category.action.closeEditModal}
                    />
                </CommonModalComponent>
            }

            <ConfirmModalComponent
                open={deleteCategoryModalOpen}
                message={
                    (
                        <>
                            <div>연관된 상품 및 옵션 등 하위 데이터들도 모두 삭제 됩니다.</div>
                            <div>해당 카테고리를 정말로 삭제 하시겠습니까?</div>
                        </>
                    )
                }
                onClose={__category.action.closeDeleteModal}
                onConfirm={__category.action.confirmDelete}
            />
        </>
    );
}

const initialNewCategory = {
    name: ''
};

const initialEditCategory = null;

const newCategoryReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CHANGE_DATA':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case 'CLEAR':
            return initialNewCategory;
        default: return initialNewCategory;
    }
}

const editCategoryReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CHANGE_DATA':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case 'CLEAR':
            return initialEditCategory;
        default: return initialEditCategory;
    }
}

function CategorySelectorField({
    categories,
    category,
    onActionSelect,
    onActionOpenAddModal
}) {
    return (
        <CategorySelectorFieldWrapper>
            <select
                className='select-item'
                onChange={(e) => onActionSelect(e)}
                value={category?.id || ''}
            >
                <option
                    value=''
                >카테고리 선택</option>
                {categories?.map(r => {
                    return (
                        <option
                            key={r.id}
                            value={r.id}
                        >{r.name}</option>
                    );
                })}
            </select>
            <button
                type='button'
                className='category-add-button-el'
                onClick={onActionOpenAddModal}
            >
                <div className='category-add-button-icon-figure'>
                    <Image
                        loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                        src='/images/icon/add_icon2.png'
                        layout='fill'
                        alt="add icon"
                    />
                </div>
                <Ripple color={'#e0e0e0'} duration={1000}></Ripple>
            </button>
        </CategorySelectorFieldWrapper>
    );
}

function AddCategoryModal({
    category,
    onChangeValueOfName,
    disabledBtn,
    onConfirm,
    onClose
}) {
    return (
        <CategoryModalWrapper>
            <div className='head-title'>카테고리 등록</div>
            <form onSubmit={onConfirm}>
                <div className='body-wrapper'>
                    <div className='input-box'>
                        <div className='input-label'>카테고리명</div>
                        <input
                            className='input-el'
                            type='text'
                            name='name'
                            value={category.name || ''}
                            onChange={onChangeValueOfName}
                            placeholder='카테고리명을 입력해 주세요.'
                            required
                        ></input>
                        <div className='input-notice'>* 카테고리명은 최대 20글자로 입력해 주세요.</div>
                    </div>
                </div>
                <div className='footer-wrapper'>
                    <button
                        type='button'
                        className='button-el'
                        style={{ color: '#ff6961' }}
                        onClick={onClose}
                    >
                        취소
                        <Ripple color={'#ff696160'} duration={1000}></Ripple>
                    </button>
                    <button
                        type='submit'
                        className='button-el'
                        style={{ color: '#2C73D2' }}
                        disabled={disabledBtn}
                    >
                        등록
                        <Ripple color={'#2C73D260'} duration={1000}></Ripple>
                    </button>
                </div>
            </form>
        </CategoryModalWrapper>
    );
}

function EditCategoryModal({
    category,
    onChangeValueOfName,
    disabledBtn,
    onConfirm,
    onClose
}) {
    return (
        <CategoryModalWrapper>
            <div className='head-title'>카테고리 수정</div>
            <form onSubmit={onConfirm}>
                <div className='body-wrapper'>
                    <div className='input-box'>
                        <div className='input-label'>카테고리명</div>
                        <input
                            className='input-el'
                            type='text'
                            name='name'
                            value={category.name || ''}
                            onChange={onChangeValueOfName}
                            placeholder='카테고리명을 입력해 주세요.'
                            required
                        ></input>
                        <div className='input-notice'>* 카테고리명은 최대 20글자로 입력해 주세요.</div>
                    </div>
                </div>
                <div className='footer-wrapper'>
                    <button
                        type='button'
                        className='button-el'
                        style={{ color: '#ff6961' }}
                        onClick={onClose}
                    >
                        취소
                        <Ripple color={'#ff696160'} duration={1000}></Ripple>
                    </button>
                    <button
                        type='submit'
                        className='button-el'
                        style={{ color: '#2C73D2' }}
                        disabled={disabledBtn}
                    >
                        수정
                        <Ripple color={'#2C73D260'} duration={1000}></Ripple>
                    </button>
                </div>
            </form>
        </CategoryModalWrapper>
    );
}

function SelectedCategoryField({
    category,
    onActionOpenEditModal,
    onActionDelete,
    disabledBtn
}) {
    return (
        <SelectedCategoryFieldWrapper>
            <div className='category-title'>{category.name}</div>
            <div className='flex-box'>
                <button
                    type='button'
                    className='button-el edit-button'
                    onClick={onActionOpenEditModal}
                >
                    카테고리 수정
                </button>
                <button
                    type='button'
                    className='button-el delete-button'
                    onClick={onActionDelete}
                    disabled={disabledBtn}
                >
                    카테고리 삭제
                </button>
            </div>
        </SelectedCategoryFieldWrapper>
    );
}