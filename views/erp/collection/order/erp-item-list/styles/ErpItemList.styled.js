import styled from 'styled-components';

export const PinButtonBox = styled.div`
    padding: 0 20px;
    display: flex;
    justify-content: flex-start;
    
    @media all and (max-width: 992px){
        padding: 0 10px;
    }

    .button-item{
        width: 70px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        font-size: 13px;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        border-bottom: none;
        color: #606060;
    }
`;

export const TableFieldWrapper = styled.div`
    padding: 0 20px;
    position:relative;
    margin-bottom: 100px;
    
    @media all and (max-width: 992px){
        padding: 0 10px;
    }
    
    .table-box{
        position:relative;
        height: 500px;
        overflow: auto;
        border: 1px solid #e0e0e0;
        border-radius: 15px;
        border-top-left-radius: 0;
        background: #fff;
        box-shadow: var(--defaultBoxShadow);

        @media only screen and (max-width:768px){
            font-size: 10px;
        }
    }

    table{
        position:relative;
        text-align: center;
        width: fit-content;
        table-layout: fixed;
        border: none;
    }

    table .col-5-3 {
        width:50px;

        @media all and (max-width:992px){
            width:30px;
        }
    }

    table .col-15-13{
        width:150px;

        @media all and (max-width:992px){
            width:130px;
        }
    }

    table thead tr th{
        vertical-align: middle !important;
        text-align: center;
        background: #fff;
        /* border-bottom: 1px solid #c0c0c0; */
        color: #000;
        font-weight: 700;
        padding: 10px;
        font-size: 12px;

        @media all and (max-width: 992px){
            font-size: 10px;
            padding: 10px 5px;
        }
    }

    table tbody tr{
        &:hover{
            /* background: #0000000a; */
        }
    }

    table tbody .tr-active{
        background: #2C73D230 !important;
    }

    table tbody .tr-highlight{
        background: var(--defaultRedColorOpacity30);
    }

    table tbody tr td{
        padding: 7px 5px;
        vertical-align: middle !important;
        border-bottom: 1px solid #e0e0e0;
        text-align: center;
        font-size: 11px;
        color: #444;
        font-weight: 500;
        line-height: 1.5;
        word-break: keep-all;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        height: 43px;

        @media all and (max-width: 992px){
            font-size: 10px;
        }
        
        /* &:hover{
            background: #2C73D260;
            color: white;
            font-weight: 600;
        } */
    }

    table tbody tr .td-highlight {
        background: #2c73d224;
        font-weight: 600;

        &:hover{
            background: #2C73D260;
            color: white;
            font-weight: 600;
            cursor: pointer;
        }

        
    }

    table tbody tr .user-duplication {
        color: #ff0000;
    }

    .option-code-item{
        cursor: pointer;
    }

    .table-box .fixed-header {
        position: sticky;
        top: 0;
        z-index:10;
        box-shadow: 0 -0.5px 0 0 #e0e0e0 inset;
    }

    .table-box .fixed-col-left {
        position: sticky;
        background: white;
        left: 0;
        z-index:10;
        box-shadow: -0.5px 0 0 0 #e0e0e0 inset;
    }

    .table-box .fixed-col-right {
        position: sticky;
        background: white;
        right: 0;
        z-index:10;
        box-shadow: 0.5px 0 0 0 #e0e0e0 inset;
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
        background-color: #00000010;
        border-radius: 10px;
    }

    .fix-button-el{
        user-select: none;
        -webkit-tap-highlight-color: #000000;
        width: 25px;
        height: 25px;
        position: relative;
        outline: none;

        padding: 0; 

        background: white;
        border: 1px solid #e0e0e0;
        border-radius: 3px;

        cursor: pointer;

        &:hover{
            background: #f0f0f0;
        }

        @media all and (max-width: 992px){
            width: 18px;
            height: 18px;
        }
    }

    .view-sameReceiver-button-item{
        user-select: none;
        -webkit-tap-highlight-color: #00000000;
        cursor: pointer;
        outline: none;
        font-size: 11px;
        margin-left: 3px;
        background: #f7f7f7;
        border-radius: 3px;
        border: 1px solid #e0e0e0;
        color: #606060;
    }
`;