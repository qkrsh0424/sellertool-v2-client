import CalculatorMain from "../../calculator/CalculatorMain";
import Layout from "../layout";
import { St } from "./index.styled";
import { FdHead, FdCalculator } from "./components";
import { useDataSourceHook, useMrBaseExchangeRateHook } from "./hooks";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const MainComponent = () => {
    const reduxDispatch = useDispatch();
    const mrBaseExchangeRateRedux = useSelector(state => state?.mrBaseExchangeRateRedux);
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const dataSourceHook = useDataSourceHook();

    useEffect(() => {
        if (!wsId) {
            return;
        }

        dataSourceHook.onReqFetchMrBaseExchangeRateList({ headers: { wsId: wsId } }, (results, response) => {
            reduxDispatch({
                type: 'MR_BASE_EXCHANGE_RATE_CHANGE_DATA',
                payload: {
                    name: 'mrBaseExchangeRateList',
                    value: results
                }
            })
        })

        return () => {
            reduxDispatch({
                type: 'MR_BASE_EXCHANGE_RATE_CHANGE_DATA',
                payload: {
                    name: 'mrBaseExchangeRateList',
                    value: null
                }
            })
        }
    }, [wsId]);

    return (
        <>
            <Layout>
                <St.Container>
                    <FdHead />
                    <FdCalculator
                        mrBaseExchangeRateList={mrBaseExchangeRateRedux?.mrBaseExchangeRateList}
                    />
                </St.Container>
                <CalculatorMain></CalculatorMain>
            </Layout>
        </>
    );
}

export default MainComponent;