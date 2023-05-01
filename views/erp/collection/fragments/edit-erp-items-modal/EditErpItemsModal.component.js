import { useState } from "react";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import useEditErpItemsHook from "./hooks/useEditErpItemsHook";
import { NavigationContainer } from "./styles/EditErpItemsModal.styled";
import staticValues from "./staticValues";
import { CustomDialog } from "../../../../../components/dialog/v1/CustomDialog";
import DataTableComponent from "./DataTable.component";
import useDisabledBtn from "../../../../../hooks/button/useDisabledBtn";

export default function EditErpItemsModalComponent({
    open = false,
    onClose = () => { },
    maxWidth = 'xl',
    selectedErpItems,
    onSelectClearErpItem,
    onSubmitUpdateErpItems
}) {
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();
    const [tableView, setTableView] = useState('orderInfo');
    const [tableHeaders, setTableHeaders] = useState(staticValues.ORDER_INFO_HEADERS);

    const {
        editErpItems,
        onChangeValueOfName,
        onChangeNumberValueOfName,
        onChangeOptionCodeAll,
        onChangeReleaseOptionCodeAll,
        onChangeOptionCode,
        onChangeReleaseOptionCode,
        onChangeChannelOrderDate,
        onChangeChannelOrderDateAll,
        getSubmitForm,
        checkSubmitFormatValid
    } = useEditErpItemsHook(selectedErpItems);

    const handleChangeTableView = (value) => {
        let target = TABLE_VIEW_TYPES.find(r => r.value === value);

        if (!target) {
            setTableView('orderInfo');
            setTableHeaders(staticValues.ORDER_INFO_HEADERS);
            return;
        }
        setTableView(target.value);
        setTableHeaders(target.tableHeaders);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setDisabledBtn(true);
        let body = getSubmitForm();
        try {
            checkSubmitFormatValid(body)
        } catch (err) {
            alert(err.message);
            return;
        }

        onSubmitUpdateErpItems(body);
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
                        {TABLE_VIEW_TYPES?.map(r => {
                            return (
                                <SingleBlockButton
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
                                </SingleBlockButton>
                            );
                        })}
                    </div>
                </NavigationContainer>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <DataTableComponent
                        tableHeaders={tableHeaders}
                        editErpItems={editErpItems}
                        onChangeValueOfName={onChangeValueOfName}
                        onChangeNumberValueOfName={onChangeNumberValueOfName}
                        onChangeOptionCodeAll={onChangeOptionCodeAll}
                        onChangeReleaseOptionCodeAll={onChangeReleaseOptionCodeAll}
                        onChangeOptionCode={onChangeOptionCode}
                        onChangeReleaseOptionCode={onChangeReleaseOptionCode}
                        onChangeChannelOrderDate={onChangeChannelOrderDate}
                        onChangeChannelOrderDateAll={onChangeChannelOrderDateAll}
                        onSelectClearErpItem={onSelectClearErpItem}
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

const TABLE_VIEW_TYPES = [
    {
        value: 'orderInfo',
        name: '주문정보',
        tableHeaders: staticValues.ORDER_INFO_HEADERS
    },
    {
        value: 'receiverAndDeliveryInfo',
        name: '수취인 및 배송정보',
        tableHeaders: staticValues.RECEIEVR_INFO_HEADERS
    },
    {
        value: 'matchingCodeAndManagementMemo',
        name: '관리메모',
        tableHeaders: staticValues.MANAGEMENT_MEMO_HEADERS
    },
];

