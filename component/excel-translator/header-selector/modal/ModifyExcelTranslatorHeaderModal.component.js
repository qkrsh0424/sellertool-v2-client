import Image from "next/image";
import useDisabledBtn from "../../../../hooks/button/useDisabledBtn";
import SingleBlockButton from "../../../modules/button/SingleBlockButton";
import useModifyExcelTranslatorHeaderFormHook from "../hooks/useModifyExcelTranslatorHeaderFormHook";
import { Container } from "../styles/ModifyExcelTranslatorHeaderModal.styled";

export default function ModifyExcelTranslatorHeaderModalComponent({
    excelTranslatorHeader,
    onClose,
    onConfirm
}) {
    const {
        modifyExcelTranslatorHeaderForm,
        onChangeModifyExcelTranslatorHeaderFormValueOfName,
        checkHeaderNameFormatValid,
        checkRowStartNumberFormatValid
    } = useModifyExcelTranslatorHeaderFormHook({
        excelTranslatorHeader: excelTranslatorHeader
    });

    const [disabledBtn, setDisabledBtn] = useDisabledBtn();

    const __handle = {
        submit: {
            confirm: (e) => {
                e.preventDefault();
                setDisabledBtn(true);

                try {
                    checkHeaderNameFormatValid(modifyExcelTranslatorHeaderForm.uploadHeaderTitle, '업로드 엑셀 이름의 형식을 다시 확인해 주세요.\n[앞뒤 공백 제외 2-50자로 입력해 주세요.]');
                    checkHeaderNameFormatValid(modifyExcelTranslatorHeaderForm.downloadHeaderTitle, '다운로드 엑셀 이름의 형식을 다시 확인해 주세요.\n[앞뒤 공백 제외 2-50자로 입력해 주세요.]');
                    checkRowStartNumberFormatValid(modifyExcelTranslatorHeaderForm.rowStartNumber, '데이터 시작 행의 형식을 다시 확인해 주세요.\n[1-30의 숫자만 입력해 주세요.]');
                } catch (err) {
                    alert(err.message);
                    return;
                }

                onConfirm(modifyExcelTranslatorHeaderForm);
            }
        }
    }

    return (
        <>
            <Container>
                <div className='header-close-button-box'>
                    <button
                        type='button'
                        onClick={onClose}
                        className='header-close-button-el'
                    >
                        <div className='header-close-button-icon'>
                            <Image
                                loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                src='/images/icon/close_default_959eae.svg'
                                layout='responsive'
                                width={1}
                                height={1}
                                alt="close icon"
                                loading="lazy"
                            ></Image>
                        </div>
                    </button>
                </div>
                <div
                    className='title-box'
                >
                    <div className='title'>
                        엑셀 변환기를 <span className='accent-text'>수정</span>해 주세요.
                    </div>
                </div>
                <form onSubmit={(e) => __handle.submit.confirm(e)}>
                    <div className='content-group'>
                        <div className='content-box'>
                            <div className='input-box'>
                                <div className='input-label'>업로드 엑셀 이름</div>
                                <input
                                    type='text'
                                    className='input-el'
                                    name='uploadHeaderTitle'
                                    value={modifyExcelTranslatorHeaderForm?.uploadHeaderTitle || ''}
                                    onChange={(e) => onChangeModifyExcelTranslatorHeaderFormValueOfName(e)}
                                    placeholder="앞뒤 공백 제외 2-50자"
                                    required
                                ></input>
                            </div>
                        </div>
                        <div className='content-box'>
                            <div className='input-box'>
                                <div className='input-label'>다운로드 엑셀 이름</div>
                                <input
                                    type='text'
                                    className='input-el'
                                    name='downloadHeaderTitle'
                                    value={modifyExcelTranslatorHeaderForm?.downloadHeaderTitle || ''}
                                    onChange={(e) => onChangeModifyExcelTranslatorHeaderFormValueOfName(e)}
                                    placeholder="앞뒤 공백 제외 2-50자"
                                    required
                                ></input>
                            </div>
                        </div>
                        <div className='content-box'>
                            <div className='input-box'>
                                <div className='input-label'>데이터 시작 행 (헤더 번호)</div>
                                <input
                                    type='number'
                                    className='input-el'
                                    name='rowStartNumber'
                                    value={modifyExcelTranslatorHeaderForm?.rowStartNumber || ''}
                                    onChange={(e) => onChangeModifyExcelTranslatorHeaderFormValueOfName(e)}
                                    min={1}
                                    max={30}
                                    placeholder="1~30의 숫자"
                                    required
                                ></input>
                            </div>
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
        </>
    );
}