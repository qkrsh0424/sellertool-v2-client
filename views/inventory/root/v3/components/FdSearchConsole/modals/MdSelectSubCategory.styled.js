import styled from 'styled-components';

export const St={
    Container:styled.div`
        .content-group{
            padding: 0 20px;
            /* margin-bottom: 20px; */
            
            .content-box{
                padding: 20px 0;
                border-bottom: 1px solid #e0e0e0;
                font-size: 16px;
                
                &:last-child{
                    border-bottom: none;
                }

                .input-box{
                    .input-label{
                        font-size: 10px;
                        margin-bottom: 2px;
                        color: #808080;
                    }

                    .input-el{
                        width:100%;
                        box-sizing: border-box;
                        padding: 15px 10px;
                        font-size: 14px;
                        border:1px solid #e0e0e0;
                        border-radius: 5px;
                        flex:1;

                        &:focus{
                            outline:none;
                            border:1px solid var(--mainColor);
                            box-shadow: var(--defaultBoxShadow);
                        }

                        &:disabled{
                            background: #f0f0f050;
                            cursor: not-allowed;
                        }
                    }
                }

                .tag{
                    color:#404040;
                    display: inline-block;
                    border:1px solid var(--mainColorOpacity500);
                    padding: 5px 10px;
                    background: #fff;
                    box-sizing: border-box;
                    font-size: 14px;
                    border-radius: 15px;
                    box-shadow: var(--defaultBoxShadow);
                    margin: 0 10px 10px 0;
                    cursor: pointer;
                }

                .tag-accent{
                    color:#fff;
                    border:1px solid var(--mainColorOpacity500);
                    background: var(--mainColor);
                }
            }
        }



        .button-group{
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
        }
    `,
}