import styled from 'styled-components';

export const Container = styled.div`
    margin-top: 100px;
`;

export const TitleFieldWrapper = styled.div`
    font-size: 24px;
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

export const ListFieldWrapper = styled.div`
    background: white;
    margin-top: 10px;
    padding:0 20px;
    border-radius: 15px;
    box-shadow: var(--defaultBoxShadow);

    .item-wrapper{
        display: flex;
        justify-content:space-between; 
        align-items: center;
        border-bottom: 1px solid #f0f0f0;
        padding:10px 0;

        &:last-child{
            border-bottom: none;
        }

        @media all and (max-width:992px){
            flex-direction: column;
        }

        .info-group{
            flex:1;

            @media all and (max-width:992px){
                width: 100%;
            }

            .info-id{
                font-size: 13px;
                color: #57606a;
            }

            .info-name{
                font-size: 16px;
                margin-top: 10px;
                color: var(--mainColor);
                font-weight: 600;
            }
        }

        .button-group{
            @media all and (max-width:992px){
                width:100%;
                margin-top: 20px;
                flex:1;
                justify-content: flex-end;
            }

            .button-item{
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

            .accept-button-el{
                box-shadow: var(--defaultBoxShadow);
                &:hover{
                    background:var(--mainColor);
                    border: 1px solid var(--mainColor);
                    color:white;
                }
            }

            .reject-button-el{
                box-shadow: var(--defaultBoxShadow);
                &:hover{
                    background:var(--defaultRedColor);
                    border: 1px solid var(--defaultRedColor);
                    color:white;
                }
            }
        }
    }

    

    .button-accept{
        &:hover{
            background: #2C73D2;
            color:white;
            border:1px solid #2C73D2;
        }
    }

    .button-reject{
        &:hover{
            background: #ff6961;
            color:white;
            border:1px solid #ff6961;
        }
    }

    &::-webkit-scrollbar {
       width: 7px;
       
    }
    &::-webkit-scrollbar-thumb {
        background-color: #00000025;
        border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
        /* background-color: white; */
    }
`;