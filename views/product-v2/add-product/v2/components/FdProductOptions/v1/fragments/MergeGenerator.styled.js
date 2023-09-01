import styled from 'styled-components';

export const Container = styled.div`
    padding: 20px 0;
    border-bottom: 1px solid #f0f0f0;
    border-top: 1px solid #f0f0f0;
    
    .input-group{
        margin-top: 10px;

        @media all and (max-width: 992px){
            flex-direction: column;
        }
    }

    .input-box{
        width: 400px;
        margin-bottom: 10px;

        @media all and (max-width: 992px){
            width:100%;
            flex:1;
        }

        .input-item{
            width: 100%;
            height: 48px;
            flex:1;
            outline:none;
            border:1px solid #e0e0e0;
            padding: 0 10px;
            border-radius: 5px;

            @media all and (max-width: 992px){
                height: 38px;
            }
        }

        .icon-button-group{
            width: 100px;

            @media all and (max-width: 992px){
                width: 70px;
            }
        }

        .icon-button-item{
            margin:0;
            padding:0;
            width: 40px;
            height: 40px;
            border-radius: 5px;

            &:last-child{
                margin-left: 5px;
            }

            @media all and (max-width: 992px){
                width: 30px;
                height: 30px;
            }

            .icon-figure{
                width: 60%;
                height: 60%;
                margin-left: auto;
                margin-right: auto;
            }
            
        }
    }

    .flex-block{
        padding: 10px;
    }

    .generator-button-item{
        margin:0;
        padding:0;
        height: 48px;
        background: var(--mainColor);
        color:white;
        border-radius: 5px;
    }
`;