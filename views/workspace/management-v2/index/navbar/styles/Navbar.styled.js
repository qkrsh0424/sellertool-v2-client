import styled from 'styled-components';

export const Container = styled.div`
    width: 300px;
    background: white;
    border-radius: 15px;
    padding: 10px;
    box-sizing: border-box;
    box-shadow: var(--defaultBoxShadow);
    min-height: 500px;

    @media all and (max-width:992px){
        width: 100%;
        min-height: 0;
    }
`;

export const LinkButton = styled.div`
    padding: 10px;
    color: #404040;
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: #00000000;
    border-radius: 10px;

    &:hover{
        background: #f0f0f080;
    }

    .icon-figure{
        overflow: hidden;
        position:relative;
        width:24px;
        height: 24px;
    }

    .link-text{
        margin-left: 15px;
    }
`;