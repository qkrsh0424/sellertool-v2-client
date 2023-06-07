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

    .counting{
        font-size: 20px;
        margin-right: 20px;
    }

    .info-wrapper{
        display: flex;
        align-items: center;
        margin-top: 20px;
    }

    .info-box{
        /* display: flex; */
    }

    .username{
        /* margin-top: 40px; */
        font-size: 20px;
        line-height: 1.5;
        font-weight: 500;
        color:#404040;
        /* text-align: center; */
    }

    .created{
        /* margin-top: 40px; */
        font-size: 16px;
        color: #404040;
        /* text-align: center; */
    }
`;

export const ButtonGroup = styled.div`
    margin-top: 40px;
    margin-bottom: 20px;

    .button-item{
        margin-top: 10px;
        border-radius: 10px;
        border:1px solid #f0f0f0;
        color: #606060;
        font-size: 14px;
    }
`;