import { CustomErrorHandler } from "../../../../data_connect/CustomErrorHandler";
import { MarginRecordDataConnect } from "../../../../data_connect/marginRecordDataConnect"

const marginRecordDataConnect = MarginRecordDataConnect();

export function useDataSourceHook(props) {
    /**
     * sort = ['name_asc', 'tag_asc']
     * 
     * @param {*} options 
     * @param options.headers [wsId]
     * @param options.params [page,size,sort]
     * @param {*} callbackFn 
     */
    const onReqFetchMarginRecordPage = async (options = {
        headers: { wsId },
        params: { page: 1, size: 10, sort: 'name_asc' },
    }, callbackFn = (results, response) => { }) => {
        const { headers, params } = options;

        await marginRecordDataConnect.searchPage(params, headers)
            .then(res => {
                if (res.status === 200) {
                    callbackFn(res?.data?.data, res);
                }
            })
            .catch(err => {
                CustomErrorHandler.error(err);
            })
    }

    return {
        onReqFetchMarginRecordPage
    }
}