import { CustomDialog } from "../../../../../components/dialog/v1/CustomDialog";
import useDisabledBtn from "../../../../../hooks/button/useDisabledBtn";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import { Container } from "../styles/UpdateMarginRecordModal.styled";

export default function UpdateMarginRecordModalComponent({
    open,
    onClose,
    onConfirm,

    marginRecordForm,
    onChangeValueOfName
}) {
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();

    const handleSubmit = (e) => {
        e.preventDefault();
        setDisabledBtn(true);
        onConfirm();
    }
    return (
        <>
            <CustomDialog
                open={open}
                onClose={() => onClose()}
            >
                <CustomDialog.CloseButton onClose={() => onClose()} />
                <CustomDialog.Title>마진 레코드 <span style={{ color: 'var(--mainColor)' }}>저장</span></CustomDialog.Title>
                <Container>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className='content-group'>
                            <div className='content-box'>
                                <input
                                    type='text'
                                    className='input-item'
                                    placeholder="(필수) 레코드명 [2-50자]"
                                    name='name'
                                    value={marginRecordForm?.name || ''}
                                    onChange={(e) => onChangeValueOfName(e)}
                                    style={{
                                        flex: 1
                                    }}
                                    maxLength={50}
                                    required
                                ></input>
                            </div>
                            <div className='content-box'>
                                <input
                                    type='text'
                                    className='input-item'
                                    placeholder="(선택) 관리태그 [50자 이내]"
                                    name='tag'
                                    value={marginRecordForm?.tag || ''}
                                    onChange={(e) => onChangeValueOfName(e)}
                                    style={{
                                        flex: 1
                                    }}
                                    maxLength={50}
                                ></input>
                            </div>
                        </div>
                        <div className='button-group'>
                            <SingleBlockButton
                                type='button'
                                className='button-el'
                                style={{
                                    background: '#959eae',
                                    flex: 1
                                }}
                                onClick={() => onClose()}
                            >
                                취소
                            </SingleBlockButton>
                            <SingleBlockButton
                                type='submit'
                                className='button-el'
                                style={{
                                    background: 'var(--mainColor)',
                                    width: '60%'
                                }}
                                disabled={disabledBtn}
                            >
                                확인
                            </SingleBlockButton>
                        </div>
                    </form>
                </Container>
            </CustomDialog>
        </>
    );
}