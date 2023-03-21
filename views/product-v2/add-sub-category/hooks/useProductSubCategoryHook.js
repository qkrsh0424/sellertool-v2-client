import { useSelector } from "react-redux";
import { productSubCategoryDataConnect } from "../../../../data_connect/productSubCategoryDataConnect";

export default function useProductSubCategoryHook(props) {
    const workspaceRedux = useSelector(state => state?.workspaceRedux);

    const reqCreateProductSubCategory = async ({
        body,
        successCallback
    }) => {
        const headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        await productSubCategoryDataConnect().create(body, headers)
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
            });
    }

    return {
        reqCreateProductSubCategory
    }
}