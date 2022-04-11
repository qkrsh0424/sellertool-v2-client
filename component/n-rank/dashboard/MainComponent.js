import { useEffect, useReducer, useState } from "react";
import styled from "styled-components";
import { naverRankDataConnect } from "../../../data_connect/naverRankDataConnect";
import BackdropLoading from "../../modules/BackdropLoading";
import LocationNavComponent from "./LocationNavComponent";
import ResultDashboardComponent from "./ResultDashboardComponent";
import SearchConsoleComponent from "./SearchConsoleComponent";

const Container = styled.div`
    margin-bottom: 150px;
`;

const initialRankDataState = null;

const rankDataStateReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload
    }
}
const MainComponent = () => {
    const [rankDataState, dispatchRankDataState] = useReducer(rankDataStateReducer, initialRankDataState);

    const [backdropLoadingOpen, setBackdropLoadingOpen] = useState(false);

    useEffect(() => {
        async function fetchInit() {
            await naverRankDataConnect().getHello()
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
        }

        fetchInit();
    }, [])

    const __handleDataConnect = () => {
        return {
            getRankData: async function (searchValueState) {
                await naverRankDataConnect().getNaverRank(searchValueState)
                    .then(res => {
                        console.log(res)
                        if (res.status === 200 && res.data.message === 'success') {
                            dispatchRankDataState({
                                type: 'SET_DATA',
                                payload: res.data.data
                            })
                        }
                    })
                    .catch(err => {
                        let res = err.response;

                        console.log(res)
                    })
            }
        }
    }

    const __handleEventControl = () => {
        return {
            onSearchRank: async function (searchValueState) {
                setBackdropLoadingOpen(true);
                await __handleDataConnect().getRankData(searchValueState);
                setBackdropLoadingOpen(false);
            }
        }
    }

    return (
        <>
            <Container>
                <LocationNavComponent></LocationNavComponent>
                <SearchConsoleComponent
                    onSearchRank={(searchValueState) => __handleEventControl().onSearchRank(searchValueState)}
                ></SearchConsoleComponent>
                <ResultDashboardComponent
                    rankDataState={rankDataState}
                ></ResultDashboardComponent>
            </Container>
            <BackdropLoading
                open={backdropLoadingOpen}
            ></BackdropLoading>
        </>
    );
}

export default MainComponent;