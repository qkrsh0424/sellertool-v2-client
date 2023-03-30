import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { inviteMemberDataConnect } from "../../../../../data_connect/inviteMemberDataConnect";

export default function useInviteMembersHook({
    workspace
}) {
    const router = useRouter();
    const [inviteMembers, setInviteMembers] = useState(null);

    useEffect(() => {
        if (!workspace?.id) {
            return;
        }

        reqFetchInviteMembers();
    }, []);

    const reqFetchInviteMembers = async () => {
        const headers = {
            wsId: workspace?.id
        }
        await inviteMemberDataConnect().searchListByWorkspaceId(headers)
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
        const headers = {
            wsId: workspace?.id
        }
        await inviteMemberDataConnect().createOne(body, headers)
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
        const headers = {
            wsId: workspace?.id
        }

        await inviteMemberDataConnect().deleteOne(body, headers)
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
        const headers = {
            wsId: workspace?.id
        }

        await inviteMemberDataConnect().retryInviteMember(body, headers)
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