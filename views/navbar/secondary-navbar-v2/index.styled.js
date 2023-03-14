import styled from 'styled-components';
import CustomBlockButton from '../../../components/buttons/block-button/v1/CustomBlockButton';

const Container = styled.div`
    position: sticky;
    top:0;
    background-color: white;
    z-index: 20;
    padding: 0 30px;
    border-bottom: 1px solid #f1f1f1;

    @media all and (max-width: 992px){
        padding: 0 10px;
    }
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 54px;
`;

const SelectorBtnBox = styled.div`
    .button-el{
        height: 38px;
        padding:0 10px;
        margin:0;
        border-radius: 10px;
        color:#505050;

        &:hover{
            background: var(--mainColor);
            border: 1px solid var(--mainColor);
            color: white;
        }
    }
`;

const MenuButton = styled(CustomBlockButton)`
    color: #404040;
    font-size: 18px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    height: 38px;
    border-radius: 5px;
    width: 140px;
    border: none;

    &:hover{
        background: #f6f6f6;
        box-shadow: var(--defaultBoxShadow);
    }
`;

export {
    Container,
    Wrapper,
    SelectorBtnBox,
    MenuButton
}