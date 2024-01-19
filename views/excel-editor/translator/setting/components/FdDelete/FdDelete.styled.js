import styled from 'styled-components';

export const Container = styled.div`
    margin-top: 20px;
    padding: 0 20px;

    @media all and (max-width:992px){
        padding: 0 10px;
    }
`;

export const Wrapper = styled.div`
    border: 1px solid var(--defaultRedColor);
    background: #fff;
    padding: 20px;
    border-radius: 15px;
    box-shadow: var(--defaultBoxShadow3);
`;

export const Title = styled.div`
    font-size: 20px;
    font-weight: 600;
`;

export const ContentLayout = styled.div`
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;

    .description{
        font-weight: 500;
        font-size: 14px;
        word-break: keep-all;
    }

    .deleteButtonBox{
        > button{
            width: 100px;
            height: 38px;
            background: #fff;
            border: 1px solid var(--defaultRedColor);
            border-radius: 10px;
            color: var(--defaultRedColor);
            font-weight: 700;
            transition: all .3s;

            &:hover{
                background-color: var(--defaultRedColor);
                color:#fff;
            }
        }
    }
`;