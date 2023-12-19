import { useRouter } from 'next/router';
import CustomBlockButton from '../../../../../../components/buttons/block-button/v1/CustomBlockButton';
import * as St from './FdFloatingButton.styled';

export function FdFloatingButton({
    onSubmit
}) {
    const router = useRouter();

    const handleCancel = () => {
        router.replace({
            pathname: '/excel-editor/translator'
        })
    }

    const handleSubmit = () => {
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
                >
                    등록
                </CustomBlockButton>
            </St.Container>
        </>
    );
}