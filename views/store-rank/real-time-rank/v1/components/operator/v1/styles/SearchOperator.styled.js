import styled from "styled-components";

export const Wrapper = styled.div`
    background: #fff;
    border: 1px solid #f0f0f0;
    border-radius: 15px;
    box-shadow: var(--defaultBoxShadow);
    /* padding-top: 10px;
    padding-bottom: 20px; */
    padding: 10px;
    margin-bottom: 10px;
`;

export const FlexGroup = styled.div`
    display: flex;

    @media all and (max-width: 992px){
        flex-direction: column;
    }
`;

export const ConditionContainer = styled.div`
    padding: 10px;

    .label{
        font-size: 12px;
        margin-bottom: 5px;
        color: #404040;
    }
`;

export const ConditionWrapper = styled.div`
    display: flex;
    .select-item{
        width: 200px;
        height: 38px;
        border-radius: 5px;
        font-size: 13px;

        @media all and (max-width: 992px){
            width: 100%;
            flex:1;
        }
    }

    .input-item{
        width: 200px;
        height: 38px;
        border-radius: 5px;
        margin-left: 20px;
        box-sizing: border-box;

        @media all and (max-width: 992px){
            width: 100%;
            flex:1;
        }
    }
`;

export const SubmitButtonContainer = styled.div`
    display: flex;
    margin-top: 20px;
    justify-content: center;
    padding: 10px 20px;

    .button-item{
        width: 150px;
        margin: 0;
        padding:0;
        height: 48px;
        background: var(--mainColor);
        color: white;
        font-size: 16px;
        border: none;
        border-radius: 5px;
        box-shadow: var(--defaultBoxShadow);

        &:last-child{
            margin-left: 10px;
        }
    }
`;
