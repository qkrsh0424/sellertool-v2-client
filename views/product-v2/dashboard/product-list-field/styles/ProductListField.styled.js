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
        width: 80px;
        height: 35px;
        font-size: 12px;
        color: #606060;
        margin-right: 5px;
        border-radius: 5px;
        background: #f4f4f4;
        border: none;

        @media all and (max-width: 992px){
            font-size: 11px;
            width: 70px;
        }
    }
`;

export const SortSelectorWrapper = styled.div`
    .select-item{
        width:150px;
        height: 35px;
        font-size: 12px;
        border-radius: 5px;

        @media all and (max-width: 992px){
            font-size: 11px;
            width: 120px;
        }
    }
`;

export const ContentWrapper = styled.div`

`;

export const PagenationWrapper = styled.div`
    margin-top: 20px;
`;