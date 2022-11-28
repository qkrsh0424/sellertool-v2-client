import styled from 'styled-components';

export const Container = styled.div`
    padding: 20px;

    @media all and (max-width: 992px){
        padding: 10px;
    }
`;

export const ControllerWrapper = styled.div`
    margin-bottom: 10px;
`;

export const FoldableButtonWrapper = styled.div`
    .button-item{
        margin:0;
        padding:0;
        width: 70px;
        height: 35px;
        font-size: 12px;
        color: #707070;
    }
`;

export const SortSelectorWrapper = styled.div`
    .select-item{
        width:150px;
        height: 35px;
        font-size: 12px;
    }
`;

export const ContentWrapper = styled.div`

`;

export const PagenationWrapper = styled.div`
    margin-top: 20px;
`;