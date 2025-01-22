import { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import * as St from './index.styled';
import { WegetDataTable } from "./wegets/weget-data-table/weget-data-table";
import { WegetTabs } from "./wegets/weget-tabs/weget-tabs";
import { ReturnExchangeDataConnect } from "../../../../data_connect/ReturnExchangeDataConnect";
import { useSelector } from "react-redux";
import { useReturnExchangeActionsHook, useReturnExchangeValueHook } from "./contexts/ReturnExchangeProvider";
import { ProductOptionDataConnect } from "../../../../data_connect/productOptionDataConnect";
import { customToast } from "../../../../components/toast/custom-react-toastify/v1";

const returnExchangeDataConnect = ReturnExchangeDataConnect();
const productOptionDataConnect = ProductOptionDataConnect.Common();

export function MainView(props) {
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const returnExchangeValueHook = useReturnExchangeValueHook();
    const returnExchangeActionsHook = useReturnExchangeActionsHook();

    useEffect(() => {
        if (!wsId) {
            return;
        }

        handleReqFetchReturnExchanges();
    }, [wsId]);

    useEffect(() => {
        if (!returnExchangeValueHook.returnExchanges || returnExchangeValueHook.returnExchanges?.length <= 0) {
            return;
        }

        handleReqFetchProductInfo();
    }, [returnExchangeValueHook.returnExchanges]);

    const handleReqFetchReturnExchanges = async () => {
        const fetchResult = await returnExchangeDataConnect.searchList({ params: null, headers: { wsId: wsId } })
            .then(res => res?.status === 200 ? { res: res, content: res?.data?.data } : { res: res, content: null })
            .catch(err => {
                console.error(err);
                return null;
            });
        ;

        if (fetchResult?.content) {
            returnExchangeActionsHook.returnExchangesActions.setValue(fetchResult?.content);
        }
    }

    const handleReqFetchProductInfo = async () => {
        const fetchResult = await productOptionDataConnect.searchAllByCodes({
            body: {
                codes: [...new Set(returnExchangeValueHook.returnExchanges?.flatMap(({ releaseOptionCode, exchangeProductOptionCode }) => [releaseOptionCode, exchangeProductOptionCode]).filter(Boolean))]
            },
            headers: { wsId: wsId }
        })
            .then(res => res?.status === 200 ? { res: res, content: res?.data?.data } : { res: res, content: null })
            .catch(err => {
                customToast.error(err?.response?.data?.memo || '에러가 발생했습니다.');
                return null;
            });

        if (fetchResult?.content) {
            returnExchangeActionsHook.productOptionsActions.setValue(fetchResult?.content);
        }
    }

    return (
        <>
            <St.Container>
                <Layout
                    sidebarName={'통합 발주 관리'}
                    headerName={'반품/교환관리'}
                    sidebarColor={'#ffffff'}
                >
                    <WegetTabs />
                    <WegetDataTable />
                </Layout>
            </St.Container>
        </>
    );
}