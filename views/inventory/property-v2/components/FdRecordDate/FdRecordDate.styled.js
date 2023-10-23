import styled from 'styled-components';

export const St = {
    Container: styled.div`
        padding: 0 20px;
        margin-top: 20px;

        @media all and (max-width:992px){
            padding: 0 10px;
        }
    `,
    Wrapper: styled.div`
        background:#fff;
        box-shadow: var(--defaultBoxShadow);
        padding: 20px;
        border-radius: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        
        @media all and (max-width:992px){
            flex-direction: column;
            gap: 20px;
        }

        .content-wrapper{
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 10px;
            width:250px;
            @media all and (max-width:992px){
                width: 100%;
            }
        }

        .label{
            font-weight: 600;
            font-size: 16px;
            color:#444;
            font-size: 16px;
        }

        .select-item{
            width: 200px;
            border-radius: 10px;
            background-color: var(--defaultBlueColorOpacity100);
            font-size: 16px;
            font-weight: 600;
            flex:1;
            border:none;
        }

        .update-btn{
            width: 100%;
            border-radius: 10px;
            background-color: var(--grayButtonColor);
            color:#000;
            font-weight: 600;
            border:none;

            .flex-row{
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: row;
                gap: 10px;
            }

            .icon-item{
                width:24px;
                height: 24px;
            }
        }
    `,
}