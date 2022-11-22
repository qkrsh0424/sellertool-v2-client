import styled from 'styled-components';

export const Container = styled.div`
    position: relative;
    padding: 0 20px;
    background:#fff;
    border-radius: 15px;
    box-shadow: var(--defaultBoxShadow);
    margin-bottom: 10px;
    width:100%;
    overflow: hidden;
    border: 1px solid #f0f0f0;
    box-sizing: border-box;
`;

export const ProductWrapper = styled.div`
    padding: 20px 0;

    .dropdown-button-item{
        margin:0;
        padding:0;
        width:38px;
        height: 38px;
        border-radius: 5px;
        margin-left: 10px;
    }
`;

export const ThumbnailWrapper = styled.div`
    width: 90px;
    height: 90px;
    overflow: hidden;
    border-radius: 5px;

    @media all and (max-width: 992px){
        width: 70px;
        height: 70px;
    }
`;

export const ContentWrapper = styled.div`
    margin-left: 10px;
    flex:1;

    .name{
        font-size: 15px;
        font-weight: 600;
        color: #404040;
        margin-bottom: 10px;
        white-space: pre-line;
        word-break: break-all;
    }

    .product-tag{
        font-size: 13px;
        font-weight: 400;
        color: #707070;
        white-space: pre-line;
        word-break: break-all;
    }

    .code{
        font-size: 13px;
        font-weight: 400;
        color:#707070;
        white-space: pre-line;
        word-break: break-all;
    }

    .category{
        margin-top: 10px;
        text-align: right;
        font-size: 12px;
        font-weight: 400;
        color:#707070;
        white-space: pre-line;
        word-break: break-all;
    }
`;

export const ProductDetailWrapper = styled.div`
    padding: 20px 0 0 10px;

    .event-button-group{
        padding-bottom: 20px;
    }

    .event-button-item{
        margin:0;
        padding:0;
        width:80px;
        height: 33px;
        color:#606060;
        margin-left: 10px;
        border-radius: 15px;
        border: none;
        background:#f0f0f0;
    }

    .tag{
        display: inline-block;
        padding: 5px 5px;
        font-size: 14px;
        text-align: center;
        border-radius: 5px;
        color:var(--mainColor);
        margin: 0 5px 5px 0;
    }

    .inventory-on{
        display: inline-block;
        padding: 5px 5px;
        font-size: 14px;
        text-align: center;
        border-radius: 5px;
        color:var(--defaultGreenColor);
        margin: 0 5px 5px 0;
        cursor: pointer;
    }

    .inventory-off{
        display: inline-block;
        padding: 5px 5px;
        font-size: 14px;
        text-align: center;
        border-radius: 5px;
        color:var(--defaultRedColor);
        margin: 0 5px 5px 0;
        cursor: pointer;
    }
`;

export const OptionsWrapper = styled.div`
    border-top: 1px solid #f0f0f0;
    padding: 20px 0;
`;

export const TableWrapper = styled.div`
    .empty-box{
        padding: 50px 0;

        .text{
            display: flex;
            align-items: center;
            justify-content: center;
            .accent{
                font-weight: 600;
                color: var(--mainColor)
            }
            .icon-figure{
                margin: 0 5px;
                width:20px;
                height: 20px;
            }
        }
    }
`;

export const TableBox = styled.div`
    overflow: auto;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    background:#fff;
    max-height: 250px;

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
    }

    table thead{
        
    }

    table thead th {
        height: 35px;

        box-sizing: border-box;
        padding:10px 5px;

        background:#fafafa;
        color: #333;
        font-weight: 600;
        position: sticky;
        top:0;
        border-bottom: 1px solid #f0f0f0;
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

    table tbody tr{
        &:hover{
            background:#f8f8f8;

            .fixed-col-left {
                background:#f8f8f8;
            }
        }
    }

    table tbody td{
        height: 35px;
        padding:8px 0;

        box-sizing: border-box;

        border-bottom: 1px solid #f7f7f7;
        line-height: 1.5;
        word-break: keep-all;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        font-size: 12px;
        color: #333;
        
        .info-item{
            background: none;
            text-align: center;
            padding: 3px 10px;
            box-sizing: border-box;
            width: 100%;

            word-break: keep-all;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
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

    .fixed-header {
        position: sticky;
        top: 0;
        z-index:10;
    }

    .status-button{
        height: 30px;
        width: 150px;
        padding:0;
        margin: auto;
        font-size: 12px;
    }

    .icon-button-item{
        width:30px;
        height: 30px;
        margin:0;
        padding:0;
        margin-left: auto;
        margin-right: auto;
        border-radius: 5px;

        .icon-figure{
            width:70%;
            height: 70%;
            margin-left: auto;
            margin-right: auto;
        }
    }
`;