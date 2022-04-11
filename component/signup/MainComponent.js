import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import { csrfDataConnect } from "../../data_connect/csrfDataConnect";
import { signupDataConnect } from "../../data_connect/signupDataConnect";
import { userDataConnect } from "../../data_connect/userDataConnect";
import BodyComponent from "./BodyComponent";

const Container = styled.div`
    margin-bottom: 150px;
`;

const MainComponent = () => {
    const router = useRouter();

    const [isNotDuplicatedState, setIsNotDuplicatedState] = useState({
        username: false
    });

    const __handleDataConnect = () => {
        return {
            signup: async function (params) {
                await csrfDataConnect().getAuthCsrf();
                await signupDataConnect().signup(params)
                    .then(res => {
                        if(res.status===200 && res.data.message === 'success'){
                            router.replace('/login');
                        }
                    })
                    .catch(err => {
                        let res = err.response;

                        alert(res.data.memo);
                    })
            },
            checkUsernameDuplicate: async function (params) {
                await userDataConnect().checkUsernameDuplicate(params)
                    .then(res => {
                        if (res.status === 200 && res.data.message === 'success') {
                            let result = res.data?.data;
                            if (!result.isEmpty && !result.isDuplicated) {
                                setIsNotDuplicatedState({
                                    ...isNotDuplicatedState,
                                    username: true
                                });
                                return;
                            }
                        }
                        setIsNotDuplicatedState({
                            ...isNotDuplicatedState,
                            username: false
                        });
                    })
                    .catch(err => {
                        setIsNotDuplicatedState({
                            ...isNotDuplicatedState,
                            username: false
                        });
                        alert('유저 중복 체크 에러');
                    })
            }
        }
    }

    const __handleEventControl = () => {
        return {
            onSubmitSignup: async function (inputValueState) {
                await __handleDataConnect().signup(inputValueState);
            },
            onCheckUsernameDuplicate: async function(inputValueState){
                await __handleDataConnect().checkUsernameDuplicate(inputValueState);
            }
        }
    }
    return (
        <>
            <Container>
                <BodyComponent
                    isNotDuplicatedState={isNotDuplicatedState}

                    onCheckUsernameDuplicate={(inputValueState)=>__handleEventControl().onCheckUsernameDuplicate(inputValueState)}
                    onSubmitSignup={(inputValueState) => __handleEventControl().onSubmitSignup(inputValueState)}
                ></BodyComponent>
            </Container>
        </>
    );
}

export default MainComponent;