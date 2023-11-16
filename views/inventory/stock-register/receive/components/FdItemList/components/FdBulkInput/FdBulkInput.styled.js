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

            &:hover{
                background-color: var(--grayButtonColor);
            }
        }

        .head-wrapper .title{
            font-size: 18px;
            font-weight: 700;
        }

        .head-wrapper .icon-button{
            background: none;
            border-radius: 5px;
            border: none;
            width:24px;
            height: 24px;
        }

        /* type-selector-wrapper */
        .type-selector-wrapper{
            display: flex;
            margin-top: 20px;
            padding: 0 20px;
        }

        .type-selector-wrapper > button{
            height: 32px;
            width: auto;
            margin:0;
            padding: 0 16px;
            font-size: 14px;
            font-weight: 600;
            color: #000;
            border: none;
            border-radius: 8px;
        }

        .type-selector-wrapper > .button-active{
            background: var(--mainColor);
            color: #fff;
        }

        /* value-wrapper */
        .value-wrapper{
            margin-top: 20px;
            margin-bottom: 20px;
            padding: 0 20px;
            display: flex;
            gap: 10px;
        }

        .value-wrapper > input {
            border-radius: 15px;
            height: 48px;
            width: 300px;
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

        .value-wrapper > button{
            width:80px;
            background: var(--grayButtonColor);
            color:#000;
            font-weight: 700;
            border-radius: 15px;
            border: none;
        }
    `,
}