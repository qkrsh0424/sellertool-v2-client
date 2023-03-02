import Image from "next/image";
import { useState } from "react";
import SingleBlockButton from "../../../modules/button/SingleBlockButton";
import { Container } from "../styles/WorkspaceCreateModal.styled";

export default function WorkspaceCreateModalComponent({
    onClose,
    onConfirm
}) {
    const [workspaceName, setWorkspaceName] = useState('');

    const __handle = {
        submit: {
            confirm: (e) => {
                e.preventDefault();
                onConfirm(workspaceName);
            }
        },
        change: {
            workspaceName: (e) => {
                let value = e.target.value;

                setWorkspaceName(value);
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
                <form onSubmit={(e) => __handle.submit.confirm(e)}>
                    <div className='content-group'>
                        <div className='title'>
                            생성할 <span style={{ color: 'var(--mainColor)' }}>워크스페이스 이름</span>을 지정해 주세요.
                        </div>
                        <div className='content-box'>
                            <div className='input-box'>
                                <input
                                    type='text'
                                    className="input-el"
                                    placeholder="워크스페이스 이름 2-30자"
                                    onChange={(e) => __handle.change.workspaceName(e)}
                                    value={workspaceName || ''}
                                    maxLength={30}
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
                            onClick={onClose}
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
                        // disabled={disabledBtn}
                        >
                            생성
                        </SingleBlockButton>
                    </div>
                </form>
            </Container>
        </>
    );
}