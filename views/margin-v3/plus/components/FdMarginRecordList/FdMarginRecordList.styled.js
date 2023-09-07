import styled from 'styled-components';

export const St = {
    Container: styled.div`
    `,
    SearchFieldWrapper: styled.div`
        border-radius: 10px;
        margin-bottom: 25px;

        .addBtn{
            border-radius: 5px;
            background: var(--mainColor);
            color:#fff;
            font-weight: 700;
            border:none;
            margin-bottom: 25px;
        }
        
        .control-box{
            .flexible{
                display: flex;
                gap: 10px;
            }

            .input-item{
                flex:1;
                height: 40px;
                font-weight: 500;
                background: var(--defaultBlueColorOpacity50);
                border-radius: 5px;
                transition: all .3s;

                &:focus{
                    scale: 1.01;
                    background: #fff;
                }
            }

            .button-item{
                width:80px;
                height: 40px;
                font-weight: 600;
                border:1px solid var(--mainColor);
                color: var(--mainColor);
                background: #fff;
                border-radius: 5px;
            }
        }
    `,

    TableWrapper: styled.div`
    `,
    TableBox: styled.div`
        overflow: auto;
        height: 800px;
        border: 1px solid #f0f0f0;
        border-radius: 10px;
        box-shadow: var(--defaultBoxShadow);
        background:#fff;
        width:100%;

        @media all and (max-width:992px){
            height: 300px;
        }

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
            table-layout: fixed;
            border: none;
            width: 100%;
        }

        table thead{
            
        }

        table thead th {
            box-sizing: border-box;
            color: #fff;
            background: var(--mainColor);
        
            position: sticky;
            top:0;
            border-bottom: 1px solid var(--mainColorOpacity700);
            border-right: 1px solid var(--mainColorOpacity700);
            height: 100%;

            word-break: keep-all;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
            font-size: 11px;
            font-weight: 800;

            &:last-child{
                border-right: none;
            }

            .text-box{
                display: flex;
                flex-direction: column;

                .text{
                    padding: 5px
                }

                .lineBreaker{
                    height: 1px;
                    background: var(--mainColorOpacity700);
                }
            }
        }

        table tbody tr{
            cursor: pointer;
            &:hover{
                background:var(--mainColorOpacity50);
                transition: all .3s;

                .fixed-col-left {
                    transition: all .3s;
                    background:var(--mainColorOpacity100);
                }
            }
        }

        table tbody td{
            box-sizing: border-box;

            border-bottom: 1px solid #d0d0d0;
            border-right: 1px solid #f0f0f0;

            word-break: keep-all;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
            font-size: 11px;
            font-weight: 800;
            color: #555;

            &:last-child{
                border-right: none;
            }
            .text-box{
                display: flex;
                flex-direction: column;

                .text{
                    padding: 5px;
                    /* height: 30px; */
                    letter-spacing: 0.5px;
                    

                    word-break: keep-all;
                    overflow:hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap;
                }

                .text-red{
                    color:var(--defaultRedColor);
                }
                
                .text-tag{
                    color:#666;
                    font-weight: 600;
                }

                .lineBreaker{
                    height: 1px;
                    background: #f6f6f6;
                }
            }
        }

        table .fixed-col-left {
            position: sticky;
            background: #f9f9f9;
            left: 0;
            z-index:10;
            border-right: 1px solid #e0e0e060;
            box-shadow: 6px 0 5px -7px #e0e0e0;
            color:#333;
        }

        table .fixed-col-left-th {
            position: sticky;
            left: 0;
            z-index:10;
            border-right: 1px solid #e0e0e060;
            box-shadow: 6px 0 5px -7px var(--mainColorOpacity700);
        }

        .status-button{
            height: 30px;
            width: 150px;
            padding:0;
            margin: auto;
            font-size: 12px;
        }
    `,
}