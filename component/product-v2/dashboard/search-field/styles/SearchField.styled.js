import styled from 'styled-components';

export const Container = styled.div`
    width: 300px;
    background: white;
    border-radius: 15px;
    box-sizing: border-box;
    box-shadow: var(--defaultBoxShadow);
    /* min-height: 500px; */
    overflow: hidden;

    @media all and (max-width:992px){
        min-height: 0;
    }
`;

export const Title = styled.div`
    padding: 10px 20px;
    background: var(--contentHeadBackground);
    font-size: 18px;
    font-weight: 600;
    color: #404040;
`;

export const ContentWrapper = styled.div`
    padding: 0 20px;
`;

export const CategoryWrapper = styled.div`
    padding: 20px 0;
    border-bottom: 1px solid #f0f0f0;
    

    .title{
        margin-bottom: 10px;
        color:#404040;
        font-size: 14px;
        font-weight: 600;
    }

    .select-button{
        flex:1;
        margin:0;
        padding:0;
        height: 48px;
        border-radius: 10px;
        color:#404040;
        border: 1px solid var(--defaultGrayColor);
        background: var(--defaultGrayColor);
        font-weight: 700;
        transition: all .3s;

        &:hover{
            background: #fff;
            border: 1px solid #e0e0e0;
        }

        &:focus{
            background: var(--mainColorOpacity100);
            border: 1px solid var(--mainColor);
        }
    }

    .icon-button-group{
        margin-top: 10px;
    }

    .icon-button{
        margin:0;
        padding:0;
        margin-left: 10px;
        width: 48px;
        height: 48px;
        border-radius: 10px;
    }

    .icon-figure{
        width: 70%;
        height: 70%;
        margin-left: auto;
        margin-right: auto;
    }
`;

export const SearchConsoleWrapper = styled.div`
    padding: 20px 0;

    .title{
        margin-bottom: 10px;
        color:#404040;
        font-size: 14px;
        font-weight: 600;
    }

    .select-button{
        border-radius: 10px;
        /* box-shadow: var(--defaultBoxShadow); */
    }

    .input-box{
        margin-top: 10px;
        .input-el{
            box-sizing: border-box;
            width: 100%;
            height: 48px;
            border: 1px solid #e0e0e0;
            border-radius: 10px;
            padding: 10px;
            outline: none;
        }
    }

    .search-button{
        margin:20px 0 0 0;
        padding:0;
        width: 100%;
        height: 48px;
        border-radius: 10px;
        background: var(--mainColor);
        color:#fff;
        font-size: 16px;
        font-weight: 500;
        border: none;
    }
`;

export const SearchButtonWrapper = styled.div`

`;
