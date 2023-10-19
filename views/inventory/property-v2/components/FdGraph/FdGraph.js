import { St } from "./FdGraph.styled";
import { CustomNumberUtils } from "../../../../../utils/CustomNumberUtils";
import { CustomDateUtils } from "../../../../../utils/CustomDateUtils";
import { useEffect, useRef } from "react";
import { CustomChart } from "../../../../../components/CustomChart/v1";
import { useState } from "react";

const customNumberUtils = CustomNumberUtils();
const customDateUtils = CustomDateUtils();

const returnDates = (startDateTime, endDateTime) => {
    const startDate = new Date(startDateTime);
    const endDate = new Date(endDateTime);
    const dates = [];

    while (startDate <= endDate) {
        dates.push(customDateUtils.dateToYYYYMMDD(new Date(startDate), '-'));
        startDate.setDate(startDate.getDate() + 1);
    }
    return dates;
}

export function FdGraph({
    yesterdayLocalDateTime,
    last30dayLocalDateTime,
    inventoryAssetAmountList
}) {
    const dateList = returnDates(last30dayLocalDateTime, yesterdayLocalDateTime);
    const inventoryAssetAmountListInRange = dateList.map(date => {
        let inventoryAssetAmount = inventoryAssetAmountList.find(r => r.recordDate === date);
        if (!inventoryAssetAmount) {
            return {
                remainedAssetsAmount: 0,
                estimatedSalesAmount: 0,
                totalRemainedQuantityAmount: 0
            };
        } else {
            return {
                remainedAssetsAmount: inventoryAssetAmount.remainedAssetsAmount,
                estimatedSalesAmount: inventoryAssetAmount.estimatedSalesAmount,
                totalRemainedQuantityAmount: inventoryAssetAmount.totalRemainedQuantityAmount
            };
        }
    })

    const [selectedViewer, setSelectedViewer] = useState('REMAINED_ASSETS_AMOUNT');

    const handleChangeSelectedViewer = (value) => {
        setSelectedViewer(value);
    }

    return (
        <>
            <St.ChartContainer>
                <St.ChartWrapper>
                    <div className='select-viewer-wrapper'>
                        <div
                            className={`select-viewer-item ${selectedViewer === 'REMAINED_ASSETS_AMOUNT' ? 'select-viewer-item-active' : ''}`}
                            onClick={() => handleChangeSelectedViewer('REMAINED_ASSETS_AMOUNT')}
                        >
                            총 재고자산
                        </div>
                        <div
                            className={`select-viewer-item ${selectedViewer === 'ESTIMATED_SALES_AMOUNT' ? 'select-viewer-item-active' : ''}`}
                            onClick={() => handleChangeSelectedViewer('ESTIMATED_SALES_AMOUNT')}
                        >
                            총 예상 매출액
                        </div>
                        <div
                            className={`select-viewer-item ${selectedViewer === 'TOTAL_REMAINED_QUANTITY_AMOUNT' ? 'select-viewer-item-active' : ''}`}
                            onClick={() => handleChangeSelectedViewer('TOTAL_REMAINED_QUANTITY_AMOUNT')}
                        >
                            총 재고수량
                        </div>
                    </div>
                    <InventoryAssetAmountChart
                        dateList={dateList}
                        inventoryAssetAmountListInRange={inventoryAssetAmountListInRange}
                        selectedViewer={selectedViewer}
                    />
                </St.ChartWrapper>
            </St.ChartContainer>
        </>
    );
}

function InventoryAssetAmountChart({
    dateList,
    inventoryAssetAmountListInRange,
    selectedViewer
}) {
    const options = {
        ...CustomChart.defaultOptions,
        plugins: {
            ...CustomChart.defaultOptions.plugins,
            legend: {
                display: false,
            },
            title: {
                display: false
            }
        },
        scales: {
            ...CustomChart.defaultOptions.scales,
            x: {
                ...CustomChart.defaultOptions.scales.x,
                title: {
                    display: false
                }
            },
            y: {
                ...CustomChart.defaultOptions.scales.y,
                title: {
                    display: true,
                    text: selectedViewer === 'TOTAL_REMAINED_QUANTITY_AMOUNT' ? '수량 (개)' : '금액 (원)',
                    font: {
                        size: 11,
                        weight: 600,
                    },
                },
                grid: {
                    display: true,
                    offset: false,
                },
                min: 0,
                stacked: false
            }
        }
    }
    const data = {
        labels: dateList,
        datasets: [
            {
                type: 'line',
                label: selectedViewer === 'REMAINED_ASSETS_AMOUNT' ? '총 재고자산' : selectedViewer === 'ESTIMATED_SALES_AMOUNT' ? '총 예상 매출액' : '총 재고수량',
                data: inventoryAssetAmountListInRange.map(r => selectedViewer === 'REMAINED_ASSETS_AMOUNT' ? r.remainedAssetsAmount : selectedViewer === 'ESTIMATED_SALES_AMOUNT' ? r.estimatedSalesAmount : r.totalRemainedQuantityAmount),
                borderColor: '#344b98',
                backgroundColor: '#344b98',
                borderWidth: 1,
                fill: false,
                barPercentage: 0.4,
                categoryPercentage: 1,
                order: 0,
                borderRadius: 5,
                stack: 'Stack 0'
            },
        ],
    }

    return (
        <div className='chart-box'>
            <CustomChart.Chart
                data={data}
                options={options}
            />
        </div>
    );
}