import styled from 'styled-components';

export const Container = styled.div`
    padding: 20px;
`;

export const Title = styled.div`
    font-size: 20px;
    font-weight: 700;  
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
        height: 500px;
        @media all and (max-width: 992px){
            padding: 10px;
            height: 300px;
        }
    }
`;

export const ChartWrapper2 = styled.div`
    margin-top: 40px;
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
        height: 900px;
        @media all and (max-width: 992px){
            padding: 10px;
            height: 700px;
        }
    }
`;

