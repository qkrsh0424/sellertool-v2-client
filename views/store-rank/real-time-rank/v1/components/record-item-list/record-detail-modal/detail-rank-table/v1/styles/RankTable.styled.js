import styled from "styled-components";

export const Wrapper = styled.div`
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
        min-width: 100px;
    }

    table thead tr th{
        vertical-align: middle !important;
        text-align: center;
        color: #333;
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
        gap: 5px;
    }

    .column-box div {
        min-height: 20px;
        max-height: 20px;
    }

    .column-box .rank-box {
        /* border: 1px solid var(--defaultBlueColor); */
        padding: 0px 10px;
        border-radius: 10px;
        color: var(--mainColor);
        font-size: 14px;
        font-weight: 700;

        @media screen and (max-width: 992px) {
            font-size: 12px;
        }
    }

    .trend-box {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
    }

    .column-box .sub-info-box {
        text-align: center;
        border: 1px solid var(--thisBoxColor);
        color: var(--thisBoxColor);
        border-radius: 5px;
        font-weight: 600;
        font-size: 11px;
        padding: 1px 7px;
    }
`;