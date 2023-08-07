import { useEffect } from "react";
import Layout from "../layout/Layout";
import { FdHead, FdPaymentList } from "./components";
import { Container } from "./index.styled";
import { useDataSourceHook, usePaymentListHook } from "./hooks";
import { HocEmptyItemsWithBox, withPendingComponent } from "../../../hoc/loading";

const FdPaymentListWithPending = withPendingComponent({
    Component: FdPaymentList,
    EmptyComponent: () => <HocEmptyItemsWithBox element={'결제내역이 없습니다.'} />
});

export default function ProfilePaymentMainComponent(props) {
    const dataSourceHook = useDataSourceHook();
    const paymentListHook = usePaymentListHook();

    useEffect(() => {
        dataSourceHook.onReqFetchPaymentList({

        }, (results, response) => {
            paymentListHook.onSetPaymentList(results);
        })
    }, []);

    return (
        <>
            <Container>
                <FdHead />
                <Layout>
                    <>
                        <FdPaymentListWithPending
                            pendingDatas={paymentListHook?.paymentList}
                            paymentList={paymentListHook?.paymentList}
                        />
                    </>
                </Layout>
            </Container>
        </>
    );
}