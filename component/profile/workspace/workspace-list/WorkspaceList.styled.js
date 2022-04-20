import styled from 'styled-components';

const Container = styled.div`
    margin-top: 40px;
    margin-bottom: 40px;
`;

const TitleFieldWrapper = styled.div`
    .title{
        font-size: 18px;
        font-weight: 500;
    }
`;

const ListFieldWrapper = styled.div`
    .item-box{
        display: flex;
        align-items: center;
        border-bottom: 1px solid #e0e0e0;
    }

    .item-icon-figure{
        position: relative;
        margin-right: 10px;
        width: 40px;
        height: 40px;
    }

    .item-icon-el{
        opacity: 0.6;
    }

    .info-box{

    }
`;

export {
    Container,
    TitleFieldWrapper,
    ListFieldWrapper
}