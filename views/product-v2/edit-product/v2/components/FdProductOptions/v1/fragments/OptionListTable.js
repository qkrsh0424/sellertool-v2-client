import CustomBlockButton from "/components/buttons/block-button/v1/CustomBlockButton";
import CustomImage from "/components/image/CustomImage";
import ResizableTh from "/components/table/th/v1/ResizableTh";
import { TableBox, TableWrapper } from "./OptionListTable.styled";
import { numberFormatUtils } from "/utils/numberFormatUtils";

export function OptionListTable({
    productOptions,
    onDeleteProductOption,
    onChangeOptionValueOfName,
    onChangeOptionNumberValueOfName,
    onOpenEditBatchModal
}) {

    const onKeyDownMove = (e) => {
        const UP_ARROW = 38;
        const DOWN_ARROW = 40;
        const LEFT_ARROW = 37;
        const RIGHT_ARROW = 39;
        const TOTAL_CELLS_BY_ROW = OPTION_HEADER.length;

        var idx = e.target.parentElement.cellIndex;
        let selectionStartIdx = e.target.selectionStart;
        let value = e.target.value;

        if (e.keyCode === 13) {
            e.preventDefault();
            const nextRow = e.target.parentElement.parentElement.nextElementSibling
            if (nextRow) {
                if (nextRow.childNodes[idx % TOTAL_CELLS_BY_ROW].childNodes[0].tagName !== 'INPUT') {
                    return;
                }
                nextRow.childNodes[idx % TOTAL_CELLS_BY_ROW].childNodes[0].focus();
            }
        }

        if (selectionStartIdx === 0 && e.keyCode === LEFT_ARROW) {
            if (e.target.parentElement.previousElementSibling) {
                if (e.target.parentElement.previousElementSibling.childNodes[0].tagName !== 'INPUT') {
                    return;
                }

                e.target.parentElement.previousElementSibling.childNodes[0].focus();
            }
        }

        if (selectionStartIdx === value.length && e.keyCode === RIGHT_ARROW) {
            if (e.target.parentElement.nextElementSibling) {
                if (e.target.parentElement.nextElementSibling.childNodes[0].tagName !== 'INPUT') {
                    return;
                }
                e.target.parentElement.nextElementSibling.childNodes[0].focus();
            }
        }

        if (e.keyCode === DOWN_ARROW) {
            const nextRow = e.target.parentElement.parentElement.nextElementSibling
            if (nextRow) {
                if (nextRow.childNodes[idx % TOTAL_CELLS_BY_ROW].childNodes[0].tagName !== 'INPUT') {
                    return;
                }
                nextRow.childNodes[idx % TOTAL_CELLS_BY_ROW].childNodes[0].focus();
            }
        }

        if (e.keyCode === UP_ARROW) {
            const previousRow = e.target.parentElement.parentElement.previousElementSibling
            if (previousRow) {
                if (previousRow.childNodes[idx % TOTAL_CELLS_BY_ROW].childNodes[0].tagName !== 'INPUT') {
                    return;
                }
                previousRow.childNodes[idx % TOTAL_CELLS_BY_ROW].childNodes[0].focus();
            }
        }
    }

    return (
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
                                width={80}
                                style={{
                                    zIndex: '10'
                                }}
                            >
                                삭제
                            </th>
                            {OPTION_HEADER?.map((r, index) => {
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
                                            {!['name', 'code'].includes(r.name) &&
                                                <CustomBlockButton
                                                    type='button'
                                                    className='control-button-item'
                                                    onClick={() => onOpenEditBatchModal(r.name)}
                                                >
                                                    <div className='icon-figure'>
                                                        <CustomImage
                                                            src={'/images/icon/edit_note_808080.svg'}
                                                        />
                                                    </div>
                                                </CustomBlockButton>
                                            }
                                        </div>
                                    </ResizableTh>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {productOptions?.map((option) => {
                            return (
                                <tr
                                    key={option.id}
                                >
                                    <td>
                                        <CustomBlockButton
                                            type='button'
                                            className='delete-button-item'
                                            onClick={() => onDeleteProductOption(option.id)}
                                        >
                                            <div className='icon-figure'>
                                                <CustomImage
                                                    src={'/images/icon/delete_default_e56767.svg'}
                                                />
                                            </div>
                                        </CustomBlockButton>
                                    </td>
                                    {OPTION_HEADER.map((header) => {
                                        if (header?.readOnly && header?.name === 'code') {
                                            return (
                                                <td key={header.name}>
                                                    <input
                                                        type='text'
                                                        className='input-item readOnly-item'
                                                        name={header.name}
                                                        value={option[header?.name]}
                                                        placeholder={'수정 완료시 자동부여'}
                                                        onKeyDown={(e) => onKeyDownMove(e)}
                                                        readOnly={true}
                                                    ></input>
                                                </td>
                                            );
                                        }
                                        if (header.name === 'salesPrice' || header.name === 'totalPurchasePrice') {
                                            return (
                                                <td key={header.name}>
                                                    <input
                                                        type='text'
                                                        className='input-item'
                                                        name={header.name}
                                                        value={numberFormatUtils.numberWithCommas(option[header.name])}
                                                        placeholder={`${header.headerName}을(를) 입력`}
                                                        onChange={(e) => onChangeOptionNumberValueOfName(e, option.id)}
                                                        onKeyDown={(e) => onKeyDownMove(e)}
                                                    ></input>
                                                </td>

                                            );
                                        }
                                        return (
                                            <td key={header.name}>
                                                <input
                                                    type='text'
                                                    className='input-item'
                                                    name={header.name}
                                                    value={option[header.name]}
                                                    placeholder={`${header.headerName}을(를) 입력`}
                                                    onChange={(e) => onChangeOptionValueOfName(e, option.id)}
                                                    onKeyDown={(e) => onKeyDownMove(e)}
                                                ></input>
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </TableBox>
        </TableWrapper>
    );
}

const OPTION_HEADER = [
    {
        name: 'code',
        headerName: '옵션코드',
        required: true,
        readOnly: true
    },
    {
        name: 'name',
        headerName: '옵션명',
        required: true,
        readOnly: false
    },
    {
        name: 'optionTag',
        headerName: '옵션태그',
        required: false,
        readOnly: false
    },
    {
        name: 'salesPrice',
        headerName: '판매가격',
        required: false,
        readOnly: false
    },
    {
        name: 'totalPurchasePrice',
        headerName: '매입가격',
        required: false,
        readOnly: false
    },
    {
        name: 'releaseLocation',
        headerName: '출고지',
        required: false,
        readOnly: false
    },
    {
        name: 'status',
        headerName: '상태',
        required: false,
        readOnly: false
    },
    {
        name: 'memo',
        headerName: '메모',
        required: false,
        readOnly: false
    }
]