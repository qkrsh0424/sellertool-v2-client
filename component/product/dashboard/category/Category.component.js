import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';
import CommonModalComponent from '../../../modules/CommonModalComponent';
import Ripple from '../../../modules/Ripple';

const Container = styled.div`
    margin-top: 20px;
    max-width: 1280px;
    margin-left:auto;
    margin-right: auto;

    @media all and (max-width:992px){
        padding: 0 10px;
    }

    .category-field-wrapper{
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .select-item{
        width: 300px;
        height: 43px;
        padding: 5px;
        /* margin: 0 10px; */
        border: 1px solid #e1e1e1;
        border-radius: 0;
        font-size: 14px;
        -webkit-appearance: none;
        -moz-appearance: none; 
        appearance: none;
        background:url('/images/icon/down_arrow_icon2.png') no-repeat right 0 center;
        background-size: 30px;
        

        &:focus{
            outline: none;
        }

        @media all and (max-width:992px) {
            /* margin: 10px 0 0 0; */
            width: 100%;
        }
    }

    .category-add-button-el{
        position:relative;
        overflow: hidden;
        width: 43px;
        height: 43px;
        padding: 0;
        margin: 0;
        margin-left: 10px;

        background: white;
        border: 1px solid #e0e0e0;

        cursor: pointer;

        &:hover{
            background: #2C73D2;
            border: 1px solid #2C73D2;

            & .category-add-button-icon-figure{
                opacity: 1;
                filter:invert(100%);
            }
        }
    }

    .category-add-button-icon-figure{
        position: relative;
        width: 30px;
        height: 30px;
        margin: auto;
        opacity: 0.6;
    }
`;

const CategoryFieldWrapper = styled.div`
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .flex-box{
        display: flex;
        align-items: center;

        .button-el:nth-last-child(1){
            margin-left: 10px;
        }
    }
    
    .category-title{
        font-size: 24px;
        font-weight: 500;
    }

    .button-el{
        padding:0;
        margin:0;
        width: 100px;
        height: 25px;
        font-size: 12px;
        font-weight: 500;
        background: white;
        border:1px solid #e0e0e0;

        cursor: pointer;
    }

    .edit-button{
        &:hover{
            background: #2c73d2;
            border:1px solid #2c73d2;
            color:white;
        }
    }

    .delete-button{
        color:#ff6961;
        border:1px solid #ff6961;
        &:hover{
            background: #ff6961;
            border:1px solid #ff6961;
            color:white;
        }
    }
`;

const AddCategoryModalWrapper = styled.div`
    .head-title{
        padding: 10px;
        border-bottom: 1px solid #e0e0e0;
        font-size: 18px;
        font-weight: 600;
    }

    .body-wrapper{
        margin-top: 20px;
        padding: 0 10px;
    }

    .footer-wrapper{
        margin-top: 20px;
        display: flex;
    }

    .input-box{

    }

    .input-el{
        box-sizing: border-box;
        height: 34px;
        width: 100%;
        margin-top: 10px;
        padding: 0 5px;
        border: 1px solid #e0e0e0;

        &:focus{
            outline: none;
        }
    }

    .input-label{
        font-size: 13px;
        font-weight: 500;
    }

    .input-notice{
        margin-top: 10px;
        font-size: 13px;
        color: #626262;
    }

    .button-el{
        position: relative;
        overflow: hidden;
        flex:1;
        height: 34px;
        background: white;
        border: none;
        font-weight: 500;

        cursor: pointer;

        &:hover{
            font-weight: 600;
            background: #e0e0e060;
        }

        &:disabled{
            cursor: not-allowed;
        }
    }
`;

const CategoryComponent = (props) => {
    const router = useRouter();

    const [newCategory, dispatchNewCategory] = useReducer(newCategoryReducer, initialNewCategory);
    const [editCategory, dispatchEditCategory] = useReducer(editCategoryReducer, initialEditCategory);

    const [addNewCategoryModalOpen, setAddNewCategoryModalOpen] = useState(false);
    const [editCategoryModalOpen, setEditCategoryModalOpen] = useState(false);
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
                console.log(props.category)
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
            <h5 style={{ padding: '0 10px', color: '#505050' }}>| 상품 관리 |</h5>
            <Container>
                <div className='category-field-wrapper'>
                    <select
                        className='select-item'
                        onChange={(e) => __category.action.select(e)}
                        value={props.category?.id || ''}
                    >
                        <option
                            value=''
                        >카테고리 선택</option>
                        {props.categories?.map(r => {
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
                        onClick={__category.action.openAddModal}
                    >
                        <div className='category-add-button-icon-figure'>
                            <Image
                                loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                src='http://localhost:3000/images/icon/add_icon2.png'
                                layout='fill'
                                alt="add icon"
                            />
                        </div>
                        <Ripple color={'#e0e0e0'} duration={1000}></Ripple>
                    </button>
                </div>
                {props.category &&
                    <CategoryFieldWrapper>
                        <div className='category-title'>{props.category.name}</div>
                        <div className='flex-box'>
                            <button
                                type='button'
                                className='button-el edit-button'
                                onClick={__category.action.openEditModal}
                            >
                                카테고리 수정
                            </button>
                            <button
                                type='button'
                                className='button-el delete-button'
                            >
                                카테고리 삭제
                            </button>
                        </div>
                    </CategoryFieldWrapper>
                }
            </Container>
            {/* Modal */}
            {addNewCategoryModalOpen &&
                <CommonModalComponent
                    open={addNewCategoryModalOpen}

                    onClose={__category.action.closeAddModal}
                >
                    <AddCategoryModalWrapper>
                        <div className='head-title'>카테고리 등록</div>
                        <form onSubmit={__category.action.confirmAdd}>
                            <div className='body-wrapper'>
                                <div className='input-box'>
                                    <div className='input-label'>카테고리명</div>
                                    <input
                                        className='input-el'
                                        type='text'
                                        name='name'
                                        value={newCategory?.name || ''}
                                        onChange={__category.change.newCategoryValueOfName}
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
                                    onClick={__category.action.closeAddModal}
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
                    </AddCategoryModalWrapper>
                </CommonModalComponent>
            }

            {(editCategoryModalOpen && editCategory) &&
                <CommonModalComponent
                    open={editCategoryModalOpen}

                    onClose={__category.action.closeEditModal}
                >
                    <AddCategoryModalWrapper>
                        <div className='head-title'>카테고리 수정</div>
                        <form onSubmit={__category.action.confirmEdit}>
                            <div className='body-wrapper'>
                                <div className='input-box'>
                                    <div className='input-label'>카테고리명</div>
                                    <input
                                        className='input-el'
                                        type='text'
                                        name='name'
                                        value={editCategory.name || ''}
                                        onChange={__category.change.editCategoryValueOfName}
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
                                    onClick={__category.action.closeEditModal}
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
                    </AddCategoryModalWrapper>
                </CommonModalComponent>
            }
        </>
    );
}
export default CategoryComponent;

const initialNewCategory = {
    name: ''
};

const initialEditCategory = null;

const newCategoryReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return initialNewCategory;
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