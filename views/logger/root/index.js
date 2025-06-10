import { useLayoutEffect, useEffect, useRef, useState } from "react";
import styled from 'styled-components';
import { ErpActionLogDataConnect } from "../../../data_connect/erpActionLogDataConnect";
import { useSelector } from "react-redux";
import { CustomDateUtils } from "../../../utils/CustomDateUtils";

const StyledContainer = styled.div`
    height: 500px;
    margin: 10px;
    overflow-y: auto;
    background: #333;
    color: #808080;
    padding: 10px;
`;

// [날짜] - [로그 타입] - [내용] - [닉네임]
export function MainView(props) {
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const [erpActionsLogs, setErpActionLogs] = useState(null);
    const containerRef = useRef(null);

    // 1) 초기 데이터 로드
    useEffect(() => {
        if (!workspaceRedux?.workspaceInfo?.id) {
            return;
        }

        async function fetchInit() {
            let headers = {
                wsId: workspaceRedux?.workspaceInfo?.id
            }
            const logsResponse = await ErpActionLogDataConnect().getLogs({ headers: headers })

            if (logsResponse?.data?.data) {
                setErpActionLogs(logsResponse?.data?.data);
            }
        }
        fetchInit();
    }, [workspaceRedux?.workspaceInfo?.id]);

    // 2) logs 가 바뀐 직후(렌더 직전)에 스크롤 최하단으로
    useEffect(() => {
        if (erpActionsLogs && containerRef.current) {
            const el = containerRef.current;
            el.scrollTop = el.scrollHeight;
        }
    }, [erpActionsLogs]);

    if (!erpActionsLogs) {
        return (
            <StyledContainer>
                로그를 불러오는 중입니다.
            </StyledContainer>
        );
    }

    return (
        <StyledContainer
            ref={containerRef}
        >
            log start...
            {erpActionsLogs.map((erpActionsLog, index) => (
                <div key={index}>
                    <span style={{ color: '#808080' }}>[{CustomDateUtils().dateToYYYYMMDDhhmmss(erpActionsLog?.createdAt)}]</span> - {getLogTypeName(erpActionsLog?.logType)} - <span style={{ color: '#fff', fontWeight: '500' }}>{erpActionsLog?.log}</span> - ({erpActionsLog?.createdByWorkspaceMemberNickname || '알수없음'})
                </div>
            ))}
        </StyledContainer>
    );
}

function getLogTypeName(logType) {
    switch (logType) {
        case 'ERP_INVENTORY_RELEASE_OK':
            return <span style={{ color: '#3fe87f' }}>[통합주문관리 재고반영 완료]</span>;
        case 'ERP_INVENTORY_RELEASE_CANCEL':
            return <span style={{ color: '#ef3753' }}>[통합주문관리 재고반영 취소]</span>;
        default:
            return 'UNKNOWN';
    }

}