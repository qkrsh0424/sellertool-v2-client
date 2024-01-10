import styled from 'styled-components';

export const Container = styled.div`
    margin-top: 20px;
    padding: 0 20px;
`;

export const Wrapper = styled.div`
    border: none;
    background: #fff;
    padding: 20px;
    border-radius: 15px;
    box-shadow: var(--defaultBoxShadow3);
`;

export const Title = styled.div`
    font-size: 20px;
    font-weight: 600;
`;

export const SelectWrapper = styled.div`
    margin-top: 20px;
    width: 300px;

    @media all and (max-width:992px){
        width: 100%;
    }

    select{
        border: 1px solid #00000000;
        background-color: var(--defaultBlueColorOpacity100);
        border-radius: 10px;
        transition: all .3s;
        font-size: 14px;
        font-weight: 500;

        &:focus{
            scale: 1.05;
            background-color: #fff;
            border-color: var(--mainColor);
        }
    }
`;