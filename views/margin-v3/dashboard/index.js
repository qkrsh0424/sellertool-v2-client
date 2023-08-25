import CalculatorMain from "../../calculator/CalculatorMain";
import Layout from "../layout";
import { St } from "./index.styled";
import { FdHead, FdCalculator } from "./components";
import { useDataSourceHook, useMrBaseExchangeRateHook } from "./hooks";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const MainComponent = () => {
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const dataSourceHook = useDataSourceHook();
    const mrBaseExchangeRateHook = useMrBaseExchangeRateHook();

    useEffect(() => {
        if (!wsId) {
            return;
        }

        dataSourceHook.onReqFetchMrBaseExchangeRateList({ headers: { wsId: wsId } }, (results, response) => {
            mrBaseExchangeRateHook.onSetMrBaseExchangeRateList(results);
        })
    }, [wsId]);
    
    return (
        <>
            <Layout>
                <St.Container>
                    <FdHead />
                    <FdCalculator
                        mrBaseExchangeRateList={mrBaseExchangeRateHook?.mrBaseExchangeRateList}
                    />
                </St.Container>
                <CalculatorMain></CalculatorMain>
            </Layout>
        </>
    );
}

export default MainComponent;