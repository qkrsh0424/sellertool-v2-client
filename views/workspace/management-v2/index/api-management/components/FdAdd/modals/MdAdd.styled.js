import styled from 'styled-components';

export const BodyContainer = styled.div`
    padding: 0 20px;
    margin-top: 40px;
`;

export const FooterContainer = styled.div`
    padding: 0 20px;
    margin-top: 40px;
    margin-bottom: 40px;

    .wrapper{
        display: flex;
        justify-content: flex-end;
        gap: 10px;

        button{
            width: 100px;
            border-radius: 10px;
            color: white;
            font-weight: 700;
            border: none;

            &.cancel{
                background-color: var(--defaultModalCloseColor);
            }
    
            &.confirm{
                background-color: var(--mainColor);
            }
        }

    }
`;