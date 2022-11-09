import { useState } from "react";

export default function useInviteMemberFormHook(props) {
    const [inviteMemberForm, setInviteMemberForm] = useState({
        username: ''
    });

    const onChangeInviteMemberFormValueOfName = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setInviteMemberForm({
            ...inviteMemberForm,
            [name]: value
        })
    }

    return {
        inviteMemberForm,
        onChangeInviteMemberFormValueOfName
    }
}