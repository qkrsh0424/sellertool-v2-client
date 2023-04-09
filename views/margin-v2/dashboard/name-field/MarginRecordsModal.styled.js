import styled from 'styled-components';

export const ContentContainer = styled.div`

`;

export const TableFieldWrapper = styled.div`
    padding: 0 20px;
    position:relative;
    margin-top: 30px;
    margin-bottom: 30px;
    
    @media all and (max-width: 992px){
        padding: 0 10px;
    }
    
    .table-box{
        position:relative;
        height: 490px;
        overflow: auto;
        border: 1px solid #e0e0e0;
        border-radius: 5px;
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
        cursor: pointer;
        color: #444;
        font-weight: 700;

        &:hover{
            background: #00000005;
        }
    }

    table tbody .tr-active{
        background: var(--mainColorOpacity500) !important;
        color: #fff;
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

export const Container = styled.div`
    .content-group{
        padding: 30px 20px 30px 20px;

        .input-item{
            width: 100%;
            box-sizing: border-box;
            border: 1px solid #e0e0e0;
            height: 48px;
            border-radius: 10px;
            padding: 15px 10px;
            font-size: 14px;
            outline:none;

            &:focus{
                border: 1px solid var(--mainColor);
                box-shadow: var(--defaultBoxShadow);
            }
        }

        .content-title{
            font-size: 14px;
            font-weight: 600;
            color: #404040;
        }

        .content-box{
            user-select: none;
            -webkit-tap-highlight-color: #00000000;
            cursor: pointer;
            margin-top: 10px;
            border: 1px solid #e0e0e0;
            border-radius: 10px;
            background: #fff;
            box-shadow: var(--defaultBoxShadow);
            padding: 10px 0;
            
            &:hover{
                background: #f0f0f040;
                /* border: 1px solid var(--mainColor); */
            }

            .info-group{
                flex:1;
                padding: 0 10px;

                .title{
                    font-size: 18px;
                    font-weight: 600;
                    color: #404040;
                }

                .value-group{
                    margin-top: 10px;

                    &:last-child{
                        margin-top: 5px;
                    }
                    .value{
                        font-size: 12px;
                        font-weight: 500;
                        color: #808080;
                    }
                }
            }

            .delete-button-box{
                padding: 0 10px;
                .delete-button-el{
                    margin:0;
                    padding:0;
                    width:30px;
                    height: 30px;
                    border:none;
                    border-radius: 50%;
                    
                    .icon-figure{
                        width:70%;
                        height: 70%;
                        margin-left: auto;
                        margin-right: auto;
                    }
                }
            }
        }
    }

    .button-group{
        margin-top: 40px;
        display: flex;

        .button-el{
            margin:0;
            padding:0;
            height: 48px;
            border:none;
            color:#fff;
            font-size: 18px;
            font-weight: 500;
        }
    }
`;
export const ContentWrapper = styled.div`
    padding:10px;
`;

export const FlexWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

export const ItemBox = styled.div`
    width: 100%;
    border: 1px solid #e1e1e1;
    border-radius: 5px;
    /* margin-bottom: 10px; */

    cursor: pointer;

    .title{
        padding: 0 10px;
        margin-top: 5px;
        margin-bottom: 5px;
        font-weight: 600;
        font-size: 16px;
        color: #444;
    }

    .flex-wrapper{
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
        margin-bottom: 5px;
    }

    .flex-item{
        margin-right: 8px;
        font-size: 12px;
        color: #555;
    }

    &:hover{
        background: #e1e1e140;
    }

    @media all and (max-width: 992px){
        .title{
            font-size: 13px;
        }
        .flex-item{
            font-size: 10px;
        }   
    }
`;

export const DeleteBtnBox = styled.div`
    position: relative;
    padding: 3px;

    .btn-item{
        width: 35px;
        height: 35px;
        border-radius: 50%;
        user-select: none;

        cursor: pointer;

        &:hover{
            background: #e1e1e140;
        }
        &:active{
            background: #e1e1e180;
        }
    }

    .icon{
        position: relative;
        width: 20px;
        height: 20px;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
`;