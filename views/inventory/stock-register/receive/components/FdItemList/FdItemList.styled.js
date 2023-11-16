import styled from 'styled-components';

export const St = {
    CardListContainer: styled.div`
        margin-top: 20px;
        margin-bottom: 400px;
        .wrapper{
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .wrapper > .cardItem{
            display: flex;
            border: 1px solid #f0f0f0;
            box-shadow: var(--defaultBoxShadow);
            border-radius: 15px;
            padding: 10px;
            gap: 20px;
            align-items: center;
            background: #fff;
        }

        .wrapper > .cardItem > .image-figure{
            width: 60px;
            height: 60px;
            border-radius: 5px;
            overflow: hidden;
        }

        .wrapper > .cardItem > .contents{
            flex:1;
            display: flex;
            gap: 20px;
            align-items: flex-start;
        }

        .wrapper > .cardItem > .contents > .information{
            font-size: 13px;
            font-weight: 500;
            color: #222;
            flex:1;
        }

        .wrapper > .cardItem > .contents > .information > div{
            padding: 8px 0;
            border-bottom: 1px solid #f0f0f0;


            &:last-child{
                display: flex;
                justify-content: space-between;
                border-bottom: none;
            }

            &:last-child > div:last-child{
                color: var(--mainColor);
                font-weight: 600;
            }
        }

        .wrapper > .cardItem > .contents > .information > div > .tag{
            font-size: 13px;
            font-weight: 500;
            color: #808080;
            flex:1;
        }

        .wrapper > .cardItem > .contents > .form-items{
            width: 300px;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .wrapper > .cardItem > .contents > .form-items > div{
            &:first-child{
                display: flex;
                gap: 10px;
            }
        }

        .wrapper > .cardItem > .contents > .form-items > div > input{
            border-radius: 15px;
            height: 40px;
            font-size: 13px;
            background: var(--defaultBlueColorOpacity50);
            transition: all .3s;
            border-color:#00000000;
            font-weight: 600;
            &:focus{
                scale: 1.03;
                background: #fff;
                border-color:var(--mainColor);
            }
        }

        .wrapper > .cardItem > .contents > .form-items > div > textarea{
            outline: none;
            width: 100%;
            height: 45px;
            font-size: 13px;
            padding: 12px 8px;
            border-color:#00000000;
            border-radius: 15px;
            background: var(--defaultBlueColorOpacity50);
            transition: all .3s;
            resize: none;
            font-weight: 600;

            &:focus{
                border-color: var(--mainColor);
                height: 80px;
                scale: 1.03;
                background: #fff;
            }
        }
    `,
    FooterAppBar: styled.div`
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 99;
        width: 100%;
        background-color: none;
        padding: 10px 20px;
        .wrapper{
            display: flex;
            justify-content: flex-end;
            gap:10px;
            align-items: center;
        }

        .wrapper .selectedCount{
            background: #fff;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            padding: 8px;
            font-size: 14px;
        }

        .wrapper button{
            width: auto;
            border: none;
            width: 100px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
        }

        .wrapper .confirm-button{
            background: var(--mainColor);
            color: #fff;
        }

        .wrapper .cancel-button{
            background: var(--defaultModalCloseColor);
            color: #fff;
        }

    `,
}