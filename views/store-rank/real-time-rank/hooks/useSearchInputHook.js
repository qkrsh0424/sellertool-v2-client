import { useState } from "react";
import { useSelector } from "react-redux";
import { nRankRecordDataConnect } from "../../../../data_connect/nRankRecordDataConnect";
import { customToast, defaultOptions } from "../../../../components/toast/custom-react-toastify/v1";

export default function useSearchInputHook() {
    const [keyword, setKeyword] = useState(null);
    const [mallName, setMallName] = useState(null);

    const workspaceRedux = useSelector(state => state.workspaceRedux);

    const onChangeKeyword = (e) => {
        let value = e.target.value;
        setKeyword(value)
    }

    const onChangeMallName = (e) => {
        let value = e.target.value;
        setMallName(value)
    }

    const reqCreateSearchInfo = async (successCallback) => {
        checkSearchInfoForm();

        let body = {
            keyword: keyword.trim(),
            mall_name: mallName.trim()
        }
        
        let headers = {
            wsId: workspaceRedux?.workspaceInfo.id
        }
        
        await nRankRecordDataConnect().createOne(body, headers)
            .then(res => {
                if(res.status === 200) {
                    setKeyword(null);
                    setMallName(null);
                    successCallback();
                }
            })
            .catch(err => {
                const res = err.response;
                customToast.error(res?.data?.memo, {
                    ...defaultOptions,
                    toastId: res?.data?.memo
                })
            })
        
    }

    const checkSearchInfoForm = () => {
        try {
            if(!keyword || keyword === '') {
                throw new Error("검색 키워드를 정확하게 입력해주세요.")
            }

            if(!mallName || mallName === '') {
                throw new Error("검색 스토어명을 정확하게 입력해주세요.")
            }
        } catch (err) {
            customToast.error(err?.message, {
                ...defaultOptions,
                toastId: err?.message
            });
        }
    }

    return {
        keyword,
        mallName,
        onChangeKeyword,
        onChangeMallName,
        reqCreateSearchInfo
    }
}