import styled from 'styled-components';

export const Container = styled.div`
    padding: 0 20px;
    margin-top: 20px;

    @media all and (max-width:992px){
        padding: 0 10px;
    }
`;

export const Wrapper = styled.div`
    border: none;
    background: #fff;
    padding: 20px;
    border-radius: 15px;
    box-shadow: var(--defaultBoxShadow3);

    .buttonGroup{
        margin-top: 20px;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;

        .buttonGroup__orTag{
            font-weight: 700;
            font-size: 16px;
            color: #777;
        }
        > button{
            width:100px;
            font-weight: 700;
            border-radius: 10px;
            background: #fff;
            color: #777;
        }

        > .buttonGroup__editButton-isActive{
            color: var(--mainColor);
            border: 1px solid var(--mainColor);
        }

        > .buttonGroup__deleteButton-isActive{
            color:var(--defaultRedColor);
            border: 1px solid var(--defaultRedColor);
        }
    }
`;

export const Title = styled.div`
    font-size: 20px;
    font-weight: 600;
`;