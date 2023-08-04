import { useEffect } from "react";
import { FdPlanList } from "./components";
import { Container, TitleFieldWrapper } from "./index.styled";
import { useDataSourceHook, useRefSubscriptionPlanListHook } from "./hooks";

export default function SubscriptionPlanComponent({ workspace }) {
    const dataSourceHook = useDataSourceHook();
    const refSubscriptionPlanListHook = useRefSubscriptionPlanListHook();

    useEffect(() => {
        async function initialize() {
            await dataSourceHook.onReqFetchRefSubscriptionPlanList(null,
                (results, response) => {
                    refSubscriptionPlanListHook.onSetRefSubscriptionPlanList(results);
                }
            )
        }
        initialize();
    }, []);

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
                />
            </Container>
        </>
    );
}