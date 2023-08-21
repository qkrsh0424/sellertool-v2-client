import styled from 'styled-components';

export const St = {
    Container: styled.div`
    `,
    Wrapper: styled.div`
        display: flex;
        flex-direction: column;
        gap: 5px;
        /* border: 1px solid #f0f0f0; */ 

        .noticeBox{
            display: flex;
            align-items: center;
            font-size: 12px;
            font-weight: 500;
            gap: 5px;
            color: #606060;
            margin-bottom: 10px;
            
            .text{
                flex:1;
            }
        }
    `,
    ItemBox: styled.div`
        display: flex;
        gap: 10px;
        align-items: center;
        padding: 10px;
        background: #fff;
        border: 1px solid #f0f0f000;
        border-radius: 5px;
        cursor: pointer;
        transition: all .3s;

        &:hover{
            scale: 1.02;
            border: 1px solid #f0f0f0;
            box-shadow: var(--defaultBoxShadow);
        }
        .info-box{
            flex:1;
            line-height: 1.5;
            .nameBox{
                display: flex;
                align-items: center;
                gap: 5px;

                .name{
                    flex:1;
                    font-size: 13px;
                    color: #444;
                    font-weight: 700;
                }
            }

            .baseExchangeRateValue{
                font-size: 10px;
                font-weight: 500;
                color: #666;
            }
        }
        .defaultTag{
            font-size: 10px;
            font-weight: 500;
            color:#808080;
            border:0.5px solid #808080;
            padding:5px 10px;
            border-radius: 15px;
        }

        .editBtn{
            width:30px;
            height: 30px;
            padding: 7px;
            border-radius: 5px;
            background: none;
            border:none;
            &:hover{
                background: #f0f0f0;
            }
        }

        .removeBtn{
            width:30px;
            height: 30px;
            padding: 7px;
            border-radius: 5px;
            background: none;
            border:none;
            &:hover{
                background: #f0f0f0;
            }
        }
    `,
    AutoUpdateBadge: styled.div`
        width:5px;
        height: 5px;
        background: var(--defaultRedColor);
        border-radius: 50%;
    `,
}