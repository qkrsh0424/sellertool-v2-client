import styled from 'styled-components';

export const Container = styled.div`
    padding: 0 20px;
    margin-top: 20px;
`;

export const Wrapper = styled.div`
    background: white;
    border: 1px solid #e0e0e0;
    box-shadow: var(--defaultBoxShadow);
    padding: 20px;
    border-radius: 15px;

    .title{
        font-weight: 700;
        font-size: 14px;
    }

    .cell-notice-modal-button{
        width:100px;
        height: 25px;
        font-size: 13px;
        font-weight: 600;
        color: #202020;
        background: #f7f7f7;
        border-radius: 5px;
    }

    ul{
        font-size: 13px;
        padding: 0 20px;

        li{
            margin-bottom: 10px;
        }
    }

    .accent{
        color: var(--mainColor);
    }
`;

export const ModalContentContainer = styled.div`
    padding: 0 20px;

    .fieldNameList-wrapper{
        padding: 20px 0;
        border-bottom: 1px solid #f0f0f0;
        .select-button{
            font-size: 12px;
            display: inline-block;
            border: 1px solid #e0e0e0;
            padding: 5px;
            margin-right: 3px;
            margin-bottom: 3px;
            background: #ffffff;
            color: #202020;
            font-weight: 500;
            user-select: none;
            cursor: pointer;
        }
    
        .selected{
            background: var(--mainColor);
            color: #ffffff;
        }
    }

    .description-wrapper{
        padding: 20px 0;
        font-size: 14px;
        
        .label{
            font-weight: 700;
        }

        & ul{
        padding-left: 20px;
        color: #404040;

            li{
                margin-bottom: 10px;
            }
        }
    }
`;