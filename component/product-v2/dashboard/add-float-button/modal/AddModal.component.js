import Image from "next/image";
import Link from "next/link";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import { Container, LinkButton } from "../styles/AddModal.styled";

export default function AddModalComponent({
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
                        추가할 대상을 선택해 주세요.
                    </div>
                </div>
                <div className='content-group'>
                    <Link
                        href='/product/add-category'
                        passHref
                    >
                        <a>
                            <SingleBlockButton
                                className='link-button'
                            >
                                카테고리 추가
                            </SingleBlockButton>
                        </a>
                    </Link>
                    <Link
                        href='/product/add-product'
                        passHref
                    >
                        <a>
                            <SingleBlockButton
                                className='link-button'
                            >
                                상품 추가
                            </SingleBlockButton>
                        </a>
                    </Link>
                </div>
            </Container>
        </>
    );
}