import styled from 'styled-components';

export const Container = styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    z-index: 20;
    height: 70px;
    background: #f7f7f7e0;
    align-items: center;
    justify-content: flex-end;

    .button-item{
        margin: 0;
        padding: 0;
        width: 150px;
        height: 48px;
        border: none;
        color: white;
        font-size: 18px;
        font-weight: 600;
        border-radius: 5px;
        margin-right: 20px;

        @media all and (max-width: 992px){
            width: 100px;
            margin-right: 10px;
        }
    }
`;