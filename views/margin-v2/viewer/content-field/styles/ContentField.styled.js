import styled from 'styled-components';

export const Container = styled.div`
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;
    padding: 0 10px;
    margin-top: 20px;
`;

export const Wrapper = styled.div`
    background: #fff;
    background: #fff;
    box-shadow: var(--defaultBoxShadow);
    padding: 0 20px;
    border-radius: 5px;
    overflow: hidden;
`;

export const ProductName = styled.div`
    span{
        display: inline-block;
        padding-left: 10px;
        font-size: 20px;
        font-weight: 700;
        color: #404040;
        border-left: 4px solid var(--mainColor);
    }
`;

export const GridWrapper = styled.div`
    display: flex;
    border-radius: 5px;
    transition: all .5s;
    margin-top: 20px;

    .flex-block{
        padding:20px;
    }

    @media all and (max-width:992px){
        flex-direction: column;
    }
`;

export const LeftBox = styled.form`
    flex:1;
`;

export const RightBox = styled.div`
    width:30%;

    @media all and (max-width:992px){
        width:100%;
        flex:1;
    }
`;

export const FlexBlock = styled.div`
    padding:10px;
`;

export const InputWrapper = styled.div`
    display: flex;

    @media all and (max-width:992px){
        flex-direction: column;
    }
`;

export const InputBox = styled.div`
    background: #fff;
    flex:1;
    border-radius: 10px;
    overflow: hidden;

    .label-flex-box{
        display: flex;
        justify-content: space-between;
        color:#303030;
        font-weight: 700;
        font-size: 16px;
        margin-top: 10px;
    }
    
    .input-group{
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .input-flex-box{
        display: flex;
        align-items: center;
        border: 1px solid #e0e0e0;
        border-radius: 5px;
        box-sizing: border-box;
        overflow: hidden;
    }
    
    .unit{
        width: 50px;
        text-align: center;
        color:var(--mainColor);
        font-weight: 600;
    }

    input{
        flex:1;
        padding: 13px;
        outline: none;
        border: none;

        transition: all .5s;

        font-size: 16px;
        color: #444;
    }
`;

export const CommonWrapper = styled.div`
    margin-top: 10px;
`;

export const ButtonBox = styled.div`
    margin-top: 20px;

    @media all and (max-width: 992px){
        margin-top: 0;
    }

    .calc-button{
        margin:0;
        padding:0;
        width: 100%;
        height: 48px;
        background: var(--mainColor);
        border: none;
        box-shadow: var(--defaultBoxShadow);
        border-radius: 10px;

        font-size: 16px;
        font-weight: 600;
        color: white;

        cursor: pointer;

        &:hover{
            background: var(--mainColorHover);
            border: none;
            color: white;
        }
    }
`;

export const FlexRightBox = styled.div`
    display: flex;
    justify-content: flex-end;

    .control-btn{
        position: relative;
        margin:0;
        padding:0;
        margin-left: 7px;
        width: 44px;
        height: 44px;
        
        background: #fff;
        box-shadow: var(--defaultBoxShadow);
        border:none;
        border-radius: 50%;

        color: #444;
        font-weight: 600;

        cursor: pointer;

        transition: all .3s;

        &:hover{
            background: #e1e1e140;
            color: white;
        }

        &:active{
            transition: all 0s;
            background: #e1e1e180;
        }
    }

    .control-btn .icon{
        position: relative;
        width: 60%;
        height: 60%;
        margin-left: auto;
        margin-right: auto;
    }
`;

export const ResultBox = styled.div`
    overflow: hidden;
    padding: 20px;
    margin-bottom: 20px;
    background: white;
    border:1px solid #f0f0f0;
    border-radius: 5px;
    box-shadow: var(--defaultBoxShadow);
    color: #404040;

    .title{
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 10px;
    }

    .result{
        float: right;
        font-size: 18px;
        font-weight: 700;
    }
`;

export const FixedBottomNotice = styled.div`
    position: fixed;
    bottom: 50px;
    width: 100%;
    text-align: center;

    font-size: 20px;
    font-weight: 800;
    color: #55555580;
`