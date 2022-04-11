import { useReducer } from 'react';
import styled from 'styled-components';

const Container = styled.div`

`;

const TitleWrapper = styled.div`
    border-bottom: 1px solid #e1e1e1;
`;

const Title = styled.div`
    padding: 10px;
    font-size: 16px;
    font-weight: 600;
`;

const ContentWrapper = styled.div`
    border-bottom: 1px solid #e1e1e1;
`;

const ContentBox = styled.div`
    padding: 40px 20px;
`;

const FooterWrapper = styled.div`

`;

const FooterBox = styled.div`
    padding: 10px;
`;

const InputBox = styled.div`
    .input-label{
        font-size: 13px;
        font-weight: 500;
        color: #555;
        margin-bottom: 7px;
    }

    .input-item{
        width: 100%;
        padding: 7px;
        font-size: 14px;
        border: 2px solid #e1e1e1aa;
        border-radius: 3px;

        transition: all .5s;
        &:hover{
            border: 2px solid #309FFF;
        }

        &:focus{
            outline: none;
            border: 2px solid #2C73D2;
        }
    }
`;

const ButtonBox = styled.div`
    overflow: hidden;

    .confirm-btn{
        float: right;
        padding: 5px 20px;

        background: white;
        border: 1px solid #00000000;
        border-radius: 5px;
        
        font-weight: 400;
        color: #2C73D2;

        cursor: pointer;
        transition: all .3s;

        &:hover{
            background: #f1f1f160;
            font-weight: 500;
        }

        &:active{
            background: #2C73D220;
        }
    }

    .cancel-btn{
        float: right;
        margin-right: 5px;
        padding: 5px 20px;

        background: white;
        border: 1px solid #00000000;
        border-radius: 5px;

        font-weight: 400;
        color: #db2e5e;

        cursor: pointer;
        transition: all .3s;
        
        &:hover{
            background: #f1f1f160;
            font-weight: 500;
        }

        &:active{
            background: #db2e5e20;
        }
    }
`;

const initialNameState = null;

const nameStateReducer = (state, action) =>{
    switch(action.type){
        case 'SET_DATA':
            return action.payload;
        default : return { ...state }
    }
}
const RecordCreateModalComponent = (props) => {
    const [nameState, dispatchNameState] = useReducer(nameStateReducer, initialNameState);

    const _onChangeNameState = (e) =>{
        dispatchNameState({
            type:'SET_DATA',
            payload:e.target.value
        })
    }

    const _onConfirm = () =>{
        props.onConfirm(nameState);
        props.onClose();
    }
    return (
        <>
            <Container>
                <TitleWrapper>
                    <Title>추가하기</Title>
                </TitleWrapper>
                <ContentWrapper>
                    <ContentBox>
                        <InputBox>
                            <div className='input-label'>Name</div>
                            <input type='text' className='input-item' placeholder='' value={nameState || ''} onChange={(e)=>_onChangeNameState(e)}></input>
                        </InputBox>
                    </ContentBox>
                </ContentWrapper>
                <FooterWrapper>
                    <FooterBox>
                        <ButtonBox>
                            <button type='button' className='confirm-btn' onClick={()=>_onConfirm()}>확인</button>
                            <button type='button' className='cancel-btn' onClick={() => props.onClose()}>취소</button>
                        </ButtonBox>
                    </FooterBox>
                </FooterWrapper>
            </Container>
        </>
    );
}
export default RecordCreateModalComponent;