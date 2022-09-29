import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import CommonModalComponent from "../modules/modal/CommonModalComponent";
import HomeBody from "./HomeBody";
import WorkspaceNoticeModalComponent from "./modal/WorkspaceNoticeModal.component";

const Container = styled.div`
    margin-bottom: 150px;
`;

const HomeMain = () => {
    const userRedux = useSelector(state => state.userRedux);
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const [workspaceNoticeModalOpen, setWorkspaceNoticeModalOpen] = useState(false);

    useEffect(() => {
        if (!userRedux.isLoading && userRedux.userInfo) {
            if (!workspaceRedux.isLoading && !workspaceRedux.workspaceInfo) {
                setWorkspaceNoticeModalOpen(true);
                return;
            }
        }
    }, [userRedux.isLoading, userRedux.userInfo, workspaceRedux.isLoading, workspaceRedux.workspaceInfo]);

    const __handle = {

    }

    return (
        <>
            <Container>
                <HomeBody></HomeBody>
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