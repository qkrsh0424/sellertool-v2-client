import { useReducer, useState } from "react"
import styled from "styled-components";
import LineBreakerBottom from "../../modules/fragment/LineBreakerBottom";
import SnackbarCenter from "../../modules/snackbar/SnackbarCenter";

const Container = styled.div`
    overflow: hidden;
    padding: 0 30px;

    @media all and (max-width:992px){
        padding: 0 10px;
    }
`;

const Wrapper = styled.div`
`;

const FlexBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
`;

const FlexItem = styled.div`
    width: 50%;

    @media all and (max-width: 992px){
        width: 100%;   
    }
`;

const InputBox = styled.div`
    /* width: 100%; */
    padding: 5px;

    .input-label{
        margin-bottom: 5px;

        font-size: 14px;
        font-weight: 600;
        color: #444;

        @media all and (max-width: 992px){
            font-size: 12px;
        }
    }

    .input-el{
        width: 100%;
        padding: 10px;
        font-size: 16px;
        outline: none;
        border: 2px solid #e1e1e1;
        border-radius: 5px;
        transition: all .5s;

        &:focus{
            border: 2px solid #2C73D2;
        }

        @media all and (max-width: 992px){
            font-size: 13px;   
        }
    }
`;

const SearchButtonBox = styled.div`
    overflow: hidden;
    padding: 5px;
    
    .search-btn{
        padding: 10px 20px;

        float: right;

        background: #2C73D2;
        border: 1px solid #2C73D2;
        border-radius: 5px;

        font-size: 16px;
        font-weight: 600;
        color: white;

        cursor: pointer;

        
        &:hover{
            transition: all .5s;
            background: #309FFF;
            border: 1px solid #309FFF;
        }

        &:active{
            background: #7DC2FF;
            border: 1px solid #7DC2FF;
        }

        @media all and (max-width: 992px){
            font-size: 13px;   
        }
    }
`;

const initialSearchValueState = {
    keyword: '',
    mallName: ''
}

const searchValueStateReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        default: return { ...state }
    }
}

const SearchConsoleComponent = (props) => {
    const [searchValueState, dispatchSearchValueState] = useReducer(searchValueStateReducer, initialSearchValueState);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('no message');

    const __searchValueState = () => {
        return {
            onChangeValue: function (e) {
                dispatchSearchValueState({
                    type: 'SET_DATA',
                    payload: {
                        name: e.target.name,
                        value: e.target.value
                    }
                })
            }
        }
    }

    const _onSearchRank = () =>{
        if(!searchValueState.keyword){
            _onSnackbarOpen('키워드명은 필수 입력입니다.');
            return;
        }

        if(!searchValueState.mallName){
            _onSnackbarOpen('스토어명은 필수 입력입니다.');
            return;
        }

        props.onSearchRank(searchValueState);
    }

    const _onSnackbarOpen = (message) =>{
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    }

    const _onSnackbarClose = () =>{
        setSnackbarOpen(false);
    }

    return (
        <>
            <Container>
                <Wrapper>
                    <FlexBox>
                        <FlexItem>
                            <InputBox>
                                <div className='input-label'>키워드명</div>
                                <input
                                    type='text'
                                    className='input-el'
                                    name='keyword'
                                    value={searchValueState.keyword || ''}
                                    onChange={(e) => __searchValueState().onChangeValue(e)}
                                    placeholder="키워드명을 정확히 입력해주세요 🙌"
                                ></input>
                            </InputBox>
                        </FlexItem>
                        <FlexItem>
                            <InputBox>
                                <div className='input-label'>스토어명</div>
                                <input
                                    type='text'
                                    className='input-el'
                                    name='mallName'
                                    value={searchValueState.mallName || ''}
                                    onChange={(e) => __searchValueState().onChangeValue(e)}
                                    placeholder="스토어명을 정확히 입력해주세요 🙌"
                                ></input>
                            </InputBox>
                        </FlexItem>
                    </FlexBox>
                    <SearchButtonBox>
                        <button 
                            type='button'
                            className='search-btn'
                            onClick={()=>_onSearchRank()}
                        >랭킹 조회 하기</button>
                    </SearchButtonBox>
                </Wrapper>
                <LineBreakerBottom
                    lineSize={1}
                    lineType={'solid'}
                    lineColor={'#e1e1e1'}
                    gapTop={50}
                    gapBottom={0}
                ></LineBreakerBottom>
            </Container>

            {/* Snackbar */}
            <SnackbarCenter
                open={snackbarOpen}
                message={snackbarMessage}
                severity={'warning'}

                onClose={()=>_onSnackbarClose()}
            ></SnackbarCenter>
        </>
    );
}

export default SearchConsoleComponent;