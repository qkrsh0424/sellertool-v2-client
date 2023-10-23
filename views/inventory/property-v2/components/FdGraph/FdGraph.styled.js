import styled from 'styled-components';

export const St = {
    ChartContainer: styled.div`
        padding: 0 20px;
        margin-top: 20px;

        @media all and (max-width: 992px){
            padding: 0 10px;
        }
    `,
    ChartWrapper: styled.div`
        overflow: hidden;
        background: #fff;
        box-shadow: var(--defaultBoxShadow);
        border: 1px solid #f0f0f0;
        border-radius: 15px;

        .select-viewer-wrapper{
            display: flex;
            
            .select-viewer-item{
                flex:1;
                height: 70px;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 18px;
                font-weight: 600;
                cursor: pointer;
                transition: all .3s;
                border-bottom: 3px solid #00000000;

                &:hover{
                    background: #f6f6f6;
                }

                @media all and (max-width: 992px){
                    font-size: 13px;
                }
            }

            .select-viewer-item-active{
                /* background:var(--mainColor); */
                color:var(--mainColor);
                font-weight: 600;
                border-bottom: 3px solid var(--mainColor);
            }
        }

        .title{
            font-size: 20px;
            font-weight: 600;
            background: var(--defaultGrayColor);
            padding: 10px 20px;
        }

        .chart-box{
            position:relative;
            padding: 20px;
            height: 400px;
        
            @media all and (max-width: 992px){
                padding: 10px;
                height: 300px;
            }
        }
    `,
}

export const StLoading = {
    Container: styled.div`
        height: 400px;
        
        background: #eee;
        background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
        border-radius: 5px;
        background-size: 200% 100%;
        animation: 1.5s shine linear infinite;
        
        @keyframes shine {
            to {
                background-position-x: -200%;
            }
        }
        
        @media all and (max-width: 992px){
            height: 300px;
        }

        .text{
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 16px;
            font-weight: 500;
            color:#222;
        }
    `,
}

export const StEmpty = {
    Container: styled.div`
        height: 400px;
        
        @media all and (max-width: 992px){
            height: 300px;
        }

        .text{
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 16px;
            font-weight: 500;
            color:#222;
        }
    `,
}