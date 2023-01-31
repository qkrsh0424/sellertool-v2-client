import Image from "next/image";
import { Container } from "../styles/LoadExistingModal.styled";

export default function LoadExistingModalComponent({
    excelTranslatorHeaders,
    onClose,
    onActionSelectExistingHeaderDetail
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
                        기존에 저장된 엑셀 양식을 불러옵니다.
                    </div>
                </div>
                <div className='content-group'>
                    {excelTranslatorHeaders?.map(r => {
                        return (
                            <div
                                key={r.id}
                                className='content-box'
                                onClick={() => {
                                    onActionSelectExistingHeaderDetail(r);
                                    onClose();
                                }}
                            >
                                <div>
                                    [ {r.uploadHeaderTitle} &gt; {r.downloadHeaderTitle} ] 의 <span style={{ color: 'var(--mainColor)', fontWeight: '600' }}>{r.downloadHeaderTitle}</span>
                                </div>
                                <div className='header-count'>
                                    헤더 개수: {r.downloadHeaderDetail?.details ? r.downloadHeaderDetail?.details?.length : 0}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Container>
        </>
    );
}