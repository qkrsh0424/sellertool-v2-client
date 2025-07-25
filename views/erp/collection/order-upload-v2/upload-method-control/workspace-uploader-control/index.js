import styled from 'styled-components';
import CustomBlockButton from '../../../../../../components/buttons/block-button/v1/CustomBlockButton';
import CustomSelect from '../../../../../../components/select/default/v1/CustomSelect';
import { WegetWorkspaceSelectorModal } from './wegets/weget-workspace-selector-modal';
import { useManagedWorkspaceApisActionsContextHook, useManagedWorkspaceApisValueContextHook } from '../../contexts/ManagedWorkspaceApisContext';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { managedWorkspaceApiDataConnect } from '../../../../../../data_connect/managedWorkspaceApiDataConnect';
import { Check, Loader, LoaderCircle, RotateCcw, X } from 'lucide-react';
import { customSignitureUtils } from '../../../../../../utils/customSignitureUtils';
import axios from 'axios';
import { customToast } from '../../../../../../components/toast/custom-react-toastify/v1';
import { BringItemsModal } from './wegets/weget-bring-items-modal';

const API_SERVER_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiServerAddress : process.env.production.apiServerAddress

const StyledContainer = styled.div`
    margin-top: 20px;
    border: 1px solid #e0e0e0;
    background: #fff;
    padding: 20px;
    border-radius: 15px;
    box-shadow: var(--defaultBoxShadow);
    height: 250px;
`;

const StyledWorkspaceSelector = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    @media all and (max-width: 992px){
        flex-direction: column;
    }

    .selected-workspace-name{
        font-weight: 700;
    }

    .connection-status{
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 14px;
        color: #666;
    }

    & button{
        padding: 0;
        height: 48px;
        border: none;
        background: #333;
        color: #fff;
        font-size: 14px;
        border-radius: 5px;
        width: 150px;

        @media all and (max-width: 992px){
            width: 100%;
        }
    }

    .retry-button{
        width: auto;
        height: auto;
        padding: 8px 16px;
        font-size: 12px;
        background: #e0e0e0;
        color: #333;
    }
`;

const StyledGetButtonBox = styled.div`
    margin-top: 20px;
    .button-item{
        margin: 0 auto;
        padding: 0;
        height: 48px;
        border: none;
        background: var(--mainColor);
        color: #fff;
        font-size: 16px;
        border-radius: 5px;
        width: 300px;

        @media all and (max-width: 992px){
            width: 100%;
        }
    }
`;

export function WorkspaceUploaderControl({
    onBringErpItemsFromOtherWorkspace
}) {
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const managedWorkspaceApisValueContextHook = useManagedWorkspaceApisValueContextHook();
    const managedWorkspaceApisActionsContextHook = useManagedWorkspaceApisActionsContextHook();

    const [selectorModalOpen, setSelectorModalOpen] = useState(false);
    const [selectedManagedWorkspaceApi, setSelectedManagedWorkspaceApi] = useState(null);
    const [managedWorkspaceConnectionStatus, setManagedWorkspaceConnectionStatus] = useState('CONNECTING'); // CONNECTING, CONNECTED, FAILED

    const [bringItemsModalOpen, setBringItemsModalOpen] = useState(false);

    useEffect(() => {
        handleReqFetchManagedWorkspaceApis();
    }, [wsId]);

    useEffect(() => {
        if (!managedWorkspaceApisValueContextHook?.managedWorkspaceApis || managedWorkspaceApisValueContextHook?.managedWorkspaceApis.length === 0 || !selectedManagedWorkspaceApi) {
            setSelectedManagedWorkspaceApi(null);
            return;
        }

        // selectedManagedWorkspaceApi 업데이트
        const newSelectedApi = managedWorkspaceApisValueContextHook.managedWorkspaceApis.find(api => api?.uuid === selectedManagedWorkspaceApi?.uuid);
        if (newSelectedApi) {
            setSelectedManagedWorkspaceApi(newSelectedApi);
            setManagedWorkspaceConnectionStatus('CONNECTING');
            handleReqCheckConnection(newSelectedApi);
        } else {
            // 선택된 API가 목록에 없으면 초기화
            setSelectedManagedWorkspaceApi(null);
        }

    }, [managedWorkspaceApisValueContextHook.managedWorkspaceApis]);

    const handleReqFetchManagedWorkspaceApis = async () => {
        const fetchResult = await managedWorkspaceApiDataConnect().searchList({
            headers: { wsId: wsId }
        });

        if (fetchResult?.content) {
            managedWorkspaceApisActionsContextHook.managedWorkspaceApis.setValue(fetchResult?.content);
        }
    }

    const handleReqCheckConnection = async (data) => {
        const timestamp = Date.now().toString();
        const signiture = customSignitureUtils.generateSigniture({ apiKey: data?.managedWorkspaceApiKey, secretKey: data?.managedWorkspaceSecretKey, timestamp: timestamp })
        let headers = customSignitureUtils.makeHeaders({ apiKey: data?.managedWorkspaceApiKey, timestamp: timestamp, signiture: signiture });

        const checkConnectionResult = await axios.get(`${API_SERVER_ADDRESS}/api/workspace-api/check-connection`, {
            headers: headers
        }).then(res => {
            if (res.status === 200) {
                return {
                    res: res,
                    content: res.data?.content
                }
            }
        }).catch(err => {
            return null;
        })

        if (checkConnectionResult?.content) {
            setManagedWorkspaceConnectionStatus('CONNECTED');
        } else {
            setManagedWorkspaceConnectionStatus('FAILED');
        }
    }

    return (
        <>
            <StyledContainer>
                <StyledWorkspaceSelector>
                    <CustomBlockButton
                        type='button'
                        onClick={() => { setSelectorModalOpen(true) }}
                    >
                        워크스페이스 선택
                    </CustomBlockButton>
                    {selectedManagedWorkspaceApi &&
                        <>
                            <div className='selected-workspace-name'>{selectedManagedWorkspaceApi?.managedWorkspaceName}</div>
                            <div className='connection-status'>
                                {managedWorkspaceConnectionStatus === 'CONNECTING' &&
                                    <>
                                        Connecting
                                        <Loader size={14} className='animation-spin' />
                                    </>
                                }
                                {managedWorkspaceConnectionStatus === 'CONNECTED' &&
                                    <>
                                        Connected
                                        <Check size={14} color={'var(--defaultGreenColor)'} />
                                    </>
                                }
                                {managedWorkspaceConnectionStatus === 'FAILED' &&
                                    <>
                                        Connection Failed
                                        <X size={14} color={'var(--defaultRedColor)'} />
                                    </>
                                }
                                <RotateCcw
                                    size={14}
                                    cursor={'pointer'}
                                    onClick={async () => {
                                        setManagedWorkspaceConnectionStatus('CONNECTING');
                                        await handleReqCheckConnection(selectedManagedWorkspaceApi);
                                    }}
                                />
                            </div>
                        </>
                    }
                </StyledWorkspaceSelector>
                <StyledGetButtonBox>
                    <CustomBlockButton
                        type='button'
                        className='button-item'
                        onClick={() => setBringItemsModalOpen(true)}
                        disabled={!selectedManagedWorkspaceApi || managedWorkspaceConnectionStatus !== 'CONNECTED'}
                    >
                        가져오기
                    </CustomBlockButton>
                </StyledGetButtonBox>
            </StyledContainer>

            {selectorModalOpen &&
                <WegetWorkspaceSelectorModal
                    open={selectorModalOpen}
                    onClose={() => { setSelectorModalOpen(false) }}
                    onReqFetchManagedWorkspaceApis={handleReqFetchManagedWorkspaceApis}
                    onSelectManagedWorkspaceApi={async (selectedApi) => {
                        setManagedWorkspaceConnectionStatus('CONNECTING');
                        setSelectedManagedWorkspaceApi(selectedApi);
                        await handleReqCheckConnection(selectedApi);
                    }}
                />
            }

            {bringItemsModalOpen &&
                <BringItemsModal
                    open={bringItemsModalOpen}
                    onClose={() => { setBringItemsModalOpen(false) }}
                    selectedManagedWorkspaceApi={selectedManagedWorkspaceApi}
                    onBringErpItemsFromOtherWorkspace={onBringErpItemsFromOtherWorkspace}
                />
            }
        </>
    );
}