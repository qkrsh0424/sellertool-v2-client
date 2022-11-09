import Image from 'next/image';
import styled from 'styled-components';
import { BodyFieldWrapper, Container, HeadFieldWrapper } from './ProductDetail.styled';

export default function ProductDetailComponent(props) {
    if (!props.product) {
        return <Container></Container>;
    }

    return (
        <Container>
            <HeadFieldView />
            <BodyFieldView
                product={props.product}
            />
        </Container>
    );
}

function HeadFieldView() {
    return (
        <HeadFieldWrapper>
            <div className='head-title'>상품 상세 정보</div>
        </HeadFieldWrapper>
    );
}

function BodyFieldView({
    product
}) {
    return (
        <BodyFieldWrapper>
            <div className='flex-wrapper'>
                <div className='thumbnail-box'>
                    <Image
                        loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                        src={product.imageUrl}
                        layout={'responsive'}
                        width={1}
                        height={1}
                        objectFit={'cover'}
                        alt={'thumbnail image'}
                        loading={'lazy'}
                    />
                </div>
                <div className='default-content-box'>
                    <div className='info-box'>
                        <div className='title'>상품 코드</div>
                        <div className='content'>{product.code}</div>
                    </div>
                    <div className='info-box'>
                        <div className='title'>상품명</div>
                        <div className='content'>{product.defaultName}</div>
                    </div>
                    <div className='info-box'>
                        <div className='title'>상품 관리명</div>
                        <div className='content'>{product.managementName}</div>
                    </div>
                </div>
            </div>
            <div className='detail-content-box'>
                <div className='info-box'>
                    <div className='title'>메모1</div>
                    <div className='content'>{product.productInfo.memo1}</div>
                </div>
                <div className='info-box'>
                    <div className='title'>메모2</div>
                    <div className='content'>{product.productInfo.memo2}</div>
                </div>
                <div className='info-box'>
                    <div className='title'>메모3</div>
                    <div className='content'>{product.productInfo.memo3}</div>
                </div>
            </div>
        </BodyFieldWrapper>
    );
}