import { useRouter } from 'next/router';
import CustomBlockButton from '../../../../../../components/buttons/block-button/v1/CustomBlockButton';
import * as St from './FdFloatingButton.styled';
import useDisabledBtn from '../../../../../../hooks/button/useDisabledBtn';

export function FdFloatingButton({
    onSubmit
}) {
    const router = useRouter();
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();

    const handleCancel = () => {
        router.replace({
            pathname: '/excel-editor/translator'
        })
    }

    const handleSubmit = () => {
        setDisabledBtn(true);
        onSubmit();
    }

    return (
        <>
            <St.Container>
                <CustomBlockButton
                    type='button'
                    onClick={() => handleCancel()}
                >
                    취소
                </CustomBlockButton>
                <CustomBlockButton
                    type='button'
                    className='button-submit'
                    onClick={() => handleSubmit()}
                    disabled={disabledBtn}
                >
                    등록
                </CustomBlockButton>
            </St.Container>
        </>
    );
}