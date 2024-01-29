import CustomBlockButton from '../../../../../../components/buttons/block-button/v1/CustomBlockButton';
import * as St from './FdMode.styled';

export function FdMode({
    mode,
    onChangeMode
}) {
    return (
        <>
            <St.Container>
                <St.Wrapper>
                    <St.Title>모드 선택</St.Title>
                    <div className='buttonGroup'>
                        <CustomBlockButton
                            type='button'
                            className={`${mode === 'EDIT' ? 'buttonGroup__editButton-isActive' : ''}`}
                            onClick={() => onChangeMode('EDIT')}
                        >
                            수정
                        </CustomBlockButton>
                        <div className='buttonGroup__orTag'>
                            or
                        </div>
                        <CustomBlockButton
                            type='button'
                            className={`${mode === 'DELETE' ? 'buttonGroup__deleteButton-isActive' : ''}`}
                            onClick={() => onChangeMode('DELETE')}
                        >
                            삭제
                        </CustomBlockButton>
                    </div>
                </St.Wrapper>
            </St.Container>
        </>
    );
}