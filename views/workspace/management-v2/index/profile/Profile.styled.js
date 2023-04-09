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

export const ProfileWrapper = styled.div`
    border: 1px solid var(--mainColor);
    border-radius: 15px;
    padding: 0 20px;
    margin-top: 10px;
    background: #fff;
    box-shadow: var(--defaultBoxShadow);

    .content-group{
        padding: 10px 0;
        border-bottom: 1px solid #f0f0f0;

        &:last-child{
            border-bottom:none;
        }
    }

    .profile-image-figure{
        width: 70px;
        height: 70px;
        border: 1px solid #f0f0f0;
        border-radius: 50%;
        position: relative;
        overflow: hidden;
        box-sizing: border-box;
        cursor: pointer;

        @media all and (max-width: 992px){
            width: 60px;
            height: 60px;
        }
    }

    .icon-figure{
        width:24px;
        height:24px;

        @media all and (max-width: 992px){
            width:20px;
            height:20px;
        }
    }

    .info-group{
        flex:1;
        margin-left: 20px;

        @media all and (max-width: 992px){
            margin-left: 10px;
        }

        .info-text{
            font-size: 16px;
            color: #505050;
            font-weight: 500;

            word-break: break-all;

            @media all and (max-width: 992px){
                font-size: 14px;
            }
        }

        .info-text-primary{
            font-size: 20px;
            color: #303030;
            font-weight: 600;

            @media all and (max-width: 992px){
                font-size: 18px;
            }
        }

        .info-text-secondary{
            font-size: 18px;
            color: #505050;
            font-weight: 500;

            @media all and (max-width: 992px){
                font-size: 16px;
            }
        }

        .modify-button{
            margin:0;
            padding:0;
            width: 40px;
            border-radius: 5px;
            height: 28px;
            font-size: 13px;
            background: #f0f0f0;
            color: #808080;

            &:hover{
                background: var(--mainColor);
                color: #fff;
                border:1px solid var(--mainColor);
            }
        }

        .modify-button-w-md{
            width: 70px;
        }
    }
`;

export const DropWorkspaceButtonBox = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    .button{
        width: 110px;
        font-size:12px;
        height: 30px;
        border:1px solid var(--defaultRedColor);
        border-radius: 5px;
        color: var(--defaultRedColor);
    }
`;