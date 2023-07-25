import { useState } from "react";
import { useSelector } from "react-redux";
import { nRankRecordDataConnect } from "../../../../../data_connect/nRankRecordDataConnect";
import { customToast, defaultOptions } from "../../../../../components/toast/custom-react-toastify/v1";

export default function useSearchInputHook({
    recordList
}) {
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
        try {
            checkSearchInfoForm();
        } catch (err) {
            customToast.error(err?.message, {
                ...defaultOptions,
                toastId: err?.message
            });
            return;
        }

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
        if(!keyword || keyword === '') {
            throw new Error("검색 키워드를 정확하게 입력해주세요.")
        }

        if(!mallName || mallName === '') {
            throw new Error("검색 스토어명을 정확하게 입력해주세요.")
        }

        if(keyword.length > 50) {
            throw new Error("키워드는 50자 이내로 입력해주세요.")
        }

        if(mallName.length > 50) {
            throw new Error("스토어명은 50자 이내로 입력해주세요.")
        }

        if(recordList?.length > 0) {
            if(recordList.find(r => r.keyword === keyword && r.mall_name === mallName)) {
                throw new Error("동일한 검색항목이 존재합니다")
            }
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