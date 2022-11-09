import { useRouter } from "next/router";
import { userDataConnect } from "../../data_connect/userDataConnect";
import FormFieldComponent from "./form-field/FormField.component";
import styled from 'styled-components';
import useLoginApiHook from "./hooks/useLoginApiHook";

const Container = styled.div`
    padding-bottom: 150px;
    background:var(--defaultBackground);
    overflow: hidden;
`;

export default function MainComponent(props) {
    const router = useRouter();
    const {
        reqLogin
    } = useLoginApiHook();

    const __handle = {
        submit: {
            login: async ({ loginForm }) => {
                let body = {
                    ...loginForm
                }
                
                await reqLogin({
                    body: body,
                    successCallback: () => {
                        router.replace({
                            pathname: '/'
                        })
                    }
                })
            }
        }
    }

    return (
        <>
            <Container>
                <FormFieldComponent
                    onSubmitLogin={__handle.submit.login}
                />
            </Container>
        </>
    );
}