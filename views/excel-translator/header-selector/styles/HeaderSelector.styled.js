import styled from 'styled-components';

export const Container = styled.div`
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;
    padding: 0 10px;
    margin-top: 20px;
`;

export const Wrapper = styled.div`
    overflow: hidden;
    background: #fff;
    box-shadow: var(--defaultBoxShadow);
    border-radius: 15px;
`;

export const Title = styled.div`
    padding: 10px 20px;
    background-color: #eef2f9;
    color: #404040;
    font-size: 16px;
    font-weight: 500;
`;

export const ContentWrapper = styled.div`
    padding: 20px;

    @media all and (max-width: 992px){
        flex-direction: column;
    }
`;

export const SettingGroup = styled.div`
    
    @media all and (max-width: 992px){
        width: 100%;
        justify-content: space-between;
    }

    .icon-button{
        margin:0;
        padding:0;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        border: 1px solid #f0f0f0;
        box-shadow: var(--defaultBoxShadow);
        margin-left: 10px;
    }

    .button-icon-figure{
        width: 60%;
        margin-left: auto;
        margin-right: auto;
    }
`;

export const SelectBox = styled.div`
    background: #fff;

    @media all and (max-width: 992px){
        flex:1;
    }

    .select{
        width: 250px;
        border: 1px solid #e0e0e0;
        border-radius: 10px;
        box-shadow: var(--defaultBoxShadow);

        @media all and (max-width: 992px){
            width: 100%;
        }
    }
`;

export const ButtonGroup = styled.div`

    @media all and (max-width: 992px){
        margin-top: 20px;
        width: 100%;
        justify-content: space-around;
    }

    .icon-button{
        margin:0;
        padding:0;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        border: 1px solid #f0f0f0;
        box-shadow: var(--defaultBoxShadow);
        margin-left: 10px;
    }

    .button-icon-figure{
        width: 60%;
        margin-left: auto;
        margin-right: auto;
    }
`;
