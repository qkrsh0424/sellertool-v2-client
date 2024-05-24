import { useEffect, useState } from "react";
import useDisabledBtn from "../../../../../../hooks/button/useDisabledBtn";
import { useBulkUpdateErpItemsFormList } from "../../hooks/useBulkUpdateErpItemsFormList";
import _ from "lodash";
import { CustomDialog } from "../../../../../../components/dialog/v1/CustomDialog";
import { NavigationContainer } from "./MdBulkUpdateErpItems.styled";
import TableViewTypes from "./config/TableViewTypes";
import CustomBlockButton from "../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import StaticValues from "./config/StaticValues";
import { FdDataTable } from "./components";
import { customToast } from "../../../../../../components/toast/custom-react-toastify/v1";
import { useApiHook } from "../../../integration/hooks/useApiHook";
import { useSelectedErpItemListActionsHook, useSelectedErpItemListValueHook } from "../../../integration/contexts/SelectedErpItemListProvider";
import { useErpItemActionsHook, useErpItemValueHook } from "../../../integration/contexts/ErpItemProvider";
import { customBackdropController } from "../../../../../../components/backdrop/default/v1";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export function MdBulkUpdateErpItems({
    open = false,
    maxWidth = 'xl',
    toggleEditErpItemModalOpen,
    toggleControlDrawerOpen,
}) {
    const router = useRouter();
    const workspaceRedux = useSelector(state => state?.workspaceRedux);
    const wsId = workspaceRedux?.workspaceInfo?.id;

    const apiHook = useApiHook();

    const erpItemValueHook = useErpItemValueHook();
    const erpItemActionsHook = useErpItemActionsHook();
    const selectedErpItemListValueHook = useSelectedErpItemListValueHook();
    const selectedErpItemListActionsHook = useSelectedErpItemListActionsHook();

    const [disabledBtn, setDisabledBtn] = useDisabledBtn();

    const bulkUpdateErpItemsFormListHook = useBulkUpdateErpItemsFormList(_.cloneDeep(selectedErpItemListValueHook));

    const [tableView, setTableView] = useState('orderInfo');
    const [tableHeaders, setTableHeaders] = useState(StaticValues.ORDER_INFO_HEADERS);

    const handleCloseModal = () => {
        toggleEditErpItemModalOpen(false);
    }

    const handleChangeTableView = (value) => {
        let target = TableViewTypes.find(r => r.value === value);

        if (!target) {
            setTableView('orderInfo');
            setTableHeaders(StaticValues.ORDER_INFO_HEADERS);
            return;
        }
        setTableView(target.value);
        setTableHeaders(target.tableHeaders);
    }

    const handleSubmitUpdateErpItems = async (body) => {
        customBackdropController().showBackdrop();

        let headers = {
            wsId: wsId
        }

        const updateResult = await apiHook.reqUpdateErpItemList({ body, headers });

        if (updateResult?.content) {
            const updateIds = [...updateResult?.content];

            const fetchResult = await apiHook.reqFetchErpItemListByIds({
                body: {
                    ids: updateIds,
                    matchedCode: router?.query?.matchedCode
                },
                headers: headers
            })

            if (fetchResult?.content) {
                let newErpItemContent = _.cloneDeep(erpItemValueHook?.content);
                let newSelectedErpItemList = _.cloneDeep(selectedErpItemListValueHook);

                newErpItemContent.content = newErpItemContent?.content?.map(erpItem => {
                    let resultErpItem = fetchResult?.content?.find(r => r.id === erpItem?.id);
                    if (resultErpItem) {
                        return { ...resultErpItem };
                    } else { return { ...erpItem } }
                })

                newSelectedErpItemList = newSelectedErpItemList?.map(erpItem => {
                    let resultErpItem = fetchResult?.content?.find(r => r.id === erpItem?.id);
                    if (resultErpItem) {
                        return { ...resultErpItem };
                    } else { return { ...erpItem } }
                })

                erpItemActionsHook.content.onSet(newErpItemContent);
                selectedErpItemListActionsHook.onSet(newSelectedErpItemList);

                toggleEditErpItemModalOpen(false);
                toggleControlDrawerOpen(false);
                customToast.success(`${body?.length}건이 수정되었습니다.`)
            }
        }
        customBackdropController().hideBackdrop();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabledBtn(true);

        let body = bulkUpdateErpItemsFormListHook.returnSubmitForm();
        try {
            bulkUpdateErpItemsFormListHook.checkSubmitFormatValid(body)
        } catch (err) {
            alert(err.message);
            return;
        }

        await handleSubmitUpdateErpItems(body);
    }

    return (
        <>
            <CustomDialog
                open={open}
                onClose={() => handleCloseModal()}
                maxWidth={maxWidth}
            >
                <CustomDialog.CloseButton onClose={() => handleCloseModal()} />
                <NavigationContainer>
                    <div className='wrapper'>
                        {TableViewTypes?.map(r => {
                            return (
                                <CustomBlockButton
                                    type='button'
                                    key={r.value}
                                    className='item'
                                    onClick={() => handleChangeTableView(r.value)}
                                    style={{
                                        background: tableView === r.value ? 'var(--mainColor)' : '',
                                        color: tableView === r.value ? '#ffffff' : '',
                                    }}
                                >
                                    {r.name}
                                </CustomBlockButton>
                            );
                        })}
                    </div>
                </NavigationContainer>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <FdDataTable
                        tableHeaders={tableHeaders}
                        editErpItems={bulkUpdateErpItemsFormListHook?.bulkUpdateErpItemsFormList}
                        onChangeValueOfName={bulkUpdateErpItemsFormListHook.onChangeValueOfName}
                        onChangeNumberValueOfName={bulkUpdateErpItemsFormListHook.onChangeNumberValueOfName}
                        onChangeOptionCodeAll={bulkUpdateErpItemsFormListHook.onChangeOptionCodeAll}
                        onChangeReleaseOptionCodeAll={bulkUpdateErpItemsFormListHook.onChangeReleaseOptionCodeAll}
                        onChangeOptionCode={bulkUpdateErpItemsFormListHook.onChangeOptionCode}
                        onChangeReleaseOptionCode={bulkUpdateErpItemsFormListHook.onChangeReleaseOptionCode}
                        onChangeChannelOrderDate={bulkUpdateErpItemsFormListHook.onChangeChannelOrderDate}
                        onChangeChannelOrderDateAll={bulkUpdateErpItemsFormListHook.onChangeChannelOrderDateAll}
                        onDelete={bulkUpdateErpItemsFormListHook.onDelete}
                    />
                    <CustomDialog.FooterButtonGroup isFlex>
                        <CustomDialog.FooterButton
                            type='button'
                            style={{
                                width: '40%',
                                color: '#fff',
                                background: 'var(--defaultModalCloseColor)'
                            }}
                            onClick={() => handleCloseModal()}
                        >
                            취소
                        </CustomDialog.FooterButton>
                        <CustomDialog.FooterButton
                            type='submit'
                            className='button-item'
                            style={{
                                flex: 1,
                                color: '#fff',
                                background: 'var(--mainColor)'
                            }}
                            disabled={disabledBtn}
                        >
                            수정
                        </CustomDialog.FooterButton>
                    </CustomDialog.FooterButtonGroup>
                </form>
            </CustomDialog>
        </>
    );
}
