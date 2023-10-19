import {
    Chart as ChartJs
} from "chart.js/auto";
import { Chart as ReactChart } from 'react-chartjs-2';

const defaultPlugins = [
    {
        /*
            기본 설정은 마우스 hover시에 verticla line 을 점선으로 나타내는 기능을 담고 있음.
        */
        afterDraw: (chart, args, options) => {
            // eslint-disable-next-line no-underscore-dangle
            if (chart.tooltip._active && chart.tooltip._active.length) {
                // find coordinates of tooltip
                const activePoint = chart.tooltip._active[0];
                const { ctx } = chart;
                const { x } = activePoint.element;
                const topY = chart.scales.y.top;
                const bottomY = chart.scales.y.bottom;

                // draw vertical line
                ctx.save();
                ctx.beginPath();
                ctx.setLineDash([5, 5]);
                ctx.moveTo(x, topY);
                ctx.lineTo(x, bottomY);
                ctx.lineWidth = 1;
                ctx.strokeStyle = '#808080';
                ctx.stroke();
                ctx.restore();
            }
        },
    },
];

const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'x',
    plugins: {
        /*
            legend : 지표별 제목을 상단에 표시 할 수 있음.
        */
        legend: {
            display: true,
            position: 'top',
            labels: {
                font: {
                    size: 11
                }
            },
        },
        title: {
            display: true,
            text: '차트 주제',
        },
        /*
            tooltip: 지표에 마우스를 올리면 팝업이 뜸.
            tooltip의 callbacks를 통해서 툴팁의 설명을 재정의 할 수 있음.
        */
        //     tooltip: {
        //         // enabled: true,
        //         callbacks: {
        //             label: (context) => {
        //                 let label = context.dataset.label || '';

        //                 if (label) {
        //                     label += ': ';
        //                 }
        //                 if (context.parsed.y !== null) {
        //                     label += context.parsed.y;
        //                 }
        //                 return customNumberUtils.numberWithCommas2(label) + ' 원';
        //             }
        //         }
        //     },
        // },
    },
    /*
        그래프에 마우스를 올렸을때 발동하는 이벤트
    */
    onHover: (event, elements, chart) => {
        // console.log(`event:`, event);
        // console.log(`elements:`, elements);
        // console.log(`chart:`, chart);
    },
    /*
        그래프를 클릭했을때 발동하는 이벤트
    */
    onClick: (event, elements, chart) => {
        // console.log(`event:`, event);
        // console.log(`elements:`, elements);
        // console.log(`chart:`, chart);
    },
    /*
        x축과 y축의 정보를 재정의 할때 사용
    */
    scales: {
        x: {
            display: true,
            title: {
                display: true,
                text: 'x축 이름',
                font: {
                    size: 11,
                    weight: 600,
                },
            },
            min: 0,
            grid: {
                display: false,
                offset: false,
            },
            stacked: false,
        },
        y: {
            display: true,
            title: {
                display: true,
                text: 'y축 이름',
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
            /*
                ticks의 callback을 통해 y 축에 나타내는 라벨의 이름을 재정의 할 수 있음.
            */
            // ticks: {
            //     callback: function (value, index, ticks) {
            //         return value % 1 === 0 ? `${value} 원` : null;
            //     }
            // },
            /*
                stacked를 true 로 설정하면 bar 차트와 같은 그래프를 중첩해서 표시할 수 있음.
            */
            stacked: false
        }
    },
    /*
        interaction의 intersect 를 true 로 설정하면 값의 포인터에 마우스를 올려야 tootip등 이벤트가 작동함.
        false로 설정하면 해당 x 축 값에 마우스를 올려도 이벤트가 작동함.
    */
    interaction: {
        mode: 'index',
        intersect: false,
    },
}

const defaultData = {
    labels: [100, 200, 300, 400],
    datasets: [
        {
            type: 'line',
            label: '지표이름',
            data: [100, 200, 300, 400],
            borderColor: '#74a9ff',
            backgroundColor: '#74a9ff',
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

function Chart({
    data,
    options,
    plugins,
}) {

    return (
        <>
            <ReactChart
                data={data ? data : defaultData}
                options={options ? options : defaultOptions}
                plugins={plugins ? plugins : defaultPlugins}
            />
        </>
    );
}

export const CustomChart = {
    Chart: Chart,
    defaultPlugins: defaultPlugins,
    defaultOptions: defaultOptions,
    defaultData: defaultData,
}