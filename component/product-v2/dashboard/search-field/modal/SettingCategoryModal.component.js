import Image from "next/image";
import Link from "next/link";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import { Container, LinkButton } from "../styles/SettingCategory.styled";

export default function SettingCategoryModalComponent({
    onActionOpenModifyCategoryNameModal,
    onActionOpenDeleteCategoryModal,
    onClose
}) {
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
                        현재 선택된 카테고리를 <span style={{ color: 'var(--mainColor)' }}>수정</span>하거나 <span style={{ color: 'var(--defaultRedColor)' }}>삭제</span>합니다.
                    </div>
                </div>
                <div className='content-group'>
                    <SingleBlockButton
                        type='button'
                        className='link-button'
                        onClick={() => onActionOpenModifyCategoryNameModal()}
                    >
                        카테고리 수정
                    </SingleBlockButton>
                    <SingleBlockButton
                        type='button'
                        className='link-button'
                        style={{
                            color: 'var(--defaultRedColor)'
                        }}
                        onClick={() => onActionOpenDeleteCategoryModal()}
                    >
                        카테고리 삭제
                    </SingleBlockButton>
                </div>
            </Container>
        </>
    );
}