import { useRouter } from 'next/router';
import { useCallback } from 'react';
import styled from 'styled-components';
import useDisabledBtn from '../../../../hooks/button/useDisabledBtn';
import SingleBlockButton from '../../../modules/button/SingleBlockButton';

const Container = styled.div`
    position:fixed;
    bottom:0;
    width:100%;
    display: flex;
    z-index: 20;
    height: 70px;
    background: #f7f7f7;
    align-items: center;
    justify-content: flex-end;


    .button-item{
        margin:0;
        padding:0;
        width: 150px;
        height: 48px;
        border:none;
        color:white;
        font-size: 18px;
        font-weight: 600;
        border-radius: 5px;
        margin-right: 20px;

        @media all and (max-width: 992px){
            width: 100px;
            margin-right: 10px;
        }
    }
`;
export default function SubmitFieldComponent({
    onSubmitUpdate
}) {
    const router = useRouter();
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();

    const handleActionRouteToRev = useCallback(() => {
        router.back();
    }, []);

    const handleSubmitConfirm = useCallback((e) => {
        e.preventDefault();
        setDisabledBtn(true);
        onSubmitUpdate();
    }, [onSubmitUpdate, setDisabledBtn]);

    return (
        <>
            <Container>

                <SingleBlockButton
                    type='button'
                    className='button-item'
                    style={{
                        background: 'var(--defaultModalCloseColor)'
                    }}
                    onClick={() => handleActionRouteToRev()}
                >
                    취소
                </SingleBlockButton>
                <SingleBlockButton
                    type='button'
                    className='button-item'
                    style={{
                        background: 'var(--mainColor)'
                    }}
                    onClick={(e) => handleSubmitConfirm(e)}
                    disabled={disabledBtn}
                >
                    확인
                </SingleBlockButton>
            </Container>
        </>
    );
}