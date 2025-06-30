import CustomBlockButton from "/components/buttons/block-button/v1/CustomBlockButton";
import { Container, FormWrapper, HeadWrapper, OptionGeneratorWrapper, Wrapper } from "./FdProductOptions.styled";
import CustomImage from "/components/image/CustomImage";
import { useState } from "react";
import { MergeGenerator, OptionListTable } from "./fragments";
import { getRemovedPrefixZero } from "/utils/numberFormatUtils";
import valueUtils from "/utils/valueUtils";
import { MdBatchEditMemos, MdBatchEditOptionTags, MdBatchEditReleaseLocation, MdBatchEditSalesPrices, MdBatchEditStatuses, MdBatchEditTotalPurchasePrices, MdBulkCreateOptionList } from "./modals";
import CustomUniqueKeyUtils from "../../../../../../../utils/CustomUniqueKeyUtils";

export function FdProductOptions({
    productOptions,
    onPushNewProductOption,
    onPushNewProductOptionsWithNames,
    onDeleteProductOption,
    onChangeOptionValueOfName,
    onBatchChangeOptionTagsWithOptionName,
    onBatchChangeValueOfName,
    onSetProductOptions,
    onReqProductOptionBulkCreateExcelUpload
}) {
    const [dropDownOpen, setDropDownOpen] = useState(true);
    const [editBatchModalType, setEditBatchModalType] = useState(null);
    const [bulkCreateOptionListModalOpen, setBulkCreateOptionListModalOpen] = useState(false);

    const toggleDropDownOpen = (setOpen) => {
        setDropDownOpen(setOpen);
    }

    const handleChangeOptionValueOfName = (e, id) => {
        const name = e.target.name;
        const value = e.target.value;

        onChangeOptionValueOfName(name, value, id);
    }

    const handleChangeOptionNumberValueOfName = (e, id) => {
        const name = e.target.name;
        let value = e.target.value;

        if (!value) {
            onChangeOptionValueOfName(name, '', id);
            return;
        }

        value = value.replaceAll(',', '');
        if (value === '0') {
            onChangeOptionValueOfName(name, '0', id);
            return;
        }

        value = getRemovedPrefixZero(value);

        if (value.match(/^[0-9]{0,9}$/)) {
            onChangeOptionValueOfName(name, value, id);
        }

    }

    const handleOpenEditBatchModal = (name) => {
        if (valueUtils.isEmptyValues(productOptions)) {
            alert('옵션을 추가해 주세요.');
            return;
        }
        setEditBatchModalType(name);
    }

    const handleCloseEditBatchModal = () => {
        setEditBatchModalType(null);
    }

    const toggleBulkCreateOptionListModalOpen = (setOpen) => {
        setBulkCreateOptionListModalOpen(setOpen);
    }

    const handleGenerateNewOptionCode = async () => {
        const newProductOptions = productOptions.map(option => {
            if (!option?.code) {
                return {
                    ...option,
                    code: CustomUniqueKeyUtils.generateCode18()
                }
            } else {
                return {
                    ...option
                }
            }
        })
        onSetProductOptions(newProductOptions);
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
                            <CustomBlockButton
                                type='button'
                                className='icon-button'
                                onClick={() => toggleDropDownOpen(false)}
                            >
                                <div className='icon-figure'>
                                    <CustomImage
                                        src={'/images/icon/arrowDropUp_default_808080.svg'}
                                    />
                                </div>
                            </CustomBlockButton>
                            :
                            (

                                <CustomBlockButton
                                    type='button'
                                    className='icon-button'
                                    onClick={() => toggleDropDownOpen(true)}
                                >
                                    <div className='icon-figure'>
                                        <CustomImage
                                            src={'/images/icon/arrowDropDown_default_808080.svg'}
                                        />
                                    </div>
                                </CustomBlockButton>
                            )
                        }
                    </HeadWrapper>
                    {dropDownOpen &&
                        <>
                            <MergeGenerator
                                onSubmitCreate={(optionNames) => onPushNewProductOptionsWithNames(optionNames)}
                            />
                            <FormWrapper>
                                <div className='eventHandler-wrapper'>
                                    <div className='items-label'>
                                        <span className='required-tag'></span>옵션 목록 (총 <span style={{ color: 'var(--mainColor)' }}>{productOptions?.length}</span>개)
                                    </div>
                                    <div className='buttons'>
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
                                            onClick={() => onPushNewProductOption()}
                                        >
                                            추가
                                        </CustomBlockButton>
                                    </div>
                                </div>
                                <OptionListTable
                                    productOptions={productOptions}
                                    onDeleteProductOption={onDeleteProductOption}
                                    onChangeOptionValueOfName={handleChangeOptionValueOfName}
                                    onChangeOptionNumberValueOfName={handleChangeOptionNumberValueOfName}
                                    onOpenEditBatchModal={handleOpenEditBatchModal}
                                    onGenerateNewOptionCode={handleGenerateNewOptionCode}
                                />
                            </FormWrapper>
                        </>
                    }
                </Wrapper>
            </Container>

            {editBatchModalType === 'optionTag' &&
                <MdBatchEditOptionTags
                    open={editBatchModalType === 'optionTag'}
                    onClose={() => handleCloseEditBatchModal()}
                    onBatchChangeOptionTagsWithOptionName={onBatchChangeOptionTagsWithOptionName}
                    onConfirm={(value) => onBatchChangeValueOfName('optionTag', value)}
                />
            }

            {editBatchModalType === 'salesPrice' &&
                <MdBatchEditSalesPrices
                    open={editBatchModalType === 'salesPrice'}
                    onClose={() => handleCloseEditBatchModal()}
                    onConfirm={(value) => onBatchChangeValueOfName('salesPrice', value)}
                />
            }

            {editBatchModalType === 'totalPurchasePrice' &&
                <MdBatchEditTotalPurchasePrices
                    open={editBatchModalType === 'totalPurchasePrice'}
                    onClose={() => handleCloseEditBatchModal()}
                    onConfirm={(value) => onBatchChangeValueOfName('totalPurchasePrice', value)}
                />
            }

            {editBatchModalType === 'releaseLocation' &&
                <MdBatchEditReleaseLocation
                    open={editBatchModalType === 'releaseLocation'}
                    onClose={() => handleCloseEditBatchModal()}
                    onConfirm={(value) => onBatchChangeValueOfName('releaseLocation', value)}
                />
            }

            {editBatchModalType === 'status' &&
                <MdBatchEditStatuses
                    open={editBatchModalType === 'status'}
                    onClose={() => handleCloseEditBatchModal()}
                    onConfirm={(value) => onBatchChangeValueOfName('status', value)}
                />
            }

            {editBatchModalType === 'memo' &&
                <MdBatchEditMemos
                    open={editBatchModalType === 'memo'}
                    onClose={() => handleCloseEditBatchModal()}
                    onConfirm={(value) => onBatchChangeValueOfName('memo', value)}
                />
            }

            {bulkCreateOptionListModalOpen &&
                <MdBulkCreateOptionList
                    open={bulkCreateOptionListModalOpen}
                    onClose={() => toggleBulkCreateOptionListModalOpen(false)}
                    onReqProductOptionBulkCreateExcelUpload={onReqProductOptionBulkCreateExcelUpload}
                />
            }
        </>
    );
}