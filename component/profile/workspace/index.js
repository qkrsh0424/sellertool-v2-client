import { useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { workspaceDataConnect } from '../../../data_connect/workspaceDataConnect';
import Layout from '../layout/Layout';
import HeadComponent from './head/Head.component';
import WorkspaceListComponent from './workspace-list/WorkspaceList.component';

const Container = styled.div`

`;

const ProfileWorkspaceMainComponent = (props) => {
    const [workspaces, dispatchWorkspaces] = useReducer(workspacesReducer, initialWorkspaces);

    useEffect(() => {
        __workspace.req.fetchWorkspaces();
    }, []);

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
                    .catch(err => {
                        let res = err.response;
                        console.log(res);
                    })
            }
        }
    }

    return (
        <>
            <Layout>
                <Container>
                    <HeadComponent />
                    <WorkspaceListComponent
                        workspaces={workspaces}
                    />
                </Container>
            </Layout>
        </>
    );
}
export default ProfileWorkspaceMainComponent;

const initialWorkspaces = null;

const workspacesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialWorkspaces;
        default: return initialWorkspaces;
    }
}