import Image from "next/image";
import Link from "next/link";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import { Container, LinkButton } from "../styles/SettingSubCategory.styled";

export default function SettingSubCategoryModalComponent({
    onActionOpenModifySubCategoryNameModal,
    onActionOpenDeleteSubCategoryModal,
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
                        서브 카테고리 수정 및 삭제
                    </div>
                </div>
                <div className='content-group'>
                    <SingleBlockButton
                        type='button'
                        className='link-button'
                        onClick={() => onActionOpenModifySubCategoryNameModal()}
                    >
                        수정
                    </SingleBlockButton>
                    <SingleBlockButton
                        type='button'
                        className='link-button'
                        style={{
                            color: 'var(--defaultRedColor)'
                        }}
                        onClick={() => onActionOpenDeleteSubCategoryModal()}
                    >
                        삭제
                    </SingleBlockButton>
                </div>
            </Container>
        </>
    );
}