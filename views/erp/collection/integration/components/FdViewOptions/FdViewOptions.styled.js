import styled from 'styled-components';

export const Container = styled.div`
    padding: 20px;

    @media all and (max-width:992px){
        padding: 0 10px 20px 10px;
    }
`;

export const Wrapper = styled.div`
    border: 1px solid #f0f0f0;
    background-color: #fff;
    box-shadow: var(--defaultBoxShadow);
    border-radius: 15px;
    padding: 20px;
`;

export const ViewOptionContainer = styled.div`
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
`;

export const SortContainer = styled.div`
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #f0f0f0;
    position: relative;
    
    .sortFlexWrapper{
        margin-top: 10px;
        display: flex;
        gap: 10px;
        align-items: center;

        h3{
            font-size: 14px;
            font-weight: 600;
            margin:0;
        }

        .selectWrapper{
            width: 80px;
            button{
                border-radius: 5px;
                font-weight: 700;
                height: 40px;
                background-color: var(--mainColor);
                font-size: 13px;
                color: #fff;
                border: none;
            }
        }

        .clearButtonWrapper{
            width: 80px;
            button{
                border-radius: 5px;
                background: var(--defaultModalCloseColor);
                color: #fff;
                border: none;
                font-size: 13px;
                font-weight: 700;
                height: 40px;
            }
        }
    }

    .sortItemsWrapper{
        .itemList__box{
            margin-top: 10px;
            display: flex;
            align-items: center;
            gap: 5px;
            flex-wrap: wrap;
        }

        .itemList__box > .item__box{
            display: flex;
            gap: 5px;
            align-items: center;
            border: none;
            background: var(--grayButtonColor);
            padding: 3px 8px;
            border-radius: 5px;
        }

        .itemList__box > .item__box > .text{
            font-size: 11px;
            font-weight: 500;
        }

        .itemList__box > .item__box > .deleteIconBtn{
            width:25px;
            height: 25px;
            background: none;
            padding:5px;
            border-radius: 50%;
        }
    }
`;