import styled from 'styled-components';

const Container = styled.div`
    margin-top: 40px;
    margin-bottom: 40px;
`;

const TitleFieldWrapper = styled.div`
    .title{
        font-size: 18px;
        font-weight: 500;
    }
`;

const ListFieldWrapper = styled.div`
    max-height: 300px;
    overflow: auto;
    margin-top: 10px;

    border: 1px solid #e0e0e0;
    border-radius: 5px;

    .item-wrapper:nth-last-child(1){
        border-bottom: none;
    }

    .item-wrapper{
        display: flex;
        justify-content:space-between; 
        padding:10px 10px;
        border-bottom: 1px solid #e0e0e0;
        align-items: center;
    }

    .badge{
        border: 1px solid #e0e0e0;
        padding: 3px 10px;
        font-size: 12px;
        border-radius: 2em;
        color:#57606a;
        font-weight: 600;
    }

    .item-box{
        display: flex;
        align-items: center;
    }

    .item-icon-figure{
        position: relative;
        margin-right: 10px;
        width: 40px;
        height: 40px;
    }

    .item-icon-el{
        opacity: 0.6;
    }

    .info-box{

    }

    .workspace-name-el{
        font-weight: 500;
        color: #2C73D2;

        cursor: pointer;

        &:hover{
            text-decoration: underline;
        }
    }

    .workspace-type-el{
        margin-top: 5px;
        font-size: 14px;
        color: #666;
        font-weight: 500;
    }

    &::-webkit-scrollbar {
       width: 7px;
       
    }
    &::-webkit-scrollbar-thumb {
        background-color: #00000025;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
        /* background-color: white; */
    }
`;

export {
    Container,
    TitleFieldWrapper,
    ListFieldWrapper
}