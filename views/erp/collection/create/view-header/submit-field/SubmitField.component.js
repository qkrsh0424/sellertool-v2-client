import { useRouter } from "next/router";
import SingleBlockButton from "../../../../../modules/button/SingleBlockButton";
import { Container } from "./SubmitField.styled";

export default function SubmitFieldComponent({
    disabledBtn
}) {
    const router = useRouter();

    const handleRouterBack = () => {
        router.back();
    }
    return (
        <>
            <Container>
                <SingleBlockButton
                    type='button'
                    className='button-item'
                    style={{
                        background: 'var(--defaultModalCloseColor)'
                    }}
                    onClick={() => handleRouterBack()}
                >
                    취소
                </SingleBlockButton>
                <SingleBlockButton
                    type='submit'
                    className='button-item'
                    style={{
                        background: 'var(--mainColor)'
                    }}
                    disabled={disabledBtn ?? false}
                >
                    확인
                </SingleBlockButton>
            </Container>
        </>
    );
}