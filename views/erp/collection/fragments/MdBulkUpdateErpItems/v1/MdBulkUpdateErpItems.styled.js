import styled from 'styled-components';

export const Container = styled.div`
    background: var(--defaultBackground);
`;

export const SubmitButtonContainer = styled.div`
    margin-top: 40px;
    display: flex;

    .button-item{
        margin:0;
        padding:0;
        height: 48px;
        border:none;
        color:#fff;
        font-size: 18px;
        font-weight: 500;
    }
`;

export const NavigationContainer = styled.div`
    width:100%;
    padding: 0 20px;
    .wrapper{
        width:100%;
        /* border:1px solid red; */
        overflow-x: scroll;
        white-space: nowrap;

        &::-webkit-scrollbar {
            display: none;
        }
    }

    .item{
        margin:0;
        padding: 0;
        display: inline-block;
        width: 130px;
        height: 34px;
        font-size: 13px;
        color: #404040;
    }
`;