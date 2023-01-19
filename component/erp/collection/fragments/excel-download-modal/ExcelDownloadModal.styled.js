import styled from 'styled-components';

const Container = styled.div`
    padding-bottom: 50px;
    background: var(--defaultBackground);
    
    .header-close-button-box{
        display: flex;
        justify-content: flex-end;
        padding: 20px 20px 0 20px;

        .header-close-button-el{
            user-select: none;
            -webkit-tap-highlight-color: #00000000;
            width:40px;
            height: 40px;
            padding: 0;
            margin:0;
            border:none;
            background:none;
            cursor: pointer;

            .header-close-button-icon{
                width:100%;
                height: 100%;
            }
        }
    
    }

    .title-box{
        padding: 0 20px;

        .title{
            border-bottom: 1px solid #000;
            font-size: 20px;
            font-weight: 400;
            color:#303030;
            padding-bottom: 20px;

            .accent-text{
                color:var(--mainColor);
            }
        }
    }
`;

const TitleContainer = styled.div`
    padding: 10px 20px;
    border-bottom: 1px solid #e1e1e1;
    .title-box{
        font-size: 18px;
        font-weight: 600;

    }
`;

const OperatorsFieldWrapper = styled.div`
    margin-top: 20px;
    padding: 0 20px;

    .flex-box{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }

    .button-item{
        margin:0 10px 0 0;
        padding:0;
        width: 120px;
        height: 34px;

        background: #fff;
        border: 1px solid #e0e0e0;
        border-radius: 5px;
        box-shadow: var(--defaultBoxShadow);

        font-size: 12px;
        font-weight: 500;
        color: #606060;

        cursor: pointer;

        &:hover{
            background: var(--mainColor);
            color: white;
        }

        @media all and (max-width: 992px){
            width: 60px;
            margin:0 10px 10px 0;
            padding: 0 5px;

            font-size: 10px;
            word-break: keep-all;
            line-height: 1.3;
        }
    }
`;

const PreviewTableFieldWrapper = styled.div`
    margin-top: 10px;
    padding: 0 20px;
`;

const TableBox = styled.div`
    height: 300px;
	overflow: auto;
    border: 1px solid #77777740;
    background: #fff;
    border-radius: 10px;

    table{
        position:relative;
        text-align: center;
        width: fit-content;
        table-layout: fixed;
        border: none;
    }

    table thead tr th{
        vertical-align: middle !important;
        text-align: center;
        /* background: #309FFF; */
        background: #e0e0e0;
        color: #404040;
        padding: 10px;
        font-size: 12px;
    }

    table tbody tr{
        /* &:hover{
            background: #309FFF40;
        } */
    }

    table tbody .tr-active{
        background: #309FFF40;
    }

    table tbody tr td{
        padding: 7px 5px;
        vertical-align: middle !important;
        border-bottom: 1px solid #77777740;
        text-align: center;
        font-size: 11px;
        color: #444;
        font-weight: 500;
        line-height: 1.5;
        word-break: keep-all;

        /* &:hover{
            background: #309FFF80;
            color: white;
            font-weight: 600;
        } */
    }

    .option-code-item{
        cursor: pointer;
    }

    .checkbox-item{
        cursor: pointer;
    }

    & .fixed-header {
        position: sticky;
        top: 0;
        z-index:10;
    }

    &::-webkit-scrollbar{
        background: #e1e1e130;
        height:7px;
        width: 5px;
    }

    &::-webkit-scrollbar-track{
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb{
        background-color: #e0e0e0;
        border-radius: 10px;
    }

    @media only screen and (max-width:768px){
        font-size: 10px;
    }
`;

const ExcelDownloadFormSelectorFieldWrapper = styled.div`
    margin-top: 40px;
    padding: 0 20px;

    .select-wrapper{

    }

    .select-wrapper .select-label{
        font-size: 13px;
        font-weight: 500;
    }

    .select-wrapper .select-el{
        margin-top: 5px;
        width: 200px;
        height: 43px;
        padding: 5px;
        border: 1px solid #e1e1e1;
        border-radius: 0;
        font-size: 14px;
        border-radius: 5px;
        box-shadow: var(--defaultBoxShadow);

        &:focus{
            outline: none;
        }

        @media all and (max-width:992px) {
            width: 100%;
            margin: 10px 0 0 0;
        }
    }
`;

const ExcelDownloadFormTableWrapper = styled.div`
    margin-top: 10px;
    padding: 0 20px;

    .table-box{
        /* height: 300px; */
        overflow: auto;
        border: 1px solid #77777740;
        background: #fff;
        border-radius: 10px;
    }

    table{
        position:relative;
        text-align: center;
        width: fit-content;
        table-layout: fixed;
        border: none;
    }

    table thead tr th{
        vertical-align: middle !important;
        text-align: center;
        /* background: #309FFF; */
        background: #e0e0e0;
        color: #404040;
        padding: 10px;
        font-size: 12px;
    }

    table tbody tr{
        /* &:hover{
            background: #309FFF40;
        } */
    }

    table tbody .tr-active{
        background: #309FFF40;
    }

    table tbody tr td{
        padding: 7px 5px;
        vertical-align: middle !important;
        /* border-bottom: 1px solid #77777740; */
        text-align: center;
        font-size: 11px;
        color: #444;
        font-weight: 500;
        line-height: 1.5;
        word-break: keep-all;

        /* &:hover{
            background: #309FFF80;
            color: white;
            font-weight: 600;
        } */
    }

    .option-code-item{
        cursor: pointer;
    }

    .checkbox-item{
        cursor: pointer;
    }

    .table-box .fixed-header {
        position: sticky;
        top: 0;
        z-index:10;
    }

    .table-box::-webkit-scrollbar{
        background: #e1e1e130;
        height:7px;
        width: 5px;
    }

    .table-box::-webkit-scrollbar-track{
        border-radius: 10px;
    }
    .table-box::-webkit-scrollbar-thumb{
        background-color: #e0e0e0;
        border-radius: 10px;
    }

    @media only screen and (max-width:768px){
        font-size: 10px;
    }
`;

const DownloadButtonFieldWrapper = styled.div`
    margin-top: 10px;
    padding: 0 30px;
    display: flex;
    justify-content: flex-end;

    .button-el{
        position: relative;
        overflow: hidden;
        width: 150px;
        height: 40px;
        background: #2C73D2;
        border: 1px solid #2C73D2;
        border-radius: 3px;
        color: white;
        font-weight: 600;

        cursor: pointer;
    }
`;

const InputFieldWrapper = styled.div`
    margin-top: 20px;
    padding: 0 20px;
    font-size: 14px;
    align-items: center;

    .label{
        font-size: 13px;
        color:#404040;
        font-weight: 500;
        margin-bottom: 5px;
    }

    .input-el {
        width : 400px;
        color: #444;
        border-radius: 5px;

        @media all and (max-width: 992px){
            width: 100%;
        }
    }

    .button-item{
        margin:0 0 0 10px;
        padding:0;
        width: 150px;
        border-radius: 5px;
        background: var(--mainColor);
        color: #fff;
        border: none;
    }
`;

const TipFieldWrapper = styled.div`
    margin-top: 10px;
    padding:0 20px;
    display: flex;

    font-size: 14px;

    @media all and (max-width:992px){
        font-size: 12px;
    }

    .highlight{
        display: inline-block;
        position:relative;
        font-weight: 700;
        color: #404040;
    }

    .highlight:after{
        content:"";
        position: absolute;
        bottom:0;
        left:0;
        width: 100%;
        height: 7px;
        border-radius: 3px;
        display: inline-block;
        background: var(--mainColorOpacity500);
    }
`;

export {
    Container,
    TitleContainer,
    OperatorsFieldWrapper,
    PreviewTableFieldWrapper,
    TableBox,
    ExcelDownloadFormSelectorFieldWrapper,
    ExcelDownloadFormTableWrapper,
    DownloadButtonFieldWrapper,
    InputFieldWrapper,
    TipFieldWrapper
}