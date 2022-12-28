import _ from "lodash";
import { useRouter } from "next/router";
import { createRef, useEffect, useRef, useState } from "react";
import { dateToYYYYMMDDhhmmss } from "../../../../../utils/dateFormatUtils";
import SortButton from "../../../../modules/button/SortButton";
import CustomImage from "../../../../modules/image/CustomImage";
import FieldLoading from "../../../../modules/loading/FieldLoading";
import FieldLoadingV2 from "../../../../modules/loading/FieldLoadingV2";
import CommonModalComponent from "../../../../modules/modal/CommonModalComponent";
import InfiniteScrollObserver from "../../../../modules/observer/InfiniteScrollObserver";
import ReverseScrollObserver from "../../../../modules/observer/ReverseScrollObserver";
import ResizableTh from "../../../../modules/table/ResizableTh";
import useErpItemPageHook from "../hooks/useErpItemPageHook";
import FloatingControlBarComponent from "./FloatingControlBar.component";
import EditOptionCodeModalComponent from "./modal/EditOptionCodeModal.component";
import { TableFieldWrapper } from "./styles/ErpItemList.styled";

const TABLE_DATA_VIEW_SIZE = 50;
const TABLE_DATA_INC_DEC_SIZE = 30;

export default function ErpItemListComponent({
    erpCollectionHeader,
    erpItemPage,
    selectedErpItems,
    inventoryStocks,
    onSelectErpItem,
    onSelectAllErpItems,
    onSelectClearAllErpItemsInPage,
    onSelectClearAllErpItems,
    erpItemPagePending,
    onSubmitChangeOptionCode,
    onSubmitChangeReleaseOptionCode,
    onSelectClearErpItem
}) {
    const router = useRouter();
    const tableScrollRef = useRef();
    const [prevViewSize, setPrevViewSize] = useState(0);
    const [viewSize, setViewSize] = useState(TABLE_DATA_VIEW_SIZE);
    const [editOptionCodeModalOpen, setEditOptionCodeModalOpen] = useState(false);
    const [editReleaseOptionCodeModalOpen, setEditReleaseOptionCodeModalOpen] = useState(false);
    const [targetErpItem, setTargetErpItem] = useState(null);

    useEffect(() => {
        tableScrollRef.current.scrollTop = 0;
        setViewSize(TABLE_DATA_VIEW_SIZE);
    }, [router?.query]);

    useEffect(() => {
        if (viewSize > TABLE_DATA_VIEW_SIZE) {
            setPrevViewSize(viewSize - TABLE_DATA_VIEW_SIZE);
        } else {
            setPrevViewSize(0);
        }
    }, [viewSize]);

    const handleFetchMoreItemsView = () => {
        let newViewSize = viewSize + TABLE_DATA_INC_DEC_SIZE;

        setViewSize(newViewSize);
    }

    const handleFetchPrevItemsView = () => {
        if (viewSize > TABLE_DATA_VIEW_SIZE) {
            setViewSize(viewSize - TABLE_DATA_INC_DEC_SIZE);
        }
    }

    const handleOpenEditOptionCodeModal = (e, erpItem) => {
        e.stopPropagation();
        setTargetErpItem(_.cloneDeep(erpItem));
        setEditOptionCodeModalOpen(true);
    }

    const handleCloseEditOptionCodeModal = () => {
        setEditOptionCodeModalOpen(false);
        setTargetErpItem(null);
    }

    const handleOpenEditReleaseOptionCodeModal = (e, erpItem) => {
        e.stopPropagation();
        setTargetErpItem(_.cloneDeep(erpItem));
        setEditReleaseOptionCodeModalOpen(true);

    }

    const handleCloseEditReleaseOptionCodeModal = () => {
        setEditReleaseOptionCodeModalOpen(false);
        setTargetErpItem(null);
    }

    const handleSubmitEditOptionCode = (selectedOptionCode) => {
        let body = {
            id: targetErpItem.id,
            optionCode: selectedOptionCode
        }

        onSubmitChangeOptionCode(body, () => {
            handleCloseEditOptionCodeModal();
        })
    }

    const handleSubmitEditReleaseOptionCode = (selectedOptionCode) => {
        let body = {
            id: targetErpItem.id,
            releaseOptionCode: selectedOptionCode
        }

        onSubmitChangeReleaseOptionCode(body, () => {
            handleCloseEditReleaseOptionCodeModal();
        })
    }
    return (
        <>
            <TableFieldWrapper>
                <div style={{ position: 'relative' }}>
                    {erpItemPagePending &&
                        <FieldLoadingV2
                            boxStyle={{
                                borderRadius: '15px'
                            }}
                        />
                    }

                    <div
                        className='table-box'
                        ref={tableScrollRef}
                    >
                        <table cellSpacing="0">
                            <thead>
                                <tr>
                                    <th
                                        className="fixed-header"
                                        width={40}
                                    >
                                        No.
                                    </th>
                                    <th
                                        className="fixed-header"
                                        width={50}
                                    >
                                        {erpItemPage?.content?.every(r => selectedErpItems?.some(r2 => r2.id === r.id)) ?
                                            <input
                                                type='checkbox'
                                                onChange={() => onSelectClearAllErpItemsInPage(erpItemPage?.content)}
                                                checked={true}
                                                style={{ cursor: 'pointer' }}
                                            ></input>
                                            :
                                            <input
                                                type='checkbox'
                                                onChange={() => onSelectAllErpItems(erpItemPage?.content)}
                                                checked={false}
                                                style={{ cursor: 'pointer' }}
                                            ></input>
                                        }
                                    </th>
                                    {erpCollectionHeader?.erpCollectionHeaderDetails?.map((r, index) => {
                                        return (
                                            <ResizableTh
                                                key={index}
                                                className="fixed-header"
                                                scope="col"
                                                width={200}
                                            >
                                                <div
                                                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
                                                >
                                                    <div>
                                                        {r.customHeaderName}
                                                    </div>
                                                </div>
                                                {(HIGHLIGHT_FIELDS.includes(r.matchedFieldName) || r.matchedFieldName === (router?.query?.matchedCode || 'releaseOptionCode')) &&
                                                    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '10%', background: 'var(--mainColor)' }}></div>
                                                }
                                            </ResizableTh>
                                        )
                                    })}
                                    <th
                                        className="fixed-header fixed-col-right"
                                        style={{ zIndex: 12, boxShadow: '0.5px -0.5px 0 0 #e0e0e0 inset' }}
                                        width={50}
                                    >
                                        수정
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {erpItemPage?.content?.slice(0, viewSize).map((r1, rowIndex) => {
                                    const isSelected = selectedErpItems?.find(r => r.id === r1.id);
                                    let inventoryStock = inventoryStocks?.find(r => r.productOptionId === r1.productOptionId);
                                    let isOutOfStock = inventoryStock && inventoryStock?.stockUnit <= 0;
                                    if (rowIndex < prevViewSize) {
                                        return (
                                            <tr key={r1.id}>
                                                <td>
                                                    {rowIndex + 1}
                                                </td>
                                            </tr>
                                        )
                                    }

                                    if (rowIndex === prevViewSize && viewSize > TABLE_DATA_VIEW_SIZE) {
                                        return (
                                            <ReverseScrollObserver
                                                key={r1.id}
                                                elementTagType={'tr'}
                                                totalSize={erpItemPage?.content?.length || 0}
                                                startOffset={prevViewSize || 0}
                                                endOffset={viewSize || 0}
                                                dataViewSize={TABLE_DATA_VIEW_SIZE}
                                                threshold={0}
                                                fetchData={() => handleFetchPrevItemsView()}
                                                loadingElementTag={
                                                    <td style={{ textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#444', paddingLeft: '50px' }} colSpan={100}>
                                                        로딩중...
                                                    </td>
                                                }
                                                endElementTag={
                                                    <td style={{ textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#444', paddingLeft: '50px' }} colSpan={100}>
                                                        마지막 데이터 입니다.
                                                    </td>
                                                }
                                            />
                                        );
                                    }

                                    return (
                                        <tr
                                            key={r1.id}
                                            className={`${isSelected && 'tr-active'} ${isOutOfStock && 'tr-highlight'}`}
                                            onClick={(e) => { e.stopPropagation(); onSelectErpItem(r1); }}
                                        >
                                            <td>{rowIndex + 1}</td>
                                            <td>
                                                <input
                                                    type='checkbox'
                                                    checked={isSelected || false}
                                                    onChange={() => onSelectErpItem(r1)}
                                                    onClick={(e) => e.stopPropagation()}
                                                    style={{ cursor: 'pointer' }}
                                                ></input>
                                            </td>
                                            {erpCollectionHeader?.erpCollectionHeaderDetails?.map(r2 => {
                                                let matchedFieldName = r2.matchedFieldName;
                                                if (matchedFieldName === 'createdAt' || matchedFieldName === 'salesAt' || matchedFieldName === 'releaseAt' || matchedFieldName === 'channelOrderDate') {
                                                    return (
                                                        <td key={`col-${matchedFieldName}`}>{r1[matchedFieldName] ? dateToYYYYMMDDhhmmss(r1[matchedFieldName]) : ""}</td>
                                                    )
                                                }

                                                if (matchedFieldName === 'optionCode') {
                                                    return (
                                                        <td key={`col-${matchedFieldName}`} className='td-highlight' onClick={(e) => handleOpenEditOptionCodeModal(e, r1)}>{r1[matchedFieldName]}</td>
                                                    )
                                                }

                                                if (matchedFieldName === 'releaseOptionCode') {
                                                    return (
                                                        <td key={`col-${matchedFieldName}`} className='td-highlight' onClick={(e) => handleOpenEditReleaseOptionCodeModal(e, r1)}>{r1[matchedFieldName]}</td>
                                                    )
                                                }

                                                if (matchedFieldName === 'optionStockUnit') {
                                                    return (
                                                        <td key={`col-${matchedFieldName}`}>{inventoryStock ? inventoryStock.stockUnit : '옵션코드 미지정'}</td>
                                                    )
                                                }

                                                return (
                                                    <td
                                                        key={`col-${matchedFieldName}`}
                                                        className={`${(matchedFieldName === 'receiver' && r1[`duplicationUser`]) ? 'user-duplication' : ''}`}
                                                    >
                                                        {r1[matchedFieldName]}
                                                    </td>
                                                )
                                            })}
                                            <td className='fixed-col-right'>
                                                <button
                                                    type='button'
                                                    className='fix-button-el'
                                                >

                                                    <CustomImage
                                                        src={'/images/icon/edit_note_808080.svg'}
                                                    />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                                <InfiniteScrollObserver
                                    elementTagType={'tr'}
                                    totalSize={erpItemPage?.content?.length || 0}
                                    startOffset={0}
                                    endOffset={viewSize}
                                    fetchData={handleFetchMoreItemsView}
                                    loadingElementTag={
                                        <td style={{ textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#444', paddingLeft: '50px' }} colSpan={100}>
                                            로딩중...
                                        </td>
                                    }
                                    endElementTag={
                                        <td style={{ textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#444', paddingLeft: '50px' }} colSpan={100}>
                                            마지막 데이터 입니다.
                                        </td>
                                    }
                                />
                            </tbody>
                        </table>
                    </div>
                </div>
            </TableFieldWrapper>

            {editOptionCodeModalOpen &&
                <CommonModalComponent
                    open={editOptionCodeModalOpen}
                    onClose={handleCloseEditOptionCodeModal}
                >
                    <EditOptionCodeModalComponent
                        onClose={handleCloseEditOptionCodeModal}
                        onConfirm={handleSubmitEditOptionCode}
                    />
                </CommonModalComponent>
            }

            {editReleaseOptionCodeModalOpen &&
                <CommonModalComponent
                    open={editReleaseOptionCodeModalOpen}
                    onClose={handleCloseEditReleaseOptionCodeModal}
                >
                    <EditOptionCodeModalComponent
                        onClose={handleCloseEditReleaseOptionCodeModal}
                        onConfirm={handleSubmitEditReleaseOptionCode}
                    />
                </CommonModalComponent>
            }
        </>
    );
}

const HIGHLIGHT_FIELDS = [
    'productCategoryName',
    'productSubCategoryName',
    'productName',
    'productTag',
    'productOptionName',
    'productOptionTag',
    'productOptionReleaseLocation',
    'optionStockUnit'
];