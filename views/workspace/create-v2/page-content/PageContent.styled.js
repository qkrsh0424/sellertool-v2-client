import styled from 'styled-components';

const Container = styled.div`
    
`;

const ItemListFieldWrapper = styled.div`
    margin-top: 20px;

    .item-list-box{
        overflow: hidden;
        display: flex;
        flex-direction: row;
        justify-content: center;

        width: 45%;

        padding:10px;
        margin: auto;

        .item-box:nth-of-type(1){
            margin-right: 10px;
        }

        @media all and (max-width: 992px){
            width: 100%;
            flex-direction: column;

            .item-box:nth-of-type(1){
                margin-right: 0;
                margin-bottom: 10px;
            }
        }
    }

    .item-box{
        display: flex;
        flex-direction: column;
        flex: 1;
        
        padding-bottom: 10px;
        background: #ffffff;

        border: ${props => props.checked ? '1px solid #309fff' : '1px solid #e1e1e1'};
        border-radius: 15px;

        cursor: pointer;

        @media all and (max-width: 992px){
            align-items: center;
            flex-direction: row;
        }
    }

    .item-box-active{
        border: 1px solid var(--mainColor);
        box-shadow: var(--defaultBoxShadow);
    }

    .item-box .check-box{
        display: flex;
        justify-content: right;
        
        margin-top: 10px;
        padding: 0 10px;
        
        @media all and (max-width: 992px){
            margin-top: 0;
            order:1;
        }
    }

    .item-box .check-box .icon-figure{
        position: relative;
        width: 20px;
        height: 20px;
        border: 1px solid #e0e0e0;
        background: white;
        border-radius: 50%;
    }

    .item-box .check-box .icon-figure-active{
        border: 1px solid var(--mainColor);
        background: var(--mainColor);
    }

    .item-box .avatar-box{
        margin-top: 30px;
        
        @media all and (max-width: 992px){
            width: 80px;
            margin-top: 0;
        }
    }

    .item-box .avatar-box .icon-figure{
        position: relative;
        margin: auto;
        width: 40px;
        height: 40px;
        border-radius: 5px;

        @media all and (max-width: 992px){
            width: 35px;
            height: 35px;
        }
    }

    .item-box .info-box{
        margin-top: 30px;
        
        @media all and (max-width: 992px){
            margin-top: 10px;
            flex:1;
        }
    }

    .item-box .info-box .title-el{
        text-align: center;
        font-size: 20px;
        font-weight: 600;
        color:#000;

        @media all and (max-width: 992px){
            text-align: left;
            font-size: 15px;
        }
    }

    .item-box .info-box .description-el{
        margin-top: 20px;
        padding: 0 10px;
        
        text-align: center;
        font-size: 14px;
        font-weight: 500;
        color:#555;
        word-break: keep-all;

        @media all and (max-width: 992px){
            margin-top: 10px;
            padding: 0;
            text-align: left;
            font-size: 13px;
        }
    }

    .item-box .info-box .service-description-el{
        margin-top: 20px;
        padding: 0 10px;
        text-align: center;
        font-size: 13px;
        font-weight: 600;
        word-break: keep-all;

        @media all and (max-width: 992px){
            margin-top: 10px;
            padding: 0;
            text-align: left;
            font-size: 12px;
        }
    }

    .item-box .info-box .service-description-el-active{
        color:var(--mainColor);
    }
`;

const OperationFieldWrapper = styled.div`
    margin-top: 20px;
    text-align: center;
    width: 45%;
    margin-left: auto;
    margin-right: auto;
    padding: 10px;

    @media all and (max-width: 992px){
        padding: 0 10px;
        width: 100%;
    }

    .button-el{
        overflow: hidden;
        position: relative;

        width:100%;
        height: 56px;

        background: var(--mainColor);
        border: 1px solid var(--mainColor);
        border-radius: 15px;

        color:white;
        font-weight: 600;
        font-size: 20px;

        cursor: pointer;

        transition: all .3s;

        &:hover{
            transform: scale(1.02);
        }

        @media all and (max-width: 992px){
            width: 100%;
        }
    }
`;

export {
    Container,
    ItemListFieldWrapper,
    OperationFieldWrapper
}