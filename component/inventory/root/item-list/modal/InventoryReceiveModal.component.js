import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import useDisabledBtn from "../../../../../hooks/button/useDisabledBtn";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import CustomImage from "../../../../modules/image/CustomImage";
import CustomInput from "../../../../modules/input/CustomInput";
import CommonModalComponent from "../../../../modules/modal/CommonModalComponent";
import ResizableTh from "../../../../modules/table/ResizableTh";
import useInventoryReceivesFormHook from "../hooks/useInventoryReceivesFormHook";
import { Container, ContentContainer, SubmitButtonContainer, TableBox, TableWrapper } from "../styles/InventoryReceiveModal.styled";
import BatchReceiveMemoModalComponent from "./BatchReceiveMemoModal.component";
import BatchReceiveUnitModalComponent from "./BatchReceiveUnitModal.component";

export default function InventoryReceiveModalComponent({
    selectedProductOptions,
    onClose,
    onReqFetchInventoryStocks
}) {
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const {
        inventoryReceivesForm,
        reqCreateInventoryReceives,
        onChangeUnit,
        onChangeMemo,
        onActionBatchChangeUnit,
        onActionBatchChangeMemo,
        checkUnitFormatValid,
        checkMemoFormatValid
    } = useInventoryReceivesFormHook({
        selectedProductOptions: selectedProductOptions
    });
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();

    const [batchReceiveUnitModalOpen, setBatchReceiveUnitModalOpen] = useState(false);
    const [batchReceiveMemoModalOpen, setBatchReceiveMemoModalOpen] = useState(false);


    const handleOpenBatchReceiveUnitModal = () => {
        setBatchReceiveUnitModalOpen(true);
    }

    const handleCloseBatchReceiveUnitModal = () => {
        setBatchReceiveUnitModalOpen(false);
    }

    const handleOpenBatchReceiveMemoModal = () => {
        setBatchReceiveMemoModalOpen(true);
    }

    const handleCloseBatchReceiveMemoModal = () => {
        setBatchReceiveMemoModalOpen(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabledBtn(true);

        try {
            checkUnitFormatValid();
            checkMemoFormatValid();
        } catch (err) {
            alert(err.message);
            return;
        }

        let body = {
            workspaceId: workspaceRedux?.workspaceInfo?.id,
            inventoryReceives: [...inventoryReceivesForm]
        }

        await reqCreateInventoryReceives({
            body: body,
            successCallback: () => {
                onClose();
                onReqFetchInventoryStocks();
            }
        });
    }
    return (
        <>
            <Container>
                <div className='header-close-button-box'>
                    <button
                        type='button'
                        onClick={() => onClose()}
                        className='header-close-button-el'
                    >
                        <div className='header-close-button-icon'>
                            <Image
                                loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                src='/images/icon/close_default_959eae.svg'
                                layout='responsive'
                                width={1}
                                height={1}
                                alt="close icon"
                                loading="lazy"
                            ></Image>
                        </div>
                    </button>
                </div>
                <div
                    className='title-box'
                >
                    <div className='title'>
                        입고등록
                    </div>
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <ContentContainer>
                        <Table
                            inventoryReceivesForm={inventoryReceivesForm}
                            onChangeUnit={onChangeUnit}
                            onChangeMemo={onChangeMemo}
                            onActionOpenBatchReceiveUnitModal={handleOpenBatchReceiveUnitModal}
                            onActionOpenBatchReceiveMemoModal={handleOpenBatchReceiveMemoModal}
                        />
                    </ContentContainer>
                    <SubmitButtonContainer>
                        <SingleBlockButton
                            type='button'
                            className='button-item'
                            style={{
                                background: '#959eae',
                                flex: 1
                            }}
                            onClick={() => onClose()}
                        >
                            취소
                        </SingleBlockButton>
                        <SingleBlockButton
                            type='submit'
                            className='button-item'
                            style={{
                                background: 'var(--mainColor)',
                                width: '60%'
                            }}
                            disabled={disabledBtn}
                        >
                            확인
                        </SingleBlockButton>
                    </SubmitButtonContainer>
                </form>
            </Container>

            {batchReceiveUnitModalOpen &&

                <CommonModalComponent
                    open={batchReceiveUnitModalOpen}
                    onClose={handleCloseBatchReceiveUnitModal}
                >
                    <BatchReceiveUnitModalComponent
                        onClose={handleCloseBatchReceiveUnitModal}
                        onConfirm={onActionBatchChangeUnit}
                    />
                </CommonModalComponent>
            }

            {batchReceiveMemoModalOpen &&
                <CommonModalComponent
                    open={batchReceiveMemoModalOpen}
                    onClose={handleCloseBatchReceiveMemoModal}
                >
                    <BatchReceiveMemoModalComponent
                        onClose={handleCloseBatchReceiveMemoModal}
                        onConfirm={onActionBatchChangeMemo}
                    />
                </CommonModalComponent>
            }
        </>
    );
}

function Table({
    inventoryReceivesForm,
    onChangeUnit,
    onChangeMemo,
    onActionOpenBatchReceiveUnitModal,
    onActionOpenBatchReceiveMemoModal
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
                                if (r.name === 'receiveUnit') {
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
                                            <div className='mgl-flex mgl-flex-justifyContent-center'>
                                                {r.headerName}
                                                <SingleBlockButton
                                                    type='button'
                                                    className='control-button-item'
                                                    onClick={() => onActionOpenBatchReceiveUnitModal()}
                                                >
                                                    <div className='icon-figure'>
                                                        <CustomImage
                                                            src={'/images/icon/edit_note_808080.svg'}
                                                        />
                                                    </div>
                                                </SingleBlockButton>
                                            </div>
                                        </th>
                                    );
                                }

                                if (r.name === 'memo') {
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
                                            <div className='mgl-flex mgl-flex-justifyContent-center'>
                                                {r.headerName}
                                                <SingleBlockButton
                                                    type='button'
                                                    className='control-button-item'
                                                    onClick={() => onActionOpenBatchReceiveMemoModal()}
                                                >
                                                    <div className='icon-figure'>
                                                        <CustomImage
                                                            src={'/images/icon/edit_note_808080.svg'}
                                                        />
                                                    </div>
                                                </SingleBlockButton>
                                            </div>
                                        </ResizableTh>
                                    );
                                }

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
                        {inventoryReceivesForm?.map((inventoryReceiveForm, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <div>{inventoryReceiveForm?.productCategoryName} / {inventoryReceiveForm?.productSubCategoryName}</div>
                                        <div>{inventoryReceiveForm?.productName}</div>
                                    </td>
                                    <td>
                                        <div>
                                            {inventoryReceiveForm?.productOptionName}
                                        </div>
                                    </td>
                                    <td>
                                        <CustomInput
                                            type='text'
                                            className='input-item'
                                            placeholder='수량'
                                            value={inventoryReceiveForm?.unit}
                                            onChange={(e) => onChangeUnit(e, index)}
                                        />
                                    </td>
                                    <td>
                                        <CustomInput
                                            type='text'
                                            className='input-item'
                                            placeholder='메모'
                                            value={inventoryReceiveForm?.memo}
                                            maxLength={50}
                                            onChange={(e) => onChangeMemo(e, index)}
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
        name: 'productInfo',
        headerName: '상품정보',
        defaultWidth: 200
    },
    {
        resizable: true,
        name: 'optionName',
        headerName: '옵션명',
        defaultWidth: 200
    },
    {
        resizable: false,
        name: 'receiveUnit',
        headerName: '입고수량',
        defaultWidth: 80
    },
    {
        resizable: true,
        name: 'memo',
        headerName: '메모',
        defaultWidth: 300
    },
]