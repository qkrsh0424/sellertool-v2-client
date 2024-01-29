import styled from 'styled-components';

export const Container = styled.div`
    padding: 20px;
    padding-bottom: 100px;

    .wrapper{
        background: #fff;
        padding: 20px;
        box-shadow:var(--defaultBoxShadow3);
        border: none;
        border-radius: 15px;
    }
`;

export const HeadButtonGroup = styled.div`
    display: flex;
    flex-direction: row;

    > button{
        width: 100px;
        border: none;
        border-bottom: 3px solid #00000000;
        font-weight: 700;
        color: #666;
        transition: all .3s;
    }

    > .button-isActive{
        border-bottom: 3px solid var(--mainColor);
        color: var(--mainColor);
        
    }
`;

export const ItemListGroup = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: column;

    > button{
        border: none;
        border-bottom: 1px solid #e0e0e0;
        text-align: left;
        line-height: 1.5;
        height: auto;
        padding: 10px;

        > .contentWrapper{
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;

            > .contentWrapper__title{
                width: 100%;
                font-size: 14px;
                font-weight: 700;
                overflow:hidden;
                text-overflow:ellipsis;
                white-space:nowrap;
            }
    
            > .contentWrapper__columnCount{
                width: 100%;
                font-size: 12px;
                color: #444;
            }
        }
        

        &:hover{
            background: var(--mainColorOpacity50);
        }
    }

    > .button-isActive{
        border-bottom: 2px solid var(--mainColor);
        color: var(--mainColor);
    }
`;

export const SubmitButtonContainer = styled.div`
    position: sticky;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    padding: 10px;
    border-top: 1px solid #f0f0f0;
    box-shadow: var(--defaultBoxShadow3);

    > .description{
        font-size: 12px;
        text-align: center;
        font-weight: 500;
    }

    > .buttonGroupWrapper{
        margin-top: 10px;
        display: flex;
        flex-direction: row;
        gap:10px;
        justify-content: center;
        width: 100%;

        > button{
            width: 120px;
            border-radius: 10px;
            background: var(--defaultModalCloseColor);
            border: none;
            color: #fff;
            font-weight: 700;
        }
    }
`;