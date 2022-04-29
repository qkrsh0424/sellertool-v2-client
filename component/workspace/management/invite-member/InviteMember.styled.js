import styled from 'styled-components';

const Container = styled.div`
    margin-top: 30px;
`;

const HeadFieldWrapper = styled.div`
    padding: 0 40px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    @media all and (max-width: 992px){
        padding: 0 10px;
    }

    .title-el{
        font-size: 24px;
        font-weight: 500;
    }

    .button-el{
        background: #2C73D2;
        border: none;
        padding: 7px 15px;
        margin: 0;
        color: white;

        cursor: pointer;

        &:hover{
            background: #2C73C2;
        }
    }
`;

const ListFieldWrapper = styled.div`
    margin-top: 10px;
    margin-bottom: 20px;
    padding: 0 40px;

    @media all and (max-width: 992px){
        padding: 0 10px;
    }
    
    .list-box{
        max-height: 500px;
        overflow: auto;
        border: 1px solid #e0e0e0;
        border-radius: 5px;
        .item-box:nth-last-child(1){
            border: none;
        }    
    }

    .item-box{
        /* margin: 10px; */
        padding: 10px 15px;
        border-bottom: 1px solid #e0e0e0;
    }

    .item-box .head-box{
        margin-top: 5px;
        font-size: 21px;
        color: #2C73D2;
    }

    .item-box .footer-box{
        margin-top: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .item-box .footer-box .status-el{
        font-size: 14px;
        color: #515151;
        font-weight: 500;
    }

    .item-box .footer-box .delete-button-el{
        padding: 10px 15px;
        background: #fff;
        border: none;
        border-radius: 3px;

        font-size: 14px;
        color:#515151;
        font-weight: 500;

        cursor: pointer;

        &:hover{
            transition: all .3s;
            background: #ff6961;
            color:white;
        }
    }

    .list-box::-webkit-scrollbar{
        background: #e1e1e130;
        height:7px;
        width: 5px;
    }

    .list-box::-webkit-scrollbar-track{
        border-radius: 10px;
    }
    .list-box::-webkit-scrollbar-thumb{
        background-color: #00000010;
        border-radius: 10px;
    }
`;


export {
    Container,
    HeadFieldWrapper,
    ListFieldWrapper
}