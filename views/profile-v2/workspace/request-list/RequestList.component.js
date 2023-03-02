import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';
import FieldLoading from '../../../modules/loading/FieldLoading';
import { Container, ListFieldWrapper, TitleFieldWrapper } from './styles/RequestList.styled';
import SingleBlockButton from '../../../modules/button/SingleBlockButton';
import Image from 'next/image';
import useDisabledBtn from '../../../../hooks/button/useDisabledBtn';
import useInviteMembersHook from '../hooks/useInviteMembersHook';

const RequestListComponent = ({
    inviteMembers,
    onSubmitRefreshInviteMembers,
    onSubmitAcceptWorkspace,
    onSubmitRejectWorkspace
}) => {
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();

    const __handle = {
        submit: {
            refresh: () => {
                onSubmitRefreshInviteMembers();
            },
            acceptWorkspace: (inviteMemberId) => {
                setDisabledBtn(true);
                if (window.confirm('워크스페이스 초대 요청을 수락 하시겠습니까?')) {
                    let body = {
                        inviteMemberId: inviteMemberId
                    }

                    onSubmitAcceptWorkspace({
                        body: body,
                        successCallback: () => { return; }
                    })

                }
            },
            rejectWorkspace: (inviteMemberId) => {
                setDisabledBtn(true);
                if (window.confirm('워크스페이스 초대 요청을 거절 하시겠습니까?')) {
                    let body = {
                        inviteMemberId: inviteMemberId
                    }

                    onSubmitRejectWorkspace({
                        body: body,
                        successCallback: () => { return; }
                    })
                }
            }
        }
    }

    return (
        <>
            <Container>
                <TitleFieldWrapper>
                    <div className='mgl-flex mgl-flex-alignItems-center'>
                        <div>
                            대기중인 요청
                        </div>
                        <SingleBlockButton
                            type='button'
                            className='refresh-button-el'
                            onClick={() => __handle.submit.refresh()}
                        >
                            <div className='refresh-button-icon-figure'>
                                <Image
                                    loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                    src={'/images/icon/refresh_default_808080.svg'}
                                    layout='responsive'
                                    width={1}
                                    height={1}
                                    objectFit={'cover'}
                                    alt='image'
                                    loading='lazy'
                                ></Image>
                            </div>
                        </SingleBlockButton>
                    </div>
                </TitleFieldWrapper>
                <ListFieldWrapper>
                    {inviteMembers?.map(r => {
                        return (
                            <div
                                key={r.id}
                                className='item-wrapper'
                            >
                                <div className='info-group'>
                                    <div className='info-id'>
                                        ID: {r.id.split('-')[0]}
                                    </div>
                                    <div className='info-name'>
                                        {r.workspace.name}
                                    </div>
                                </div>
                                <div className='button-group mgl-flex'>
                                    <SingleBlockButton
                                        type='button'
                                        className='button-item accept-button-el'
                                        onClick={(e) => __handle.submit.acceptWorkspace(r.id)}
                                        disabled={disabledBtn}
                                    >
                                        수락
                                    </SingleBlockButton>
                                    <SingleBlockButton
                                        type='button'
                                        className='button-item reject-button-el'
                                        onClick={(e) => __handle.submit.rejectWorkspace(r.id)}
                                        disabled={disabledBtn}
                                    >
                                        거절
                                    </SingleBlockButton>
                                </div>
                            </div>
                        );
                    })}
                </ListFieldWrapper>
            </Container>
        </>
    );
}
export default RequestListComponent;