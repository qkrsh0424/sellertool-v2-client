import styled from 'styled-components';

export const Container = styled.div`
    position: relative;

    section.wrapper{
        display: flex;
        padding: 20px;
        gap: 20px;
        align-items: flex-start;

        @media all and (max-width:992px){
            flex-direction: column-reverse;
        }

        .leftWrapper{
            flex:1;
            display: flex;
            flex-direction: column;
            gap: 10px;

            @media all and (max-width:992px){
                width: 100%;
            }

            h3{
                margin: 0;
            }
            button{
                border-radius: 30px;
                border: 1px solid #f0f0f0;
            }
        }

        .middleWrapper{
            width: 1px;
            height: auto;
            background-color: #e0e0e0;
            
            @media all and (max-width:992px){
                height: 1px;
                width: 100%;
            }
        }

        .rightWrapper{
            flex:1;
            display: flex;
            flex-direction: column;
            gap: 10px;

            @media all and (max-width:992px){
                width: 100%;
            }
            
            h3{
                margin: 0;
            }

            .itemBox{
                border: 1px solid #f0f0f0;
                background-color: #fff;
                padding: 10px;
                display:flex;
                flex-direction: column;
                gap: 10px;
                border-radius: 15px;
                box-shadow: var(--defaultBoxShadow);

                .itemBox__nameWrapper{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    .itemBox__nameWrapper__name{
                        font-size: 14px;
                        font-weight: 600;
                    }

                    & > button{
                        width: 30px;
                        height: 30px;
                        border: none;
                    }
                }

                .itemBox__directionWrapper{
                    display: flex;
                    flex-direction: row;
                    gap: 10px;

                    & > button{
                        height: 38px;
                        border-radius: 10px;
                        font-size: 14px;
                    }

                    & > button.active{
                        background: var(--mainColor);
                        color: #fff;
                        border-color: var(--mainColor);
                    }
                }
            }
        }
    }

    section.buttonGroup{
        position: sticky;
        bottom:0;
        left: 0;
        display: flex;

        button{
            border: none;
            color: #fff;
            font-size: 16px;
            font-weight: 700;
        }

        button.clear{
            background: var(--defaultModalCloseColor);
        }

        button.adopt{
            background: var(--mainColor);
        }
    }
`;