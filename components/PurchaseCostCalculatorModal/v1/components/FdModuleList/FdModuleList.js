import { useState } from "react";
import CustomBlockButton from "../../../../buttons/block-button/v1/CustomBlockButton";
import { St } from "./FdModuleList.styled";
import CustomInput from "../../../../input/default/v1/CustomInput";
import CustomImage from "../../../../image/CustomImage";
import { v4 as uuidv4 } from 'uuid';
import { CustomDateUtils } from "../../../../../utils/CustomDateUtils";
import _ from "lodash";
import { customToast, defaultOptions } from "../../../../toast/custom-react-toastify/v1";
import { withPendingComponent } from "../../../../../hoc/loading/withPendingComponent";

const customDateUtils = CustomDateUtils();
const ItemListWithPending = withPendingComponent({
    Component: ItemList
})

const generateInitAddModuleForm = () => {
    const id = uuidv4();
    const name = customDateUtils.dateToYYYYMMDDhhmmssFile(new Date());
    return {
        cid: null,
        id: id,
        name: name
    }
}

const isModuleNameFormatValid = (name) => {
    if (name?.length <= 0 || name?.length > 20) {
        return false;
    }
    return true;
}

export function FdModuleList({
    mrPurchaseModuleList,
    selectedMrPurchaseModule,
    onSubmitAdd,
    onSubmitEdit,
    onSubmitDelete,
    onSetSelectedMrPurchaseModule
}) {
    const [isActiveAddMode, setIsActiveAddMode] = useState(false);
    const [isActiveEditMode, setIsActiveEditMode] = useState(false);
    const [isActiveDeleteMode, setIsActiveDeleteMode] = useState(false);
    const [addModuleForm, setAddModuleForm] = useState(null);
    const [editModuleForm, setEditModuleForm] = useState(null);

    const toggleIsActiveAddMode = (bool) => {
        if (bool) {
            setAddModuleForm(generateInitAddModuleForm());
            toggleIsActiveEditMode(false);
            toggleIsActiveDeleteMode(false);
        } else {
            setAddModuleForm(null);
        }
        setIsActiveAddMode(bool);
    }

    const toggleIsActiveEditMode = (bool) => {
        if (bool) {
            toggleIsActiveAddMode(false);
            toggleIsActiveDeleteMode(false);
            setEditModuleForm(_.cloneDeep(selectedMrPurchaseModule));
        } else {
            setEditModuleForm(null);
        }

        setIsActiveEditMode(bool);
    }

    const toggleIsActiveDeleteMode = (bool) => {
        if (bool) {
            toggleIsActiveAddMode(false);
            toggleIsActiveEditMode(false);
        }

        setIsActiveDeleteMode(bool);
    }

    const handleChangeAddModuleFormName = (e) => {
        let value = e.target.value;
        setAddModuleForm({
            ...addModuleForm,
            name: value
        })
    }

    const handleChangeEditModuleFormName = (e) => {
        let value = e.target.value;
        setEditModuleForm({
            ...editModuleForm,
            name: value
        })
    }

    const handleSubmitAddModule = async () => {
        if (!isModuleNameFormatValid(addModuleForm?.name)) {
            customToast.error('모듈명을 1~20자 내외로 입력해주세요.', {
                ...defaultOptions
            });
            return;
        }
        onSubmitAdd(addModuleForm);

        toggleIsActiveAddMode(false);
    }

    const handleSubmitEditModule = async () => {
        if (!isModuleNameFormatValid(editModuleForm?.name)) {
            customToast.error('모듈명을 1~20자 내외로 입력해주세요.', {
                ...defaultOptions
            });
            return;
        }
        onSubmitEdit(editModuleForm);

        toggleIsActiveEditMode(false);
    }

    const handleSubmitDeleteModule = async (targetId) => {
        await onSubmitDelete(targetId);
    }

    const handleSelectMrPurchaseModule = (targetId) => {
        toggleIsActiveAddMode(false);
        toggleIsActiveEditMode(false);
        onSetSelectedMrPurchaseModule(mrPurchaseModuleList?.find(r => r.id === targetId));
    }

    return (
        <>
            <St.Container>
                <St.Title>매입정보 모듈 선택</St.Title>
                <St.Wrapper>
                    <AddModule
                        mrPurchaseModuleList={mrPurchaseModuleList}
                        addModuleForm={addModuleForm}
                        isActiveAddMode={isActiveAddMode}
                        handleChangeAddModuleFormName={handleChangeAddModuleFormName}
                        handleSubmitAddModule={handleSubmitAddModule}
                        toggleIsActiveAddMode={toggleIsActiveAddMode}
                    />
                    <ItemListWithPending
                        pendingDatas={mrPurchaseModuleList}
                        mrPurchaseModuleList={mrPurchaseModuleList}
                        selectedMrPurchaseModule={selectedMrPurchaseModule}
                        isActiveEditMode={isActiveEditMode}
                        isActiveDeleteMode={isActiveDeleteMode}
                        editModuleForm={editModuleForm}
                        toggleIsActiveEditMode={toggleIsActiveEditMode}
                        toggleIsActiveDeleteMode={toggleIsActiveDeleteMode}
                        handleChangeEditModuleFormName={handleChangeEditModuleFormName}
                        handleSubmitEditModule={handleSubmitEditModule}
                        handleSubmitDeleteModule={handleSubmitDeleteModule}
                        handleSelectMrPurchaseModule={handleSelectMrPurchaseModule}
                    />
                </St.Wrapper>
            </St.Container>
        </>
    );
}

function AddModule({
    mrPurchaseModuleList,
    addModuleForm,
    isActiveAddMode,
    handleChangeAddModuleFormName,
    handleSubmitAddModule,
    toggleIsActiveAddMode,
}) {
    return (
        <>
            {isActiveAddMode ?
                <St.AddModeBox>
                    <CustomInput
                        type='text'
                        placeholder='모듈명'
                        value={addModuleForm?.name}
                        onChange={(e) => handleChangeAddModuleFormName(e)}
                    />
                    <CustomBlockButton
                        type='button'
                        className='confirmAddBtn'
                        onClick={() => handleSubmitAddModule()}
                    >
                        <CustomImage
                            src='./images/icon/check_default_5fcf80.svg'
                        />
                    </CustomBlockButton>
                    <CustomBlockButton
                        type='button'
                        className='cancelBtn'
                        onClick={() => toggleIsActiveAddMode(false)}
                    >
                        <CustomImage
                            src='./images/icon/close_default_e56767.svg'
                        />
                    </CustomBlockButton>
                </St.AddModeBox>
                :
                <St.AddModeBox>
                    <CustomBlockButton
                        type='button'
                        className='addBtn'
                        onClick={() => toggleIsActiveAddMode(true)}
                        disabled={!mrPurchaseModuleList}
                    >
                        모듈 추가
                    </CustomBlockButton>
                </St.AddModeBox>
            }
        </>
    );
}

function ItemList({
    mrPurchaseModuleList,
    selectedMrPurchaseModule,
    isActiveEditMode,
    isActiveDeleteMode,
    editModuleForm,
    toggleIsActiveEditMode,
    toggleIsActiveDeleteMode,
    handleChangeEditModuleFormName,
    handleSubmitEditModule,
    handleSubmitDeleteModule,
    handleSelectMrPurchaseModule
}) {
    return (
        <>
            {mrPurchaseModuleList?.map((mrPurchaseModule, index) => {
                if (mrPurchaseModule.id === selectedMrPurchaseModule?.id) {
                    if (isActiveEditMode && !isActiveDeleteMode) {
                        return (
                            <St.EditModeBox
                                key={mrPurchaseModule.id}
                            >
                                <CustomInput
                                    type='text'
                                    placeholder='모듈명'
                                    value={editModuleForm?.name}
                                    onChange={(e) => handleChangeEditModuleFormName(e)}
                                />
                                <CustomBlockButton
                                    type='button'
                                    className='confirmBtn'
                                    onClick={() => handleSubmitEditModule()}
                                >
                                    <CustomImage
                                        src='./images/icon/check_default_5fcf80.svg'
                                    />
                                </CustomBlockButton>
                                <CustomBlockButton
                                    type='button'
                                    className='cancelBtn'
                                    onClick={() => toggleIsActiveEditMode(false)}
                                >
                                    <CustomImage
                                        src='./images/icon/close_default_e56767.svg'
                                    />
                                </CustomBlockButton>
                            </St.EditModeBox>
                        );
                    } else if (!isActiveEditMode && isActiveDeleteMode) {
                        return (
                            <St.DeleteModeBox
                                key={mrPurchaseModule.id}
                            >
                                <CustomBlockButton
                                    type='button'
                                    className='cancelBtn'
                                    onClick={() => toggleIsActiveDeleteMode(false)}
                                >
                                    취소
                                </CustomBlockButton>
                                <CustomBlockButton
                                    type='button'
                                    className='confirmBtn'
                                    onClick={() => handleSubmitDeleteModule(mrPurchaseModule.id)}
                                >
                                    삭제
                                </CustomBlockButton>
                            </St.DeleteModeBox>
                        );
                    } else {
                        return (
                            <St.ItemBox
                                key={mrPurchaseModule.id}
                                style={{
                                    background: '#f0f0f0'
                                }}
                            >
                                <CustomBlockButton
                                    type='button'
                                    className='editBtn'
                                    onClick={(e) => { e.stopPropagation(); toggleIsActiveDeleteMode(true) }}
                                >
                                    <CustomImage
                                        src='/images/icon/delete_default_e56767.svg'
                                    />
                                </CustomBlockButton>
                                <div className='name-label'>
                                    {mrPurchaseModule.name}
                                </div>
                                <CustomBlockButton
                                    type='button'
                                    className='editBtn'
                                    onClick={(e) => { e.stopPropagation(); toggleIsActiveEditMode(true) }}
                                >
                                    <CustomImage
                                        src='/images/icon/edit_default_808080.svg'
                                    />
                                </CustomBlockButton>
                            </St.ItemBox>
                        );
                    }
                }

                return (
                    <St.ItemBox
                        key={mrPurchaseModule.id}
                        onClick={() => handleSelectMrPurchaseModule(mrPurchaseModule.id)}
                    >
                        <div className='name-label'>
                            {mrPurchaseModule.name}
                        </div>
                    </St.ItemBox>
                );
            })}
        </>
    );
}