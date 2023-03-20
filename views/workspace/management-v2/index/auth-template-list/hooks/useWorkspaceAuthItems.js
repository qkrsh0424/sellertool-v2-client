import _ from "lodash";
import { useEffect, useState } from "react";

export default function useWorkspaceAuthItems(refWorkspaceAuthItems) {
    const [workspaceAuthItems, setWorkspaceAuthItems] = useState(null);

    useEffect(() => {
        if (!refWorkspaceAuthItems) {
            return;
        }

        init();
    }, [refWorkspaceAuthItems]);

    const init = () => {
        let authItemsInServices = _.cloneDeep(refWorkspaceAuthItems);
        let authItems = [];

        authItemsInServices.forEach(r => {
            authItems = authItems.concat(r.authItems.map(r2 => {
                return {
                    cid: null,
                    code: r2.code,
                    workspaceAuthTemplateId: null,
                    essentialYn: 'n',
                    status: 'new'
                }
            }));
        });

        setWorkspaceAuthItems(authItems);
    }

    const toggleEssentialYn = (code) => {
        setWorkspaceAuthItems(
            workspaceAuthItems.map(r => {
                if (r.code === code) {
                    return {
                        ...r,
                        essentialYn: r.essentialYn === 'y' ? 'n' : 'y'
                    }
                } else {
                    return { ...r }
                }
            })
        )
    }

    return {
        workspaceAuthItems,
        toggleEssentialYn
    }
}