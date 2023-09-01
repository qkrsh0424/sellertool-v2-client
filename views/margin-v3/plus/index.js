import { useEffect } from "react";
import Layout from "../layout";
import { FdMarginRecordList } from "./components";
import { St } from "./index.styled";
import { useSelector } from "react-redux";
import { useDataSourceHook, useMarginRecordHook } from "./hooks";

export default function MainComponent(props) {
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const dataSourceHook = useDataSourceHook();
    const marginRecordHook = useMarginRecordHook();

    useEffect(() => {
        if (!wsId) {
            return;
        }

        async function initialize() {
            let marginRecordPage = null;

            await dataSourceHook.onReqFetchMarginRecordPage({ headers: { wsId: wsId } }, (results) => {
                marginRecordPage = results;
            })

            if (marginRecordPage) {
                marginRecordHook.onSetMarginRecordList(marginRecordPage?.content);
            }
        }

        initialize();
    }, [wsId]);

    const handleSelectMarginRecord = (value) => {
        marginRecordHook.onSetSelectedMarginRecord(value);
    }
    return (
        <>
            <Layout>
                <St.Container>
                    <St.Title>
                        <div className='title'>마진율 계산기</div>
                        <div className='tagBadge'>플러스+</div>
                    </St.Title>
                    <St.BodyWrapper>
                        <div className='marginRecordList-wrapper'>
                            <FdMarginRecordList
                                marginRecordList={marginRecordHook?.marginRecordList}
                                selectedMarginRecord={marginRecordHook?.selectedMarginRecord}
                                onSelectMarginRecord={handleSelectMarginRecord}
                            />
                        </div>
                        <div className='calculator-wrapper'>

                        </div>
                    </St.BodyWrapper>
                </St.Container>
            </Layout>
        </>
    );
}