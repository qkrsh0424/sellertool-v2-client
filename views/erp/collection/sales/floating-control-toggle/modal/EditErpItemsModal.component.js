import { useState } from "react";
import SingleBlockButton from "../../../../../modules/button/SingleBlockButton";
import CustomImage from "../../../../../modules/image/CustomImage";
import useEditErpItemsHook from "../hooks/useEditErpItemsHook";
import { Container, NavigationContainer, SubmitButtonContainer, TableBox, TableWrapper } from "../styles/EditErpItemsModal.styled";
import staticValues from "../utils/staticValues";
import DataTableFragment from "./DataTable.fragment";

export default function EditErpItemModalComponent({
    selectedErpItems,
    onClose,
    onSelectClearErpItem,
    onSubmitUpdateErpItems
}) {
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
            <Container>
                <div className='header-close-button-box'>
                    <button
                        type='button'
                        className='header-close-button-el'
                        onClick={() => onClose()}
                    >
                        <CustomImage
                            src='/images/icon/close_default_959eae.svg'
                        />
                    </button>
                </div>
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
                    <DataTableFragment
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

                    <SubmitButtonContainer>
                        <SingleBlockButton
                            type='button'
                            className='button-item'
                            style={{
                                width: '40%',
                                background: 'var(--defaultModalCloseColor)'
                            }}
                            onClick={() => onClose()}
                        >
                            취소
                        </SingleBlockButton>
                        <SingleBlockButton
                            type='submit'
                            className='button-item'
                            style={{
                                flex: 1,
                                background: 'var(--mainColor)'
                            }}
                        >
                            수정
                        </SingleBlockButton>
                    </SubmitButtonContainer>
                </form>
            </Container>
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

