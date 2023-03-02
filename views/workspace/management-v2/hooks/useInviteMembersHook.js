import { useEffect } from "react";
import { useState } from "react";
import { inviteMemberDataConnect } from "../../../../data_connect/inviteMemberDataConnect";

export default function useInviteMembersHook({
    workspace
}) {
    const [inviteMembers, setInviteMembers] = useState(null);

    useEffect(() => {
        if (!workspace?.id) {
            return;
        }

        reqFetchInviteMembers();
    }, []);

    const reqFetchInviteMembers = async () => {
        let workspaceId = workspace?.id;
        await inviteMemberDataConnect().searchListByWorkspaceId({ workspaceId })
            .then(res => {
                if (res.status === 200) {
                    setInviteMembers(res.data.data);
                }
            })
            .catch(err => {
                console.log(err, err.response);
            })
    }

    const reqCreateInviteMemberOne = async ({
        body,
        successCallback
    }) => {
        await inviteMemberDataConnect().createOne({ body })
            .then(res => {
                if (res.status === 200) {
                    reqFetchInviteMembers();
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
    }

    const reqDeleteInviteMemberOne = async ({
        body,
        successCallback
    }) => {
        await inviteMemberDataConnect().deleteOne({
            body
        })
            .then(res => {
                if (res.status === 200) {
                    reqFetchInviteMembers();
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
    }

    const reqRetryInviteMember = async ({
        body,
        successCallback
    }) => {
        await inviteMemberDataConnect().retryInviteMember({
            body
        })
            .then(res => {
                if (res.status === 200) {
                    reqFetchInviteMembers();
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
    }

    return {
        inviteMembers,
        reqFetchInviteMembers,
        reqCreateInviteMemberOne,
        reqDeleteInviteMemberOne,
        reqRetryInviteMember
    }
}