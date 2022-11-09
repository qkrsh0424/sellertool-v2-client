import Image from 'next/image';
import { BodyFieldWrapper, Container, HeadFieldWrapper } from './OptionDetail.styled';

export default function OptionDetailComponent(props) {
    if (!props.option) {
        return <Container></Container>;
    }

    return (
        <Container>
            <HeadFieldView />
            <BodyFieldView
                option={props.option}
            />
        </Container>
    );
}

function HeadFieldView() {
    return (
        <HeadFieldWrapper>
            <div className='head-title'>옵션 상세 정보</div>
        </HeadFieldWrapper>
    );
}

function BodyFieldView({
    option
}) {
    return (
        <BodyFieldWrapper>
            <div className='flex-wrapper'>
                <div className='thumbnail-box'>
                    <Image
                        loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                        src={option.imageUrl}
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
                        <div className='title'>옵션 코드</div>
                        <div className='content'>{option.code}</div>
                    </div>
                    <div className='info-box'>
                        <div className='title'>옵션명</div>
                        <div className='content'>{option.defaultName}</div>
                    </div>
                    <div className='info-box'>
                        <div className='title'>옵션 관리명</div>
                        <div className='content'>{option.managementName}</div>
                    </div>
                </div>
            </div>
            <div className='detail-content-box'>
                <div className='info-box'>
                    <div className='title'>상태</div>
                    <div className='content'>{option.optionInfo.status}</div>
                </div>
                <div className='info-box'>
                    <div className='title'>판매 단가</div>
                    <div className='content'>{option.optionInfo.salesPrice}</div>
                </div>
                <div className='info-box'>
                    <div className='title'>메모1</div>
                    <div className='content'>{option.optionInfo.memo1}</div>
                </div>
                <div className='info-box'>
                    <div className='title'>메모2</div>
                    <div className='content'>{option.optionInfo.memo2}</div>
                </div>
                <div className='info-box'>
                    <div className='title'>메모3</div>
                    <div className='content'>{option.optionInfo.memo3}</div>
                </div>
            </div>
        </BodyFieldWrapper>
    );
}