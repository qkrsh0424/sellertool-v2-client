import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    transition: all 0.5s ease 0s;
`;

export const ContentWrapper = styled.div`
    padding: 0 20px;
    transition: all 0.5s;
`;

export const CategoryWrapper = styled.div`
    position:relative;
    padding: 40px 0;
    border-bottom: 1px solid #f0f0f0;

    .group{
        &:last-child{
            margin-top: 40px;
        }
    }
    
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
    padding: 40px 0;
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
        margin-top: 20px;
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
        margin:40px 0 0 0;
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
