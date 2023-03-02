import styled from 'styled-components';

export const Container = styled.div`
`;

export const Wrapper = styled.div`
    overflow: hidden;
    width: 600px;
    margin: auto;
    margin-top: 50px;
    margin-bottom: 50px;

    border-radius: 15px;
    background:#ffffff;
    box-shadow: var(--defaultBoxShadow);

    @media all and (max-width: 992px){
        width: 90%;
    }
`;

export const Title = styled.div`
    font-size: 21px;
    padding:20px;
    border-bottom: 1px solid #e0e0e0;
    color:#303030;
    font-weight: 500;
`;

export const ItemListWrapper = styled.div`
    .item-group{
        display: flex;
        justify-content: space-between;
    }

    .manage-button-el{
        width:50px;
        background:white;
        border:none;
        padding:0;
        margin:0;
    }

    .manage-button-icon-figure{
        width:50%;
        margin-left: auto;
        margin-right: auto;
    }

    .item-box{
        user-select: none;
        -webkit-tap-highlight-color: #00000000;
        cursor: pointer;
        flex:1;
        font-size: 16px;
        color:#303030;
        padding: 20px;

        &:hover{
            background: #f0f0f040;
        }
    }

    .item-box-active{
        color:var(--mainColor);
        font-weight: 600;
    }

    .empty-item{
        display: flex;
        justify-content: center;
        height: 150px;
        align-items: center;
        font-weight: 500;
    }
`;

export const CreateButtonWrapper = styled.div`
    overflow: hidden;
    width: 600px;
    margin: auto;
    margin-top: 50px;
    margin-bottom: 50px;

    @media all and (max-width: 992px){
        width: 90%;
    }

    .button-el{
        padding:0;
        margin:0;
        height: 56px;
        border-radius: 15px;
        border: none;
        background: var(--mainColor);
        font-size: 20px;
        color:white;
        box-shadow: var(--defaultBoxShadow);
    }
`;