import styled from "styled-components";

export const Container = styled.div`
    padding: 20px;
`;

export const Wrapper = styled.div`
    width: 100%;
    background: #ffffff;
    border-radius: 15px;
    box-shadow: var(--defaultBoxShadow);
    overflow: hidden;
`;

export const BodyWrapper = styled.div`

`;

export const CategorySelectorContainer = styled.div`
    padding: 20px 20px 0 20px;
    display: flex;
    flex-direction: row;

    @media all and (max-width: 992px){
        flex-direction: column;
    }
`;

export const SearchConditionContainer = styled.div`
    padding: 30px 20px 0 20px;

    .label{
        font-size: 13px;
        color: #404040;
        margin-bottom: 5px;
    }

    .control-group{
        display: flex;

        @media all and (max-width:992px){
            flex-direction: column;
        }

        .control-box{
            width:250px;
            margin-right: 20px;

            &:first-child{
                margin-right: 20px;
            }

            @media all and (max-width:992px){
                width: 100%;

                &:first-child{
                    margin-right: 0;
                    margin-bottom: 10px;
                }
            }

            .select-item{
                border-radius: 5px;
                height: 40px;
            }

            .input-item{
                border-radius: 5px;
                height: 40px;
            }
        }
    }
`;
