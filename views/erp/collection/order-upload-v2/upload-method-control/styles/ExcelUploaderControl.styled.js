import styled from 'styled-components';

export const Wrapper = styled.div`
    margin-top: 20px;
    border: 1px solid #e0e0e0;
    background: #fff;
    padding: 20px;
    border-radius: 15px;
    box-shadow: var(--defaultBoxShadow);
    min-height: 250px;
`;

export const TranslatorSelectorWrapper = styled.div`
    margin-top: 10px;
    display: flex;
    gap: 10px;
    align-items: center;

    @media all and (max-width:992px){
        flex-direction: column;
    }

    .setting-button{
        width: 48px;
        height: 48px;
        background: var(--grayButtonColor);
        font-weight: 700;
        font-size: 14px;
        border: none;
        border-radius: 10px;

        @media all and (max-width:992px){
            width: 100%;
        }
    }
`;

export const SelectBox = styled.div`
    width: 300px;
    
    @media all and (max-width: 992px){
        width: 100%;
        flex:1;
    }

    .select-item{
        border-radius: 5px;
    }
`;

export const ButtonGroup = styled.div`
    display: flex;

    .button-item{
        padding: 0 16px;
        width: auto;
        height: 38px;
        font-size: 12px;
        font-weight: 700;
        background: var(--grayButtonColor);
        border: none;
        border-radius: 10px;
    }
`;

export const UploadButtonBox = styled.div`
    margin-top: 40px;
    .button-item{
        margin: 0 auto;
        padding: 0;
        height: 48px;
        border: none;
        background: var(--mainColor);
        color: #fff;
        font-size: 16px;
        border-radius: 5px;
        width:300px;

        @media all and (max-width: 992px){
            width: 100%;
        }
    }
`;