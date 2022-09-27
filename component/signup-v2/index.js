import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import ConsentFieldComponent from "./consent-field/ConsentField.component";
import FormFieldComponent from "./form-field/FormField.component";
import useApiHook from "./hooks/useApiHook";
import useConsentFormHook from "./hooks/useConsentFormHook";

const Container = styled.div`
    padding-bottom: 150px;
    background:#f9fbfc;
    overflow: hidden;
`;

const MainComponent = () => {
    const router = useRouter();
    const [signupFormModeOpen, setSignupFormModeOpen] = useState(false);

    const {
        reqSignup
    } = useApiHook();

    const {
        consentForm,
        returnSelectedAll,
        onChangeValueOfName,
        onSelectAll
    } = useConsentFormHook();

    const __handle = {
        action: {
            openSignupFormMode: () => {
                if (consentForm.serviceTermsYn === 'n') {
                    alert('서비스 이용약관 동의는 필수 선택 입니다.');
                    return;
                }

                if (consentForm.privacyPolicyYn === 'n') {
                    alert('서비스 개인정보취급방침 동의는 필수 선택 입니다.');
                    return;
                }
                setSignupFormModeOpen(true);
            },
            closeSignupFormModal: () => {
                setSignupFormModeOpen(false);
            }
        },
        submit: {
            signup: async ({ signupForm, successCallback }) => {
                let body = {
                    ...signupForm,
                    ...consentForm
                }

                await reqSignup({
                    body: body,
                    successCallback: () => {
                        router.replace({
                            pathname: '/login'
                        })
                    }
                });
            }
        }
    }
    if (signupFormModeOpen) {
        return (
            <>
                <Container>
                    <FormFieldComponent
                        onSubmitSignup={__handle.submit.signup}

                        onActionCloseSignupFormMode={__handle.action.closeSignupFormModal}
                    />
                </Container>
            </>
        );
    }

    return (
        <Container>
            <ConsentFieldComponent
                consentForm={consentForm}
                returnSelectedAll={returnSelectedAll}

                onChangeValueOfName={onChangeValueOfName}
                onSelectAll={onSelectAll}
                onActionOpenSignupFormMode={__handle.action.openSignupFormMode}
            />
        </Container>
    );
}

export default MainComponent;