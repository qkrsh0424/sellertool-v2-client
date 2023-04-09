import styled from 'styled-components';
import CustomBlockButton from '../../../../components/buttons/block-button/v1/CustomBlockButton';

const Container = styled.div`
    border-bottom: 1px solid #e0e0e0;
    padding: 20px 0;
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const ActionButton = styled(CustomBlockButton)`
    height: 30px;
    font-size: 11px;
    font-weight: 700;
    width: 60px;
    border-radius: 5px;
    margin-left: 3px;
    background: #efefef;
    border: none;
    color: #444;
`;
export default function ButtonGroupsView({
    marginRecord,
    onActionRefresh,
    onActionCreateModalOpen,
    onActionEditModalOpen,
    onActionCopyViewerUrl
}) {
    return (
        <>
            <Container>
                <Wrapper>
                    <ActionButton
                        type='button'
                        onClick={() => onActionRefresh()}
                    >
                        새로고침
                    </ActionButton>
                    {!marginRecord &&
                        <ActionButton
                            type='button'
                            style={{ color: '#fff', background: 'var(--mainColor)' }}
                            onClick={() => onActionCreateModalOpen()}
                        >
                            추가
                        </ActionButton>
                    }
                    {marginRecord &&
                        <>
                            <ActionButton
                                type='button'
                                onClick={() => onActionEditModalOpen()}
                                style={{ color: '#fff', background: 'var(--mainColor)' }}
                            >
                                저장
                            </ActionButton>
                            <ActionButton
                                type='button'
                                style={{ color: '#fff', background: '#333' }}
                                onClick={() => onActionCopyViewerUrl()}
                            >
                                뷰어복사
                            </ActionButton>
                        </>
                    }
                </Wrapper>
            </Container>
        </>
    );
}