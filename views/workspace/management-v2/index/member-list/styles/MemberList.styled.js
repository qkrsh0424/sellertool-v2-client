import styled from 'styled-components';

export const Container = styled.div`
    margin-bottom: 30px;
    @media all and (max-width:992px){
        margin-top: 30px;
    }
`;

export const TitleFieldWrapper = styled.div`
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

export const MemberListWrapper = styled.div`
    background: white;
    margin-top: 10px;
    border-radius: 15px;
    box-shadow: var(--defaultBoxShadow);
    padding:0 20px;

    .item-group{
        padding:10px 0;
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
            }

            .info-group{
                display: flex;
                font-size: 12px;
                color: #606060;
                font-weight: 500;
                margin-top: 3px;
            }

            .nickName{
                color: var(--mainColor);
                font-size: 16px;
                font-weight: 700;
            }

            .memberType{
                font-size: 12px;
                font-weight: 500;
                color: #606060;
            }
            .info-left{
                width: 80px;
            }
        }

        .control-items{
            margin-top: 10px;
            justify-content: flex-end;
            @media all and (max-width:992px){
                width:100%;
                flex:1;
            }
            
            .control-item{
                padding: 0;
                margin: 0 10px 0 0;
                width: 70px;
                height: 30px;
                font-size: 12px;
                font-weight: 700;
                border: none;
                border-radius: 5px;
                color: #fff;

                &:last-child{
                    margin:0;
                }

                &:hover{
                    transform: scale(1.02);
                }
            }

            .setting-button-el{
                box-shadow: var(--defaultBoxShadow);
                background: #222;
            }

            .remove-button-el{
                box-shadow: var(--defaultBoxShadow);
                background: var(--defaultRedColor);
            }
        }
    }

`;