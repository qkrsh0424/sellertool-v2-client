import { Container } from '@mui/material';
import styled from 'styled-components';

export const Frame = {
    Container: styled.div`
        margin-top: 20px;
        padding: 0 20px;

        @media (max-width: 768px) {
            padding: 0 10px;
        }

    `,
}

export const Table = {
    Container: styled.div`
        width: 100%;
        position:relative;
        height: 500px;
        overflow: auto;
        border: 1px solid #e0e0e0;
        border-radius: 5px;
        background: #fff;
        box-shadow: var(--defaultBoxShadow);

        table{
            position:relative;
            text-align: center;
            table-layout: fixed;
            border: none;
            width: 100%;
            border-collapse: collapse;
            background: #fff;
            color: #000;
            font-weight: 500;

            & > thead{

                & > tr{
                    position: relative;

                    & > th{
                        background: var(--defaultBlueColorOpacity50);
                        color: #333;
                        padding: 5px;
                        text-align: left;
                        font-size: 12px;
                        position: sticky;
                        z-index: 10;
                        top: 0;
                    }
                }
            }

            & > tbody{
                & > tr{
                    position: relative;
                    border-bottom: 1px solid #e0e0e0;
                    transition: background 0.2s;

                    &:hover{
                        background: var(--mainColorOpacity50);
                    }

                    & > td{
                        position: relative;
                        padding: 5px;
                        text-align: left;
                        font-size: 10px;
                    }
                }
            }
        }
    `,
}