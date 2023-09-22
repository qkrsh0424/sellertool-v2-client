import styled from 'styled-components';

export const Container = styled.div`
    margin-bottom: 30px;
    @media all and (max-width:992px){
        margin-top: 30px;
    }
`;

export const TitleFieldWrapper = styled.div`
    font-size: 21px;
    font-weight: 600;
    color: #404040;

    .refresh-button-el{
        margin:0;
        padding:0;
        width:34px;
        height: 34px;
        margin-left: 10px;
        border-radius: 10px;

        .refresh-button-icon-figure{
            width:70%;
            height: 70%;
            margin-left: auto;
            margin-right: auto;
        }
    }
`;

export const PaperBox = styled.div`
    margin-top: 20px;
    border:1px solid #f0f0f0;
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: var(--defaultBoxShadow);
    
    .title{
        font-weight: 700;
        font-size: 16px;
    }

    .description{
        font-size: 13px;
        margin-top: 10px;
    }

    .common-btn{
        width: 100px;
        height: 30px;
        background: #000000;
        border: 1px solid #e0e0e0;
        color: #fff;
        border-radius: 5px;
        font-weight: 500;
    }

    .delete-btn{
        width: 100px;
        height: 30px;
        background: var(--defaultRedColor);
        border: 1px solid var(--defaultRedColor);
        color: #fff;
        border-radius: 5px;
        font-weight: 500;
    }

    .warning-btn{
        width: 100px;
        height: 30px;
        background: var(--defaultYellowColor);
        border: 1px solid var(--defaultYellowColor);
        color: #fff;
        border-radius: 5px;
        font-weight: 500;
    }
`;