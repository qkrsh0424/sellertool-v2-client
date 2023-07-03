import { customBackdropController } from "../../../../../../../components/backdrop/default/v1";
import { CustomDialog } from "../../../../../../../components/dialog/v1/CustomDialog";
import CustomInput from "../../../../../../../components/input/default/v1/CustomInput";
import ResizableTh from "../../../../../../../components/table/th/v1/ResizableTh";
import { customToast, defaultOptions } from "../../../../../../../components/toast/custom-react-toastify/v1";
import useDisabledBtn from "../../../../../../../hooks/button/useDisabledBtn";
import { numberWithCommas } from "../../../../../../../utils/numberFormatUtils";
import { ContentContainer, TableBox, TableWrapper } from "./InventoryReceiveSeperatedItemsModal.styled";
import useInventoryReceiveSeperatedItemsHook from "./hooks/useInventoryReceiveSeperatedItemsHook";

export function InventoryReceiveSeperatedItemsModalComponent({
    open = false,
    inventoryStockData,
    onClose = () => { }
}) {
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();
    const customBackdropControl = customBackdropController();

    const {
        inventoryReceiveSeperatedItems,
        onChangePurchaseCost,
        checkPurchaseCostFormatValid,
        reqChangePurchaseCost
    } = useInventoryReceiveSeperatedItemsHook({
        inventoryReceiveId: inventoryStockData?.id
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDisabledBtn(true);

        try {
            checkPurchaseCostFormatValid();
        } catch (err) {
            customToast.error(err.message, {
                ...defaultOptions,
                toastId: err.message
            });

            setDisabledBtn(false);
            return;
        }

        const body = {
            inventoryReceiveId: inventoryStockData?.id,
            inventoryReceiveSeperatedItems: [...inventoryReceiveSeperatedItems]
        }
        customBackdropControl.showBackdrop();
        await reqChangePurchaseCost(body, () => {
            onClose();
        });
        customBackdropControl.hideBackdrop();
    }
    return (
        <>
            <CustomDialog
                open={open}
                onClose={() => onClose()}
                maxWidth="md"
            >
                <CustomDialog.CloseButton onClose={() => onClose()} />
                <CustomDialog.Title>입고 매입단가 세부 조정</CustomDialog.Title>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <ContentContainer>
                        <Table
                            inventoryReceiveSeperatedItems={inventoryReceiveSeperatedItems}
                            onChangePurchaseCost={onChangePurchaseCost}
                        />
                    </ContentContainer>
                    <CustomDialog.FooterButtonGroup isFlex={true} style={{ marginTop: '40px' }}>
                        <CustomDialog.FooterButton
                            type='button'
                            style={{
                                background: 'var(--defaultModalCloseColor)',
                                color: 'white',
                                width: '40%'
                            }}
                            onClick={() => onClose()}
                        >
                            취소
                        </CustomDialog.FooterButton>
                        <CustomDialog.FooterButton
                            type='submit'
                            style={{
                                background: 'var(--mainColor)',
                                color: 'white',
                                flex: 1,
                            }}
                            disabled={disabledBtn}
                        >
                            설정완료
                        </CustomDialog.FooterButton>
                    </CustomDialog.FooterButtonGroup>
                </form>
            </CustomDialog>
        </>
    );
}

function Table({
    inventoryReceiveSeperatedItems,
    onChangePurchaseCost,
}) {
    return (
        <TableWrapper>
            <TableBox>
                <table
                    cellSpacing={0}
                >
                    <thead>
                        <tr>
                            {TABLE_HEADER?.map(r => {
                                if (r.resizable) {
                                    return (
                                        <ResizableTh
                                            key={r.name}
                                            className="fixed-header"
                                            scope="col"
                                            width={r.defaultWidth}
                                            style={{
                                                zIndex: '10'
                                            }}
                                        >
                                            {r.headerName}
                                        </ResizableTh>
                                    );
                                }

                                return (
                                    <th
                                        key={r.name}
                                        className="fixed-header"
                                        scope="col"
                                        width={r.defaultWidth}
                                        style={{
                                            zIndex: '10'
                                        }}
                                    >
                                        {r.headerName}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {inventoryReceiveSeperatedItems?.map((inventoryReceiveSeperatedItem, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <div>{inventoryReceiveSeperatedItem?.id}</div>
                                    </td>
                                    <td>
                                        <CustomInput
                                            type='text'
                                            className='input-item'
                                            placeholder='매입단가'
                                            value={inventoryReceiveSeperatedItem?.purchaseCost ? numberWithCommas(inventoryReceiveSeperatedItem?.purchaseCost) : ''}
                                            onChange={(e) => onChangePurchaseCost(e, index)}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </TableBox>
        </TableWrapper >
    );
}

const TABLE_HEADER = [
    {
        resizable: true,
        name: 'id',
        headerName: '입고 코드',
        defaultWidth: 300
    },
    {
        resizable: true,
        name: 'purchaseCost',
        headerName: '매입단가',
        defaultWidth: 200
    }
]