import { useDispatch } from "react-redux";
import { userDataConnect } from "../../../data_connect/userDataConnect";
import { Container, Wrapper } from "./index.styled";
import InfoFieldComponent from "./info-field/InfoField.component";
import LogoFieldComponent from "./logo-field/LogoField.component";
import { FdServiceList } from "./FdServiceList";
import { useMediaQuery } from "@mui/material";

const PrimaryNavbarMainComponent = (props) => {
    const reduxDispatch = useDispatch();
    const isMobile = useMediaQuery(`(max-width: 992px)`);

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
                    <div className="mgl-flex mgl-flex-alignItems-center">
                        <LogoFieldComponent />
                        {isMobile ?
                            <></>
                            :
                            <FdServiceList />
                        }

                    </div>
                    <InfoFieldComponent
                        onLogout={__handle.action.logout}
                    />
                </Wrapper>
            </Container>
        </>
    );
}
export default PrimaryNavbarMainComponent;