import styled from 'styled-components';

export const Container = styled.div`
    background-color: var(--defaultBackground);
    min-height: 800px;
    padding: 150px 10px 200px 10px;

    @media all and (max-width:992px){
        padding: 100px 10px 200px 10px;
    }
`;

export const Wrapper = styled.div`
    width: 500px;
    margin-left: auto;
    margin-right: auto;
    padding: 20px;
    border:1px solid #f0f0f0;
    background: #fff;
    border-radius: 15px;
    box-shadow: var(--defaultBoxShadow);

    @media all and (max-width:992px){
        width: 100%;
    }

    .success-icon-box{
        width: 100px;
        height: 100px;
        margin-left: auto;
        margin-right: auto;
    }

    .success-label{
        font-size: 24px;
        text-align: center;
        padding: 40px 0;
        font-weight: 600;

        @media all and (max-width:992px){
            font-size: 20px;
        }
    }

    .button-link-group{
        width: 100%;
        display: flex;
        gap: 10px;
    }

    .button-link{
        flex:1;
    }

    .button-item{
        border-radius: 5px;
        color: #404040;
    }
`;