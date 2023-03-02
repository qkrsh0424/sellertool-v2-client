import _ from "lodash";
import Image from "next/image";
import { useEffect, useState } from "react";
import useDisabledBtn from "../../../../../hooks/button/useDisabledBtn";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import useWorkspaceNameHook from "../../hooks/useWorkspaceNameHook";
import { Wrapper } from "../styles/ModifyWorkspaceNameModal.styled";

export default function ModifyWorkspaceNameModalComponent({
    workspace,
    onClose,
    onConfirm
}) {
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();
    const {
        workspaceName,
        onSetWorkspaceName,
        onCheckWorkspaceNameFormatValid
    } = useWorkspaceNameHook(null);

    useEffect(() => {
        if (workspace) {
            onSetWorkspaceName(_.cloneDeep(workspace.name));
            return;
        }
    }, [workspace])


    const __handle = {
        change: {
            workspaceName: (e) => {
                let value = e.target.value;

                onSetWorkspaceName(value);
            }
        },
        submit: {
            confirm: (e) => {
                e.preventDefault();
                setDisabledBtn(true);

                try {
                    onCheckWorkspaceNameFormatValid()
                    onConfirm(workspaceName);
                } catch (err) {
                    alert(err.message);
                    return;
                }
            }
        }
    }

    return (
        <>
            <Wrapper>
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
                <div className='title-box'>
                    <div className='title'>
                        변경할 <span style={{ color: 'var(--mainColor)' }}>워크스페이스 이름</span>을 지정해 주세요.
                    </div>
                </div>
                <form onSubmit={(e) => __handle.submit.confirm(e)}>
                    <div className='content-group'>
                        <div className='content-box'>
                            <div className='input-box'>
                                <input
                                    type='text'
                                    className='input-el'
                                    value={workspaceName || ''}
                                    placeholder="워크스페이스 이름 2-30자"
                                    onChange={(e) => __handle.change.workspaceName(e)}
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
                            disabled={disabledBtn}
                        >
                            완료
                        </SingleBlockButton>
                    </div>
                </form>
            </Wrapper>
        </>
    );
}