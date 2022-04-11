import { useSelector } from "react-redux";
import styled from 'styled-components';
import Link from 'next/link';
import { loginDataConnect } from "../../data_connect/loginDataConnect";
import { useRouter } from "next/router";
import { csrfDataConnect } from "../../data_connect/csrfDataConnect";
import WorkspaceSelectorMain from "./WokspaceSelectorMain";
import CommonModalComponent from "../modules/CommonModalComponent";
import { useState } from "react";
import WorkspaceListModalComponent from "./WorkspaceListModalComponent";
// import MenuIcon from '@mui/icons-material/Menu';

const NavbarContainer = styled.div`
    overflow: hidden;
    position: relative;
    height: 70px;
    /* background-color: #B39CD0; */
    background: linear-gradient(70deg, #2C73D2, #309FFF);
    background: -webkit-linear-gradient(70deg, #2C73D2, #309FFF);

    @media all and (max-width:992px){
        height: 52px;
    }
`;

const NavbarWrapper = styled.div`
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;

    @media all and (max-width:992px){
        padding: 0 10px;
    }
`;

const LeftToolbar = styled.div`
    position: relative;
`;

const RightToolbar = styled.div`
    display: flex;

    .rt-el{
        padding:10px;
        border-radius:5px;

        font-size:14px;
        font-weight: 600;
        color:white;

        cursor: pointer;

        transition: all .3s;

        &:hover{
            box-shadow: 
                #2C73D220 0px 2px 1px -1px, 
                #2C73D220 0px 1px 1px 0px, 
                #2C73D220 3px 3px 3px 0px;
        }

        &:active{
            background: #609FFF;
        }
    }
`;

const LogoImgEl = styled.img`
    width: 40px;
    border-radius: 10px;
    cursor: pointer;
    @media all and (max-width:992px){
        width: 32px;
    }
`;

const NavbarMain = () => {
    const userRdx = useSelector(state => state.userState);
    const router = useRouter();

    const [workspaceListModalOpen, setWorkspaceListModalOpen] = useState(false);

    const __handleDataConnect = () => {
        return {
            logout: async function () {
                await loginDataConnect().logout()
                    .then(res => {
                        if (res.status === 200 && res.data.message === 'success') {
                            router.replace('/');
                        }
                    })
                    .catch(err => {
                        let res = err.response;

                        if (res.status === 500) {
                            alert('undefined error')
                            return;
                        }

                        alert(res.data.memo);
                    })
            }
        }
    }

    const __handleEventControl = () => {
        return {
            logout: async function () {
                await csrfDataConnect().getAuthCsrf();
                await __handleDataConnect().logout();
            },
            workspaceList: function () {
                return {
                    onModalOpen: function () {
                        setWorkspaceListModalOpen(true)
                    },
                    onModalClose: function () {
                        setWorkspaceListModalOpen(false)
                    }
                }
            }
        }
    }
    return (
        <>
            <NavbarContainer>
                <NavbarWrapper>
                    <LeftToolbar>
                        <Link
                            href='/'
                            passHref
                        >
                            <LogoImgEl src='/images/logo/logo1.png'></LogoImgEl>
                        </Link>
                    </LeftToolbar>
                    {(userRdx.isLoading === false && userRdx.info === null) &&
                        <RightToolbar>
                            <Link
                                href='/login'
                                passHref
                            >
                                <div className='rt-el'>로그인</div>
                            </Link>
                            <Link
                                href='/signup'
                                passHref
                            >
                                <div className='rt-el'>회원가입</div>
                            </Link>
                        </RightToolbar>
                    }

                    {(userRdx.isLoading === false && userRdx.info) &&
                        <RightToolbar>
                            <Link
                                href='/login'
                                passHref
                            >
                                <div className='rt-el'>내정보</div>
                            </Link>
                            <div className='rt-el' onClick={() => __handleEventControl().logout()}>로그아웃</div>
                        </RightToolbar>
                    }

                </NavbarWrapper>
            </NavbarContainer>
            <WorkspaceSelectorMain
                onWorkspaceListModalOpen={() => __handleEventControl().workspaceList().onModalOpen()}
            ></WorkspaceSelectorMain>

            {/* Modal */}
            <CommonModalComponent
                open={workspaceListModalOpen}

                onClose={() => __handleEventControl().workspaceList().onModalClose()}
            >
                <WorkspaceListModalComponent></WorkspaceListModalComponent>
            </CommonModalComponent>
        </>
    );
}

export default NavbarMain;