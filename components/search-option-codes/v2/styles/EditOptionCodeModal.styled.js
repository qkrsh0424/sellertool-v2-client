import styled from 'styled-components';

export const Container = styled.div`
    background: var(--defaultBackground);
    
    .header-close-button-box{
        display: flex;
        justify-content: flex-end;
        padding: 20px 20px 0 20px;

        .header-close-button-el{
            user-select: none;
            -webkit-tap-highlight-color: #00000000;
            width:40px;
            height: 40px;
            padding: 0;
            margin:0;
            border:none;
            background:none;
            cursor: pointer;

            .header-close-button-icon{
                width:100%;
                height: 100%;
            }
        }
    
    }

    .title-box{
        padding: 0 20px;

        .title{
            border-bottom: 1px solid #000;
            font-size: 20px;
            font-weight: 400;
            color:#303030;
            padding-bottom: 20px;

            .accent-text{
                color:var(--mainColor);
            }
        }
    }
`;

export const ContentContainer = styled.div`
    padding: 20px 20px 0 20px;
    margin-bottom: 30px;
`;

export const TargetOption = styled.div`
    border: 1px solid #f0f0f0;
    box-shadow: var(--defaultBoxShadow);
    border-radius: 15px;
    padding: 20px 10px;
    margin-bottom: 20px;
    background: #fff;

    .label{
        font-size: 12px;
        color: #808080;
    }

    .target-info{
        font-size: 13px;
        color: #404040;
    }
`;

export const ContentWrapper = styled.div`
    border: 1px solid #f0f0f0;
    box-shadow: var(--defaultBoxShadow);
    border-radius: 15px;
    padding: 20px 0;
    background: #fff;
    
    .search-input-box{
        padding: 0 10px;
        display: flex;
        
        .search-input-item{
            width: 100%;
            height: 48px;
            border: 1px solid #e0e0e0;
            border-right: none;
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
            box-sizing: border-box;
            padding: 0 10px;
            outline: none;

            &:focus{
                border: 1px solid var(--mainColor);
                border-right: none;
                box-shadow: var(--defaultBoxShadow);
            }
        }

        .search-button-item{
            padding:0;
            margin:0;
            width: 80px;
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
            background: var(--mainColor);
            color:white;
            border: none;
        }
    }

    .item-list-wrapper{
        padding: 10px;
    }

    .item-list-box{
        height: 250px;
        overflow-y: scroll;
        cursor: pointer;
        background: #fff;
        padding: 0 10px;
        border-radius: 10px;
        border: 1px solid #f0f0f0;

        &::-webkit-scrollbar{
            background: #e1e1e130;
            height:7px;
            width: 5px;
        }

        &::-webkit-scrollbar-track{
            border-radius: 10px;
        }

        &::-webkit-scrollbar-thumb{
            background-color: #00000020;
            border-radius: 10px;
        }
        
        .item-box{
            margin-bottom: 5px;
            font-size: 12px;
            border-bottom: 1px solid #f0f0f0;
            padding: 10px 0;

            &:last-child{
                border-bottom: none;
            }
            
            .option-info{
                color: var(--mainColor);
                font-weight: 600;
                color:#404040;
            }
            
            .category-info{
                margin-top: 5px;
                text-align: right;
                color:#808080;
            }
        }
    }

    .pagenation-wrapper{
        /* margin-bottom: 20px; */
    }
`;

export const ButtonContainer = styled.div`
    margin-top: 40px;
    display: flex;
    .button-el{
        margin:0;
        padding:0;
        height: 48px;
        border:none;
        color:#fff;
        font-size: 18px;
        font-weight: 500;
    }
`;