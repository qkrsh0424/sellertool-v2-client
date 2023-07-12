import styled from 'styled-components';

export const Container = styled.div`
    margin-top: 10px;
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
    
    .eventHandler-wrapper{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;

        @media all and (max-width: 992px){
            flex-direction: column;
            align-items: flex-start;
        }

        .items-label{
            font-size: 14px;
            color: #404040;

            @media all and (max-width: 992px){
                margin-bottom: 5px;
            }
        }

        .buttons{
            display: flex;
            justify-content: flex-end;

            @media all and (max-width: 992px){
                width:100%;
            }
        }
    }

    .excel-bulk-button{
        margin:0 10px 0 0;
        padding:0;
        width: 100px;
        height: 35px;
        border-radius: 5px;
        background: #f0f0f0;
        color:#666;
        border:none;
        font-weight: 700;
    }

    .add-button-item{
        margin:0;
        padding:0;
        width: 100px;
        height: 35px;
        border-radius: 5px;
        background: var(--mainColor);
        color:white;
        border:none;
        font-weight: 700;
    }

    .required-tag{
        width:5px;
        height: 5px;
        background: var(--defaultRedColor);
        display: inline-block;
        margin-right: 5px;
        border-radius: 50%;
    }
`;