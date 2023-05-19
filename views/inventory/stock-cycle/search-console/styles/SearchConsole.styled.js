import styled from 'styled-components';

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

export const HeaderWrapper = styled.div`
    background: var(--defaultGrayColor);
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title{
        font-size: 18px;
    }

    .dropdown-button-item{
        margin:0;
        padding:0;
        width:28px;
        height: 28px;
        border-radius: 5px;
        border: 1px solid #f0f0f0;
    }
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

export const DaysConditionContainer = styled.div`
    padding: 30px 20px 0 20px;
    display: flex;
    flex-direction: row;

    @media all and (max-width: 992px){
        flex-direction: column;
    }
    
    .label{
        font-size: 13px;
        color: #404040;
        margin-bottom: 5px;
    }

    .control-group{
        &:first-child{
            margin-right: 20px;
        }

        @media all and (max-width:992px){
            width: 100%;

            &:first-child{
                margin-right: 0;
                margin-bottom: 20px;
            }
        }
        

        .control-box{
            width:250px;
            margin-bottom: 10px;
            @media all and (max-width:992px){
                width: 100%;
            }

            .select-item{
                border-radius: 5px;
                height: 40px;
            }

            .input-item{
                border-radius: 5px;
                height: 40px;
                text-align: center;
            }
        }

        .description{
            font-size: 14px;
            font-weight: 600;
            color: #606060;
        }
    }
`;

export const SubmitButtonContainer = styled.div`
    padding: 30px 20px 20px 20px;

    .button-group{
        display: flex;
        justify-content: flex-end;

        .button-item{
            padding:0;
            margin:0;
            width: 120px;
            height: 40px;
            border-radius: 5px;
            background: var(--defaultModalCloseColor);
            color: #fff;
            border:none;
            font-size: 16px;

            &:first-child{
                margin-right: 10px;
            }
        }
    }
`;