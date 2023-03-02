import { useState } from "react";

export default function useLoginFormHook(props) {
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    });

    const onChangeValueOfName = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setLoginForm({
            ...loginForm,
            [name]: value
        })
    }
    return {
        loginForm,
        onChangeValueOfName
    }
}