import styled from 'styled-components';

export const BodyContainer = styled.div`
    padding: 40px;

    @media all and (max-width: 992px){
        padding: 40px 10px;
    }
`;

export const TableFieldWrapper = styled.div`
    position:relative;
    
    @media all and (max-width: 992px){
        padding: 0 10px;
    }
    
    .table-box {
        width: 100%;
        position:relative;
        height: 300px;
        overflow: scroll;
        border: 1px solid #e0e0e0;
        border-radius: 15px;
        background: #fff;
        box-shadow: var(--defaultBoxShadow);

        @media only screen and (max-width:768px){
            font-size: 10px;
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
            background-color: #00000010;
            border-radius: 10px;
        }
    }

    table {
        position:relative;
        text-align: center;
        table-layout: fixed;
        border: none;
        width: 100%;
    }

    tbody::before {
        display: block;
        padding-top: var(--tablePaddingTop);
        content: "";
    }

    tbody::after {
        display: block;
        padding-bottom: var(--tablePaddingBottom);
        content: "";
    }

    table thead tr th{
        vertical-align: middle !important;
        text-align: center;
        background: #fff;
        color: #000;
        font-weight: 700;
        padding: 10px;
        font-size: 12px;

        @media all and (max-width: 992px){
            font-size: 10px;
            padding: 10px 5px;
        }
    }

    table tbody tr td{
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

        &:focus{
            background:red;
        }
    }

    .fixed-header {
        position: sticky;
        top: 0;
        z-index:10;
        box-shadow: 0 -0.5px 0 0 #e0e0e0 inset;
    }

    .coloredTd{
        background-color: #c0c0c0;
    }

    .fixed-col-left {
        position: sticky;
        background: white;
        left: 0;
        z-index:10;
        box-shadow: -0.5px 0 0 0 #e0e0e0 inset;
    }

    .fixed-col-right {
        position: sticky;
        background: white;
        right: 0;
        z-index:10;
        box-shadow: 0.5px 0 0 0 #e0e0e0 inset;
    }

    .statusBadge{
        display: inline-block;
        border: none;
        padding: 3px 8px;
        border-radius: 30px;
        font-size: 10px;
        color: #fff;
        font-weight: 700;
        &.green{
            background-color: var(--defaultGreenColor);
        }
    
        &.orange{
            background-color: var(--defaultOrangeColor);
        }
    
        &.blue{
            background-color: var(--defaultBlueColor);
        }
    
        &.gray{
            background-color: var(--defaultModalCloseColor);
        }
    
        &.red{
            background-color: var(--defaultRedColor);
        }
    }

`;

export const ConfirmFieldWrapper = styled.div`
    text-align: center;

    .text{
        margin-bottom: 20px;
        font-weight: 600;
    }

    button{
        width: 150px;
        background-color: var(--defaultRedColor);
        color: #fff;
        border: none;
        border-radius: 15px;
        margin-left: auto;
        margin-right: auto;
        font-weight: 700;
    }
`;