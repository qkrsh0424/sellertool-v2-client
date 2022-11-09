import styled from 'styled-components';

const Container = styled.div`
    margin-top: 50px;
`;

const TitleFieldWrapper = styled.div`
    text-align: center;
    font-size: 24px;
    font-weight: 600;

    @media all and (max-width:992px){
        font-size: 18px;
    }
`;

const DescriptionFieldWrapper = styled.div`
    margin-top: 10px;
    text-align: center;
    font-size: 18px;
    color: #555;

    @media all and (max-width:992px){
        font-size: 15px;
    }
`;

export {
    Container,
    TitleFieldWrapper,
    DescriptionFieldWrapper
}