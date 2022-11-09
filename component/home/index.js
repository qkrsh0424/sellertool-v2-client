import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import CommonModalComponent from "../modules/modal/CommonModalComponent";
import ServiceListComponent from "./service-list/ServiceList.component";
import WorkspaceNoticeModalComponent from "./modal/WorkspaceNoticeModal.component";

const Container = styled.div`
    background: var(--defaultBackground);
    overflow: hidden;
    padding-bottom: 150px;
`;

const HomeMain = () => {
    const userRedux = useSelector(state => state.userRedux);
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const [workspaceNoticeModalOpen, setWorkspaceNoticeModalOpen] = useState(false);

    useEffect(() => {
        if (!userRedux.isLoading && userRedux.userInfo) {
            if (!workspaceRedux.isLoading && !workspaceRedux.workspaceInfo) {
                __handle.action.openWorkspaceNoticeModal();
                return;
            }
            __handle.action.closeWorkspaceNoticeModal();
        }
    }, [userRedux.isLoading, userRedux.userInfo, workspaceRedux.isLoading, workspaceRedux.workspaceInfo]);

    const __handle = {
        action: {
            openWorkspaceNoticeModal: () => {
                setWorkspaceNoticeModalOpen(true);
            },
            closeWorkspaceNoticeModal: () => {
                setWorkspaceNoticeModalOpen(false);
            }
        }
    }

    return (
        <>
            <Container>
                <ServiceListComponent></ServiceListComponent>
            </Container>

            <CommonModalComponent
                open={workspaceNoticeModalOpen}
                onClose={() => { }}
            >
                <WorkspaceNoticeModalComponent

                />
            </CommonModalComponent>
        </>
    );
}

export default HomeMain;