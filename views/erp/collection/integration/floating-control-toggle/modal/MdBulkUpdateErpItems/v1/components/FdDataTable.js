import { useEffect, useState } from "react";
import { dateToYYYYMMDDhhmmss } from "../../../../../../../../../utils/dateFormatUtils";
import { numberFormatUtils } from "../../../../../../../../../utils/numberFormatUtils";
import { TableBox, TableWrapper } from "./FdDataTable.styled";
import CustomDateTimeSelector from "../../../../../../../../../components/date-time-selector/v1/CustomDateTimeSelector";
import { CustomSearchOptionCodesModal, useSearchOptionCodesModalControl } from "../../../../../../../../../components/search-option-codes/v2";
import ResizableTh from "../../../../../../../../../components/table/th/v1/ResizableTh";
import CustomBlockButton from "../../../../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import CustomImage from "../../../../../../../../../components/image/CustomImage";
import ReverseScrollObserver from "../../../../../../../../../components/observer/ReverseScrollObserver";
import InfiniteScrollObserver from "../../../../../../../../../components/observer/InfiniteScrollObserver";
import { MdBulkUpdateForTargetFieldName } from "../MdBulkUpdateForTargetFieldName";

const TABLE_DATA_VIEW_SIZE = 40;
const TABLE_DATA_INC_DEC_SIZE = 20;

export function FdDataTable({
    tableHeaders,
    editErpItems,
    onChangeValueOfName,
    onChangeNumberValueOfName,
    onChangeOptionCodeAll,
    onChangeReleaseOptionCodeAll,
    onChangeOptionCode,
    onChangeReleaseOptionCode,
    onChangeChannelOrderDate,
    onChangeChannelOrderDateAll,
    onChangeFieldNameAll,
    onDelete
}) {
    const editAllOptionCodeModalControl = useSearchOptionCodesModalControl();
    const editAllReleaseOptionCodeModalControl = useSearchOptionCodesModalControl();
    const editOptionCodeModalControl = useSearchOptionCodesModalControl();
    const editReleaseOptionCodeModalControl = useSearchOptionCodesModalControl();

    const [prevViewSize, setPrevViewSize] = useState(0);
    const [viewSize, setViewSize] = useState(TABLE_DATA_VIEW_SIZE);
    const [editChannelOrderDateModalOpen, setEditChannelOrderDateModalOpen] = useState(false);
    const [editAllChannelOrderDateModalOpen, setEditAllChannelOrderDateModalOpen] = useState(false);
    const [targetErpItemId, setTargetErpItemId] = useState(null);
    const [bulkUpdateTargetFieldName, setBulkUpdateTargetFieldName] = useState(null);

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

    const handleFetchInitPrevItemsView = () => {
        if (prevViewSize !== 0) {
            setViewSize(TABLE_DATA_VIEW_SIZE);
        }
    }

    const toggleEditOptionCodeModalOpen = (erpItemId) => {
        if (erpItemId) {
            setTargetErpItemId(erpItemId);
            editOptionCodeModalControl.toggleOpen(true);
        } else {
            editOptionCodeModalControl.toggleOpen(false);
            setTargetErpItemId(null);
        }
    }

    const toggleEditReleaseOptionCodeModalOpen = (erpItemId) => {
        if (erpItemId) {
            const targetErpItem = editErpItems?.find(r => r.id === erpItemId);
            if (targetErpItem?.stockReflectYn === 'y') {
                alert(`이미 재고반영된 데이터의 [M] 출고옵션코드는 변경이 불가능 합니다.`);
                return;
            }

            setTargetErpItemId(erpItemId);
            editReleaseOptionCodeModalControl.toggleOpen(true);
        } else {
            editReleaseOptionCodeModalControl.toggleOpen(false);
            setTargetErpItemId(null);
        }
    }

    const toggleEditOptionCodeAllModalOpen = (setOpen) => {
        if (setOpen) {
            editAllOptionCodeModalControl.toggleOpen(true);
        } else {
            editAllOptionCodeModalControl.toggleOpen(false);
        }
    }

    const toggleEditReleaseOptionCodeAllModalOpen = (setOpen) => {
        if (setOpen) {
            let stockReflectedItems = [];

            editErpItems?.forEach(r => {
                if (r.stockReflectYn === 'y') {
                    stockReflectedItems.push(r);
                }
            });

            if (stockReflectedItems?.length >= 1) {
                alert(`이미 재고반영된 데이터가 있어 [M] 출고옵션코드는 변경이 불가능 합니다. 해당 데이터를 제외 후 수정해 주세요.\n[M] 주문수집번호 :\n${stockReflectedItems?.map(r => r.uniqueCode)?.join()}`);
                return;
            }

            editAllReleaseOptionCodeModalControl.toggleOpen(true);
        } else {
            editAllReleaseOptionCodeModalControl.toggleOpen(false);
        }
    }

    const toggleEditChannelOrderDateModalOpen = (setOpen, erpItemId) => {
        if (setOpen) {
            setTargetErpItemId(erpItemId);
        } else {
            setTargetErpItemId(null);
        }
        setEditChannelOrderDateModalOpen(setOpen);
    }

    const toggleEditAllChannelOrderDateModalOpen = (setOpen) => {
        setEditAllChannelOrderDateModalOpen(setOpen);
    }

    const handleChangeOptionCodeAll = (optionCode) => {
        onChangeOptionCodeAll(optionCode);
        toggleEditOptionCodeAllModalOpen(false);
    }

    const handleChangeReleaseOptionCodeAll = (optionCode) => {
        onChangeReleaseOptionCodeAll(optionCode)
        toggleEditReleaseOptionCodeAllModalOpen(false);
    }

    const handleChangeOptionCode = (optionCode) => {
        onChangeOptionCode(targetErpItemId, optionCode);
        toggleEditOptionCodeModalOpen(null);
    }

    const handleChangeReleaseOptionCode = (optionCode) => {
        onChangeReleaseOptionCode(targetErpItemId, optionCode);
        toggleEditReleaseOptionCodeModalOpen(null);
    }

    const handleChangeChannelOrderDate = (value) => {
        onChangeChannelOrderDate(targetErpItemId, value);
        toggleEditChannelOrderDateModalOpen(false);
    }

    const handleChangeChannelOrderDateAll = (value) => {
        onChangeChannelOrderDateAll(value);
        toggleEditAllChannelOrderDateModalOpen(false);
    }

    const handleChangeBulkUpdateTargetFieldName = (fieldName) => {
        setBulkUpdateTargetFieldName(fieldName);
    }

    console.log(bulkUpdateTargetFieldName);
    return (
        <>
            <TableWrapper>
                <TableBox>
                    <table
                        cellSpacing={0}
                    >
                        <thead>
                            <tr>
                                <th
                                    className="fixed-header"
                                    scope="col"
                                    width={50}
                                    style={{
                                        zIndex: '10'
                                    }}
                                >
                                    해제
                                </th>
                                <th
                                    className="fixed-header"
                                    scope="col"
                                    width={50}
                                    style={{
                                        zIndex: '10'
                                    }}
                                >
                                    No.
                                </th>
                                <th
                                    className="fixed-header"
                                    scope="col"
                                    width={160}
                                    style={{
                                        zIndex: '10'
                                    }}
                                >
                                    [M] 주문수집번호
                                </th>
                                <th
                                    className="fixed-header"
                                    scope="col"
                                    width={100}
                                    style={{
                                        zIndex: '10'
                                    }}
                                >
                                    재고반영 여부
                                </th>
                                {tableHeaders?.map?.((r, index) => {
                                    if (r.name === 'optionCode') {
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
                                                <div className='mgl-flex mgl-flex-justifyContent-center mgl-flex-alignItems-center'>
                                                    {r.required &&
                                                        <span className='required-tag'></span>
                                                    }
                                                    {r.headerName}
                                                    <CustomBlockButton
                                                        type='button'
                                                        className='control-button-item'
                                                        onClick={() => toggleEditOptionCodeAllModalOpen(true)}
                                                    >
                                                        <div className='icon-figure'>
                                                            <CustomImage
                                                                src={'/images/icon/edit_note_808080.svg'}
                                                            />
                                                        </div>
                                                    </CustomBlockButton>
                                                </div>
                                            </ResizableTh>
                                        )
                                    }

                                    if (r.name === 'releaseOptionCode') {
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
                                                <div className='mgl-flex mgl-flex-justifyContent-center mgl-flex-alignItems-center'>
                                                    {r.required &&
                                                        <span className='required-tag'></span>
                                                    }
                                                    {r.headerName}
                                                    <CustomBlockButton
                                                        type='button'
                                                        className='control-button-item'
                                                        onClick={() => toggleEditReleaseOptionCodeAllModalOpen(true)}
                                                    >
                                                        <div className='icon-figure'>
                                                            <CustomImage
                                                                src={'/images/icon/edit_note_808080.svg'}
                                                            />
                                                        </div>
                                                    </CustomBlockButton>
                                                </div>
                                            </ResizableTh>
                                        )
                                    }

                                    if (r.name === 'channelOrderDate') {
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
                                                <div className='mgl-flex mgl-flex-justifyContent-center mgl-flex-alignItems-center'>
                                                    {r.required &&
                                                        <span className='required-tag'></span>
                                                    }
                                                    {r.headerName}
                                                    <CustomBlockButton
                                                        type='button'
                                                        className='control-button-item'
                                                        onClick={() => toggleEditAllChannelOrderDateModalOpen(true)}
                                                    >
                                                        <div className='icon-figure'>
                                                            <CustomImage
                                                                src={'/images/icon/edit_note_808080.svg'}
                                                            />
                                                        </div>
                                                    </CustomBlockButton>
                                                </div>
                                            </ResizableTh>
                                        )
                                    }

                                    return (
                                        <ResizableTh
                                            key={index}
                                            className="fixed-header"
                                            scope="col"
                                            width={180}
                                            style={{
                                                zIndex: '10'
                                            }}
                                        >
                                            <div className='mgl-flex mgl-flex-justifyContent-center mgl-flex-alignItems-center'>
                                                {r.required &&
                                                    <span className='required-tag'></span>
                                                }
                                                {r.headerName}
                                                <CustomBlockButton
                                                    type='button'
                                                    className='control-button-item'
                                                    onClick={() => handleChangeBulkUpdateTargetFieldName(r.name)}
                                                >
                                                    <div className='icon-figure'>
                                                        <CustomImage
                                                            src={'/images/icon/edit_note_808080.svg'}
                                                        />
                                                    </div>
                                                </CustomBlockButton>
                                            </div>
                                        </ResizableTh>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {prevViewSize !== 0 &&
                                <ReverseScrollObserver
                                    elementTagType={'tr'}
                                    totalSize={editErpItems?.length || 0}
                                    startOffset={prevViewSize || 0}
                                    endOffset={viewSize || 0}
                                    dataViewSize={TABLE_DATA_VIEW_SIZE}
                                    threshold={0}
                                    fetchData={() => handleFetchInitPrevItemsView()}
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
                            }
                            {editErpItems?.slice(0, viewSize)?.map((erpItem, index) => {
                                if (index < prevViewSize) {
                                    return (
                                        <tr key={erpItem.id}>
                                            <td>
                                                {index + 1}
                                            </td>
                                        </tr>
                                    )
                                }

                                if (index === prevViewSize && viewSize > TABLE_DATA_VIEW_SIZE) {
                                    return (
                                        <ReverseScrollObserver
                                            key={erpItem.id}
                                            elementTagType={'tr'}
                                            totalSize={editErpItems?.length || 0}
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
                                        key={erpItem.id}
                                    >
                                        <td>
                                            <CustomBlockButton
                                                type='button'
                                                className='delete-button-item'
                                                onClick={() => onDelete(erpItem.id)}
                                            >
                                                <div className='icon-figure'>
                                                    <CustomImage
                                                        src={'/images/icon/delete_default_e56767.svg'}
                                                    />
                                                </div>
                                            </CustomBlockButton>
                                        </td>
                                        <td>
                                            {index + 1}
                                        </td>
                                        <td style={{ background: '#f0f0f0' }}>
                                            {erpItem?.uniqueCode}
                                        </td>
                                        <td style={{ background: '#f0f0f0' }}>
                                            {erpItem?.stockReflectYn === 'y' ?
                                                <span style={{ color: 'var(--defaultGreenColor)', fontWeight: '700' }}>반영됨</span> :
                                                <span style={{ color: 'var(--defaultRedColor)', fontWeight: '700' }}>미반영</span>
                                            }
                                        </td>
                                        {tableHeaders.map((header) => {
                                            if (header.name === 'optionCode') {
                                                return (
                                                    <td
                                                        key={header.name}
                                                        className={`optionCodeTd`}
                                                    >
                                                        <div className='mgl-flex mgl-flex-alignItems-center'>
                                                            <div className='optionCodeText'>{erpItem[header.name]}</div>
                                                            <CustomBlockButton
                                                                type='button'
                                                                className='button-item'

                                                                onClick={() => toggleEditOptionCodeModalOpen(erpItem.id)}
                                                            >
                                                                변경
                                                            </CustomBlockButton>
                                                        </div>
                                                    </td>
                                                );
                                            }

                                            if (header.name === 'releaseOptionCode') {
                                                return (
                                                    <td
                                                        key={header.name}
                                                        className={`optionCodeTd`}
                                                    >
                                                        <div className='mgl-flex mgl-flex-alignItems-center'>
                                                            <div className='optionCodeText'>{erpItem[header.name]}</div>
                                                            <CustomBlockButton
                                                                type='button'
                                                                className='button-item'

                                                                onClick={() => toggleEditReleaseOptionCodeModalOpen(erpItem.id)}
                                                            >
                                                                변경
                                                            </CustomBlockButton>
                                                        </div>
                                                    </td>
                                                );
                                            }

                                            if (header.name === 'unit' || header.name === 'price' || header.name === 'deliveryCharge') {
                                                return (
                                                    <td key={header.name}>
                                                        <input
                                                            type='text'
                                                            className='input-item'
                                                            name={header.name}
                                                            value={numberFormatUtils.numberWithCommas(erpItem[header.name])}
                                                            placeholder={`${header.headerName}을(를) 입력`}
                                                            onChange={(e) => onChangeNumberValueOfName(e, erpItem.id)}
                                                        ></input>
                                                    </td>
                                                );
                                            }

                                            if (header.name === 'channelOrderDate') {
                                                return (
                                                    <td
                                                        key={header.name}
                                                        className={`optionCodeTd`}
                                                    >
                                                        <CustomBlockButton
                                                            type='button'
                                                            className='button-item'
                                                            style={{ width: '100%' }}
                                                            onClick={() => toggleEditChannelOrderDateModalOpen(true, erpItem.id)}
                                                        >
                                                            {erpItem[header.name] ? dateToYYYYMMDDhhmmss(erpItem[header.name]) : ''}
                                                        </CustomBlockButton>
                                                    </td>
                                                );
                                            }

                                            if (header.name === 'extraWaybillNumbers') {
                                                return (
                                                    <td key={header.name}>
                                                        <textarea
                                                            type='text'
                                                            className='textarea-item'
                                                            name={header.name}
                                                            value={erpItem[header.name] || ''}
                                                            placeholder={`${header.headerName}을(를) 입력`}
                                                            onChange={(e) => onChangeValueOfName(e, erpItem.id)}
                                                        ></textarea>
                                                    </td>
                                                );
                                            }

                                            return (
                                                <td key={header.name}>
                                                    <input
                                                        type='text'
                                                        className='input-item'
                                                        name={header.name}
                                                        value={erpItem[header.name] || ''}
                                                        placeholder={`${header.headerName}을(를) 입력`}
                                                        onChange={(e) => onChangeValueOfName(e, erpItem.id)}
                                                    ></input>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                            <InfiniteScrollObserver
                                elementTagType={'tr'}
                                totalSize={editErpItems?.length || 0}
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
                </TableBox>
            </TableWrapper>

            {editAllOptionCodeModalControl.open &&
                <CustomSearchOptionCodesModal
                    open={editAllOptionCodeModalControl.open}
                    onClose={() => toggleEditOptionCodeAllModalOpen(false)}
                    onSelect={(result) => handleChangeOptionCodeAll(result)}
                />
            }

            {editAllReleaseOptionCodeModalControl.open &&
                <CustomSearchOptionCodesModal
                    open={editAllReleaseOptionCodeModalControl.open}
                    onClose={() => toggleEditReleaseOptionCodeAllModalOpen(false)}
                    onSelect={(result) => handleChangeReleaseOptionCodeAll(result)}
                />
            }

            {editOptionCodeModalControl.open &&
                <CustomSearchOptionCodesModal
                    open={editOptionCodeModalControl.open}
                    onClose={() => toggleEditOptionCodeModalOpen(null)}
                    onSelect={(result) => handleChangeOptionCode(result)}
                />
            }

            {editReleaseOptionCodeModalControl.open &&
                <CustomSearchOptionCodesModal
                    open={editReleaseOptionCodeModalControl.open}
                    onClose={() => toggleEditReleaseOptionCodeModalOpen(null)}
                    onSelect={(result) => handleChangeReleaseOptionCode(result)}
                />
            }

            {editChannelOrderDateModalOpen &&
                <CustomDateTimeSelector
                    open={editChannelOrderDateModalOpen}
                    onClose={() => toggleEditChannelOrderDateModalOpen(false)}
                    onConfirm={(value) => handleChangeChannelOrderDate(value)}
                    initialDateTime={editErpItems.find(r => r.id === targetErpItemId)?.channelOrderDate}
                    label="판매채널 주문일시"
                />
            }

            {editAllChannelOrderDateModalOpen &&
                <CustomDateTimeSelector
                    open={editAllChannelOrderDateModalOpen}
                    onClose={() => toggleEditAllChannelOrderDateModalOpen(false)}
                    onConfirm={(value) => handleChangeChannelOrderDateAll(value)}
                    initialDateTime={new Date()}
                    label="판매채널 주문일시"
                />
            }

            {bulkUpdateTargetFieldName &&
                <MdBulkUpdateForTargetFieldName
                    open={bulkUpdateTargetFieldName ? true : false}
                    onChangeBulkUpdateTargetFieldName={handleChangeBulkUpdateTargetFieldName}
                    targetFieldName={bulkUpdateTargetFieldName}
                    onChangeFieldNameAll={onChangeFieldNameAll}
                />
            }
        </>
    );
}