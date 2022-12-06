import styled from 'styled-components';

export const Container = styled.div`
    position: fixed;
    right:20px;
    bottom:90px;
    z-index: 99;

    .floating-button-item{
        margin:0;
        padding:0;
        height: 40px;
        width: 100px;
        border-radius: 10px;
        border: none;
        background: var(--mainColor);
        color: #fff;
        font-size: 14px;
        box-shadow: var(--defaultBoxShadow);
    }
    .accent{
        color: var(--defaultGreenColor);
        font-weight: 700;
    }

    .control-button-item{
        margin:0;
        padding:0;
        margin-bottom: 10px;
        height: 40px;
        width: 70px;
        border-radius: 20px;
        border: 1px solid #a0a0a0;
        background: #f5f5f5;
        color: #606060;
        font-size: 13px;
        box-shadow: var(--defaultBoxShadow);
    }
`;

export const ControlButtonsContainer = styled.div`
    display: flex;
    opacity: ${props => props.controlButtonsViewOpen ? '1' : '0'};
    visibility:${props => props.controlButtonsViewOpen ? 'auto' : 'hidden'};
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    transition: all .3s;
`;