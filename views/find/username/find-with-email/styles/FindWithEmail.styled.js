import styled from 'styled-components';
import CustomBlockButton from '../../../../../components/buttons/block-button/v1/CustomBlockButton';

export const Container = styled.div`
    padding: 100px 20px;

    @media all and (max-width: 992px){
        padding: 100px 10px;
    }
`;

export const Wrapper = styled.div`
    border: 1px solid #f0f0f0;
    border-radius: 15px;
    background: white;
    box-shadow: var(--defaultBoxShadow);
    width: 600px;
    margin-left: auto;
    margin-right: auto;
    padding: 20px;

    @media all and (max-width: 992px){
        width: 100%;
    }

    .title{
        color: #404040;
    }
`;

export const InputBox = styled.div`
    .label{
        font-size: 13px;
        margin-bottom: 5px;
        color:#606060;
    }

    .input-item{
        flex:1;
        border-radius: 5px;
    }

    .send-button{
        border-radius: 5px;
        width: 100px;
        margin-left: 10px;
    }

    .input-notice{
        color: #707070;
        font-size: 12px;
        margin-top: 5px;
    }
`;

export const NextButton = styled(CustomBlockButton)`
    margin-top: 30px;
    margin-bottom: 40px;
    background: var(--mainColor);
    color:#fff;
    border-radius: 5px;
    border:none;
    font-size: 16px;
`;

export const OtherModeButton = styled(CustomBlockButton)`
    padding: 30px 20px;
    height: auto;
    font-size: 16px;
    border: 1px solid #f0f0f0;
    color: #404040;
    font-weight: 500;
    margin-top: 40px;
    border-radius: 5px;
    text-align: left;

    &:hover{
        box-shadow: var(--defaultBoxShadow);
    }
`;

export const Others = styled.div`
    margin-top: 40px;
    margin-bottom: 20px;
    text-align: center;
    font-size: 13px;
    color: #505050;
`;