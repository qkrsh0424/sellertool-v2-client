import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';
import FieldLoading from '../../../modules/FieldLoading';

const Container = styled.div`
    margin-top: 40px;
    margin-bottom: 40px;
`;

const TitleFieldWrapper = styled.div`
    .title{
        font-size: 18px;
        font-weight: 500;
    }
`;

const ListFieldWrapper = styled.div`
    max-height: 300px;
    overflow: auto;
    margin-top: 10px;

    border: 1px solid #e0e0e0;
    border-radius: 5px;

    .item-wrapper:nth-last-child(1){
        border-bottom: none;
    }

    .item-wrapper{
        display: flex;
        justify-content:space-between; 
        padding:10px 10px;
        border-bottom: 1px solid #e0e0e0;
        align-items: center;
    }

    .button-el{
        position: relative;
        width:50px;
        height:25px;

        padding:0;
        margin-right:8px;

        border:1px solid #e0e0e0;
        background:white;

        color:#626262;
        font-size:13px;
        font-weight:500;

        cursor:pointer;

        &:disabled{
            cursor:not-allowed;
        }
    }

    .button-accept{
        &:hover{
            background: #2C73D2;
            color:white;
            border:1px solid #2C73D2;
        }
    }

    .button-reject{
        &:hover{
            background: #ff6961;
            color:white;
            border:1px solid #ff6961;
        }
    }

    &::-webkit-scrollbar {
       width: 7px;
       
    }
    &::-webkit-scrollbar-thumb {
        background-color: #00000025;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
        /* background-color: white; */
    }
`;

function TitleFieldView() {
    return (
        <TitleFieldWrapper>
            <div className='title'>대기중인 초대 요청</div>
        </TitleFieldWrapper>
    );
}

function ListFieldView({ isLoading, inviteMembers, disabledBtn, onSubmitAcceptWorkspace, onSubmitRejectWorkspace }) {
    return (
        <ListFieldWrapper>
            {isLoading &&
                <FieldLoading
                    marginTop={130}
                    marginBottom={130}
                    size={20}
                />
            }
            {!isLoading && (!inviteMembers || inviteMembers?.length <= 0) &&
                <div style={{ textAlign: 'center', margin: '130px 0', fontSize: '16px', color: '#626262', fontWeight: '500' }}>
                    현재 대기중인 초대 요청이 없습니다.
                </div>
            }
            {!isLoading && inviteMembers?.map(r => {
                return (
                    <div
                        key={r.id}
                        className='item-wrapper'
                    >
                        <div>
                            <div style={{ fontSize: '13px', color: '#57606a' }}>
                                요청 번호 {r.id.split('-')[0]}
                            </div>
                            <div style={{ fontSize: '16px', marginTop: '10px', color: '#2C73D2', fontWeight: '600' }}>
                                {r.workspace.name}
                            </div>
                        </div>
                        <div>
                            <button
                                type='button'
                                className='button-el button-accept'
                                onClick={(e) => onSubmitAcceptWorkspace(r.id)}
                                disabled={disabledBtn}
                            >
                                수락
                            </button>
                            <button
                                type='button'
                                className='button-el button-reject'
                                onClick={() => onSubmitRejectWorkspace(r.id)}
                                disabled={disabledBtn}
                            >
                                거절
                            </button>
                        </div>
                    </div>
                );
            })}
        </ListFieldWrapper >
    );
}

const RequestListComponent = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [disabledBtn, setDisabledBtn] = useState(false);

    useEffect(() => {
        if (props.inviteMembers) {
            setIsLoading(false)
        }
    }, [props.inviteMembers])

    useEffect(() => {
        if (!disabledBtn) {
            return;
        }

        let timeout = setTimeout(() => {
            setDisabledBtn(false);
        }, 800)

        return () => clearTimeout(timeout);

    }, [disabledBtn]);

    const __inviateMember = {
        submit: {
            onSubmitAcceptWorkspace: (inviteMemberId) => {
                setDisabledBtn(true);
                props.onSubmitAcceptWorkspace(inviteMemberId);
            },
            onSubmitRejectWorkspace: (inviteMemberId) => {
                setDisabledBtn(true);
                props.onSubmitRejectWorkspace(inviteMemberId);
            }
        }
    }
    return (
        <>
            <Container>
                <TitleFieldView />
                <ListFieldView
                    isLoading={isLoading}
                    inviteMembers={props.inviteMembers}
                    disabledBtn={disabledBtn}
                    onSubmitAcceptWorkspace={__inviateMember.submit.onSubmitAcceptWorkspace}
                    onSubmitRejectWorkspace={__inviateMember.submit.onSubmitRejectWorkspace}
                />
            </Container>
        </>
    );
}
export default RequestListComponent;