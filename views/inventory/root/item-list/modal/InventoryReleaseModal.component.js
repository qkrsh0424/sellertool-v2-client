import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import useDisabledBtn from "../../../../../hooks/button/useDisabledBtn";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import CustomImage from "../../../../modules/image/CustomImage";
import CustomInput from "../../../../modules/input/CustomInput";
import CommonModalComponent from "../../../../modules/modal/CommonModalComponent";
import useInventoryReleasesFormHook from "../hooks/useInventoryReleasesFormHook";
import { Container, ContentContainer, SubmitButtonContainer, TableBox, TableWrapper } from "../styles/InventoryReleaseModal.styled";
import BatchReleaseMemoModalComponent from "./BatchReleaseMemoModal.component";
import BatchReleaseUnitModalComponent from "./BatchReleaseUnitModal.component";
import ResizableTh from "../../../../../components/table/th/v1/ResizableTh";
import useInventoryStocksHook from "../hooks/useInventoryStocksHook";
import CustomBlockButton from "../../../../../components/buttons/block-button/v1/CustomBlockButton";

export default function InventoryReleaseModalComponent({
    selectedProductOptions,
    onClose,
    onActionSelectProductOption,
    onReqFetchInventoryStocks
}) {
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const {
        inventoryReleasesForm,
        reqCreateInventoryReleases,
        onChangeUnit,
        onChangeMemo,
        onActionBatchChangeUnit,
        onActionBatchChangeMemo,
        checkUnitFormatValid,
        checkMemoFormatValid
    } = useInventoryReleasesFormHook({
        selectedProductOptions: selectedProductOptions
    });

    const {
        inventoryStocks
    } = useInventoryStocksHook({
        productOptions: selectedProductOptions
    })

    const [disabledBtn, setDisabledBtn] = useDisabledBtn();

    const [batchReleaseUnitModalOpen, setBatchReleaseUnitModalOpen] = useState(false);
    const [batchReleaseMemoModalOpen, setBatchReleaseMemoModalOpen] = useState(false);


    const handleOpenBatchReleaseUnitModal = () => {
        setBatchReleaseUnitModalOpen(true);
    }

    const handleCloseBatchReleaseUnitModal = () => {
        setBatchReleaseUnitModalOpen(false);
    }

    const handleOpenBatchReleaseMemoModal = () => {
        setBatchReleaseMemoModalOpen(true);
    }

    const handleCloseBatchReleaseMemoModal = () => {
        setBatchReleaseMemoModalOpen(false);
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
            inventoryReleases: [...inventoryReleasesForm]
        }

        await reqCreateInventoryReleases({
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
                        출고등록
                    </div>
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <ContentContainer>
                        <Table
                            selectedProductOptions={selectedProductOptions}
                            inventoryReleasesForm={inventoryReleasesForm}
                            inventoryStocks={inventoryStocks}
                            onChangeUnit={onChangeUnit}
                            onChangeMemo={onChangeMemo}
                            onActionOpenBatchReleaseUnitModal={handleOpenBatchReleaseUnitModal}
                            onActionOpenBatchReleaseMemoModal={handleOpenBatchReleaseMemoModal}
                            onActionSelectProductOption={onActionSelectProductOption}
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

            {batchReleaseUnitModalOpen &&

                <CommonModalComponent
                    open={batchReleaseUnitModalOpen}
                    onClose={handleCloseBatchReleaseUnitModal}
                >
                    <BatchReleaseUnitModalComponent
                        onClose={handleCloseBatchReleaseUnitModal}
                        onConfirm={onActionBatchChangeUnit}
                    />
                </CommonModalComponent>
            }

            {batchReleaseMemoModalOpen &&
                <CommonModalComponent
                    open={batchReleaseMemoModalOpen}
                    onClose={handleCloseBatchReleaseMemoModal}
                >
                    <BatchReleaseMemoModalComponent
                        onClose={handleCloseBatchReleaseMemoModal}
                        onConfirm={onActionBatchChangeMemo}
                    />
                </CommonModalComponent>
            }
        </>
    );
}

function Table({
    selectedProductOptions,
    inventoryReleasesForm,
    inventoryStocks,
    onChangeUnit,
    onChangeMemo,
    onActionOpenBatchReleaseUnitModal,
    onActionOpenBatchReleaseMemoModal,
    onActionSelectProductOption
}) {
    return (
        <TableWrapper>
            <TableBox>
                <table
                    cellSpacing={0}
                >
                    <thead>
                        <tr>
                            <th width={50}>
                                취소
                            </th>
                            {TABLE_HEADER?.map(r => {
                                if (r.name === 'unit') {
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
                                                    onClick={() => onActionOpenBatchReleaseUnitModal()}
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
                                                    onClick={() => onActionOpenBatchReleaseMemoModal()}
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
                        {inventoryReleasesForm?.map((inventoryReleaseForm, index) => {
                            const productOption = selectedProductOptions?.find(r => r.id === inventoryReleaseForm?.productOptionId);
                            const inventoryStock = inventoryStocks?.find(r => r.productOptionId === inventoryReleaseForm?.productOptionId);
                            const stockUnit = inventoryStock ? inventoryStock?.stockUnit : 0;

                            return (
                                <tr key={index}>
                                    <td>
                                        <CustomBlockButton
                                            type='button'
                                            style={{ width: 24, height: 24, marginLeft: 'auto', marginRight: 'auto', border: 'none', background: 'none' }}
                                            onClick={() => onActionSelectProductOption(productOption)}
                                        >
                                            <CustomImage
                                                src='/images/icon/delete_default_e56767.svg'
                                            />
                                        </CustomBlockButton>
                                    </td>
                                    <td>
                                        <div>{inventoryReleaseForm?.productCategoryName} / {inventoryReleaseForm?.productSubCategoryName}</div>
                                        <div>{inventoryReleaseForm?.productName}</div>
                                    </td>
                                    <td>
                                        <div>
                                            {inventoryReleaseForm?.productOptionName}
                                        </div>
                                    </td>
                                    <td style={{ background: 'var(--mainColorOpacity100)', fontWeight: '700' }}>
                                        <div>
                                            {stockUnit}
                                        </div>
                                    </td>
                                    <td>
                                        <CustomInput
                                            type='text'
                                            className='input-item'
                                            placeholder='수량'
                                            value={inventoryReleaseForm?.unit}
                                            onChange={(e) => onChangeUnit(e, index)}
                                        />
                                    </td>
                                    <td>
                                        <CustomInput
                                            type='text'
                                            className='input-item'
                                            placeholder='메모'
                                            value={inventoryReleaseForm?.memo}
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
        name: 'stockUnit',
        headerName: '재고수량',
        defaultWidth: 80
    },
    {
        resizable: false,
        name: 'unit',
        headerName: '출고수량',
        defaultWidth: 100
    },
    {
        resizable: true,
        name: 'memo',
        headerName: '메모',
        defaultWidth: 300
    },
]