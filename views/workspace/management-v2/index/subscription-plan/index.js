import { useEffect } from "react";
import { FdCheckNotice, FdPlanList } from "./components";
import { Container, TitleFieldWrapper } from "./index.styled";
import { useDataSourceHook, useRefSubscriptionPlanListHook } from "./hooks";
import { useState } from "react";

export default function SubscriptionPlanComponent({ workspace }) {
    const dataSourceHook = useDataSourceHook();
    const refSubscriptionPlanListHook = useRefSubscriptionPlanListHook();
    const [eventAppliedLogList, setEventAppliedLogList] = useState(null);

    useEffect(() => {
        async function initialize() {
            await dataSourceHook.onReqFetchRefSubscriptionPlanList(null,
                (results, response) => {
                    refSubscriptionPlanListHook.onSetRefSubscriptionPlanList(results);
                }
            )
            await dataSourceHook.onReqFetchEventAppliedLogList(null, (results, response) => {
                handleSetEventAppliedLogList(results);
            })
        }
        initialize();
    }, []);

    const handleSetEventAppliedLogList = (values) => {
        setEventAppliedLogList(values);
    }

    if (!refSubscriptionPlanListHook.refSubscriptionPlanList) {
        return null;
    }

    if (!eventAppliedLogList) {
        return null;
    }

    return (
        <>
            <Container>
                <TitleFieldWrapper>
                    <div className='mgl-flex mgl-flex-alignItems-center'>
                        <div>
                            구독플랜
                        </div>
                    </div>
                </TitleFieldWrapper>
                <FdPlanList
                    currentWorkspace={workspace}
                    refSubscriptionPlanList={refSubscriptionPlanListHook.refSubscriptionPlanList}
                    eventAppliedLogList={eventAppliedLogList}
                />
                <FdCheckNotice

                />
            </Container>
        </>
    );
}