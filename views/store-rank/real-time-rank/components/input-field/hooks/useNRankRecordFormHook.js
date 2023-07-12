import { customToast, defaultOptions } from "../../../../../../components/toast/custom-react-toastify/v1";
import { nRankRecordDataConnect } from "../../../../../../data_connect/nRankRecordDataConnect";
import { useSelector } from "react-redux";

export default function useNRankRecordFormHook({
    keyword,
    mallName
}) {
    const workspaceRedux = useSelector(state => state.workspaceRedux);

    const reqCreateSearchInfo = async () => {
        checkSearchInfoForm();

        // TODO :: 앞뒤 공백제거하자. server에도
        let body = {
            keyword: keyword,
            mall_name: mallName
        }
        
        let headers = {
            wsId: workspaceRedux?.workspaceInfo.id
        }
        
        await nRankRecordDataConnect().createOne(body, headers)
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
        reqCreateSearchInfo
    }
}