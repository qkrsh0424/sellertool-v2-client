import styled from 'styled-components';

export const BodyContainer = styled.div`
    padding: 20px;

    @media all and (max-width:992px){
        padding: 20px 10px;
    }
`;

export const PeriodFieldWrapper = styled.div`
    margin-bottom: 20px;
    .title{
        font-size: 14px;
    }

    .buttonGroup{
        margin-top: 10px;
        display: flex;
        width: 500px;

        @media all and (max-width:992px){
            width: 100%;
        }

        button{
            height: 40px;
            font-size: 12px;
            
            &:first-child{
                border-top-left-radius: 10px;
                border-bottom-left-radius: 10px;
            }

            &:last-child{
                border-top-right-radius: 10px;
                border-bottom-right-radius: 10px;
            }

            &:not(:first-child){
                margin-left: -1px;
            }

            &.active{
                background-color: var(--mainColor);
                color: #fff;
                font-weight: 700;
                border-color: var(--mainColor);
            }

        }
    }
`;

export const TableFieldWrapper = styled.div`
    position:relative;
    margin-bottom: 100px;
    
    .tabTypeBox{
        display: flex;
        .tabTypeBox__tabType{
            cursor: pointer;
            background: #f8f9fa;
            padding: 10px;
            width: 100px;
            text-align: center;
            border: 1px solid #e0e0e0;
            font-size: 14px;
            color: #777;
            font-weight: 500;
            margin-bottom: -1px;
    
            &:not(:first-child){
                margin-left: -5px;
            }
    
            &:first-child{
                border-top-left-radius: 5px;    
            }
    
            &:last-child{
                border-top-right-radius: 5px;
            }
    
            &.active{
                position: relative;
                border-bottom: 1px solid #fff !important;
                z-index: 10;
                border-top-left-radius: 5px;
                border-top-right-radius: 5px;
                background: #fff;
                color: #404040;
                font-weight: 700;
            }
        }
    }

    .table-box {
        width: 100%;
        position:relative;
        height: 500px;
        overflow: hidden;
        border: 1px solid #e0e0e0;
        border-radius: 15px;
        border-top-left-radius: 0;
        background: #fff;
        box-shadow: var(--defaultBoxShadow);

        @media only screen and (max-width:768px){
            font-size: 10px;
        }

        & > div{
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
        border-bottom: 1px solid #e0e0e0;

        @media all and (max-width: 992px){
            font-size: 10px;
            padding: 10px 5px;
        }
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

        &:focus{
            background:red;
        }
    }

    td.active{
        background: #2C73D230 !important;
    }

    td.noStocks{
        background: var(--defaultRedColorOpacity30);
    }

    td.noOptionCode{
        background: var(--defaultYellowColorOpacity30);
    }

    .fixed-header {
        position: sticky;
        top: 0;
        z-index:10;
        background: white;
        /* box-shadow: 0 -0.5px 0 0 #e0e0e0 inset; */
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
        background-color: var(--defaultBlueColorOpacity50);
    }

    .td-copyable-text{
        display: inline-block;
        cursor: pointer;
        &:hover{
            transform: scale(1.02);
            font-weight: 500;
            color:var(--mainColor);
        }
    }

    .td-control-button-item{
        user-select: none;
        -webkit-tap-highlight-color: #00000000;
        cursor: pointer;
        outline: none;
        font-size: 11px;
        margin-left: 3px;
        background: #a0a0a0;
        border-radius: 3px;
        border: 1px solid #a0a0a0;
        color: #404040;
        padding: 3px;
        width: 24px;
        height: 24px;
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

    .option-code-item{
        cursor: pointer;
    }

    .statusBadge{
        display: inline-block;
        border: none;
        padding: 3px 8px;
        border-radius: 30px;
        font-size: 10px;
        color: #fff;
        font-weight: 700;
    }

    .statusBadge.green{
        background-color: var(--defaultGreenColor);
    }

    .statusBadge.orange{
        background-color: var(--defaultOrangeColor);
    }

    .statusBadge.blue{
        background-color: var(--defaultBlueColor);
    }

    .statusBadge.gray{
        background-color: var(--defaultModalCloseColor);
    }

    .statusBadge.red{
        background-color: var(--defaultRedColor);
    }
`;