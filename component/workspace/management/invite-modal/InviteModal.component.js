import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import { csrfDataConnect } from "../../../../data_connect/csrfDataConnect";
import { inviteMemberDataConnect } from "../../../../data_connect/inviteMemberDataConnect";
import { userDataConnect } from "../../../../data_connect/userDataConnect";
import Ripple from "../../../modules/button/Ripple";
import { ButtonFieldWrapper, Container, FormFieldWrapper, HeadFieldWrapper } from "./InviteModal.styled";

const InviteModalComponent = (props) => {
    const router = useRouter();
    const userRdx = useSelector(state => state.userState);

    const [disabledBtn, setDisabledBtn] = useState(false);
    const [username, setUsername] = useState('');
    const [isCheckedUser, setIsCheckedUser] = useState(false);

    const __this = {
        req: {
            checkUser: async (data) => {
                let params = {
                    username: data
                }
                let res = await userDataConnect().checkUsernameDuplicate(params)
                    .then(res => {
                        if (res.status === 200) {
                            return res.data;
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        return null;
                    });

                if (res && res.data.isDuplicated) {
                    setIsCheckedUser(true);
                    return;
                }
                setIsCheckedUser(false);
            },
            invite: async (body) => {
                await csrfDataConnect().getApiCsrf();
                await inviteMemberDataConnect().createOne(body)
                    .then(res => {
                        if (res.status === 200) {
                            props.onClose();
                            props.onFetchInviteMembers();
                        }
                    })
                    .catch(err => {
                        let res = err?.response;
                        setDisabledBtn(false);
                        setIsCheckedUser(false);

                        if (res?.status === 401) {
                            alert(res.data.memo);
                            router.replace('/');
                            return;
                        }
                        alert(res.data.memo);
                    })
            }
        },
        change: {
            username: (e) => {
                setUsername(e.target.value);
                setIsCheckedUser(false);
            }
        },
        action: {
            checkUser: () => {
                let logedUsername = userRdx?.info?.username;
                if (logedUsername === username) {
                    alert('자신의 아이디로는 검색 할 수 없습니다.');
                    return;
                }
                __this.req.checkUser(username);
            },
            invite: async () => {
                if (!props.workspace || !isCheckedUser) {
                    return;
                }

                setDisabledBtn(true);
                let body = {
                    username: username,
                    workspaceId: props.workspace.id
                }
                await __this.req.invite(body);
            }
        }
    }

    return (
        <>
            <Container>
                <HeadFieldWrapper>
                    멤버 초대하기
                </HeadFieldWrapper>
                <FormFieldWrapper>
                    <div className='input-box'>
                        <div className='input-label'>회원 아이디</div>
                        <input
                            className='input-el'
                            placeholder='회원 아이디를 입력해 주세요.'
                            value={username || ''}
                            onChange={__this.change.username}
                        ></input>
                    </div>
                    <div
                        className='check-button-box'
                    >
                        <button
                            type='button'
                            className='check-button-el'
                            onClick={__this.action.checkUser}
                        >
                            회원 검색
                        </button>
                    </div>
                </FormFieldWrapper>
                {isCheckedUser &&
                    <div style={{ padding: '0 10px', marginTop: '10px', fontSize: '14px', textAlign: 'center', fontWeight: '500', color: '#2c73d2' }}>
                        초대 가능한 회원입니다.
                    </div>
                }
                <ButtonFieldWrapper>
                    <button
                        type='button'
                        className='button-el'
                        style={{ color: '#ff6961' }}
                    >
                        취소
                        <Ripple color={'#ff696160'} duration={1000}></Ripple>
                    </button>
                    <button
                        type='button'
                        className='button-el'
                        style={{ color: `${!isCheckedUser ? '#e0e0e0' : '#2C73D2'}` }}
                        disabled={disabledBtn || !isCheckedUser}
                        onClick={__this.action.invite}
                    >
                        초대
                        {isCheckedUser &&
                            <Ripple color={'#2C73D260'} duration={1000}></Ripple>
                        }
                    </button>
                </ButtonFieldWrapper>
            </Container>
        </>
    );
}
export default InviteModalComponent;