import Image from "next/image";
import { useRef } from "react";
import useDisabledBtn from "../../../../../hooks/button/useDisabledBtn";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import { Container } from "../styles/ModifySubCategoryNameModal.styled";

export default function ModifySubCategoryNameModalComponent({
    productSubCategory,
    onClose,
    onConfirm
}) {
    const categoryNameRef = useRef();
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();

    const __handle = {
        submit: {
            confirm: (e) => {
                e.preventDefault();
                setDisabledBtn(true);

                let originName = productSubCategory.name;
                let currName = categoryNameRef.current.value;

                if (originName === currName) {
                    onClose();
                    return;
                }

                try {
                    __handle.check.nameFormatValid(currName);
                } catch (err) {
                    alert(err.message);
                    return;
                }

                onConfirm(currName);

            }
        },
        check: {
            nameFormatValid: (name) => {
                let spaceSearchRegex = /^(\s)|(\s)$/;

                if (name.search(spaceSearchRegex) !== -1) {
                    throw new Error('앞뒤 공백은 허용하지 않습니다.');
                }

                if (name.length < 2 || name.length > 20) {
                    throw new Error('최소 2자 이상 20자 이하로 입력해 주세요.');
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
                        서브 카테고리명을 <span style={{ color: 'var(--mainColor)' }}>수정</span>합니다.
                    </div>
                </div>
                <form onSubmit={(e) => __handle.submit.confirm(e)}>
                    <div className='content-group'>
                        <div className='content-box'>
                            <div className='input-box'>
                                <input
                                    ref={categoryNameRef}
                                    type='text'
                                    className='input-el'
                                    defaultValue={productSubCategory?.name || ''}
                                    placeholder='카테고리명을 입력하세요.'
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
                            변경
                        </SingleBlockButton>
                    </div>
                </form>
            </Container>
        </>
    );
}