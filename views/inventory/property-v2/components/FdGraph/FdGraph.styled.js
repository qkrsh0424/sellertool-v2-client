import styled from 'styled-components';

export const St = {
    ChartContainer: styled.div`
        margin-top: 10px;
        padding: 0 20px;

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