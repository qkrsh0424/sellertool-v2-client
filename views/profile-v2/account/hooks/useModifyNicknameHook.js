import _ from "lodash";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import formatValidUtils from "../../../../utils/formatValidUtils";

export default function useModifyNicknameHook(props) {
    const userRedux = useSelector(state => state.userRedux);
    const [modifyNickname, setModifyNickname] = useState(null);

    useEffect(() => {
        if (userRedux.isLoading || !userRedux.userInfo) {
            return;
        }

        onSetModifyNickname(userRedux.userInfo.nickname);
    }, [userRedux.isLoading, userRedux.userInfo]);

    const onSetModifyNickname = (value) => {
        setModifyNickname(_.cloneDeep(value));
    }

    const onChangeModifyNickname = (e) => {
        let value = e.target.value;

        setModifyNickname(value);
    }

    const checkNicknameFormatValid = (nickname) => {
        if (!formatValidUtils.isNicknameFormatValid(nickname)) {
            throw new Error('닉네임 형식을 다시 확인해 주세요.');
        }
    }

    return {
        modifyNickname,
        onSetModifyNickname,
        onChangeModifyNickname,
        checkNicknameFormatValid
    }
}