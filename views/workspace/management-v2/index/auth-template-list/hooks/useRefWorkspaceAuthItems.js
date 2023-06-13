import { useEffect, useState } from "react";
import { refWorkspaceAuthItemDataConnect } from "../../../../../../data_connect/refWorkspaceAuthItemDataConnect";

export default function useRefWorkspaceAuthItems(props) {
    const [refWorkspaceAuthItems, setRefWorkspaceAuthItems] = useState(null);
    
    useEffect(() => {
        reqFetch();
    }, []);

    const reqFetch = async () => {
        await refWorkspaceAuthItemDataConnect().searchList()
            .then(res => {
                if (res.status === 200) {
                    setRefWorkspaceAuthItems(res.data.data);
                }
            })
            .catch(err => {
                console.log(err, err.response);
            })
    }

    return {
        refWorkspaceAuthItems
    };
}