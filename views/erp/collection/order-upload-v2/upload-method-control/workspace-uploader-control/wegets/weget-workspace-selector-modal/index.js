import styled from 'styled-components';
import { CustomDialog } from '../../../../../../../../components/dialog/v1/CustomDialog';
import { CirclePlus, Eye, EyeOff, Pencil, Settings, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import CustomInput from '../../../../../../../../components/input/default/v1/CustomInput';
import CustomBlockButton from '../../../../../../../../components/buttons/block-button/v1/CustomBlockButton';
import { useManagedWorkspaceApisActionsContextHook, useManagedWorkspaceApisValueContextHook } from '../../../../contexts/ManagedWorkspaceApisContext';
import { managedWorkspaceApiDataConnect } from '../../../../../../../../data_connect/managedWorkspaceApiDataConnect';
import { useSelector } from 'react-redux';
import { customBackdropController } from '../../../../../../../../components/backdrop/default/v1';

const StyledBody = styled.div`
    padding: 10px;
`;

const StyledWorkspaceList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    .item{
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: 1px solid #e0e0e0;
        padding: 10px;
        border-radius: 5px;
        background: #fff;
        cursor: pointer;
    }
`;

const StyledAddContainerBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;

    & label{
        font-size: 12px;
        display: flex;
        align-items: center;
        gap: 5px;
    }

    & input{
        border-radius: 5px;
    }

    & button{
        border-radius: 5px;
        background: #333;
        color: #fff;
    }
`;


export function WegetWorkspaceSelectorModal({
    open = true,
    onClose = () => { },
    onReqFetchManagedWorkspaceApis,
    onSelectManagedWorkspaceApi
}) {
    const managedWorkspaceApisValueContextHook = useManagedWorkspaceApisValueContextHook();

    const [viewType, setViewType] = useState('DEFAULT'); // DEFAULT, ADD, SETTING, DELETE
    const [targetManagedWorkspaceApi, setTargetManagedWorkspaceApi] = useState(null);

    const { managedWorkspaceApis } = managedWorkspaceApisValueContextHook;

    const handleSetViewType = (newViewType) => {
        if (newViewType === 'DEFAULT') {
            setTargetManagedWorkspaceApi(null);
        }
        setViewType(newViewType);
    }

    return (
        <>
            <CustomDialog
                open={open}
                onClose={() => onClose()}
            >
                {viewType === 'DEFAULT' &&
                    <>
                        <CustomDialog.Header style={{ padding: 10 }}>
                            <CustomDialog.Header.Fake />
                            <CustomDialog.Header.Title>워크스페이스 선택</CustomDialog.Header.Title>
                            <CustomDialog.Header.Close onClick={() => { onClose() }} />
                        </CustomDialog.Header>
                        <StyledBody>
                            <StyledWorkspaceList>
                                {managedWorkspaceApis?.map(item => {
                                    return (
                                        <div
                                            className='item' key={item?.uuid}
                                            onClick={()=>{
                                                onSelectManagedWorkspaceApi(item);
                                                onClose();
                                            }}
                                        >
                                            <div>{item?.managedWorkspaceName}</div>
                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                <Trash size={14} cursor={'pointer'} color='var(--defaultRedColor)' onClick={(e) => { e.stopPropagation(); handleSetViewType('DELETE'); setTargetManagedWorkspaceApi(item); }} />
                                                <Pencil size={14} cursor={'pointer'} color='#333' onClick={(e) => { e.stopPropagation(); handleSetViewType('SETTING'); setTargetManagedWorkspaceApi(item); }} />
                                            </div>
                                        </div>
                                    )
                                })}
                                <CirclePlus size={30} color='#333' cursor={'pointer'} style={{ margin: '0 auto' }} onClick={() => handleSetViewType('ADD')} />
                            </StyledWorkspaceList>

                        </StyledBody>
                    </>
                }

                {viewType === 'ADD' &&
                    <AddManagedWorkspaceApiComponent
                        onSetViewType={handleSetViewType}
                        onClose={() => onClose()}
                        onReqFetchManagedWorkspaceApis={onReqFetchManagedWorkspaceApis}
                    />
                }

                {viewType === 'SETTING' &&
                    <SettingManagedWorkspaceApiComponent
                        onSetViewType={handleSetViewType}
                        onClose={() => onClose()}
                        targetManagedWorkspaceApi={targetManagedWorkspaceApi}
                        onReqFetchManagedWorkspaceApis={onReqFetchManagedWorkspaceApis}
                    />
                }

                {viewType === 'DELETE' &&
                    <DeleteManagedWorkspaceApiComponent
                        onSetViewType={handleSetViewType}
                        onClose={() => onClose()}
                        targetManagedWorkspaceApi={targetManagedWorkspaceApi}
                        onReqFetchManagedWorkspaceApis={onReqFetchManagedWorkspaceApis}
                    />
                }
            </CustomDialog>
        </>
    );
}

function AddManagedWorkspaceApiComponent({
    onSetViewType,
    onClose,
    onReqFetchManagedWorkspaceApis
}) {
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const [isViewSecretKey, setIsViewSecretKey] = useState(false);
    const [formValue, setFormValue] = useState({
        cid: null,
        uuid: uuidv4(),
        managedWorkspaceName: '',
        managedWorkspaceApiKey: '',
        managedWorkspaceSecretKey: '',
        workspaceId: wsId,
        createdAt: new Date(),
        updatedAt: null,
        deletedFlag: false,
        deletedAt: null
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    const handleSubmit = async () => {
        let headers = {
            wsId: wsId
        }
        const body = {
            payload: {
                ...formValue,
                workspaceId: wsId,
                createdAt: new Date(),
            }
        }
        customBackdropController().showBackdrop()
        const addResult = await managedWorkspaceApiDataConnect().createOne({
            headers: headers,
            body: body
        })
        if (addResult?.content) {
            onReqFetchManagedWorkspaceApis();
            onSetViewType('DEFAULT');

        }
        customBackdropController().hideBackdrop()
    }

    return (
        <>
            <CustomDialog.Header style={{ padding: 10 }}>
                <CustomDialog.Header.Back onClick={() => onSetViewType('DEFAULT')} />
                <CustomDialog.Header.Title>워크스페이스 추가</CustomDialog.Header.Title>
                <CustomDialog.Header.Close onClick={() => onClose()} />
            </CustomDialog.Header>
            <StyledBody>
                <StyledAddContainerBody>
                    <div>
                        <label>워크스페이스 이름</label>
                        <CustomInput
                            type='text'
                            name='managedWorkspaceName'
                            onChange={handleInputChange}
                            value={formValue?.managedWorkspaceName || ''} // Ensure controlled input
                        />
                    </div>
                    <div>
                        <label>API Key</label>
                        <CustomInput
                            type='text'
                            name='managedWorkspaceApiKey'
                            onChange={handleInputChange}
                            value={formValue?.managedWorkspaceApiKey || ''} // Ensure controlled input
                        />
                    </div>
                    <div>
                        <label>
                            Secret Key {isViewSecretKey ? <EyeOff size={14} cursor={'pointer'} onClick={() => { setIsViewSecretKey(false) }} /> : <Eye size={14} cursor={'pointer'} onClick={() => { setIsViewSecretKey(true) }} />}
                        </label>
                        <CustomInput
                            type={isViewSecretKey ? 'text' : 'password'}
                            name='managedWorkspaceSecretKey'
                            onChange={handleInputChange}
                            value={formValue?.managedWorkspaceSecretKey || ''} // Ensure controlled input
                        />
                    </div>
                    <CustomBlockButton
                        type='button'
                        onClick={handleSubmit}
                    >
                        추가
                    </CustomBlockButton>
                </StyledAddContainerBody>
            </StyledBody>
        </>
    );
}

function SettingManagedWorkspaceApiComponent({
    onSetViewType,
    onClose,
    targetManagedWorkspaceApi,
    onReqFetchManagedWorkspaceApis
}) {
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const [isViewSecretKey, setIsViewSecretKey] = useState(false);
    const [formValue, setFormValue] = useState(targetManagedWorkspaceApi);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    const handleSubmit = async () => {
        let headers = {
            wsId: wsId
        }
        const body = {
            payload: {
                ...formValue,
                updatedAt: new Date(),
            }
        }
        customBackdropController().showBackdrop()
        const addResult = await managedWorkspaceApiDataConnect().updateOne({
            headers: headers,
            body: body
        })
        if (addResult?.content) {
            onReqFetchManagedWorkspaceApis();
            onSetViewType('DEFAULT');

        }
        customBackdropController().hideBackdrop()
    }

    return (
        <>
            <CustomDialog.Header style={{ padding: 10 }}>
                <CustomDialog.Header.Back onClick={() => onSetViewType('DEFAULT')} />
                <CustomDialog.Header.Title>워크스페이스 수정</CustomDialog.Header.Title>
                <CustomDialog.Header.Close onClick={() => onClose()} />
            </CustomDialog.Header>
            <StyledBody>
                <StyledAddContainerBody>
                    <div>
                        <label>워크스페이스 이름</label>
                        <CustomInput
                            type='text'
                            name='managedWorkspaceName'
                            onChange={handleInputChange}
                            value={formValue?.managedWorkspaceName || ''} // Ensure controlled input
                        />
                    </div>
                    <div>
                        <label>API Key</label>
                        <CustomInput
                            type='text'
                            name='managedWorkspaceApiKey'
                            onChange={handleInputChange}
                            value={formValue?.managedWorkspaceApiKey || ''} // Ensure controlled input
                        />
                    </div>
                    <div>
                        <label>
                            Secret Key {isViewSecretKey ? <EyeOff size={14} cursor={'pointer'} onClick={() => { setIsViewSecretKey(false) }} /> : <Eye size={14} cursor={'pointer'} onClick={() => { setIsViewSecretKey(true) }} />}
                        </label>
                        <CustomInput
                            type={isViewSecretKey ? 'text' : 'password'}
                            name='managedWorkspaceSecretKey'
                            onChange={handleInputChange}
                            value={formValue?.managedWorkspaceSecretKey || ''} // Ensure controlled input
                        />
                    </div>
                    <CustomBlockButton
                        type='button'
                        onClick={handleSubmit}
                    >
                        수정
                    </CustomBlockButton>
                </StyledAddContainerBody>
            </StyledBody>
        </>
    );
}

function DeleteManagedWorkspaceApiComponent({
    onSetViewType,
    onClose,
    targetManagedWorkspaceApi,
    onReqFetchManagedWorkspaceApis
}) {
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const handleSubmit = async () => {
        let headers = {
            wsId: wsId
        }
        const body = {
            uuid: targetManagedWorkspaceApi?.uuid,
        }
        customBackdropController().showBackdrop()
        const addResult = await managedWorkspaceApiDataConnect().deleteOne({
            headers: headers,
            body: body
        })
        if (addResult?.content) {
            onReqFetchManagedWorkspaceApis();
            onSetViewType('DEFAULT');

        }
        customBackdropController().hideBackdrop()
    }

    return (
        <>
            <CustomDialog.Header style={{ padding: 10 }}>
                <CustomDialog.Header.Back onClick={() => onSetViewType('DEFAULT')} />
                <CustomDialog.Header.Title>워크스페이스 삭제</CustomDialog.Header.Title>
                <CustomDialog.Header.Close onClick={() => onClose()} />
            </CustomDialog.Header>
            <StyledBody>
                <StyledAddContainerBody>
                    <div style={{ fontSize: '14px' }}>
                        "{targetManagedWorkspaceApi?.managedWorkspaceName}" 를 삭제하시겠습니까?
                    </div>
                    <CustomBlockButton
                        type='button'
                        style={{ background: 'var(--defaultRedColor)', color: '#fff' }}
                        onClick={handleSubmit}
                    >
                        삭제
                    </CustomBlockButton>
                </StyledAddContainerBody>
            </StyledBody>
        </>
    );
}