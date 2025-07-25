import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import CommonModalComponent from "../modules/modal/CommonModalComponent";
import WorkspaceNoticeModalComponent from "./modal/WorkspaceNoticeModal.component";
import BannerComponent from "./banner/Banner.component";
import Section1Component from "./section1/Section1.component";
import Link from "next/link";
import { PurchaseCostCalculatorModal } from "../../components/PurchaseCostCalculatorModal/v1";
import { FdEvent } from "./FdEvent";

const Container = styled.div`
    background: var(--mainColorOpacity50);
    overflow: hidden;
    max-width: 1800px;
    margin-left: auto;
    margin-right: auto;
    .link-box{
        padding: 5px 10px;
        text-align: right;
        border-bottom: 0.8px solid #e0e0e0;
        background: #fff;

        .link{
            /* border: 1px solid #00000000; */
            font-size: 13px;
            color: #444;
            padding: 10px;
            display: inline-block;
            border-radius: 5px;
            font-weight: 500;

            &:hover{
                border: 1px solid var(--mainColor);
                color: var(--mainColor);
            }
        }
    }
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
                <BannerComponent />
                <Section1Component />
                <FdEvent />
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