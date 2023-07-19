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

export function MdBulkUpdateErpItems({
    open = false,
    onClose = () => { },
    maxWidth = 'xl',
    selectedErpItems,
    onSubmitUpdateErpItems
}) {
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();

    const bulkUpdateErpItemsFormListHook = useBulkUpdateErpItemsFormList();

    const [tableView, setTableView] = useState('orderInfo');
    const [tableHeaders, setTableHeaders] = useState(StaticValues.ORDER_INFO_HEADERS);

    useEffect(() => {
        if (!selectedErpItems) {
            return;
        }

        bulkUpdateErpItemsFormListHook.onSetBulkUpdateErpItemsFormList(_.cloneDeep(selectedErpItems));
    }, [selectedErpItems]);

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

        await onSubmitUpdateErpItems(body);
    }

    return (
        <>
            <CustomDialog
                open={open}
                onClose={() => onClose()}
                maxWidth={maxWidth}
            >
                <CustomDialog.CloseButton onClose={() => onClose()} />
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
                            onClick={() => onClose()}
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
