import Image from 'next/image';
import styled from 'styled-components';

const Container = styled.div`
    margin-top: 40px;
`;

const HeadFieldWrapper = styled.div`
    .head-title{
        font-size: 21px;
        font-weight: 500;
    }
`;

const BodyFieldWrapper = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: row;

    @media all and (max-width: 992px){
        flex-direction: column;
    }

    .thumbnail-box{
        width: 15%;
        /* margin-left: auto;
        margin-right: auto; */
        border-radius: 5px;
        overflow: hidden;
        border: 3px double #e1e1e1;
        @media all and (max-width: 992px){
            width: 50%;
        }
    }

    .content-box{
        flex:1;
    }

    .flex-wrapper{
        display: flex;

        @media all and (max-width: 992px){
            flex-direction: column;
            margin: 0;
        }
    }

    .info-box{
        flex:1;
        border-bottom: 1px solid #e0e0e0;
        padding:10px 0;
        margin: 0 10px;

        @media all and (max-width: 992px){
            margin: 0;
        }
    }

    .info-box .title{
        font-size: 16px;
        font-weight: 500;
    }

    .info-box .content{
        margin-top: 5px;
        font-size: 14px;
    }
`;

export default function ProductDetailComponent(props) {
    if (!props.product) {
        return null;
    }

    return (
        <Container>
            <HeadFieldWrapper>
                <div className='head-title'>상품 상세 정보</div>
            </HeadFieldWrapper>
            <BodyFieldWrapper>
                <div className='thumbnail-box'>
                    <Image
                        loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                        src={props.product.imageUrl}
                        layout={'responsive'}
                        width={1}
                        height={1}
                        objectFit={'cover'}
                        alt={'thumbnail image'}
                        loading={'lazy'}
                    />
                </div>
                <div className='content-box'>
                    <div className='flex-wrapper'>
                        <div className='info-box'>
                            <div className='title'>상품 코드</div>
                            <div className='content'>{props.product.code}</div>
                        </div>
                        <div className='info-box'>
                            <div className='title'>상품명</div>
                            <div className='content'>{props.product.defaultName}</div>
                        </div>
                        <div className='info-box'>
                            <div className='title'>상품 관리명</div>
                            <div className='content'>{props.product.managementName}</div>
                        </div>
                    </div>
                    <div className='flex-wrapper'>
                        <div className='info-box'>
                            <div className='title'>메모1</div>
                            <div className='content'>{props.product.productInfo.memo1}</div>
                        </div>
                        <div className='info-box'>
                            <div className='title'>메모2</div>
                            <div className='content'>{props.product.productInfo.memo2}</div>
                        </div>
                        <div className='info-box'>
                            <div className='title'>메모3</div>
                            <div className='content'>{props.product.productInfo.memo3}</div>
                        </div>
                    </div>
                </div>
            </BodyFieldWrapper>
        </Container>
    );
}