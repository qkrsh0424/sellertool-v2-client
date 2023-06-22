import styled from 'styled-components';

export const Container = styled.div`
    padding: 20px;
`;

export const Title = styled.h3`

`;

export const ProcessList = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
`;

export const ArrowRight = styled.div`
    width:24px;
    height: 24px;
    margin:0 10px;
    margin-bottom: 20px;
`;

export const ProcessGroup = styled.div`
    border: 1px solid #e0e0e0;
    background: #fff;
    box-shadow: var(--defaultBoxShadow);
    padding: 0 15px;
    width: 150px;
    margin-bottom: 20px;
    border-radius: 10px;
`;

export const ProcessItem = styled.div`
    padding: 15px 0;
    border-bottom: 1px solid #f0f0f0;
    text-align: center;
    font-size: 12px;
    color:#404040;
    font-weight: 600;

    &:last-child{
        border-bottom:none;
    }
`;