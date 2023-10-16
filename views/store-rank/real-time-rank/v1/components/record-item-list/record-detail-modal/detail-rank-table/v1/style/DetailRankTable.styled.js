import styled from "styled-components";

export const Wrapper = styled.div`
    padding: 20px 20px 0 20px;
    position:relative;
    margin-bottom: 100px;

    .table-box {
        width: 100%;
        position:relative;
        /* height: 300px; */
        /* overflow: hidden; */
        overflow: auto;
        border: none;
        border-radius: 10px;
        box-shadow: var(--defaultBoxShadow);

        @media only screen and (max-width:768px){
            font-size: 10px;
        }
    }

    .table-box .fixed-header {
        position: sticky;
        top: 0;
        z-index:10;
        box-shadow: 0 -0.5px 0 0 #e0e0e0 inset;
        background-color: #F3F5F7;
    }

    table thead tr th{
        vertical-align: middle !important;
        text-align: center;
        color: #000;
        font-weight: 700;
        padding: 10px;
        font-size: 12px;
        border-bottom: 1px solid #dcdee3;

        @media all and (max-width: 992px){
            font-size: 10px;
            padding: 10px 5px;
        }
    }

    table tbody tr {
        border-radius: 15px;
        background-color: #fff;
        transition: 0.2s;
    }

    table tbody tr td{
        padding: 10px;
        vertical-align: middle !important;
        border-bottom: 1px solid #dcdee3;
        text-align: center;
        font-size: 12px;
        color: #444;
        font-weight: 500;
        line-height: 1.5;
        word-break: keep-all;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;

        @media all and (max-width: 992px){
            font-size: 10px;
        }
    }

    .column-box {
        display: flex;
        flex-direction: column;
    }
`;