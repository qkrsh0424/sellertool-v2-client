import styled from 'styled-components';

export const Container = styled.div`
    position: fixed;
    right:20px;
    bottom:90px;
    z-index: 99;
    width: ${props => props.controlButtonsViewOpen ? '100%' : 'auto'};
    display: flex;
    justify-content: flex-end;

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
`;

export const ControlButtonsContainer = styled.div`
    padding: 10px;
    background:#f7f7f8e6;
    backdrop-filter: blur(60px);
    overflow: hidden;
    position: absolute;
    border-radius: 10px;
    border: 1px solid #f0f0f0;
    box-shadow: 0px 0px 10px 5px rgb(72 75 108 / 8%);
    width: 300px;
    bottom: 50px;
    right: 0px;
    display: flex;
    flex-direction: column;
    opacity: ${props => props.controlButtonsViewOpen ? '1' : '0'};
    visibility:${props => props.controlButtonsViewOpen ? 'auto' : 'hidden'};
    align-items: center;
    transition: all .3s;

    @media all and (max-width: 992px){
        width: 80%;
    }

    .groups{
        width: 100%;
        flex-wrap: wrap;
        margin-bottom: 10px;

        &:last-child{
            margin-bottom:0;
        }

        .label{
            font-size: 12px;
            color: #404040;
            font-weight: 500;
            margin-bottom: 5px;
        }
    }

    .control-button-item{
        user-select: none;
        -webkit-tap-highlight-color: #00000000;
        cursor: pointer;
        display: inline-block;
        margin:0;
        padding:5px 10px;
        border-radius: 5px;
        border: 1px solid #a0a0a0;
        background: #fff;
        color: #606060;
        font-size: 11px;
        margin-bottom: 10px;
        margin-right: 10px;
    }
`;