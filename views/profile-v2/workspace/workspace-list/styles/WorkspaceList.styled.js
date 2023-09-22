import styled from 'styled-components';

const Container = styled.div`
    @media all and (max-width:992px){
        margin-top: 30px;
    }
`;

const TitleFieldWrapper = styled.div`
    font-size: 21px;
    font-weight: 600;
    color: #404040;

    .refresh-button-el{
        margin:0;
        padding:0;
        width:34px;
        height: 34px;
        margin-left: 10px;
        border-radius: 10px;

        .refresh-button-icon-figure{
            width:70%;
            height: 70%;
            margin-left: auto;
            margin-right: auto;
        }
    }
`;

const ListFieldWrapper = styled.div`
    background: white;
    margin-top: 10px;
    border-radius: 15px;
    box-shadow: var(--defaultBoxShadow);
    padding:0 20px;

    .item-group{
        padding:15px 0;
        font-size: 14px;
        color:#404040;
        border-bottom: 1px solid #f0f0f0;

        &:last-child{
            border-bottom: none;
        }

        @media all and (max-width:992px){
            flex-direction: column;
        }

        .content-group{
            flex:1;
    
            @media all and (max-width:992px){
                width:100%;
            }

            .profile-image-figure{
                position:relative;
                overflow: hidden;
                width:50px;
                height: 50px;
                margin:0 20px;
                border:1px solid #f0f0f0;
                border-radius: 50%;
                @media all and (max-width:992px){
                    margin:0 20px 0 0;
                }
            }

            .info-items{
                flex:1;
                align-items: center;

                @media all and (max-width:992px){
                    flex-direction: column;
                    width:100%;
                }
            }

            .tag-items{
                margin: 0 20px 0 0;

                @media all and (max-width:992px){
                    margin: 0 0 5px 0;
                    width:100%;
                }
                
                .grade-tag{
                    width:70px;
                    border:1px solid #e0e0e0;
                    padding: 3px 5px;
                    text-align: center;
                    border-radius: 5px;
                    box-sizing: border-box;
                    color: #808080;
                    font-weight: 600;
                    font-size: 12px;
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
            }


            .user-items{
                width:100%;

                .user-item{
                    word-break: break-all;
                    
                    a{
                        &:hover{
                            text-decoration: underline;
                        }
                    }
                }

                .user-item-disabled{
                    color:#808080;
                }
            }
        }

        .control-items{
            @media all and (max-width:992px){
                width:100%;
                margin-top: 20px;
                flex:1;
                justify-content: flex-end;
            }
            
            .control-item{
                padding: 0;
                margin: 0 10px 0 0;
                width: 80px;
                height: 30px;
                font-size: 12px;
                background: #f0f0f0;
                border: 1px solid #f0f0f0;
                border-radius: 10px;
                color: #404040;

                &:last-child{
                    margin:0;
                }
            }

            .setting-button-el{
                box-shadow: var(--defaultBoxShadow);
                &:hover{
                    background:var(--mainColor);
                    border: 1px solid var(--mainColor);
                    color:white;
                }
            }

            .remove-button-el{
                box-shadow: var(--defaultBoxShadow);
                &:hover{
                    background:var(--defaultRedColor);
                    border: 1px solid var(--defaultRedColor);
                    color:white;
                }
            }
        }
    }
`;

export {
    Container,
    TitleFieldWrapper,
    ListFieldWrapper
}