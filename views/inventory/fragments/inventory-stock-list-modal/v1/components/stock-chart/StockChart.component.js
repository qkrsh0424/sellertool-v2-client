import {
    Chart as ChartJS
} from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { ChartContainer, ChartWrapper } from "./StockChart.styled";
import { dateToYYYYMMDD, getEndDate, getStartDate } from "../../../../../../../utils/dateFormatUtils";

const returnDates = (startDateTime, endDateTime) => {
    const startDate = new Date(startDateTime);
    const endDate = new Date(endDateTime);
    const dates = [];

    while (startDate <= endDate) {
        dates.push(dateToYYYYMMDD(new Date(startDate)));
        startDate.setDate(startDate.getDate() + 1);
    }
    return dates;
}

const returnUnitsPerDayListByType = (type, dates, inventoryStockRegisterStatuses) => {
    const results = [];

    dates?.forEach(date => {
        const startDateTime = getStartDate(date);
        const endDateTime = getEndDate(date);
        const unitsPerDay = inventoryStockRegisterStatuses?.reduce((accelator, currentValue, index, src) => {
            const createdAt = new Date(currentValue?.createdAt);
            const currentType = currentValue?.type;

            if (currentType === type && createdAt >= startDateTime && createdAt <= endDateTime) {
                accelator += currentValue?.unit;
            }
            return accelator;
        }, 0);
        results.push({
            date: date,
            type: 'release',
            unit: unitsPerDay
        })
    });

    return results;
}

export function StockChartComponent({
    inventoryStockRegisterStatuses,
    startDateTime,
    endDateTime
}) {

    const dateList = returnDates(startDateTime, endDateTime);
    const releaseUnitsPerDayList = returnUnitsPerDayListByType('release', dateList, inventoryStockRegisterStatuses);
    const receiveUnitsPerDayList = returnUnitsPerDayListByType('receive', dateList, inventoryStockRegisterStatuses);

    const config = {
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'x',
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            size: 12
                        }
                    }
                },
                title: {
                    display: false,
                    text: '날짜별 입/출고 수량',
                },
                tooltip: {
                    // enabled: true,
                    callbacks: {
                        label: (context) => {
                            let label = context.dataset.label || '';

                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += context.parsed.y;
                            }
                            return label + ' 개';
                        }
                    }
                },
            },
            // onHover: (e, item) => {
            //     const target = e.native ? e.native.target : e.target;
            //     target.style.cursor = item[0] ? 'pointer' : 'default';
            // },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: '날짜',
                        font: {
                            size: 11,
                            weight: 600,
                        },
                    },
                    min: 0,
                    grid: {
                        offset: false,
                    },
                    stacked: true,
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: '수량',
                        font: {
                            size: 11,
                            weight: 600,
                        },
                    },
                    grid: {
                        offset: false,
                    },
                    min: 0,
                    ticks: {
                        callback: function (value, index, ticks) {
                            return value % 1 === 0 ? `${value} 개` : null;
                        }
                    },
                    stacked: true
                }
            },
            interaction: {
                mode: 'index',
                intersect: false,
            },
        },
        data: {
            labels: dateList,
            datasets: [
                {
                    type: 'bar',
                    label: '입고수량',
                    data: receiveUnitsPerDayList?.map(r => r.unit),
                    borderColor: '#5fcf80',
                    backgroundColor: '#5fcf8070',
                    borderWidth: 1,
                    fill: true,
                    barPercentage: 0.6,
                    categoryPercentage: 1,
                    order: 0,
                    borderRadius: 5,
                    stack: 'Stack 0'
                },
                {
                    type: 'bar',
                    label: '출고수량',
                    data: releaseUnitsPerDayList?.map(r => r.unit),
                    borderColor: '#e56767',
                    backgroundColor: '#e5676770',
                    borderWidth: 1,
                    fill: true,
                    barPercentage: 0.6,
                    categoryPercentage: 1,
                    order: 0,
                    borderRadius: 5,
                    stack: 'Stack 0'
                }
            ],
        }
    }
    return (
        <ChartContainer>
            <ChartWrapper>
                <div
                    className='chart-box'
                >
                    <Chart
                        {...config}
                    />
                </div>
            </ChartWrapper>
        </ChartContainer>
    );
}