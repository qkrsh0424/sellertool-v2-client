import styled from 'styled-components';

export const Container = styled.div`
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;
    padding: 0 10px;
    margin-top: 20px;
`;

export const Wrapper = styled.div`
    display: flex;
    align-items: center;

    &:hover{
        .button-box{
            display: block;
        }
    }
    .title-box{
        font-size: 24px;
        font-weight: 600;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;

        .title{
            flex:1;
        }

        .workspaceTag{
            display: inline-block;
            font-size: 14px;
            border:1px solid #808080;
            color: #808080;
            font-weight: 600;
            border-radius: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            width:80px;
            height: 25px;
        }

        .disabledWorkspace-notification{
            margin-top: 3px;
            font-size: 10px;
            color:var(--defaultRedColorOpacity600);
        }

        .disabledWorkspace-tag{
            border:1px solid var(--defaultRedColorOpacity600);
            color: var(--defaultRedColorOpacity600);
        }

        .privateWorkspace-tag{
            border:1px solid #808080;
            color: #808080;
        }

        .publicWorkspace-tag{
            border:1px solid var(--publicWorkspaceColor);
            color: var(--publicWorkspaceColor);
        }

        .plusWorkspace-tag{
            border:1px solid var(--plusWorkspaceColor);
            color: var(--plusWorkspaceColor);
        }
    }

    .button-box{
        display: none;
        margin-left: 5px;
    }
    
    .button-el{
        position: relative;
        overflow: hidden;
        width: 30px;
        height: 30px;
        padding: 0;
        margin: 0;
        border-radius: 50%;
        border: none;
        background: none;

        cursor: pointer;

        &:hover{
            background: #e0e0e060;
        }
    }

    .button-icon-figure{
        position: relative;
        width: 70%;
        height: 70%;
        margin: auto;
        opacity: 0.6;
    }
`;