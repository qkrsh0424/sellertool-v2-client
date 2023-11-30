import styled from 'styled-components';

export const Style = styled.div`
    .f__normal{
        font-size: 14px;
        font-weight: 500;
        color: #000;
    }

    .f__middle{
        font-size: 16px;
        font-weight: 600;
        color: #000;
    }

    .f__header3{
        font-size: 18px;
        font-weight: 500;
        color: #000;
    }

    .f__normal__mobile{
        @media all and (max-width:992px){
            font-size: 12px;
        }
    }

    .fw__600{
        font-weight: 600;
    }

    .fw__700{
        font-weight: 700;
    }

    .button__icon{
        width:28px;
        height: 28px;
        border: none;
        background: none;
        border-radius: 50%;

        &:hover{
            background: var(--grayButtonHoverColor);
        }
    }

`;
