import styled from "styled-components";

export const Wrapper = styled.div`
`;

export const TableBox = styled.div`
    position: relative;
    box-shadow: var(--defaultBoxShadow);
    overflow-x: auto;
    border: 1px solid #f0f0f0;
    background: #fff;
    border-radius: 0 0 15px 15px;
    min-height: 320px;
    max-height: 320px;

    &::-webkit-scrollbar{
        background: #e1e1e130;
        height:5px;
        width: 5px;
    }

    &::-webkit-scrollbar-track{
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb{
        background-color: #00000010;
        border-radius: 10px;
    }

    table{
        position:relative;
        text-align: center;
        width: fit-content;
        table-layout: fixed;
        border: none;
        width: 100%;
    }

    table thead{
    }

    table thead th {
        height: 35px;

        box-sizing: border-box;
        padding:0 5px;

        background:#f7f7f7;
        color: #333;
        font-weight: 600;
        position: sticky;
        top:0;
        border-bottom: 1px solid #e0e0e0;
        border-right: 1px solid #f0f0f0;

        line-height: 1.5;
        word-break: keep-all;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        font-size: 12px;
        
        .control-button-item{
            width:20px;
            height: 20px;
            margin:0;
            padding:0;
            margin-left: 3px;
            background: none;
            border-radius: 50%;
            border: none;
            .icon-figure{
                width:80%;
                height: 80%;
            }
        }
    }

    .bad-stock-tr {
        background: var(--defaultRedColorOpacity30);
    }

    .bad-stock-td {
        background: var(--defaultRedColorOpacity500);
    }

    table tbody td{
        box-sizing: border-box;

        border-bottom: 1px solid #f6f6f6;
        line-height: 1.5;
        word-break: keep-all;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        font-size: 12px;
        color: #505050;
        
        .thumbnail-figure{
            width:55%;
            height: 55%;
            border:1px solid #f0f0f0;
            border-radius: 10px;
            overflow: hidden;
            margin-left: auto;
            margin-right: auto;

        }

        .content-box{
            padding:5px 0;

            div{
                word-break: keep-all;
                overflow:hidden;
                text-overflow:ellipsis;
                white-space:nowrap;
            }

            .stockRegisterStatusView-button-item{
                margin:0;
                padding:0;
                width: 50px;
                height: 30px;
                margin-left: auto;
                margin-right: auto;
                border-radius: 5px;
                color: #606060;
                background: #f5f5f5;
                font-size: 12px;
            }
        }
    }

    table .fixed-col-left {
        position: sticky;
        background: white;
        left: 0;
        z-index:10;
        border-right: 1px solid #e0e0e060;
        box-shadow: 6px 0 5px -7px #e0e0e0;
    }

    .status-button{
        height: 30px;
        width: 150px;
        padding:0;
        margin: auto;
        font-size: 12px;
    }

    .button-box {
        width: 100%;
        border: 1px solid #ebeef8;
        border-radius: 5px;
        background-color: #ebeef8;
        cursor: pointer;
    }
`;