import styled from 'styled-components';

const Container = styled.div`
    max-width: 1280px;
    margin-left: auto;
    margin-right: auto;
    padding: 0 10px;
    margin-top: 20px;
`;

const Wrapper = styled.div`
    background: #fff;
    box-shadow: var(--defaultBoxShadow);
    padding: 20px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .name-box{
        display: inline-block;
        padding-left: 10px;
        border-left: 4px solid var(--mainColor);
        flex:1;

        .name{
            font-size: 16px;
            font-weight: 700;
            color: #404040;
        }

        .tag{
            font-size: 13px;
            font-weight: 500;
            color: #808080;
            margin-top:5px;
        }
    }
`;

export default function NameFieldComponent({
    marginRecord
}) {
    return (
        <>
            <Container>
                <Wrapper>
                    <div className='name-box'>
                        <div className='name'>{marginRecord?.name || '선택없음'}</div>
                        <div className='tag'>{marginRecord?.tag || '태그 미지정'}</div>
                    </div>
                </Wrapper>
            </Container>
        </>
    );
}