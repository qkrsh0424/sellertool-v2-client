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

    const onSelectAll = () => {
        setWorkspaceAuthItems(
            workspaceAuthItems.map(r => {
                return {
                    ...r,
                    essentialYn: 'y'
                }
            })
        );
    }

    const onSelectClearAll = () => {
        setWorkspaceAuthItems(
            workspaceAuthItems.map(r => {
                return {
                    ...r,
                    essentialYn: 'n'
                }
            })
        );
    }

    const onSelectAllForOMSAdmin = () => {
        setWorkspaceAuthItems(
            workspaceAuthItems.map(r => {
                if (OMS_ADMIN_CODES.includes(r.code)) {
                    return {
                        ...r,
                        essentialYn: 'y'
                    }
                } else {
                    return { ...r }
                }
            })
        );
    }
    return {
        workspaceAuthItems,
        toggleEssentialYn,
        onSelectAll,
        onSelectClearAll,
        onSelectAllForOMSAdmin
    }
}

const OMS_ADMIN_CODES = ['OMS_SEARCH', 'OMS_CREATE', 'OMS_UPDATE', 'OMS_DELETE', 'PRODUCT_MANAGE_SEARCH', 'INVENTORY_MANAGE_SEARCH', 'EXCEL_TRANS_SEARCH']