import styled from 'styled-components';

export const Container = styled.div`
    border: 1px solid #f0f0f0;
    background: #fff;
    border-radius: 15px;
    box-shadow: var(--defaultBoxShadow);
    margin-top: 20px;
    padding: 0 20px;
`;

export const TitleContainer = styled.div`
    padding: 10px 0;
    display: flex;
    border-bottom: 1px solid #f0f0f0;
    align-items: center;

    .title{
        font-size: 18px;
        font-weight: 500;
    }

`;

export const InputGroup = styled.div`
    padding: 20px 0;
`;

export const InputBox = styled.div`
    &:last-child{
        margin-top: 20px;
    }

    
    .label{
        margin-bottom: 5px;
        font-size: 13px;
        color: #606060;

        .required-tag{
            display: inline-block;
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: var(--defaultRedColor);
            margin-right: 5px;
        }
    }

    .input-item{
        width: 500px;
        border-radius: 5px;

        @media all and (max-width: 992px){
            width: 100%;
            flex:1;
        }
    }

    .length-tag{
        font-size: 13px;
        margin-left: 5px;
    }
`;

export const SelectItemListContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    border-top: 1px solid rgb(224, 224, 224);
    border-left: 1px solid rgb(224, 224, 224);
`;