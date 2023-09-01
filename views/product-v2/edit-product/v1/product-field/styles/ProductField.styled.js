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
    border-top: 1px solid #f0f0f0;

    .control-group{

        @media all and (max-width: 992px){
            flex-direction: column;
        }

        .control-group1{
            margin-right: 20px;

            @media all and (max-width: 992px){
                margin-right: 0;
                margin-bottom: 20px;
            }
        }

        .control-group2{
            flex:1;
        }
    }

    .control-box{
        margin-top: 20px;
        &:first-child{
            margin-top: 0;
        }

        .thumbnail{
            position: relative;
            border:1px solid #f0f0f0;
            border-radius: 10px;
            overflow: hidden;
            width:200px;
            height: 200px;

            @media all and (max-width: 992px){
                width:100%;
                height: 100%;
            }
        }

        .thumbnail-figure{
            width:100%;
            height: 100%;
        }

        .thumbnail-button-group{
            position:absolute;
            display: flex;
            bottom:0;
            background: #00000050;
            width:100%;

            .button-item{
                margin:0;
                padding:0;
                background: #00000000;
                border:none;
                color:white;
                width:100%;
                height: 40px;
            }

            .icon-figure{
                width: 28px;
                height: 28px;
                margin-left: auto;
                margin-right: auto;
            }
        }
    }

    .input-item{
        width: 500px;
        height: 48px;
        border-radius: 10px;
        box-sizing: border-box;
        outline: none;
        border: 1px solid #e0e0e0;
        font-size: 14px;
        padding: 0 10px;
        margin-right: 10px;
        
        @media all and (max-width: 992px){
            flex:1;
            width: 100%;
        }
    }

    .label{
        font-size: 13px;
        color:#505050;
        margin-bottom: 5px;
    }

    .count-tag{
        .notice{
            color:var(--defaultGreenColor);
        }
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