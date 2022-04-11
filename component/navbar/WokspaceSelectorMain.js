import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`

`;

const Wrapper = styled.div`
    overflow: hidden;
    padding: 0 30px;
    border-bottom: 1px solid #f1f1f1;

    @media all and (max-width: 992px){
        padding: 0 10px;
    }
`;

const SelectorBtnBox = styled.div`
    float: right;
    padding:10px 0;
`;
const SelectorBtn = styled.button`
    padding: 5px 10px;

    background: white;
    border: 1px solid #f1f1f1;
    border-radius: 5px;

    cursor: pointer;

    transition: all .3s;

    &:hover{
        background: #309FFF;
        border: 1px solid #309FFF;
        color: white;
    }

    &:active{
        transition: all 0s;
        background: #609FFF;
        border: 1px solid #609FFF;
    }
`;
const WorkspaceSelectorMain = (props) => {
    const workspaceRdx = useSelector(state => state.workspaceState);

    return (
        <>
            {workspaceRdx.info &&
                <Container>
                    <Wrapper>
                        <SelectorBtnBox>
                            <SelectorBtn onClick={() => props.onWorkspaceListModalOpen()}>
                                {workspaceRdx.info.name}
                            </SelectorBtn>
                        </SelectorBtnBox>
                    </Wrapper>
                </Container>
            }

        </>
    );
}
export default WorkspaceSelectorMain;