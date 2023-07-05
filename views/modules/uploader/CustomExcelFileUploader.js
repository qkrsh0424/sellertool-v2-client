import { useRef, useState } from "react";
import CommonModalComponent from "../modal/CommonModalComponent";
import styled from 'styled-components';
import Image from "next/image";
import SingleBlockButton from "../button/SingleBlockButton";
import useDisabledBtn from "../../../hooks/button/useDisabledBtn";
import useExcelUploaderHook from "../../../hooks/uploader/useExcelUploaderHook";
import _ from "lodash";
import { customBackdropController } from "../../../components/backdrop/default/v1";

const Container = styled.div`
    background: var(--defaultBackground);
    
    .header-close-button-box{
        display: flex;
        justify-content: flex-end;
        padding: 20px 20px 0 20px;

        .header-close-button-el{
            user-select: none;
            -webkit-tap-highlight-color: #00000000;
            width:40px;
            height: 40px;
            padding: 0;
            margin:0;
            border:none;
            background:none;
            cursor: pointer;

            .header-close-button-icon{
                width:100%;
                height: 100%;
            }
        }
    }

    .title-box{
        padding: 0 20px;

        .title{
            border-bottom: 1px solid #000;
            font-size: 20px;
            font-weight: 400;
            color:#303030;
            padding-bottom: 20px;

            .accent-text{
                color:var(--mainColor);
            }
        }
    }

    .content-group{
        padding: 0 20px;

        
        .content-box{
            margin-top: 40px;
            background: #fff;
            border-radius: 15px;
            box-shadow: var(--defaultBoxShadow);
            overflow: hidden;
            
            .content-title{
                padding: 10px 20px;
                background-color: #eef2f9;
                color: #404040;
                font-size: 16px;
                font-weight: 500;
            }

            .input-box{
                padding: 20px;
                flex:1;

                .input-label{
                    font-size: 10px;
                    margin-bottom: 2px;
                    color: #808080;
                }

                .input-el{
                    width:100%;
                    box-sizing: border-box;
                    padding: 15px 10px;
                    font-size: 14px;
                    border:1px solid #e0e0e0;
                    border-radius: 5px;
                    flex:1;
                    outline:none;

                    &:focus{
                        border:1px solid var(--mainColor);
                        box-shadow: var(--defaultBoxShadow);
                    }

                    &:read-only{
                        cursor: default;
                        border: 1px solid #e0e0e0;
                        box-shadow: none;
                    }
                }

                .select-button{
                    margin:0;
                    padding:0;
                    width:100%;
                    height: 48px;
                    border-radius: 5px;
                    border: 1px solid #f0f0f0;
                    box-shadow: var(--defaultBoxShadow);
                }

                .fileName{
                    margin-top: 10px;
                    font-size: 14px;
                    font-weight: 500;
                }
            }

        }
    }



    .button-group{
        margin-top: 40px;
        display: flex;

        .button-el{
            margin:0;
            padding:0;
            height: 48px;
            border:none;
            color:#fff;
            font-size: 18px;
            font-weight: 500;
        }
    }
`;

export default function CustomExcelFileUploader({
    open,
    onClose,
    onConfirm
}) {
    const uploaderRef = useRef();
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();
    const [formData, setFormData] = useState(null);
    const [rowStartNumber, setRowStartNumber] = useState('1');
    const [passwordModeOpen, setPasswordModeOpen] = useState(false);
    const [filePassword, setFilePassword] = useState('');
    const customBackdropControl = customBackdropController();

    const {
        reqCheckValid
    } = useExcelUploaderHook();

    const __handle = {
        action: {
            openUploader: (e) => {
                e.preventDefault();
                uploaderRef.current.click();
            }
        },
        change: {
            filePassword: (e) => {
                let value = e.target.value;

                setFilePassword(value);
            },
            rowStartNumber: (e) => {
                let value = e.target.value;

                setRowStartNumber(value);
            }
        },
        submit: {
            selectFile: async (e) => {
                e.preventDefault();
                setDisabledBtn(true);

                // 파일을 선택하지 않은 경우
                if (e.target.files.length === 0) return;

                let addFiles = e.target.files;

                var uploadedFormData = new FormData();
                uploadedFormData.append('file', addFiles[0]);
                customBackdropControl.showBackdrop();
                let data = await reqCheckValid(uploadedFormData);
                customBackdropControl.hideBackdrop();
                if (!data) {
                    return;
                }

                if (data === 'need_password') {
                    alert('암호화된 파일 입니다. 파일의 비밀번호를 입력해 주세요.');
                    setFilePassword('');
                    setPasswordModeOpen(true);
                } else {
                    setFilePassword('');
                    setPasswordModeOpen(false);
                }

                setFormData(uploadedFormData);
            },
            confirm: (e) => {
                e.preventDefault();
                setDisabledBtn(true);

                if (!formData?.get('file')) {
                    alert('파일을 선택해 주세요.');
                    return;
                }

                if (rowStartNumber < 1 || rowStartNumber > 100) {
                    alert('데이터 시작 행은 1-100 사이의 숫자로만 입력해 주세요.');
                    return;
                }

                if (passwordModeOpen && !filePassword) {
                    alert('파일의 비밀번호를 입력해 주세요.');
                    return;
                }


                let newFormData = new FormData();
                newFormData.append('file', formData?.get('file'));
                newFormData.append('rowStartNumber', rowStartNumber);

                if (passwordModeOpen) {
                    newFormData.set('filePassword', filePassword);
                }

                onConfirm({
                    formData: newFormData
                });
            }
        }
    }

    return (
        <>
            <CommonModalComponent
                open={open}

                onClose={typeof (onClose) === 'function' ? () => onClose() : () => { ; }}
            >
                <Container>
                    <div className='header-close-button-box'>
                        <button
                            type='button'
                            onClick={typeof (onClose) === 'function' ? () => onClose() : () => { ; }}
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
                            엑셀 파일을 <span className='accent-text'>업로드</span>해 주세요.
                        </div>
                    </div>
                    <form onSubmit={(e) => __handle.submit.confirm(e)}>
                        <div className='content-group'>
                            <div className='content-box'>
                                <div className='content-title'>
                                    엑셀 파일
                                </div>
                                <div className='input-box'>
                                    <SingleBlockButton
                                        type='button'
                                        className='select-button'
                                        onClick={(e) => __handle.action.openUploader(e)}
                                        disabled={disabledBtn}
                                    >
                                        파일 선택
                                    </SingleBlockButton>
                                    <div className='fileName'>
                                        {formData?.get('file')?.name || ''}
                                    </div>
                                    <input
                                        ref={uploaderRef}
                                        type="file"
                                        accept=".xls,.xlsx"
                                        onClick={(e) => e.target.value = ''}
                                        onChange={(e) => __handle.submit.selectFile(e)}
                                        hidden
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='content-group'>
                            <div className='content-box'>
                                <div className='content-title'>
                                    데이터 시작 행
                                </div>
                                <div className='input-box mgl-flex'>
                                    <input
                                        type='number'
                                        className='input-el'
                                        value={rowStartNumber || ''}
                                        onChange={(e) => __handle.change.rowStartNumber(e)}
                                        placeholder="데이터 시작 행 1-100 숫자"
                                        min={1}
                                        max={100}
                                    ></input>
                                </div>
                            </div>
                        </div>
                        {passwordModeOpen &&
                            (
                                <div className='content-group'>
                                    <div className='content-box'>
                                        <div className='content-title'>
                                            비밀번호
                                        </div>
                                        <div className='input-box mgl-flex'>
                                            <input
                                                type='password'
                                                className='input-el'
                                                value={filePassword || ''}
                                                onChange={(e) => __handle.change.filePassword(e)}
                                                placeholder="파일 비밀번호"
                                            ></input>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
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
            </CommonModalComponent>
        </>
    );
}