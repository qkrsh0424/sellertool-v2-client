import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import CommonModalComponent from "../modules/modal/CommonModalComponent";
import WorkspaceNoticeModalComponent from "./modal/WorkspaceNoticeModal.component";
import BannerComponent from "./banner/Banner.component";
import Section1Component from "./section1/Section1.component";
import Link from "next/link";
import { PurchaseCostCalculatorModal } from "../../components/PurchaseCostCalculatorModal/v1";

const Container = styled.div`
    background: var(--defaultBackground);
    overflow: hidden;

    .link-box{
        padding: 5px 10px;
        text-align: right;

        .link{
            border: 1px solid #00000000;
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

    {/* TEST Code */ }
    const [purchaseCostCalcModalOpen, setPurchaseCostCalcModalOpen] = useState(false);

    const togglePurchaseCostCalcModalOpen = (setOpen) => {
        setPurchaseCostCalcModalOpen(setOpen);
    }
    {/* TEST Code */ }
    return (
        <>
            {/* TEST Code */}
            <button
                type='button'
                onClick={() => togglePurchaseCostCalcModalOpen(true)}
            >
                매입단가 계산기
            </button>
            {purchaseCostCalcModalOpen &&
                <PurchaseCostCalculatorModal
                    open={purchaseCostCalcModalOpen}
                    onClose={() => togglePurchaseCostCalcModalOpen(false)}
                />
            }
            {/* TEST Code */}
            <Container>
                <div className='link-box'>
                    <Link
                        href='https://v1.sellertool.io'
                    >
                        <a className='link'>구버전으로 이동</a>
                    </Link>
                </div>
                <BannerComponent />
                <Section1Component />
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