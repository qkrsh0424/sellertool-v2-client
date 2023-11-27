import styled from 'styled-components';

export const St = {
    Container: styled.div`
        flex:1;
        border-radius: 15px;
        background: #fff;
        box-shadow: var(--defaultBoxShadow);
        overflow: hidden;
        border: 1px solid #f0f0f0;
        
        /* head-wrapper */
        .head-wrapper{
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            background: #fff;
            padding: 20px;

            @media all and (max-width:992px){
                padding: 15px;
            }

            &:hover{
                background-color: var(--grayButtonColor);
            }
        }

        .head-wrapper .title{
            font-size: 18px;
            font-weight: 700;

            @media all and (max-width:992px){
                font-size: 16px;
            }
        }

        .head-wrapper .icon-button{
            background: none;
            border-radius: 5px;
            border: none;
            width:24px;
            height: 24px;
        }

        /* selector-wrapper */
        .selector-wrapper{
            padding: 0 20px;
            margin-top: 20px;
            margin-bottom: 20px;
            display: flex;
            gap: 10px;
        }

        .selector-wrapper > button{
            width:180px;
            border-radius: 15px;
            color: #000;
            font-weight: 700;
            background: var(--defaultBlueColorOpacity50);
            border: none;
        }

        .selector-wrapper > .init-button{
            width:80px;
            background-color: var(--grayButtonColor);
        }
    `,
}