import { Dialog } from '@mui/material';
import Image from 'next/image';
import styled from 'styled-components';
import useDisabledBtn from '../../../hooks/button/useDisabledBtn';
import SingleBlockButton from '../button/SingleBlockButton';

const Container = styled.div`

`;

const CustomDialog = styled(Dialog)`
    .MuiPaper-root::-webkit-scrollbar{
        background: #e1e1e130;
        height:7px;
        width: 5px;
    }

    .MuiPaper-root::-webkit-scrollbar-track{
        border-radius: 10px;
    }
    .MuiPaper-root::-webkit-scrollbar-thumb{
        background-color: #00000020;
        border-radius: 10px;
    }

    .MuiBackdrop-root{
        background-color:${props => props.backgroundcolor ? props.backgroundcolor : 'inherit'};
    }

    .MuiPaper-rounded{
        border-radius: 15px;
    }
`;

const ContentContainer = styled.div`
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

            .message{
                text-align: center;
                font-weight: 600;
                font-size: 18px;
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

/**
 * 
 * @param {Object} props
 * @param {boolean} props.open
 * @param {boolean} props.fullWidth
 * @param {string} props.maxWidth [xs, sm, md, lg, xl]
 * @param {function} props.onClose
 * @returns 
 */
const ConfirmModalComponentV2 = ({
    open,
    fullWidth,
    backgroundColor,
    maxWidth,
    onClose,
    onConfirm,
    title,
    message,
    children
}) => {
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
            <CustomDialog
                open={open || false}
                fullWidth={fullWidth ?? true}
                maxWidth={maxWidth || 'xs'}
                onClose={() => onClose() || {}}
                backgroundcolor={backgroundColor || '#00000080'}
            >
                <ContentContainer>
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
                            {title || '확인메세지'}
                        </div>
                    </div>
                    <form onSubmit={(e) => __handle.submit.confirm(e)}>
                        {message &&
                            (

                                <div className='content-group'>
                                    <div className='content-box'>
                                        <div className='message'>
                                            {message}
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        {children &&
                            (
                                <>
                                    {children}
                                </>
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
                </ContentContainer>
            </CustomDialog>
        </>
    );
}
export default ConfirmModalComponentV2;