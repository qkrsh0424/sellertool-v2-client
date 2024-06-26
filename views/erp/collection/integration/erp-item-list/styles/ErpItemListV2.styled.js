import styled from 'styled-components';

export const ViewHeaderSelectNotice = styled.div`
    padding: 20px;
    margin-bottom: 100px;

    @media all and (max-width: 992px){
        padding: 10px;
    }

    .wrapper{
        padding: 100px 10px;
        background: #ffffff;
        border-radius: 10px;
        border: 1px solid #f0f0f0;
        text-align: center;
        font-size: 14px;
        font-weight: 700;
        color: #444;
        box-shadow: var(--defaultBoxShadow);
    }
`;

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
    }

    .table-box .col-5-3 {
        width:50px;

        @media all and (max-width:992px){
            width:30px;
        }
    }

    .table-box .col-15-13{
        width:150px;

        @media all and (max-width:992px){
            width:130px;
        }
    }

    .table-box thead tr th{
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

    .table-box tbody tr{
        &:hover{
            /* background: #0000000a; */
        }
    }

    .table-box tbody .tr-active{
        background: #2C73D230 !important;
    }

    .table-box tbody .tr-highlight{
        background: var(--defaultRedColorOpacity30);
    }

    .table-box tbody tr td{
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
        /* &:hover{
            background: #2C73D260;
            color: white;
            font-weight: 600;
        } */
    }

    .table-box tbody tr .td-highlight {
        background: #2c73d224;
        font-weight: 600;

        &:hover{
            background: #2C73D260;
            color: white;
            font-weight: 600;
            cursor: pointer;
        }

        
    }

    .table-box tbody tr .user-duplication {
        color: #ff0000;
    }

    .option-code-item{
        cursor: pointer;
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

    .td-copyable-text{
        display: inline-block;
        cursor: pointer;
        &:hover{
            transform: scale(1.02);
            font-weight: 500;
            color:var(--mainColor);
        }
    }
`;