import styled from 'styled-components';

export const Container = styled.div`
    margin-top: 10px;
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;
    padding: 0 10px;
`;

export const Wrapper = styled.div`
    border:  1px solid #f0f0f0;
    box-shadow: var(--defaultBoxShadow);
    background: #fff;
    border-bottom: 1px solid #f0f0f0;
    padding: 0 20px;
    border-radius: 15px;
`;

export const HeadWrapper = styled.div`
    padding: 15px 0;

    .required-tag{
        width:8px;
        height: 8px;
        background: var(--defaultRedColor);
        display: inline-block;
        margin-right: 10px;
        border-radius: 50%;
    }

    .title{
        font-size: 24px;
        font-weight: 600;

    }

    .icon-button{
        margin:0;
        padding:0;
        width:40px;
        height: 40px;
        border-radius: 5px;

        .icon-figure{
            width: 90%;
            height: 90%;
            margin-left: auto;
            margin-right: auto;
        }
    }

`;

export const FormWrapper = styled.div`
    padding: 20px 0;
    

    .add-button-item{
        margin:0;
        padding:0;
        width: 100px;
        height: 35px;
        border-radius: 5px;
        background: var(--mainColor);
        color:white;
        border:none;
    }

    .required-tag{
        width:5px;
        height: 5px;
        background: var(--defaultRedColor);
        display: inline-block;
        margin-right: 5px;
        border-radius: 50%;
    }
`;

export const OptionGeneratorWrapper = styled.div`
    padding: 20px 0;
    border-bottom: 1px solid #f0f0f0;
    border-top: 1px solid #f0f0f0;
    
    .input-group{
        margin-top: 10px;

        @media all and (max-width: 992px){
            flex-direction: column;
        }
    }

    .input-box{
        width: 400px;
        margin-bottom: 10px;

        @media all and (max-width: 992px){
            width:100%;
            flex:1;
        }

        .input-item{
            width: 100%;
            height: 48px;
            flex:1;
            outline:none;
            border:1px solid #e0e0e0;
            padding: 0 10px;
            border-radius: 5px;

            @media all and (max-width: 992px){
                height: 38px;
            }
        }

        .icon-button-group{
            width: 100px;

            @media all and (max-width: 992px){
                width: 70px;
            }
        }

        .icon-button-item{
            margin:0;
            padding:0;
            width: 40px;
            height: 40px;
            border-radius: 5px;

            &:last-child{
                margin-left: 5px;
            }

            @media all and (max-width: 992px){
                width: 30px;
                height: 30px;
            }

            .icon-figure{
                width: 60%;
                height: 60%;
                margin-left: auto;
                margin-right: auto;
            }
            
        }
    }

    .flex-block{
        padding: 10px;
    }

    .generator-button-item{
        margin:0;
        padding:0;
        height: 48px;
        background: var(--mainColor);
        color:white;
        border-radius: 5px;
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
    min-height: 300px;
    max-height: 300px;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
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

        box-sizing: border-box;

        border-bottom: 1px solid #e0e0e0;
        line-height: 1.5;
        word-break: keep-all;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        font-size: 12px;
        color: #333;
        
        .input-item{
            background: none;
            text-align: center;
            padding: 0 10px;
            box-sizing: border-box;
            width: 100%;
            height: 44px;
            border: none;
            outline:none;
            cursor: pointer;
            border-radius: 5px;

            word-break: keep-all;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;

            &:focus{
                border: 1.5px solid var(--defaultBlueColor);
                box-shadow: var(--defaultBoxShadow);
                background: var(--defaultBlueColorOpacity100);
                cursor: text;
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