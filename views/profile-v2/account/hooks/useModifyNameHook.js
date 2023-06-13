import _ from "lodash";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import formatValidUtils from "../../../../utils/formatValidUtils";

export default function useModifyNameHook(props) {
    const userRedux = useSelector(state => state.userRedux);
    const [modifyName, setModifyName] = useState(null);

    useEffect(() => {
        if(userRedux.isLoading || !userRedux.userInfo){
            return;
        }

        onSetModifyName(userRedux.userInfo.name);
    }, [userRedux.isLoading, userRedux.userInfo]);

    const onSetModifyName = (value) => {
        setModifyName(_.cloneDeep(value));
    }

    const onChangeModifyName = (e) => {
        let value = e.target.value;

        setModifyName(value);
    }

    const checkNameFormatValid = (name) => {
        if (!formatValidUtils.isNameFormatValid(name)) {
            throw new Error('이름 형식을 다시 확인해 주세요.');
        }
    }

    return {
        modifyName,
        onSetModifyName,
        onChangeModifyName,
        checkNameFormatValid
    }
}