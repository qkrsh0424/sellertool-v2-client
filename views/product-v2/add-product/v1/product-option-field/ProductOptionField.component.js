import { useState } from "react";
import { numberFormatUtils } from "../../../../../utils/numberFormatUtils";
import valueUtils from "../../../../../utils/valueUtils";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import CustomImage from "../../../../modules/image/CustomImage";
import CommonModalComponent from "../../../../modules/modal/CommonModalComponent";
import useOptionGeneratorFormHook from "../hooks/useOptionGeneratorFormHook";
import EditMemosModalComponent from "./modal/EditMemosModal.component";
import EditOptionTagsModalComponent from "./modal/EditOptionTagsModal.component";
import EditReleaseLocationsModalComponent from "./modal/EditReleaseLocationsModal.component";
import EditSalesPricesModalComponent from "./modal/EditSalesPricesModal.component";
import EditStatusesModalComponent from "./modal/EditStatusesModal.component";
import EditTotalPurchasePricesModalComponent from "./modal/EditTotalPurchasePricesModal.component";
import { Container, FormWrapper, HeadWrapper, OptionGeneratorWrapper, TableBox, TableWrapper, Wrapper } from "./styles/ProductOptionField.styled";
import ResizableTh from "/components/table/th/v1/ResizableTh";
import CustomBlockButton from "/components/buttons/block-button/v1/CustomBlockButton";
import BulkCreateOptionListModalComponent from "./modal/BulkCreateOptionListModal.component";

export default function ProductOptionFieldComponent({
    productOptions,
    onReqProductOptionBulkCreateExcelUpload,
    onActionPushProductOption,
    onActionPushProductOptionsWithNames,
    onActionDeleteProductOption,
    onChangeOptionValueOfName,
    onChangeOptionNumberValueOfName,

    onSetOptionTagsWitchOptionNames,
    onSetOptionTagsWithInput,
    onSetSalesPricesWithInput,
    onSetTotalPurchasePricesWithInput,
    onSetReleaseLocationsWithInput,
    onSetStatusesWithInput,
    onSetMemosWithInput
}) {
    const [dropDownOpen, setDropDownOpen] = useState(true);
    const [editBatchModalOpen, setEditBatchModalOpen] = useState(null);
    const [bulkCreateOptionListModalOpen, setBulkCreateOptionListModalOpen] = useState(false);

    const {
        seperator,
        optionValues: generatorOptionValues,
        onChangeSeperator,
        onChangeOptionValue: onChangeGeneratorOptionValue,
        onActionPushOptionValue: onActionPushGeneratorOptionValue,
        onActionDeleteOptionValue: onActionDeleteGeneratorOptionValue
    } = useOptionGeneratorFormHook();

    const __handle = {
        action: {
            openDropDown: () => {
                setDropDownOpen(true);
            },
            closeDropDown: () => {
                setDropDownOpen(false);
            },
            openEditBatchModal: (name) => {
                if (valueUtils.isEmptyValues(productOptions)) {
                    alert('옵션을 추가해 주세요.');
                    return;
                }
                setEditBatchModalOpen(name);
            },
            closeEditBatchModal: () => {
                setEditBatchModalOpen(null);
            },
            addProductOptionsWithGenerator: (e) => {
                e.preventDefault();
                let generatorSize = generatorOptionValues.length;
                let values1 = generatorOptionValues[0]?.value.split(',').map(r => r.trim());
                let values2 = generatorOptionValues[1]?.value.split(',').map(r => r.trim());
                let values3 = generatorOptionValues[2]?.value.split(',').map(r => r.trim());
                let valueMultiply = (values1?.length || 1) * (values2?.length || 1) * (values3?.length || 1);

                if (valueMultiply > 500) {
                    alert('조합형 옵션개수가 500개가 초과 됩니다. 옵션개수를 500개 이하로 조합해주세요.');
                    return;
                }

                let optionNames = [];

                switch (generatorSize) {
                    case 1:
                        if (!generatorOptionValues[0]?.value) {
                            return;
                        }

                        values1.forEach(value1 => {
                            optionNames.push(value1)
                        })
                        break;
                    case 2:
                        if (!generatorOptionValues[1]?.value) {
                            return;
                        }

                        values1.forEach(value1 => {
                            values2.forEach(value2 => {
                                optionNames.push(value1 + seperator + value2)
                            })
                        })
                        break;
                    case 3:
                        if (!generatorOptionValues[1]?.value || !generatorOptionValues[2]?.value) {
                            return;
                        }
                        values1.forEach(value1 => {
                            values2.forEach(value2 => {
                                values3.forEach(value3 => {
                                    optionNames.push(value1 + seperator + value2 + seperator + value3)
                                })
                            })
                        })
                        break;
                    default: return;
                }


                try {
                    optionNames.forEach(r => {
                        if (r.length > 50) {
                            throw new Error('50자가 넘는 조합 옵션명이 있습니다. 옵션명은 최대 50자 까지만 가능합니다.')
                        }
                    })
                } catch (err) {
                    alert(err.message);
                    return;
                }
                onActionPushProductOptionsWithNames(optionNames);
            }
        }
    }

    const toggleBulkCreateOptionListModalOpen = (setOpen) => {
        setBulkCreateOptionListModalOpen(setOpen);
    }

    return (
        <>
            <Container>
                <Wrapper>
                    <HeadWrapper className='mgl-flex mgl-flex-alignItems-center mgl-flex-justifyContent-spaceBetween'>
                        <div className='mgl-flex mgl-flex-alignItems-center'>
                            <span className='required-tag'></span>
                            <div className='title'>
                                옵션 정보
                            </div>
                        </div>
                        {dropDownOpen ?
                            <SingleBlockButton
                                type='button'
                                className='icon-button'
                                onClick={() => __handle.action.closeDropDown()}
                            >
                                <div className='icon-figure'>
                                    <CustomImage
                                        src={'/images/icon/arrowDropUp_default_808080.svg'}
                                    />
                                </div>
                            </SingleBlockButton>
                            :
                            (

                                <SingleBlockButton
                                    type='button'
                                    className='icon-button'
                                    onClick={() => __handle.action.openDropDown()}
                                >
                                    <div className='icon-figure'>
                                        <CustomImage
                                            src={'/images/icon/arrowDropDown_default_808080.svg'}
                                        />
                                    </div>
                                </SingleBlockButton>
                            )
                        }
                    </HeadWrapper>
                    {dropDownOpen &&
                        (
                            <>
                                <OptionGeneratorWrapper>
                                    <form onSubmit={(e) => __handle.action.addProductOptionsWithGenerator(e)}>
                                        옵션명 조합 생성
                                        <div className='input-group mgl-flex'>
                                            <div className='input-box'>
                                                <input
                                                    type='text'
                                                    className='input-item'
                                                    placeholder="옵션명 구분자 ( , - _ )"
                                                    value={seperator || ''}
                                                    onChange={(e) => onChangeSeperator(e)}
                                                ></input>
                                            </div>
                                            <div className='flex-block'></div>
                                            <div>
                                                {generatorOptionValues?.map((r, index) => {

                                                    return (
                                                        <div key={index} className='input-box mgl-flex mgl-flex-alignItems-center mgl-flex-justifyContent-spaceBetween'>
                                                            <input
                                                                type='text'
                                                                className='input-item'
                                                                placeholder={'옵션값 예시: 빨강,노랑 ( , 로 구분)'}
                                                                value={r.value}
                                                                onChange={(e) => onChangeGeneratorOptionValue(e, index)}
                                                            ></input>
                                                            <div className='icon-button-group mgl-flex mgl-flex-justifyContent-flexEnd'>
                                                                {index !== 0 &&
                                                                    <SingleBlockButton
                                                                        type='button'
                                                                        className='icon-button-item'
                                                                        style={{
                                                                            background: '#ffffff'
                                                                        }}
                                                                        onClick={() => onActionDeleteGeneratorOptionValue(index)}
                                                                    >
                                                                        <div className='icon-figure'>
                                                                            <CustomImage
                                                                                src='/images/icon/close_default_959eae.svg'
                                                                            />
                                                                        </div>
                                                                    </SingleBlockButton>
                                                                }
                                                                {index === generatorOptionValues.length - 1 && index < 2 &&
                                                                    <SingleBlockButton
                                                                        type='button'
                                                                        className='icon-button-item'
                                                                        style={{
                                                                            background: '#697185'
                                                                        }}
                                                                        onClick={() => onActionPushGeneratorOptionValue()}
                                                                    >
                                                                        <div className='icon-figure'>
                                                                            <CustomImage
                                                                                src='/images/icon/add_default_ffffff.svg'
                                                                            />
                                                                        </div>
                                                                    </SingleBlockButton>
                                                                }
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                                <div className='flex-block'></div>
                                                <SingleBlockButton
                                                    type='submit'
                                                    className='generator-button-item'
                                                    disabled={
                                                        (generatorOptionValues.length === 1 && !generatorOptionValues[0].value) ||
                                                        (generatorOptionValues.length === 2 && (!generatorOptionValues[0].value || !generatorOptionValues[1].value)) ||
                                                        (generatorOptionValues.length === 3 && (!generatorOptionValues[0].value || !generatorOptionValues[1].value || !generatorOptionValues[2].value))
                                                    }
                                                >
                                                    <div className='mgl-flex mgl-flex-alignItems-center mgl-flex-justifyContent-center'>
                                                        <span
                                                            style={{
                                                                width: '20px',
                                                                height: '20px',
                                                                marginRight: '10px'
                                                            }}
                                                        >
                                                            <CustomImage
                                                                src='/images/icon/arrow_downward_ffffff.svg'
                                                            />
                                                        </span>
                                                        적용
                                                    </div>
                                                </SingleBlockButton>
                                            </div>
                                        </div>
                                    </form>
                                </OptionGeneratorWrapper>
                                <FormWrapper>
                                    <div className='mgl-flex mgl-flex-alignItems-center mgl-flex-justifyContent-spaceBetween'>
                                        <div style={{
                                            fontSize: '14px',
                                            color: '#404040'
                                        }}>
                                            <span className='required-tag'></span>옵션 목록 (총 <span style={{ color: 'var(--mainColor)' }}>{productOptions?.length}</span>개)
                                        </div>
                                        <div className='mgl-flex'>
                                            <CustomBlockButton
                                                type='button'
                                                className='excel-bulk-button'
                                                onClick={() => toggleBulkCreateOptionListModalOpen(true)}
                                            >
                                                엑셀 일괄등록
                                            </CustomBlockButton>
                                            <CustomBlockButton
                                                type='button'
                                                className='add-button-item'
                                                onClick={() => onActionPushProductOption()}
                                            >
                                                추가
                                            </CustomBlockButton>
                                        </div>
                                    </div>
                                    <Table
                                        productOptions={productOptions}
                                        onActionDeleteProductOption={onActionDeleteProductOption}
                                        onChangeOptionValueOfName={onChangeOptionValueOfName}
                                        onChangeOptionNumberValueOfName={onChangeOptionNumberValueOfName}
                                        onActionOpenEditBatchModal={__handle.action.openEditBatchModal}
                                    />
                                </FormWrapper>
                            </>
                        )
                    }
                </Wrapper>
            </Container>

            <CommonModalComponent
                open={editBatchModalOpen === 'optionTag'}

                onClose={__handle.action.closeEditBatchModal}
            >
                <EditOptionTagsModalComponent
                    onClose={__handle.action.closeEditBatchModal}
                    onSetOptionTagsWitchOptionNames={onSetOptionTagsWitchOptionNames}
                    onSetOptionTagsWithInput={onSetOptionTagsWithInput}
                />
            </CommonModalComponent>

            <CommonModalComponent
                open={editBatchModalOpen === 'salesPrice'}

                onClose={__handle.action.closeEditBatchModal}
            >
                <EditSalesPricesModalComponent
                    onClose={__handle.action.closeEditBatchModal}
                    onConfirm={onSetSalesPricesWithInput}
                />
            </CommonModalComponent>

            <CommonModalComponent
                open={editBatchModalOpen === 'totalPurchasePrice'}

                onClose={__handle.action.closeEditBatchModal}
            >
                <EditTotalPurchasePricesModalComponent
                    onClose={__handle.action.closeEditBatchModal}
                    onConfirm={onSetTotalPurchasePricesWithInput}
                />
            </CommonModalComponent>

            <CommonModalComponent
                open={editBatchModalOpen === 'releaseLocation'}

                onClose={__handle.action.closeEditBatchModal}
            >
                <EditReleaseLocationsModalComponent
                    onClose={__handle.action.closeEditBatchModal}
                    onConfirm={onSetReleaseLocationsWithInput}
                />
            </CommonModalComponent>

            <CommonModalComponent
                open={editBatchModalOpen === 'status'}

                onClose={__handle.action.closeEditBatchModal}
            >
                <EditStatusesModalComponent
                    onClose={__handle.action.closeEditBatchModal}
                    onConfirm={onSetStatusesWithInput}
                />
            </CommonModalComponent>

            <CommonModalComponent
                open={editBatchModalOpen === 'memo'}

                onClose={__handle.action.closeEditBatchModal}
            >
                <EditMemosModalComponent
                    onClose={__handle.action.closeEditBatchModal}
                    onConfirm={onSetMemosWithInput}
                />
            </CommonModalComponent>

            {bulkCreateOptionListModalOpen &&
                <BulkCreateOptionListModalComponent
                    open={bulkCreateOptionListModalOpen}
                    onClose={() => toggleBulkCreateOptionListModalOpen(false)}
                    onReqProductOptionBulkCreateExcelUpload={onReqProductOptionBulkCreateExcelUpload}
                />
            }
        </>
    );
}

function Table({
    productOptions,
    onActionDeleteProductOption,
    onChangeOptionValueOfName,
    onChangeOptionNumberValueOfName,
    onActionOpenEditBatchModal
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
                                                <SingleBlockButton
                                                    type='button'
                                                    className='control-button-item'
                                                    onClick={() => onActionOpenEditBatchModal(r.name)}
                                                >
                                                    <div className='icon-figure'>
                                                        <CustomImage
                                                            src={'/images/icon/edit_note_808080.svg'}
                                                        />
                                                    </div>
                                                </SingleBlockButton>
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
                                        <SingleBlockButton
                                            type='button'
                                            className='delete-button-item'
                                            onClick={() => onActionDeleteProductOption(option.id)}
                                        >
                                            <div className='icon-figure'>
                                                <CustomImage
                                                    src={'/images/icon/delete_default_e56767.svg'}
                                                />
                                            </div>
                                        </SingleBlockButton>
                                    </td>
                                    {OPTION_HEADER.map((header) => {
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