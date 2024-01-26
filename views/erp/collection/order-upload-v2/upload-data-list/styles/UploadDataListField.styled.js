import styled from 'styled-components';

export const Container = styled.div`
    padding: 0 20px;
    margin-top: 40px;
    margin-bottom: 100px;
`;

export const Wrapper = styled.div`
    overflow: hidden;
    background: #fff;
    box-shadow: var(--defaultBoxShadow);
    border-radius: 15px;
`;

export const Title = styled.div`
    padding: 10px 20px;
    background-color: #eef2f9;
    color: #404040;
    font-size: 16px;
    font-weight: 500;
`;

export const ButtonGroup = styled.div`
    padding: 0 20px;
    .wrapper{
        flex:1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 0;
        border-bottom: 1px solid #f0f0f0;
    }

    .box-button{
        margin:0;
        padding:0;
        width: 150px;
        height: 44px;
        border: 1px solid #f0f0f0;
        box-shadow: var(--defaultBoxShadow);
        background:var(--mainColor);
        color: #fff;
        border-radius: 5px;
    }

    .icon-button{
        margin:0;
        padding:0;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        border: 1px solid #f0f0f0;
        box-shadow: var(--defaultBoxShadow);
        margin-left: 10px;
    }

    .button-icon-figure{
        width: 60%;
        margin-left: auto;
        margin-right: auto;
    }
`;

export const TableWrapper = styled.div`
    margin-top: 10px;

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
    min-height: 500px;
    max-height: 500px;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    box-shadow: var(--defaultBoxShadow);
    background:#fcfcfc;

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

        box-sizing: border-box;
        padding:10px 5px;

        border-bottom: 1px solid #e0e0e0;
        line-height: 1.5;
        word-break: keep-all;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        font-size: 12px;
        color: #333;
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
`;

export const ControlWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: end;

    .button-item{
        margin:0;
        padding: 0;
        width: 150px;
        height: 40px;
        border: none;
        border-radius: 5px;
        background: var(--mainColor);
        color: #fff;
        box-shadow: var(--defaultBoxShadow);
    }
`;

export const CountBox = styled.div`
    font-size: 14px;
    color: #404040;
    font-weight: 600;

    .accent{
        color: var(--defaultBlueColor);
    }
`;

export const DeleteTd = styled.td`
    padding:0 !important;
    .button-item{
        position:relative;
        margin:0;
        padding: 0;
        height: 24px;
        width: 24px;
        margin: 0 auto;
        border: 1px solid #00000000;
        cursor: pointer;
        background: none;
    }

    .button-icon-figure{
        width: 100%;
        height: 100%;
    }
`;