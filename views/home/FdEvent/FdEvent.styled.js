import styled from 'styled-components';

export const St = {
    Container: styled.div`
        padding: 60px 20px;
        background: #fff;

        @media all and (max-width:992px){
            padding: 10px;
        }
    `,
    GridWrapper: styled.div`
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;

        @media all and (max-width:992px){
            grid-template-columns: repeat(1, 1fr);
            gap: 10px;
        }
    `,

    CardWrapper: styled.div`
        background: #fff;
        border:1px solid #f0f0f0;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        /* padding: 20px; */
        overflow: hidden;
        align-items: center;
        box-shadow: var(--defaultBoxShadow);

        .image-box{
            width: 100%;
        }

        .eventName{
            font-size: 24px;
            font-weight: 700;
        }

        .eventDescription{

        }

        .event-button-wrapper{
            width: 80%;
            margin: 40px 0;
            button{
                /* width:200px; */
                height: 60px;
                background: var(--mainColor);
                color: #fff;
                border-radius: 10px;
                font-weight: 700;
                font-size: 16px;
                box-shadow: var(--defaultBoxShadow);
                border: none;
            }
        }
    `,
}