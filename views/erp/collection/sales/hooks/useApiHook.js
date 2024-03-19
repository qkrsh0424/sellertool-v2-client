import { customToast, defaultOptions } from "../../../../../components/toast/custom-react-toastify/v1";
import { productOptionPackageDataConnect } from "../../../../../data_connect/productOptionPackageDataConnect";

const productOptionPackageDataConn = productOptionPackageDataConnect();

export function useApiHook(props) {

    const reqFetchProductOptionPackageList = async ({ body, headers }) => {
        return await productOptionPackageDataConn.searchProductInfoListByProductOptionIdsWithStocks(body, headers)
            .then(res => {
                return {
                    res: res,
                    content: res?.data?.data
                }
            })
            .catch(err => {
                const res = err.response;
                console.log(res);
                customToast.error(res?.data?.memo, {
                    ...defaultOptions,
                    toastId: res?.data?.memo
                });
            })
    }

    return {
        reqFetchProductOptionPackageList
    }
}