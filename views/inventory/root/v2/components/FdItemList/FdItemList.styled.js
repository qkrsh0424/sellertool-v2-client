import styled from 'styled-components';

export const Container = styled.div`
    margin-bottom: 100px;
`;

export const TableWrapper = styled.div`
    padding: 10px 20px 0px 20px;
`;

export const TableBox = styled.div`
    box-shadow: var(--defaultBoxShadow);
    overflow-x: auto;
    border: 1px solid #f0f0f0;
    border-radius: 5px;
    background:#ffffff;

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

    table tbody tr{
        &:hover{
            background:#f8f8f8;

            .fixed-col-left {
                background:#f8f8f8;
            }
        }
    }

    .tr-selected{
        background:var(--defaultBlueColorOpacity100);

        &:hover{
            background:var(--defaultBlueColorOpacity200);

            .fixed-col-left {
                background:var(--defaultBlueColorOpacity200);
            }
        }
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

            .optionCodeText{
                cursor:pointer;   
                
                &:hover{
                    font-weight: 500;
                    color: var(--mainColor);
                }
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

    .delete-button-item{
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

export const PagenationContainer = styled.div`
    padding: 0 10px;
    height: 50px;
    position: fixed;
    display: flex;
    align-items: center;
    right: 20px;
    bottom: 20px;
    z-index: 99;
    border: 1px solid #e0e0e0; 
    border-radius: 15px;
    background: #fff;
    box-shadow: var(--defaultBoxShadow);
`;

export const ControlFieldContainer = styled.div`
    padding: 20px 20px 0 20px;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
`;
export const SortControlContainer = styled.div`
    /* display: flex;
    justify-content: flex-end; */

    .select-item{
        width: 150px;
        height: 35px;
        font-size: 12px;
        border-radius: 5px;
    }
`;