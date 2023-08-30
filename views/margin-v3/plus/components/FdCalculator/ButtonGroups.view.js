import styled from 'styled-components';
import CustomBlockButton from '../../../../../components/buttons/block-button/v1/CustomBlockButton';

const Container = styled.div`
    /* margin-bottom: 20px; */
`;

const Wrapper = styled.div`
    display: flex;

    .flexible-wrapper{
        display: flex;
        flex:1;
    }
`;

const ActionButton = styled(CustomBlockButton)`
    height: 30px;
    font-size: 11px;
    font-weight: 700;
    width: 65px;
    border-radius: 5px;
    margin-left: 3px;
    background: #efefef;
    border: none;
    color: #444;
`;
export default function ButtonGroupsView({
    resultDetailModeOpen,
    onActionRefresh,
    onToggleResultDetailModeOpen
}) {
    return (
        <>
            <Container>
                <Wrapper>
                    <div className='flexible-wrapper'>
                        <ActionButton
                            type='button'
                            onClick={() => onToggleResultDetailModeOpen()}
                        >
                            삭제
                        </ActionButton>
                    </div>
                    <div className='flexible-wrapper' style={{ justifyContent: 'flex-end' }}>
                        <ActionButton
                            type='button'
                            onClick={() => onToggleResultDetailModeOpen()}
                        >
                            {resultDetailModeOpen ? '결과 간략히' : '결과 자세히'}
                        </ActionButton>
                    </div>
                </Wrapper>
            </Container>
        </>
    );
}