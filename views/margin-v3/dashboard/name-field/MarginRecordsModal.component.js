import React from 'react';
import { CustomDialog } from '../../../../components/dialog/v1/CustomDialog';
import { roundToTwo, numberFormatUtils } from "../../../../utils/numberFormatUtils";
import { Container, ContentContainer, ContentWrapper, DeleteBtnBox, FlexWrapper, ItemBox, TableFieldWrapper, Title, TitleWrapper } from './MarginRecordsModal.styled';
import { useRouter } from 'next/router';
import PagenationComponentStateV2 from '../../../modules/pagenation/PagenationStateComponentV2';
import ResizableTh from '../../../../components/table/th/v1/ResizableTh';

const returnMarginInfo = (marginRecord) => {
    const salesPrice = parseFloat(marginRecord.salePrice); // 판매가격
    const consumerDeliveryCharge = parseFloat(marginRecord.consumerDeliveryCharge); // 소비자 부담 운임비
    const commission = parseFloat(marginRecord.commission); // 수수료
    const purchaseCost = parseFloat(marginRecord.purchaseCost); // 매입가격
    const purchaseDeliveryCharge = parseFloat(marginRecord.purchaseDeliveryCharge); // 매입운임비
    const sellerDeliveryCharge = parseFloat(marginRecord.sellerDeliveryCharge); // 판매자 부담 운임비
    const extraCost = parseFloat(marginRecord.extraCost); // 기타비용

    const totalIncome = setTotalIncome(); // 매출 총액
    const totalIncomeInterestExpense = setTotalIncomeInterestExpense(); // 수수료 비용
    const totalExpense = setTotalExpense(); // 매입 총 비용
    const margin = setMargin(); // 마진액
    const marginRate = setMarginRate(); // 마진율
    const incomeTax = setIncomeTax(); // 매출 부가세
    const expenseTax = setExpenseTax(); // 매입 부가세
    const totalTax = setTotalTax(); // 총 부가세
    const finalMargin = setFinalMargin();

    function setTotalIncome() {
        return salesPrice + consumerDeliveryCharge;
    }

    function setTotalIncomeInterestExpense() {
        return totalIncome * commission * 0.01;
    }

    function setTotalExpense() {
        return purchaseCost + purchaseDeliveryCharge + sellerDeliveryCharge + extraCost + totalIncomeInterestExpense;
    }

    function setMargin() {
        return totalIncome - totalExpense;
    }

    function setMarginRate() {
        let bar = 0;
        if (totalIncome !== 0) {
            bar = margin / totalIncome * 100;
        }

        return bar;
    }

    function setIncomeTax() {
        return totalIncome - (totalIncome / 1.1);
    }

    function setExpenseTax() {
        return totalExpense - (totalExpense / 1.1);
    }

    function setTotalTax() {
        return incomeTax - expenseTax;
    }

    function setFinalMargin() {
        return margin - totalTax;
    }

    return {
        salesPrice: roundToTwo(salesPrice),
        consumerDeliveryCharge: roundToTwo(consumerDeliveryCharge),
        commission: roundToTwo(commission),
        purchaseCost: roundToTwo(purchaseCost),
        purchaseDeliveryCharge: roundToTwo(purchaseDeliveryCharge),
        sellerDeliveryCharge: roundToTwo(sellerDeliveryCharge),
        extraCost: roundToTwo(extraCost),
        totalIncome: roundToTwo(totalIncome),
        totalIncomeInterestExpense: roundToTwo(totalIncomeInterestExpense),
        totalExpense: roundToTwo(totalExpense),
        margin: roundToTwo(margin),
        marginRate: roundToTwo(marginRate),
        incomeTax: roundToTwo(incomeTax),
        expenseTax: roundToTwo(expenseTax),
        totalTax: roundToTwo(totalTax),
        finalMargin: roundToTwo(finalMargin)
    };
}

const MarginRecordsModalComponent = ({
    open,
    onClose,
    marginRecordPage,
    selectedMarginRecord,
    MARGIN_RECORDS_SIZE,
    MARGIN_RECORDS_PAGE,
    onChangePage,
    onChangeSize
}) => {
    const router = useRouter();

    const handleSelectMarginRecord = (marginRecordId) => {
        router.replace({
            pathname: `/margin/dashboard`,
            query: {
                marginRecordId: marginRecordId
            }
        }, undefined, { scroll: false })
        onClose();
    }

    return (
        <>
            <CustomDialog
                open={open}
                onClose={() => onClose()}
                maxWidth='xl'
            >
                <CustomDialog.CloseButton onClose={() => onClose()} />
                <ContentContainer>
                    <TableFieldWrapper>
                        <div style={{ position: 'relative' }}>
                            <div
                                className='table-box'
                            >
                                <table cellSpacing="0">
                                    <thead>
                                        <tr>
                                            {TABLE_HEADERS?.map(tableHeader => {
                                                return (
                                                    <ResizableTh
                                                        key={tableHeader?.name}
                                                        className="fixed-header"
                                                        scope="col"
                                                        width={tableHeader?.defaultWidth}
                                                    >
                                                        <div
                                                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
                                                        >
                                                            {tableHeader?.name}
                                                        </div>
                                                    </ResizableTh>
                                                );
                                            })}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {marginRecordPage?.content?.map((marginRecord, index) => {
                                            const marginInfo = returnMarginInfo(marginRecord);

                                            return (
                                                <tr
                                                    key={marginRecord?.id}
                                                    onClick={() => handleSelectMarginRecord(marginRecord?.id)}
                                                    className={`${marginRecord?.id === selectedMarginRecord?.id ? 'tr-active' : ''}`}
                                                >
                                                    <td>{marginRecord?.name}</td>
                                                    <td>{marginRecord?.tag}</td>
                                                    <td>{numberFormatUtils.numberWithCommas(marginInfo?.marginRate)}</td>
                                                    <td>{numberFormatUtils.numberWithCommas(marginInfo?.margin)}</td>
                                                    <td>{numberFormatUtils.numberWithCommas(marginInfo?.salesPrice)}</td>
                                                    <td>{numberFormatUtils.numberWithCommas(marginInfo?.purchaseCost)}</td>
                                                    <td>{numberFormatUtils.numberWithCommas(marginInfo?.consumerDeliveryCharge)}</td>
                                                    <td>{numberFormatUtils.numberWithCommas(marginInfo?.sellerDeliveryCharge)}</td>
                                                    <td>{numberFormatUtils.numberWithCommas(marginInfo?.purchaseDeliveryCharge)}</td>
                                                    <td>{numberFormatUtils.numberWithCommas(marginInfo?.extraCost)}</td>
                                                    <td>{numberFormatUtils.numberWithCommas(marginInfo?.commission)}</td>
                                                    <td>{numberFormatUtils.numberWithCommas(marginInfo?.totalIncome)}</td>
                                                    <td>{numberFormatUtils.numberWithCommas(marginInfo?.totalExpense)}</td>
                                                    <td>{numberFormatUtils.numberWithCommas(marginInfo?.totalIncomeInterestExpense)}</td>
                                                    <td>{numberFormatUtils.numberWithCommas(marginInfo?.finalMargin)}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </TableFieldWrapper>
                    <div style={{ marginBottom: '30px' }}>
                        <PagenationComponentStateV2
                            pageIndex={marginRecordPage?.number}
                            totalPages={marginRecordPage?.totalPages}
                            isFirst={marginRecordPage?.first}
                            isLast={marginRecordPage?.last}
                            totalElements={marginRecordPage?.totalElements}
                            sizeElements={[10, 50, 100]}
                            size={MARGIN_RECORDS_SIZE}
                            onChangePage={(page) => onChangePage(page)}
                            onChangeSize={(size) => onChangeSize(size)}
                        />
                    </div>
                </ContentContainer>
            </CustomDialog>
        </>
    );
}
export default MarginRecordsModalComponent;

const TABLE_HEADERS = [
    {
        name: '레코드명',
        defaultWidth: 100
    },
    {
        name: '관리태그',
        defaultWidth: 100
    },
    {
        name: '마진율(%)',
        defaultWidth: 100
    },
    {
        name: '마진액(₩)',
        defaultWidth: 150
    },
    {
        name: '판매가격(₩)',
        defaultWidth: 150
    },
    {
        name: '매입가격(₩)',
        defaultWidth: 150
    },
    {
        name: '소비자 부담 운임비(₩)',
        defaultWidth: 150
    },
    {
        name: '판매자 부담 운임비(₩)',
        defaultWidth: 150
    },
    {
        name: '매입 운임비(₩)',
        defaultWidth: 150
    },
    {
        name: '기타비용(₩)',
        defaultWidth: 150
    },
    {
        name: '수수료(%)',
        defaultWidth: 150
    },
    {
        name: '매출 합계(₩)',
        defaultWidth: 150
    },
    {
        name: '매입 합계(₩)',
        defaultWidth: 150
    },
    {
        name: 'VAT(₩)',
        defaultWidth: 150
    },
    {
        name: '최종 마진액(₩)',
        defaultWidth: 150
    }
]