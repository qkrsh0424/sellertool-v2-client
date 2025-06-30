import CustomBlockButton from "/components/buttons/block-button/v1/CustomBlockButton";
import { Container } from "./FdBottomFixedSubmit.styled";
import { useRouter } from "next/router";
import useDisabledBtn from "../../../../../../../hooks/button/useDisabledBtn";
import { useCallback } from "react";

export function FdBottomFixedSubmit({
    onSubmitCreate
}) {
    const router = useRouter();
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();

    const handleActionRouteToRev = useCallback(() => {
        router.back();
    }, []);

    const handleSubmitConfirm = useCallback(async (e) => {
        e.preventDefault();
        setDisabledBtn(true);
        await onSubmitCreate();
    }, [onSubmitCreate, setDisabledBtn]);

    return (
        <>
            <Container>
                <CustomBlockButton
                    type='button'
                    className='button-item'
                    style={{
                        background: 'var(--defaultModalCloseColor)'
                    }}
                    onClick={() => handleActionRouteToRev()}
                >
                    취소
                </CustomBlockButton>
                <CustomBlockButton
                    type='button'
                    className='button-item'
                    style={{
                        background: 'var(--mainColor)'
                    }}
                    onClick={(e) => handleSubmitConfirm(e)}
                    disabled={disabledBtn}
                >
                    확인
                </CustomBlockButton>
            </Container>
        </>
    );
}