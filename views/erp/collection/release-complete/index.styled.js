import styled from 'styled-components';

export const Container = styled.div`
    background:var(--defaultBackground);
    min-height: 800px;
`;

export const ViewOptionsContainer = styled.div`
    padding: 20px;

    @media all and (max-width:992px){
        padding: 0 10px 20px 10px;
    }
    
    .wrapper{
        border: 1px solid #f0f0f0;
        background-color: #fff;
        box-shadow: var(--defaultBoxShadow);
        border-radius: 15px;
        padding: 20px;

        h3{
            margin: 0;
        }

        .gridWrapper{
            margin-top: 20px;
            display: grid;
            grid-template-columns: repeat(3, 1fr);

            @media all and (max-width:992px){
                grid-template-columns: repeat(1, 1fr);
                gap: 10px;
            }

            section{
                @media all and (max-width:992px){
                    justify-content: space-between;
                }

                label{
                    font-size: 14px;
                    font-weight: 600;
                }

                button{
                    height: 30px;
                    width: 70px;
                    font-size: 12px;

                    &:not(:first-child){
                        margin-left: -1px;
                    }
                }

                button.active{
                    background-color: var(--mainColor);
                    color: #fff;
                    border-color: var(--mainColor);
                }
            }
        }

    }
`;