import Image from "next/image";
import useDisabledBtn from "../../../../../hooks/button/useDisabledBtn";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import { RemoveMemberModalWrapper } from "../styles/RemoveMemberModal.styled";

export default function RemoveMemberModalComponent({
    removeTargetMember,
    onClose,
    onConfirm
}) {
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();

    const __handle = {
        submit: {
            confirm: (e) => {
                e.preventDefault();
                setDisabledBtn(true);
                onConfirm();
            }
        }
    }
    return (
        <>
            <RemoveMemberModalWrapper>
                <div className='header-close-button-box'>
                    <button
                        type='button'
                        onClick={onClose}
                        className='header-close-button-el'
                    >
                        <div className='header-close-button-icon'>
                            <Image
                                loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                src='http://localhost:3000/images/icon/close_default_959eae.svg'
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
                        <span className='accent-text'>멤버제명</span>
                    </div>
                </div>
                <form onSubmit={(e) => __handle.submit.confirm(e)}>
                    <div className='content-group'>
                        <div className='content-box mgl-flex mgl-flex-justifyContent-center mgl-flex-alignItems-center'>
                            <div className='profile-figure'>
                                <Image
                                    loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                    src={removeTargetMember?.user?.profileImageUri || 'http://localhost:3000/images/icon/person_default_808080.svg'}
                                    layout='responsive'
                                    width={1}
                                    height={1}
                                    alt="close icon"
                                    loading="lazy"
                                ></Image>
                            </div>
                            <div className='username-text'>
                                {removeTargetMember?.user?.nickname}
                            </div>
                        </div>
                        <div className='content-box'>
                            <div className='description-text'>
                                해당 멤버를 정말로 제명 하시겠습니까?
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
                                background: 'var(--defaultRedColor)',
                                width: '60%'
                            }}
                            disabled={disabledBtn}
                        >
                            확인
                        </SingleBlockButton>
                    </div>
                </form>
            </RemoveMemberModalWrapper>
        </>
    );
}