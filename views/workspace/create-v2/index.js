import { useRouter } from 'next/router';
import { useEffect, useReducer, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { csrfDataConnect } from '../../../data_connect/csrfDataConnect';
import { workspaceDataConnect } from '../../../data_connect/workspaceDataConnect';
import CommonModalComponent from '../../modules/modal/CommonModalComponent';
import useApiHook from './hooks/useApiHook';
import NameModalComponent from './name-modal/NameModal.component';
import PageContentComponent from './page-content/PageContent.component';
import PageHeaderComponent from './page-header/PageHeader.component';

const Container = styled.div`
    padding-bottom: 100px;
    overflow: hidden;
    background:var(--defaultBackground);
    min-height: 800px;
`;

const WorkspaceCreateMainComponent = (props) => {
    let router = useRouter();

    const {
        reqCreateWorkspacePrivate
    } = useApiHook();

    const __handle = {
        submit: {
            createWorkspace: async ({
                body,
                successCallback
            }) => {
                let subscriptionPlan = body.subscriptionPlan;

                if (subscriptionPlan === 'NONE') {
                    await reqCreateWorkspacePrivate({
                        body: body,
                        successCallback: () => {
                            successCallback();
                            router.replace({
                                pathname: '/workspace/select'
                            })
                        }
                    });
                }
            }
        }
    }

    return (
        <>
            <Container>
                <PageHeaderComponent></PageHeaderComponent>
                <PageContentComponent
                    onSubmitCreateWorkspace={__handle.submit.createWorkspace}
                />
            </Container>
        </>
    );
}
export default WorkspaceCreateMainComponent;