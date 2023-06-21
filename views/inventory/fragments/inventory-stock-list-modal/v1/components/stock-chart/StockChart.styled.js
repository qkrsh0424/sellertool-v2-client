import styled from 'styled-components';

export const ChartContainer = styled.div`
    margin-top: 10px;
    padding: 0 20px;

    @media all and (max-width: 992px){
        padding: 0 10px;
    }
`;

export const ChartWrapper = styled.div`
    overflow: hidden;
    background: #fff;
    box-shadow: var(--defaultBoxShadow);
    border: 1px solid #f0f0f0;
    border-radius: 15px;

    .title{
        font-size: 20px;
        font-weight: 600;
        background: var(--defaultGrayColor);
        padding: 10px 20px;
    }

    .chart-box{
        position:relative;
        padding: 20px;
        height: 300px;
        @media all and (max-width: 992px){
            padding: 10px;
            height: 300px;
        }
    }
`;