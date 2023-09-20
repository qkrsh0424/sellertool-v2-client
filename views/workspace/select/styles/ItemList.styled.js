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
    padding: 20px 0;
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
        display:flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
        user-select: none;
        -webkit-tap-highlight-color: #00000000;
        cursor: pointer;
        flex:1;
        font-size: 16px;
        color:#303030;
        padding: 15px 10px;
        
        &:hover{
            background: #f0f0f040;
        }

        .workspaceTag{
            /* width:70px; */
            display: inline-block;
            font-size: 10px;
            border:0.9px solid #808080;
            color: #808080;
            font-weight: 700;
            border-radius: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            width:60px;
            height: 22px;
        }

        .disabledWorkspace-notification{
            margin-top: 3px;
            font-size: 10px;
            color:var(--defaultRedColorOpacity600);
        }

        .disabledWorkspace-tag{
            border:0.9px solid var(--defaultRedColorOpacity600);
            color: var(--defaultRedColorOpacity600);
        }

        .privateWorkspace-tag{
            border:0.9px solid #808080;
            color: #808080;
        }

        .publicWorkspace-tag{
            border:0.9px solid var(--publicWorkspaceColor);
            color: var(--publicWorkspaceColor);
        }

        .plusWorkspace-tag{
            border:0.9px solid var(--plusWorkspaceColor);
            color: var(--plusWorkspaceColor);
        }
        
        .workspaceName{
            display: inline-block;
            flex:1;
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