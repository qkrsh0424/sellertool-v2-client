import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { userDataConnect } from "../../../data_connect/userDataConnect";
import { Container, Wrapper } from "./index.styled";
import InfoFieldComponent from "./info-field/InfoField.component";
import LogoFieldComponent from "./logo-field/LogoField.component";

const PrimaryNavbarMainComponent = (props) => {
    const router = useRouter();
    const reduxDispatch = useDispatch();

    const __handle = {
        req: {
            logout: async () => {
                await userDataConnect().logoutLocal()
                    .then(res => {
                        if (res.status === 200 && res.data.message === 'success') {
                            reduxDispatch({
                                type: 'USER_REDUX_CLEAR_USER_INFO'
                            })
                            reduxDispatch({
                                type: 'WORKSPACE_REDUX_CLEAR_WORKSPACE_INFO'
                            })
                            // router.push({
                            //     pathname: '/'
                            // });
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
                await __handle.req.logout();
            }
        }
    }
    return (
        <>
            <Container>
                <Wrapper>
                    <LogoFieldComponent />
                    <InfoFieldComponent
                        onLogout={__handle.action.logout}
                    />
                </Wrapper>
            </Container>
        </>
    );
}
export default PrimaryNavbarMainComponent;