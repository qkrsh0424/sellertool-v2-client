import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { csrfDataConnect } from "../../../data_connect/csrfDataConnect";
import { loginDataConnect } from "../../../data_connect/loginDataConnect";
import { Container, Wrapper } from "./index.styled";
import InfoFieldComponent from "./info-field/InfoField.component";
import LogoFieldComponent from "./logo-field/LogoField.component";

const PrimaryNavbarMainComponent = (props) => {
    const router = useRouter();
    const userRdx = useSelector(state => state.userState)

    const __auth = {
        req: {
            logout: async () => {
                await loginDataConnect().logout()
                    .then(res => {
                        if (res.status === 200 && res.data.message === 'success') {
                            router.replace('/');
                        }
                    })
                    .catch(err => {
                        let res = err.response;

                        console.log(err);
                        if (res?.status === 500) {
                            alert('undefined error')
                            return;
                        }

                        alert(res.data.memo);
                    })
            }
        },
        action: {
            logout: async () => {
                await csrfDataConnect().getAuthCsrf();
                await __auth.req.logout();
            }
        }
    }

    return (
        <>
            <Container>
                <Wrapper>
                    <LogoFieldComponent></LogoFieldComponent>
                    <InfoFieldComponent
                        isLoading={userRdx?.isLoading}
                        userInfo={userRdx?.info}
                        onLogout={__auth.action.logout}
                    ></InfoFieldComponent>
                </Wrapper>
            </Container>
        </>
    );
}
export default PrimaryNavbarMainComponent;