import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { marginRecordDataConnect } from "../../../../data_connect/marginRecordDataConnect";

export default function useMarginRecordHook(props) {
    const router = useRouter();
    const [marginRecord, setMarginRecord] = useState(null);

    useEffect(() => {
        if (!router?.query?.marginRecordId || !router?.query?.openKey) {
            return;
        }

        reqFetchMarginRecord();
    }, [router?.query?.marginRecordId, router?.query?.openKey]);

    const reqFetchMarginRecord = async () => {
        let params = {
            marginRecordId: router?.query?.marginRecordId,
            openKey: router?.query?.openKey
        }

        await marginRecordDataConnect().searchMarginRecordViewer(params)
            .then(res => {
                if (res.status === 200) {
                    setMarginRecord(res.data.data);
                }
            })
            .catch(err => {
                console.log(err, err.response);
            });
    }

    return {
        marginRecord
    }
}