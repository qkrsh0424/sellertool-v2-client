import _ from 'lodash';
import Image from 'next/image';
import { useEffect, useReducer, useRef, useState } from 'react';
import styled from 'styled-components';
import useImageUploaderHooks from '../../../../hooks/useImageUploaderHooks';
import valueUtils from '../../../../utils/valueUtils';
import CommonModalComponent from '../../../modules/CommonModalComponent';
import ConfirmModalComponent from '../../../modules/ConfirmModalComponent';

const Container = styled.div`
    flex:1;
`;

const HeadFieldWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title{
        font-size: 21px;
        font-weight: 500;
    }

    .flex-box{
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    .button-el{
        position: relative;
        overflow: hidden;
        padding: 0;
        margin: 0;
        margin-left: 10px;
        width: 30px;
        height: 30px;
        border: 1px solid #e0e0e0;
        background: white;

        cursor: pointer;
    }

    .button-icon-figure{
        position: relative;
        width: 20px;
        height: 20px;
        margin: auto;
    }

    .button-icon{
        opacity: 0.6;
    }

    .normal-button{
        &:hover{
            background: #2c73d2;
            border:1px solid #2c73d2;

            & .button-icon{
                filter: invert(100%);
                opacity: 1;
            }
        }
    }

    .delete-button{
        &:hover{
            background: #ff6961;
            border:1px solid #ff6961;

            & .button-icon{
                filter: invert(100%);
                opacity: 1;
            }
        }
    }
`;

const OptionAddAndEditModalWrapper = styled.div`
    
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
        margin-top: 15px;
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

    .image-box{
        width: 50%;
        margin-top: 10px;
        border: 1px solid #e0e0e0;
        cursor: pointer;
    }
`;

const OptionListFieldWrapper = styled.div`
    border: 1px solid #e0e0e0;
    margin-top: 10px;
    overflow: auto;
    max-height: 500px;

    &::-webkit-scrollbar {
        width: 5px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #00000025;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
        background-color: white;
    }

    .item-box:nth-last-child(1){
        border-bottom: none;
    }

    .item-box{
        border-bottom: 1px solid #e0e0e0;
        cursor:pointer;

        &:hover{
            background: #2c73d210;
        }
    }

    .item-box-active{
        background: #2c73d230 !important;
    }

    .code-box{
        padding:5px;
        font-size: 12px;
        font-weight: 500;
        color:#626262;
    }

    .code-box-active{
        font-weight: 600;
        color:#2c73d2;
    }

    .flex-box{
        display: flex;
        align-items: center;
    }

    .image-box{
        width:60px;
    }

    .content-box{
        margin-left: 10px;
        flex:1;
    }

    .content-text{
        font-size: 13px;
        font-weight: 500;
    }
`;

export default function OptionListComponent(props) {
    const addOptionImageUploaderRef = useRef();
    const editOptionImageUploaderRef = useRef();
    const { uploadImages } = useImageUploaderHooks({
        MAX_FILE_SIZE: 10485760
    });

    const [addOption, dispatchAddOption] = useReducer(addOptionReducer, initialAddOption);
    const [editOption, dispatchEditOption] = useReducer(editOptionReducer, initialEditOption);

    const [optionAddModalOpen, setOptionAddModalOpen] = useState(false);
    const [optionEditModalOpen, setOptionEditModalOpen] = useState(false);
    const [optionDeleteModalOpen, setOptionDeleteModalOpen] = useState(false);
    const [disabledBtn, setDisabledBtn] = useState(false);

    useEffect(() => {
        if (!disabledBtn) {
            return;
        }
        let timeout = setTimeout(() => {
            setDisabledBtn(false);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [disabledBtn])

    const __option = {
        action: {
            openAddModal: () => {
                setOptionAddModalOpen(true);
            },
            closeAddModal: () => {
                setOptionAddModalOpen(false);
                dispatchAddOption({
                    type: 'CLEAR'
                })
            },
            openAddOptionImageUploader: () => {
                addOptionImageUploaderRef.current.click();
            },
            setAddOptionImage: async (e) => {
                let files = e.target.files;
                if (!files || files?.length <= 0) {
                    alert('이미지를 선택해 주세요.');
                    return;
                }

                let images = await uploadImages(files);

                if (!images) {
                    return;
                }

                dispatchAddOption({
                    type: 'CHANGE_DATA',
                    payload: {
                        name: 'imageUrl',
                        value: images[0].fileStorageUri
                    }
                })
            },
            confirmAdd: (e) => {
                e.preventDefault();
                setDisabledBtn(true);
                if (!addOption.defaultName) {
                    alert('옵션명은 필수 입력입니다.');
                    return;
                }

                if (!addOption.managementName) {
                    alert('옵션 관리명은 필수 입력입니다.');
                    return;
                }

                if (!addOption.imageUrl) {
                    alert('잘못된 형식의 이미지 입니다.');
                    return;
                }
                props.onSubmitAddOption(addOption);
                __option.action.closeAddModal();
            },
            openDeleteModal: () => {
                if (!props.option) {
                    alert('옵션을 먼저 선택해 주세요.');
                    return;
                }
                setOptionDeleteModalOpen(true);
            },
            closeDeleteModal: () => {
                setOptionDeleteModalOpen(false);
            },
            confirmDelete: () => {
                if (!props.option) {
                    alert('옵션을 먼저 선택해 주세요.');
                    return;
                }
                props.onSubmitDeleteOption(props.option.id);
                __option.action.closeDeleteModal();
            },
            openEditModal: () => {
                if (!props.option) {
                    alert('옵션을 먼저 선택해 주세요.');
                    return;
                }
                dispatchEditOption({
                    type: 'SET_DATA',
                    payload: _.cloneDeep(props.option)
                })
                setOptionEditModalOpen(true);
            },
            closeEditModal: () => {
                setOptionEditModalOpen(false);
                dispatchEditOption({
                    type: 'CLEAR'
                })
            },
            openEditOptionImageUploader: () => {
                editOptionImageUploaderRef.current.click();
            },
            setEditOptionImage: async (e) => {
                let files = e.target.files;
                if (!files || files?.length <= 0) {
                    alert('이미지를 선택해 주세요.');
                    return;
                }

                let images = await uploadImages(files);

                if (!images) {
                    return;
                }

                dispatchEditOption({
                    type: 'CHANGE_DATA',
                    payload: {
                        name: 'imageUrl',
                        value: images[0].fileStorageUri
                    }
                })
            },
            confirmEdit: (e) => {
                e.preventDefault();

                if (!editOption.defaultName) {
                    alert('옵션명은 필수 입력입니다.');
                    return;
                }

                if (!editOption.managementName) {
                    alert('옵션 관리명은 필수 입력입니다.');
                    return;
                }

                if (!editOption.imageUrl) {
                    alert('잘못된 형식의 이미지 입니다.');
                    return;
                }
                props.onSubmitEditOption({
                    body: editOption,
                    callback: () => __option.action.closeEditModal()
                });
            }
        },
        change: {
            addOptionValueOfName: (e) => {
                let name = e.target.name;
                let value = e.target.value;

                const targetOption = _.cloneDeep(addOption);
                const newAddOption = _.set(targetOption, name, value);
                dispatchAddOption({
                    type: 'SET_DATA',
                    payload: { ...newAddOption }
                })
            },
            editOptionValueOfName: (e) => {
                let name = e.target.name;
                let value = e.target.value;

                const targetOption = _.cloneDeep(editOption);
                const newEditOption = _.set(targetOption, name, value);
                dispatchEditOption({
                    type: 'SET_DATA',
                    payload: { ...newEditOption }
                })
            }
        }
    }

    return (
        <>
            <Container>
                {props.product &&
                    <>
                        <HeadField
                            options={props.options}
                            option={props.option}
                            openAddModal={__option.action.openAddModal}
                            openEditModal={__option.action.openEditModal}
                            openDeleteModal={__option.action.openDeleteModal}
                        />
                        <OptionListField
                            options={props.options}
                            option={props.option}
                            onActionSelect={props.onActionSelectOption}
                        />
                    </>
                }
            </Container>
            {/* Add Option Modal */}
            {(optionAddModalOpen && addOption) &&
                <CommonModalComponent
                    open={optionAddModalOpen}

                    onClose={__option.action.closeAddModal}
                >
                    <OptionAddModal
                        option={addOption}
                        onActionChangeValueOfName={__option.change.addOptionValueOfName}
                        onActionOpenImageUploader={__option.action.openAddOptionImageUploader}
                        onClose={__option.action.closeAddModal}
                        onConfirm={__option.action.confirmAdd}
                        disabledBtn={disabledBtn}
                    />
                </CommonModalComponent>
            }
            {/* Edit Option Modal */}
            {(optionEditModalOpen && editOption) &&
                <CommonModalComponent
                    open={optionEditModalOpen}

                    onClose={__option.action.closeEditModal}
                >
                    <OptionEditModal
                        option={editOption}
                        onActionChangeValueOfName={__option.change.editOptionValueOfName}
                        onActionOpenImageUploader={__option.action.openEditOptionImageUploader}
                        onClose={__option.action.closeEditModal}
                        onConfirm={__option.action.confirmEdit}
                        disabledBtn={disabledBtn}
                    />
                </CommonModalComponent>
            }
            {/* Delete Product Modal */}
            {optionDeleteModalOpen && props.option &&
                <ConfirmModalComponent
                    open={optionDeleteModalOpen}
                    message={
                        (
                            <>
                                <div>연관된 하위 데이터들도 모두 삭제 됩니다.</div>
                                <div>해당 옵션을 정말로 삭제 하시겠습니까?</div>
                            </>
                        )
                    }
                    onClose={__option.action.closeDeleteModal}
                    onConfirm={__option.action.confirmDelete}
                />
            }
            {/* Add Option Image Uploader */}
            <input
                ref={addOptionImageUploaderRef}
                type='file'
                accept="image/*"
                onClick={(e) => e.target.value = ''}
                onChange={__option.action.setAddOptionImage}
                hidden
            ></input>
            {/* Edit Option Image Uploader */}
            <input
                ref={editOptionImageUploaderRef}
                type='file'
                accept="image/*"
                onClick={(e) => e.target.value = ''}
                onChange={__option.action.setEditOptionImage}
                hidden
            ></input>
        </>
    );
}

const initialAddOption = {
    defaultName: '',
    managementName: '',
    imageUrl: 'https://assets.sellertool.io/default/no_image.png',
    optionInfo: {
        status: '',
        salesPrice: '0',
        memo1: '',
        memo2: '',
        memo3: ''
    }

};
const initialEditOption = null;

const addOptionReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CHANGE_DATA':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case 'CLEAR':
            return initialAddOption;
        default: return initialAddOption;
    }
}

const editOptionReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CHANGE_DATA':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case 'CLEAR':
            return initialEditOption;
        default: return initialEditOption;
    }
}

function HeadField({
    options,
    option,
    openAddModal,
    openEditModal,
    openDeleteModal
}) {
    return (
        <HeadFieldWrapper>
            <div className='title'>옵션 ({options?.length || 0})</div>
            <div className='flex-box'>
                <button
                    className='button-el normal-button'
                    type='button'
                    onClick={openAddModal}
                >
                    <div className='button-icon-figure'>
                        <Image
                            className='button-icon'
                            loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                            src='http://localhost:3000/images/icon/add_icon2.png'
                            layout='fill'
                            alt="add icon"
                            loading='lazy'
                        ></Image>
                    </div>
                </button>
                {option &&
                    <>
                        <button
                            className='button-el normal-button'
                            type='button'
                            onClick={openEditModal}
                        >
                            <div className='button-icon-figure'>
                                <Image
                                    className='button-icon'
                                    loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                    src='http://localhost:3000/images/icon/pen_icon2.png'
                                    layout='fill'
                                    alt="add icon"
                                    loading='lazy'
                                ></Image>
                            </div>
                        </button>
                        <button
                            className='button-el delete-button'
                            type='button'
                            onClick={openDeleteModal}
                        >
                            <div className='button-icon-figure'>
                                <Image
                                    className='button-icon'
                                    loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                    src='http://localhost:3000/images/icon/x_icon.png'
                                    layout='fill'
                                    alt="add icon"
                                    loading='lazy'
                                ></Image>
                            </div>
                        </button>
                    </>
                }
            </div>
        </HeadFieldWrapper>
    );
}

function OptionAddModal({
    option,
    onActionChangeValueOfName,
    onActionOpenImageUploader,
    onClose,
    onConfirm,
    disabledBtn
}) {
    return (
        <OptionAddAndEditModalWrapper>
            <div className='head-title'>신규 옵션 등록</div>
            <form onSubmit={onConfirm}>
                <div className='body-wrapper'>
                    <div className='input-box'>
                        <div className='input-label'>옵션명</div>
                        <input
                            className='input-el'
                            type='text'
                            name='defaultName'
                            value={valueUtils.emptyCheckAndGet(option.defaultName)}
                            onChange={onActionChangeValueOfName}
                            required
                        ></input>
                    </div>
                    <div className='input-box'>
                        <div className='input-label'>옵션 관리명</div>
                        <input
                            className='input-el'
                            type='text'
                            name='managementName'
                            value={option.managementName || ''}
                            onChange={onActionChangeValueOfName}
                            required
                        ></input>
                    </div>
                    <div className='input-box'>
                        <div className='input-label'>이미지</div>
                        <div
                            className='image-box'
                            onClick={onActionOpenImageUploader}
                        >
                            <Image
                                loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                src={option?.imageUrl || 'https://assets.sellertool.io/default/no_image.png'}
                                layout='responsive'
                                width={1}
                                height={1}
                                objectFit={'cover'}
                                alt='image'
                                loading='lazy'
                            ></Image>
                        </div>
                    </div>
                    <div className='input-box'>
                        <div className='input-label'>상태</div>
                        <input
                            className='input-el'
                            type='text'
                            name='optionInfo.status'
                            value={option.optionInfo.status || ''}
                            onChange={onActionChangeValueOfName}
                        ></input>
                    </div>
                    <div className='input-box'>
                        <div className='input-label'>판매 단가</div>
                        <input
                            className='input-el'
                            type='number'
                            name='optionInfo.salesPrice'
                            value={option.optionInfo.salesPrice || ''}
                            onChange={onActionChangeValueOfName}
                            required
                        ></input>
                    </div>
                    <div className='input-box'>
                        <div className='input-label'>메모1</div>
                        <input
                            className='input-el'
                            type='text'
                            name='optionInfo.memo1'
                            value={option.optionInfo.memo1 || ''}
                            onChange={onActionChangeValueOfName}
                        ></input>
                    </div>
                    <div className='input-box'>
                        <div className='input-label'>메모2</div>
                        <input
                            className='input-el'
                            type='text'
                            name='optionInfo.memo2'
                            value={option.optionInfo.memo2 || ''}
                            onChange={onActionChangeValueOfName}
                        ></input>
                    </div>
                    <div className='input-box'>
                        <div className='input-label'>메모3</div>
                        <input
                            className='input-el'
                            type='text'
                            name='optionInfo.memo3'
                            value={option.optionInfo.memo3 || ''}
                            onChange={onActionChangeValueOfName}
                        ></input>
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
                    </button>
                    <button
                        type='submit'
                        className='button-el'
                        style={{ color: '#2c73d2' }}
                        disabled={disabledBtn}
                    >
                        등록
                    </button>
                </div>
            </form>
        </OptionAddAndEditModalWrapper>
    );
}

function OptionEditModal({
    option,
    onActionChangeValueOfName,
    onActionOpenImageUploader,
    onClose,
    onConfirm,
    disabledBtn
}) {
    return (
        <OptionAddAndEditModalWrapper>
            <div className='head-title'>옵션 수정</div>
            <form onSubmit={onConfirm}>
                <div className='body-wrapper'>
                    <div className='input-box'>
                        <div className='input-label'>옵션명</div>
                        <input
                            className='input-el'
                            type='text'
                            name='defaultName'
                            value={valueUtils.emptyCheckAndGet(option.defaultName)}
                            onChange={onActionChangeValueOfName}
                            required
                        ></input>
                    </div>
                    <div className='input-box'>
                        <div className='input-label'>옵션 관리명</div>
                        <input
                            className='input-el'
                            type='text'
                            name='managementName'
                            value={option.managementName || ''}
                            onChange={onActionChangeValueOfName}
                            required
                        ></input>
                    </div>
                    <div className='input-box'>
                        <div className='input-label'>이미지</div>
                        <div
                            className='image-box'
                            onClick={onActionOpenImageUploader}
                        >
                            <Image
                                loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                src={option?.imageUrl || 'https://assets.sellertool.io/default/no_image.png'}
                                layout='responsive'
                                width={1}
                                height={1}
                                objectFit={'cover'}
                                alt='image'
                                loading='lazy'
                            ></Image>
                        </div>
                    </div>
                    <div className='input-box'>
                        <div className='input-label'>상태</div>
                        <input
                            className='input-el'
                            type='text'
                            name='optionInfo.status'
                            value={option.optionInfo.status || ''}
                            onChange={onActionChangeValueOfName}
                        ></input>
                    </div>
                    <div className='input-box'>
                        <div className='input-label'>판매 단가</div>
                        <input
                            className='input-el'
                            type='number'
                            name='optionInfo.salesPrice'
                            value={valueUtils.emptyCheckAndGet(option.optionInfo.salesPrice)}
                            onChange={onActionChangeValueOfName}
                            required
                        ></input>
                    </div>
                    <div className='input-box'>
                        <div className='input-label'>메모1</div>
                        <input
                            className='input-el'
                            type='text'
                            name='optionInfo.memo1'
                            value={option.optionInfo.memo1 || ''}
                            onChange={onActionChangeValueOfName}
                        ></input>
                    </div>
                    <div className='input-box'>
                        <div className='input-label'>메모2</div>
                        <input
                            className='input-el'
                            type='text'
                            name='optionInfo.memo2'
                            value={option.optionInfo.memo2 || ''}
                            onChange={onActionChangeValueOfName}
                        ></input>
                    </div>
                    <div className='input-box'>
                        <div className='input-label'>메모3</div>
                        <input
                            className='input-el'
                            type='text'
                            name='optionInfo.memo3'
                            value={option.optionInfo.memo3 || ''}
                            onChange={onActionChangeValueOfName}
                        ></input>
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
                    </button>
                    <button
                        type='submit'
                        className='button-el'
                        style={{ color: '#2c73d2' }}
                        disabled={disabledBtn}
                    >
                        수정
                    </button>
                </div>
            </form>
        </OptionAddAndEditModalWrapper>
    );
}

function OptionListField({
    options,
    option,
    onActionSelect
}) {
    return (
        <OptionListFieldWrapper>
            {(!options || options.length <= 0) &&
                <div style={{ fontSize: '14px', fontWeight: '600', textAlign: 'center', margin: '150px 0' }}>등록된 옵션이 없습니다.</div>
            }
            {options?.map(r => {
                return (
                    <div
                        key={r.id}
                        className={`item-box ${option?.id === r.id && 'item-box-active'}`}
                        onClick={() => onActionSelect(r)}
                    >
                        <div className={`code-box ${option?.id === r.id && 'code-box-active'}`}>옵션 코드 : {r.code}</div>
                        <div className='flex-box'>
                            <div className='image-box'>
                                <Image
                                    loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                    src={r.imageUrl}
                                    layout={'responsive'}
                                    width={1}
                                    height={1}
                                    alt={'option image'}
                                    objectFit='cover'
                                    loading='lazy'
                                ></Image>
                            </div>
                            <div className='content-box'>
                                <div className='flex-box'>
                                    <div className='content-text' style={{ flex: 1 }}>옵션명 : {r.defaultName}</div>
                                    <div className='content-text' style={{ flex: 1 }}>옵션 관리명 : {r.managementName}</div>
                                </div>
                            </div>
                        </div>

                    </div>
                );
            })}
        </OptionListFieldWrapper>
    );
}