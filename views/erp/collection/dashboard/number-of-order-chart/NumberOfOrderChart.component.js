import { useRouter } from "next/router";
import {
    Chart as ChartJS
} from "chart.js/auto";
import {
    Chart
} from "react-chartjs-2";
import { dateToHHmm, dateToYYYYMMDD } from "../../../../../utils/dateFormatUtils";
import useOrderCountsWith24hHook from "./hooks/useOrderCountsWith24hHook";
import useOrderManagementCountHook from "./hooks/useOrderManagementCountHook";

import { ChartWrapper, ChartWrapper2, Container } from "./styles/NumberOfOrderChart.styled";

const getRandomColor = () => {
    return `#${Math.round(Math.random() * 0xFFFFFF).toString(16)}`;
}

const CHART_COLOR = '#344b98';
export default function NumberOfOrderCharComponent(props) {
    const router = useRouter();
    const {
        orderManagementCount
    } = useOrderManagementCountHook();
    const {
        orderCountsWith24h
    } = useOrderCountsWith24hHook();

    return (
        <>
            <Container>
                <OrderManagementChart
                    router={router}
                    orderManagementCount={orderManagementCount}
                />
                <OrderCountsWithTime
                    orderCountsWith24h={orderCountsWith24h}
                />
            </Container>
        </>
    );
}

function OrderManagementChart({
    router,
    orderManagementCount
}) {
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
                    // display: true,
                    text: '금일 발주건수',
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
                            return label + ' 건';
                        }
                    }
                },
            },
            onClick: (e, item) => {
                if (item?.length <= 0) {
                    return;
                }
                let clickedIndex = item[0].index;
                let date = dateToYYYYMMDD(new Date());
                let pathname = '/erp/collection/dashboard/';
                let query = {};

                switch (clickedIndex) {
                    case 0:
                        pathname = '/erp/collection/order';
                        query = {
                            periodSearchCondition: 'createdAt',
                            startDateTime: date,
                            endDateTime: date
                        }
                        break;
                    case 1:
                        pathname = '/erp/collection/sales';
                        query = {
                            periodSearchCondition: 'salesAt',
                            startDateTime: date,
                            endDateTime: date
                        }
                        break;
                    case 2:
                        pathname = '/erp/collection/release-complete';
                        query = {
                            periodSearchCondition: 'releaseAt',
                            startDateTime: date,
                            endDateTime: date
                        }
                        break;
                    case 3:
                        pathname = '/erp/collection/hold';
                        query = {
                            periodSearchCondition: 'holdAt',
                            startDateTime: date,
                            endDateTime: date
                        }
                        break;
                }
                router.push({
                    pathname: pathname,
                    query: {
                        ...query
                    }
                })
            },
            onHover: (e, item) => {
                const target = e.native ? e.native.target : e.target;
                target.style.cursor = item[0] ? 'pointer' : 'default';
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: '발주상태',
                        font: {
                            size: 11,
                            weight: 600,
                        },
                    },
                    min: 0,
                    grid: {
                        offset: false,
                    },
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: '건수',
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
                            return value % 1 === 0 ? `${value} 건` : null;
                        }
                    }
                }
            }
        },
        data: {
            labels: ['주문확인', '주문확정', '출고완료', '보류 데이터'],
            datasets: [
                {
                    type: 'bar',
                    label: '건수',
                    data: [orderManagementCount?.ordersCount ?? 0, orderManagementCount?.salesCount ?? 0, orderManagementCount?.releasesCount ?? 0, orderManagementCount?.holdCount ?? 0],
                    borderColor: CHART_COLOR,
                    backgroundColor: CHART_COLOR + '70',
                    borderWidth: 1,
                    fill: true,
                    barPercentage: 0.6,
                    categoryPercentage: 1,
                    order: 0,
                    borderRadius: 5
                }
            ],
        }
    }
    return (
        <ChartWrapper>
            <div className='title'>금일 발주상태별 건수</div>
            <div
                className='chart-box'
            >
                <Chart
                    {...config}
                />
            </div>
        </ChartWrapper>
    );
}

function OrderCountsWithTime({
    orderCountsWith24h
}) {
    const config = {
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    // enabled: true,
                    callbacks: {
                        label: (context) => {
                            let label = context.dataset.label || '';

                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.x !== null) {
                                label += context.parsed.x;
                            }
                            return label + ' 건';
                        }
                    }
                },
                title: {
                    // display: true,
                    text: '금일 발주건수',
                },
            },
            onHover: (e, item) => {
                const target = e.native ? e.native.target : e.target;
                target.style.cursor = item[0] ? 'pointer' : 'default';
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: '건수',
                        font: {
                            size: 11,
                            weight: 600,
                        },
                    },
                    min: 0,
                    grid: {
                        offset: false,
                    },
                    ticks: {
                        callback: function (value, index, ticks) {
                            return value % 1 === 0 ? `${value} 건` : null;
                        }
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: '시간',
                        font: {
                            size: 11,
                            weight: 600,
                        },
                    },
                    min: 0,
                    grid: {
                        offset: false,
                    },
                }
            }
        },
        data: {
            labels: orderCountsWith24h?.map(r => `${dateToHHmm(r.localDateTime)}~`),
            datasets: [
                {
                    type: 'bar',
                    label: '발주상태',
                    data: orderCountsWith24h?.map(r => r.counts),
                    borderColor: CHART_COLOR,
                    backgroundColor: CHART_COLOR + '70',
                    borderWidth: 1,
                    fill: true,
                    barPercentage: 0.8,
                    categoryPercentage: 1,
                    order: 0,
                    borderRadius: 0
                }
            ],
        }
    }

    return (
        <ChartWrapper2>
            <div className='title'>금일 주문수집 시간별 건수</div>
            <div
                className='chart-box'
            >
                <Chart
                    {...config}
                />
            </div>
        </ChartWrapper2>
    );
}