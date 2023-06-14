import _ from "lodash";
import { useState } from "react";
import { useSelector } from "react-redux";
import { erpItemDataConnect } from "../../../../../data_connect/erpItemDataConnect";
import { customToast, defaultOptions } from "../../../../../components/toast/custom-react-toastify/v1";

export default function useSelectedErpItemsHook(props) {
    const [selectedErpItems, setSelectedErpItems] = useState([]);
    const workspaceRedux = useSelector(state => state.workspaceRedux);

    const reqFetchSelectedErpItems = async () => {
        let body = {
            workspaceId: workspaceRedux?.workspaceInfo?.id,
            ids: selectedErpItems?.map(r => r.id)
        }
        await erpItemDataConnect().searchListByIds(body)
            .then(res => {
                if (res.status === 200) {
                    setSelectedErpItems(res.data.data);
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
            ;
    }

    const onSelectErpItem = (item) => {
        let data = selectedErpItems?.find(r => r.id === item.id);

        if (data) {
            setSelectedErpItems(selectedErpItems?.filter(r => r.id !== data.id));
        } else {
            try {
                if (selectedErpItems?.length >= 5000) {
                    throw new Error('최대 선택 가능한 개수는 5000개 입니다.');
                }
            } catch (err) {
                alert(err.message);
                return;
            }

            setSelectedErpItems([...selectedErpItems, item]);
        }
    }

    const onSelectAllErpItems = (erpItems) => {
        let originIds = selectedErpItems?.map(r => r.id);
        let newItems = _.cloneDeep(selectedErpItems);

        try {

            erpItems?.forEach(erpItem => {
                if (originIds?.includes(erpItem.id)) {
                    return;
                }
                if (newItems?.length >= 5000) {
                    throw new Error('최대 선택 가능한 개수는 5000개 입니다.');
                }
                newItems.push(erpItem);
            });
        } catch (err) {
            alert(err.message);
            return;
        } finally {
            setSelectedErpItems(newItems);
        }
    }

    const onSelectClearAllErpItemsInPage = (erpItems) => {
        setSelectedErpItems(
            selectedErpItems?.filter(selected => !erpItems?.some(item => item.id === selected.id))
        );
    }

    const onSelectClearAllErpItems = () => {
        setSelectedErpItems([]);
    }

    const onSelectClearErpItem = (erpItemId) => {
        setSelectedErpItems(
            selectedErpItems?.filter(selected => selected.id !== erpItemId)
        );
    }

    return {
        selectedErpItems,
        onSelectErpItem,
        onSelectAllErpItems,
        onSelectClearAllErpItemsInPage,
        onSelectClearAllErpItems,
        onSelectClearErpItem,
        reqFetchSelectedErpItems
    }
}