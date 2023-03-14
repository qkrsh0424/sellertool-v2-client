import Image from "next/image";
import useDisabledBtn from "../../../../../../hooks/button/useDisabledBtn";
import SingleBlockButton from "../../../../../modules/button/SingleBlockButton";
import useInviteMemberFormHook from "../../hooks/useInviteMemberFormHook";
import { Container } from "../styles/InviteMemberModal.styled";

export default function InviteMemberModalComponent({
    onClose,
    onConfirm
}) {
    const {
        inviteMemberForm,
        onChangeInviteMemberFormValueOfName
    } = useInviteMemberFormHook();

    const [disabledBtn, setDisabledBtn] = useDisabledBtn();

    const __handle = {
        submit: {
            confirm: (e) => {
                e.preventDefault();
                setDisabledBtn(true);
                onConfirm({
                    inviteMemberForm: inviteMemberForm
                });
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
                        <span className='accent-text'>멤버를 초대하고</span> 워크스페이스를 공유해 보세요.
                    </div>
                </div>
                <form onSubmit={(e) => __handle.submit.confirm(e)}>
                    <div className='content-group'>
                        <div className='content-box'>
                            <input
                                type='text'
                                className='input-item'
                                name='username'
                                value={inviteMemberForm.username || ''}
                                onChange={(e) => onChangeInviteMemberFormValueOfName(e)}
                                placeholder={'유저 아이디를 입력해주세요.'}
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
        </>
    );
}