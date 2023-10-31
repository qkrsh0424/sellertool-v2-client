import styled from "styled-components";

export const Container = styled.div`
    padding: 0 20px;
    margin-bottom: 10px;
`;

export const Wrapper = styled.div`
    /* padding: 0 10px; */
    position:relative;
    margin-bottom: 100px;

    .table-box {
        width: 100%;
        position:relative;
        /* height: 300px; */
        overflow: hidden;
        border: none;
        border-radius: 10px;
        box-shadow: var(--defaultBoxShadow);

        @media only screen and (max-width:768px){
            font-size: 10px;
        }
    }

    .main-info {
        font-weight: 600;
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
        font-size: 14px;
        border-bottom: 1px solid #dcdee3;

        @media all and (max-width: 992px){
            font-size: 10px;
            padding: 10px 5px;
        }
    }

    table tbody tr {
        border-radius: 15px;
        background-color: #fff;
        cursor: pointer;
        transition: 0.2s;

        &:hover {
            background-color: var(--defaultGrayColor);
        }
    }

    table tbody tr td{
        padding: 10px;
        vertical-align: middle !important;
        border-bottom: 1px solid #dcdee3;
        text-align: center;
        font-size: 14px;
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

    .thumbnail {
        width: 50px;
        height: 50px;
        border-radius: 10px;
        overflow: hidden;
        position: relative;
    }

    .control-btn {
        border-radius: 50%;
        padding: 2px;
        border: none;
        background-color: inherit;
        cursor: pointer;
        transition: 0.15s;

        &:hover {
            transform: scale(1.1);
            background-color: #ffe0e0;
        }
    }

    .button-el {
        width: 70%;
        max-width: 250px;
        font-size: 11px;
        padding: 5px 10px;
        border-radius: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        background-color: #f8f9fb;
        border: 1px solid #d4dbe9;
        cursor: pointer;

        &:hover {
            transform: scale(1.05);
            background-color: #d4dbe9;
        }
    }

    .info-text {
        position:absolute;
        top: -200px;
        left:0;
        width: 100%;
        height: 100%;
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #979ba5;
        font-size: 14px;
    }
`;
