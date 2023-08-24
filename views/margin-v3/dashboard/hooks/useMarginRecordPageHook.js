import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { marginRecordDataConnect } from "../../../../data_connect/marginRecordDataConnect";
import { customToast, defaultOptions } from "../../../../components/toast/custom-react-toastify/v1";

export default function useMarginRecordPageHook(props) {
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const [marginRecordPage, setMarginRecordPage] = useState(null);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);

    useEffect(() => {
        if (!workspaceRedux?.workspaceInfo?.id) {
            return;
        }

        reqFetchMarginRecordPage();
    }, [workspaceRedux?.workspaceInfo?.id, size, page]);

    const reqFetchMarginRecordPage = async () => {
        const headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }
        const params = {
            page: page || 1,
            size: size || 10,
            sort: ['name_asc', 'tag_asc']
        }

        await marginRecordDataConnect().searchPage(params, headers)
            .then(res => {
                if (res.status === 200) {
                    setMarginRecordPage(res.data.data)
                }
            })
            .catch(err => {
                const res = err.response;
                console.log(res);
                if (res?.status === 403) {
                    customToast.error(res?.data?.memo, {
                        ...defaultOptions,
                        toastId: res?.data?.memo
                    });
                }
            })
    }

    const onChangePage = (page) => {
        setPage(page);
    }

    const onChangeSize = (size) => {
        setSize(size);
    }

    return {
        marginRecordPage,
        reqFetchMarginRecordPage,
        size,
        page,
        onChangePage,
        onChangeSize
    }
}