import styled from 'styled-components';

export const Nav = styled.nav`
    margin-left: 20px;
    .main-menu{
        align-items: center;
        display: flex;
        justify-content: space-around;
        margin: 0 auto 0 0;
        grid-gap: 10px;
        box-sizing: border-box;
        list-style: none;
        padding: 0;
        width: 100%;
    }

    .menu-item{
        position:relative;
    }

    .serviceLink{
        color: #ededed;
        padding:10px;
        font-size: 14px;
        font-weight: 600;
    }

    sup{
        background:var(--defaultRedColor);
        border-radius: 1em;
        display: inline-block;
        font-size: .45rem;
        font-weight: 700;
        line-height: 1.7;
        padding: 0 0.4em;
        text-rendering: optimizeLegibility;
        text-transform: uppercase;

    }
`;