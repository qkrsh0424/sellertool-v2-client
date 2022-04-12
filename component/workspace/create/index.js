import { useRouter } from 'next/router';
import { useEffect, useReducer, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { csrfDataConnect } from '../../../data_connect/csrfDataConnect';
import { workspaceDataConnect } from '../../../data_connect/workspaceDataConnect';
import CommonModalComponent from '../../modules/CommonModalComponent';
import NameModalComponent from './name-modal/NameModal.component';
import PageContentComponent from './page-content/PageContent.component';
import PageHeaderComponent from './page-header/PageHeader.component';

const Container = styled.div`
    margin-bottom: 100px;
`;

const WorkspaceCreateMainComponent = (props) => {
    let router = useRouter();
    const userRdx = useSelector(state => state.userState);

    const [workspace, dispatchWorkspace] = useReducer(workspaceReducer, initialWorkspace);
    const [workspaceNameModalOpen, setWorkspaceNameModalOpen] = useState(false);

    useEffect(() => {
        if (!userRdx || !userRdx.info || !workspaceNameModalOpen) {
            return;
        }

        dispatchWorkspace({
            type: 'CHANGE_DATA',
            payload: {
                name: 'name',
                value: `${userRdx.info.nickname}의 셀러툴`
            }
        })
    }, [userRdx, workspaceNameModalOpen])
    const __workspace = {
        req: {
            createPrivate: async (body) => {
                await csrfDataConnect().getApiCsrf();
                await workspaceDataConnect().createPrivate(body)
                    .then(res => {
                        if (res.status === 200) {
                            localStorage.setItem('sellertool-wsId', res.data?.data);
                            router.push('/');
                        }
                    })
                    .catch(err => {
                        let res = err.response;

                        if (res?.status === 500) {
                            alert('undefined error.');
                            return;
                        }

                        console.log(res);
                    })
            },
            createPublic: async () => {

            }
        },
        action: {
            create: async () => {
                console.log(workspace)
                if (workspace.publicYn === 'n') {
                    await __workspace.req.createPrivate(workspace);
                }
                __workspace.action.closeNameModal();
            },
            openNameModal: () => {
                setWorkspaceNameModalOpen(true);
            },
            closeNameModal: () => {
                setWorkspaceNameModalOpen(false);
            }
        },
        change: {
            onPublic: () => {
                dispatchWorkspace({
                    type: 'CHANGE_DATA',
                    payload: {
                        name: 'publicYn',
                        value: 'y'
                    }
                })
            },
            onPrivate: () => {
                dispatchWorkspace({
                    type: 'CHANGE_DATA',
                    payload: {
                        name: 'publicYn',
                        value: 'n'
                    }
                })
            },
            name: (e) => {
                let value = e.target.value;
                if (value.length > 20) {
                    return;
                }

                dispatchWorkspace({
                    type: 'CHANGE_DATA',
                    payload: {
                        name: 'name',
                        value: e.target.value
                    }
                })
            }
        }
    }
    return (
        <>
            <Container>
                <PageHeaderComponent></PageHeaderComponent>
                <PageContentComponent
                    workspace={workspace}

                    _onSelectPublic={__workspace.change.onPublic}
                    _onSelectPrivate={__workspace.change.onPrivate}
                    _onOpenNameModal={__workspace.action.openNameModal}
                ></PageContentComponent>
            </Container>

            {/* Modal */}
            <CommonModalComponent
                open={workspaceNameModalOpen}

                onClose={__workspace.action.closeNameModal}
            >
                <NameModalComponent
                    workspace={workspace}

                    onChangeName={__workspace.change.name}
                    onClose={__workspace.action.closeNameModal}
                    onConfirm={__workspace.action.create}
                ></NameModalComponent>
            </CommonModalComponent>
        </>
    );
}
export default WorkspaceCreateMainComponent;

const initialWorkspace = {
    cid: null,
    id: null,
    name: '',
    masterId: null,
    publicYn: 'n',
    deleteProtectionYn: 'n',
    createdAt: null,
    updatedAt: null
}

const workspaceReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_DATA':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        default: return initialWorkspace;
    }
}