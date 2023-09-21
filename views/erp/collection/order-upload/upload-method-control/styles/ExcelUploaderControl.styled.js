import styled from 'styled-components';

export const Wrapper = styled.div`
    margin-top: 20px;
    border: 1px solid #e0e0e0;
    background: #fff;
    padding: 20px;
    border-radius: 15px;
    box-shadow: var(--defaultBoxShadow);
    height: 250px;
`;

export const TranslatorSelectorWrapper = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;

    .setting-button{
        padding:0;
        line-height: 1.2;
        width: 48px;
        height: 48px;
        color:var(--defaultBlueColor);
        font-size: 12px;
        font-weight: 500;
        border-radius: 5px;
        border:1px solid var(--defaultBlueColor);
        background: #fff;
        box-shadow: var(--defaultBoxShadow);
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
    margin-top: 10px;
    .button-item{
        margin:0;
        padding: 0;
        width: 100px;
        height: 30px;
        font-size: 12px;
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