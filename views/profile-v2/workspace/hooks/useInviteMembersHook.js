import { useEffect, useState } from "react";
import { inviteMemberDataConnect } from "../../../../data_connect/inviteMemberDataConnect";

export default function useInviteMembersHook(props) {
    const [inviteMembers, setInviteMembers] = useState(null);

    useEffect(() => {
        reqFetchInviteMembers();
    }, []);

    const reqFetchInviteMembers = async () => {
        await inviteMemberDataConnect().searchListByPending()
            .then(res => {
                if (res.status === 200) {
                    setInviteMembers(res.data.data);
                }
            })
            .catch(err => {
                let res = err.response;
                console.log(res);
            })
    }

    const reqAcceptWorkspace = async ({
        body,
        successCallback
    }) => {
        await inviteMemberDataConnect().acceptWorkspace({ body })
            .then(res => {
                if (res.status === 200) {
                    successCallback();
                }
            })
            .catch(err => {
                let res = err.response;

                if (!res) {
                    alert('네트워크 연결이 원활하지 않습니다.');
                    return;
                }

                if (res.status === 500) {
                    alert('undefined error. 관리자에 문의해 주세요.');
                    return;
                }

                alert(res.data.memo);
            })
            ;
    }

    const reqRejectWorkspace = async ({
        body,
        successCallback
    }) => {
        await inviteMemberDataConnect().rejectWorkspace({ body })
            .then(res => {
                if (res.status === 200) {
                    successCallback();
                }
            })
            .catch(err => {
                let res = err.response;

                if (!res) {
                    alert('네트워크 연결이 원활하지 않습니다.');
                    return;
                }

                if (res.status === 500) {
                    alert('undefined error. 관리자에 문의해 주세요.');
                    return;
                }

                alert(res.data.memo);
            })
            ;
    }

    return {
        inviteMembers,
        reqFetchInviteMembers,
        reqAcceptWorkspace,
        reqRejectWorkspace
    }
}