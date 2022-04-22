import { useRouter } from 'next/router';
import { useReducer, useState } from 'react';
import styled from 'styled-components';
import { workspaceDataConnect } from '../../../../data_connect/workspaceDataConnect';
import CommonModalComponent from '../../../modules/CommonModalComponent';
import Ripple from '../../../modules/Ripple';
import WorkspacesModalComponent from '../workspaces-modal/WorkspacesModal.component';

const Container = styled.div`
    margin-top: 20px;
    padding:0 40px;

    @media all and (max-width:992px){
        padding: 0 10px;
    }
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: flex-end;

    @media all and (max-width:992px){
        justify-content: center;
    }

    .selector-button-el{
        position:relative;
        overflow: hidden;
        padding: 10px 5px;
        width: 280px;

        background: #ffffff;
        border: 1px solid #e0e0e0;

        color:#626262;
        font-size: 14px;
        font-weight: 500;
        
        cursor: pointer;

        &:hover{
            background: #2C73D2;
            border: 1px solid #2C73D2;

            color:white;
        }

        @media all and (max-width:992px){
            width: 100%;
        }
    }
`;

const WorkspaceSelectorComponent = (props) => {
    const router = useRouter();

    const [workspaces, dispatchWorkspaces] = useReducer(workspacesReducer, initialWorkspaces);
    const [selectorModalOpen, setSelectorModalOpen] = useState(false);

    const __workspace = {
        req: {
            fetchWorkspaces: async () => {
                await workspaceDataConnect().getWorkspaces()
                    .then(res => {
                        if (res.status === 200) {
                            dispatchWorkspaces({
                                type: 'SET_DATA',
                                payload: res.data.data
                            })
                        }
                    })
            }
        },
        action: {
            openWorkspacesModal: () => {
                __workspace.req.fetchWorkspaces();
                setSelectorModalOpen(true);
            },
            closeWorkspacesModal: () => {
                setSelectorModalOpen(false);
            },
            select: (workspace) => {
                router.replace(
                    {
                        pathname: router.pathname,
                        query: {
                            ...router.query,
                            wsId: workspace.id
                        }
                    }
                )
                __workspace.action.closeWorkspacesModal();
            }
        }
    }

    return (
        <>
            <Container>
                <Wrapper>
                    <button
                        type='button'
                        className='selector-button-el'
                        onClick={__workspace.action.openWorkspacesModal}
                    >
                        워크스페이스 선택
                        <Ripple color={'#e0e0e060'} duration={1000}></Ripple>
                    </button>
                </Wrapper>
            </Container>

            <CommonModalComponent
                open={selectorModalOpen}

                onClose={__workspace.action.closeWorkspacesModal}
            >
                <WorkspacesModalComponent
                    workspaces={workspaces}

                    onActionSelectWorkspace={__workspace.action.select}
                />
            </CommonModalComponent>
        </>
    );
}
export default WorkspaceSelectorComponent;

const initialWorkspaces = null;

const workspacesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        default: return initialWorkspaces;
    }
}