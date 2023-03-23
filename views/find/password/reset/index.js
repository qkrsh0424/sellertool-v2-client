import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from 'styled-components';
import { resetPasswordTokenDataConnect } from "../../../../data_connect/resetPasswordTokenDataConnect";
import FieldLoadingV2 from "../../../modules/loading/FieldLoadingV2";
import FormFieldComponent from "./form-field/FormField.component";

const Container = styled.div`
    background:var(--defaultBackground);
    min-height: 100vh;
`;

export default function MainComponent(props) {
    const router = useRouter();
    const isReady = router?.isReady;
    const resetToken = router?.query?.resetToken;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function init() {
            if (!isReady) {
                return;
            }

            if (!resetToken) {
                alert('페이지가 유효하지 않습니다.');
                router.replace({
                    pathname: '/login'
                })
                return;
            }

            let validChecker = await reqCheckTokenValid({ resetToken });

            if (validChecker === 'valid') {
                setIsLoading(false)
            } else {
                setIsLoading(true);
                alert('유효기간이 만료되었습니다.');
                router.back();
            }
        }

        init();

    }, [isReady, resetToken]);

    const reqCheckTokenValid = async () => {
        return await resetPasswordTokenDataConnect().checkTokenValid({ resetToken })
            .then(res => {
                if (res.status === 200) {
                    return res.data.message;
                }
            })
            .catch(err => {
                let res = err.response;

                if (!res) {
                    alert('네트워크 연결이 원활하지 않습니다.');
                    return;
                }

                if (res.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res.data.memo);
            })
            ;
    }

    const handleSubmitResetPassword = async (form) => {
        let body = {
            ...form,
            resetPasswordTokenId: resetToken
        }

        await resetPasswordTokenDataConnect().changePassword(body)
            .then(res => {
                if (res.status === 200) {
                    alert('비밀번호가 정상적으로 변경되었습니다.\n현재 로그인된 모든 환경에서 로그아웃 됩니다.');
                    router?.replace({
                        pathname: '/login'
                    })
                }
            })
            .catch(err => {
                let res = err.response;

                if (!res) {
                    alert('네트워크 연결이 원활하지 않습니다.');
                    return;
                }

                if (res.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res.data.memo);
            })
            ;
    }
    return (
        <Container>
            {!isLoading ?
                <FormFieldComponent
                    onSubmitResetPassword={handleSubmitResetPassword}
                />
                :
                <FieldLoadingV2 />
            }
        </Container>
    );
}