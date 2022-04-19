import styled from 'styled-components';

const Container = styled.div`
    padding: 0 40px;
    margin-top: 20px;
`;

const Wrapper = styled.div`
    display: flex;
    align-items: center;

    .title-box{
        font-size: 20px;
        font-weight: 600;
    }

    .button-box{
        /* margin-left: 5px; */
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
        background: white;

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

const EditNameModalWrapper = styled.div`
    .title{
        padding: 10px;
        border-bottom: 1px solid #e0e0e0;
        font-size: 18px;
        font-weight: 600;
    }

    .input-box{
        margin-top: 20px;
        padding: 0 10px;
    }

    .input-el{
        box-sizing: border-box;
        width: 100%;
        margin-top: 5px;
        padding: 10px 5px;

        border: 1px solid #e0e0e0;

        &:focus{
            outline:none;
        }
    }

    .input-label{
        font-size: 13px;
        font-weight: 500;
    }

    .button-wrapper{
        display: flex;
        margin-top: 20px;
    }

    .button-el{
        position: relative;
        overflow: hidden;
        flex:1;
        height: 34px;

        background: white;
        border: none;

        font-weight: 500;

        cursor: pointer;

        &:hover{
            background:#e0e0e060;
        }

        &:disabled{
            cursor: not-allowed;
        }
    }
`;

export {
    Container,
    Wrapper,
    EditNameModalWrapper
}