import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';
import Link from 'next/link';
import { loginDataConnect } from "../../data_connect/loginDataConnect";
import { useRouter } from "next/router";
import { csrfDataConnect } from "../../data_connect/csrfDataConnect";
import WorkspaceSelectorMain from "./WokspaceSelectorMain";
import CommonModalComponent from "../modules/modal/CommonModalComponent";
import { useReducer, useState } from "react";
import WorkspaceListModalComponent from "./WorkspaceListModalComponent";
import { workspaceDataConnect } from "../../data_connect/workspaceDataConnect";
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
    const dispatch = useDispatch();
    const workspaceRdx = useSelector(state => state.workspaceState);
    const userRdx = useSelector(state => state.userState)
    const router = useRouter();

    const [workspaces, dispatchWorkspaces] = useReducer(workspacesReducer, initialWorkspaces);
    const [workspaceListModalOpen, setWorkspaceListModalOpen] = useState(false);

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

                        if (res.status === 500) {
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

    const __workspace = {
        req: {
            fetchList: async () => {
                await workspaceDataConnect().getWorkspaces()
                    .then(res => {
                        if (res.status === 200) {
                            dispatchWorkspaces({
                                type: 'SET_DATA',
                                payload: res.data?.data
                            })
                        }
                    })
                    .catch(err => {
                        let res = err.response;
                        console.log(res);
                    })
            },
            set: async function (workspaceId) {
                await workspaceDataConnect().getWorkspace(workspaceId)
                    .then(res => {
                        if (res.status === 200 && res.data.message === 'success') {
                            if (res.data?.data) {
                                dispatch({
                                    type: 'WORKSPACE_STATE_INIT_INFO',
                                    payload: res.data?.data
                                });
                                localStorage.setItem('sellertool-wsId', res.data?.data?.id);
                            } else {
                                dispatch({
                                    type: 'WORKSPACE_STATE_CLEAR_INFO'
                                })
                            }
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        console.log(err.response);
                    })
            }
        },
        action: {
            select: async (workspace) => {
                await __workspace.req.set(workspace.id);
                __workspace.action.modalClose();
            },
            modalOpen: async () => {
                await __workspace.req.fetchList();
                setWorkspaceListModalOpen(true)
            },
            modalClose: () => {
                setWorkspaceListModalOpen(false);
                dispatchWorkspaces({
                    type: 'CLEAR'
                })
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
                            <div className='rt-el' onClick={__auth.action.logout}>로그아웃</div>
                        </RightToolbar>
                    }

                </NavbarWrapper>
            </NavbarContainer>
            <WorkspaceSelectorMain
                onWorkspaceListModalOpen={__workspace.action.modalOpen}
            ></WorkspaceSelectorMain>

            {/* Modal */}
            {(workspaceListModalOpen && userRdx.info && workspaceRdx.info && workspaces) &&
                <CommonModalComponent
                    open={workspaceListModalOpen}

                    onClose={__workspace.action.modalClose}
                >
                    <WorkspaceListModalComponent
                        userInfo={userRdx?.info}
                        workspaceInfo={workspaceRdx?.info}
                        workspaces={workspaces}

                        onActionSelectWorkspace={__workspace.action.select}
                    ></WorkspaceListModalComponent>
                </CommonModalComponent>
            }
        </>
    );
}

export default NavbarMain;

const initialWorkspaces = null;

const workspacesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return action.payload;
        case 'CLEAR':
            return initialWorkspaces;
        default: return initialWorkspaces;
    }
}