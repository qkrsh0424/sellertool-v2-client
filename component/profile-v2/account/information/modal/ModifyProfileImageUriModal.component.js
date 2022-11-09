import Image from "next/image";
import useDisabledBtn from "../../../../../hooks/button/useDisabledBtn";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import { Container } from "../styles/ModifyProfileImageUriModal.styled";

export default function ModifyProfileImageUriModalComponent({
    onClose,
    onConfirm
}) {
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();

    const __handle = {
        submit: {
            confirm: (e) => {
                e.preventDefault();
                setDisabledBtn(true);
                try {
                    onConfirm();
                } catch (err) {
                    alert(err.message);
                    return;
                }
            }
        }
    }
    return (
        <>
            <Container>
                <div className='header-close-button-box'>
                    <button
                        type='button'
                        onClick={() => onClose()}
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
                        수정하실 회원님의 <span className='accent-text'>프로필 이미지</span>를 선택해 주세요.
                    </div>
                </div>
                {/* <div className='content-group'>
                    <div className='content-box'>
                        <input
                            type='text'
                            className='input-item'
                            placeholder="이름"
                            value={modifyName || ''}
                            onChange={(e) => onChangeModifyName(e)}
                        ></input>
                    </div>
                </div> */}
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
                </div>
            </Container>
        </>
    );
}