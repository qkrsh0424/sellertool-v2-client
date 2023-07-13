import styled from 'styled-components';

export const Container = styled.div`
    margin-top: 40px;
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;
    padding: 0 10px;
`;

export const Wrapper = styled.div`
    border:  1px solid #f0f0f0;
    box-shadow: var(--defaultBoxShadow);
    background: #fff;
    border-bottom: 1px solid #f0f0f0;
    padding: 0 20px;
    border-radius: 15px;
`;

export const HeadWrapper = styled.div`
    padding: 15px 0;

    .required-tag{
        width:8px;
        height: 8px;
        background: var(--defaultRedColor);
        display: inline-block;
        margin-right: 10px;
        border-radius: 50%;
    }

    .title{
        font-size: 24px;
        font-weight: 600;

    }

    .icon-button{
        margin:0;
        padding:0;
        width:40px;
        height: 40px;
        border-radius: 5px;

        .icon-figure{
            width: 90%;
            height: 90%;
            margin-left: auto;
            margin-right: auto;
        }
    }

`;

export const FormWrapper = styled.div`
    padding: 20px 0;
    border-top: 1px solid #f0f0f0;

    .select-item{
        width: 300px;
        border-radius: 10px;

        @media all and (max-width: 992px){
            width: 100%;
        }
    }
`;