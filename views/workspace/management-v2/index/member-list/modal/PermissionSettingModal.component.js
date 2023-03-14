import Image from "next/image";
import useDisabledBtn from "../../../../../../hooks/button/useDisabledBtn";
import SingleBlockButton from "../../../../../modules/button/SingleBlockButton";
import { PermissionSettingModalWrapper } from "../styles/PermissionSettingModal.styled";

export default function PermissionSettingModalComponent({
    permissionTargetMember,
    onActionChangePermissionOfName,
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
        <PermissionSettingModalWrapper>
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
                    멤버의 <span className='accent-text'>권한</span>을 설정해 주세요.
                </div>
            </div>

            <form onSubmit={(e) => __handle.submit.confirm(e)}>
                <div className='content-group'>
                    <div className='content-title'>
                        워크스페이스
                    </div>
                    <div className='content-box mgl-flex mgl-flex-flexWrap-wrap'>
                        <SingleBlockButton
                            type='button'
                            className='permission-button-el'
                            name='readPermissionYn'
                            onClick={(e) => onActionChangePermissionOfName(e)}
                        >
                            읽기
                            {permissionTargetMember?.readPermissionYn === 'y' ?
                                <span className='permission-button-bulb permission-button-bulb-on'></span>
                                :
                                <span className='permission-button-bulb permission-button-bulb-off'></span>
                            }
                        </SingleBlockButton>
                        <SingleBlockButton
                            type='button'
                            className='permission-button-el'
                            name='writePermissionYn'
                            onClick={(e) => onActionChangePermissionOfName(e)}
                        >
                            쓰기
                            {permissionTargetMember?.writePermissionYn === 'y' ?
                                <span className='permission-button-bulb permission-button-bulb-on'></span>
                                :
                                <span className='permission-button-bulb permission-button-bulb-off'></span>
                            }
                        </SingleBlockButton>
                        <SingleBlockButton
                            type='button'
                            className='permission-button-el'
                            name='updatePermissionYn'
                            onClick={(e) => onActionChangePermissionOfName(e)}
                        >
                            수정
                            {permissionTargetMember?.updatePermissionYn === 'y' ?
                                <span className='permission-button-bulb permission-button-bulb-on'></span>
                                :
                                <span className='permission-button-bulb permission-button-bulb-off'></span>
                            }
                        </SingleBlockButton>
                        <SingleBlockButton
                            type='button'
                            className='permission-button-el'
                            name='deletePermissionYn'
                            onClick={(e) => onActionChangePermissionOfName(e)}
                        >
                            삭제
                            {permissionTargetMember?.deletePermissionYn === 'y' ?
                                <span className='permission-button-bulb permission-button-bulb-on'></span>
                                :
                                <span className='permission-button-bulb permission-button-bulb-off'></span>
                            }
                        </SingleBlockButton>
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
        </PermissionSettingModalWrapper>
    );
}