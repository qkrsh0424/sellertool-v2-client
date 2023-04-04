import Image from "next/image";
import { useRouter } from "next/router";
import SingleBlockButton from "../../../../../modules/button/SingleBlockButton";
import CustomImage from "../../../../../modules/image/CustomImage";
import useErpCollectionHeaders from "../hooks/useErpCollectionHeaders";
import { Container, ContentContainer, ItemBox } from "../styles/ViewHeadersModal.styled";

export default function ViewHeadersModalComponent({
    erpCollectionHeader,
    onClose,
    onActionSelectHeaderId
}) {
    const router = useRouter();
    const {
        erpCollectionHeaders
    } = useErpCollectionHeaders();

    const handleClickSettingButton = (e, erpCollectionHeaderId) => {
        e.stopPropagation();
        router.push({
            pathname: '/erp/collection/edit/view-header',
            query: {
                erpCollectionHeaderId: erpCollectionHeaderId
            }
        })
    }

    const handleSelectHeader = (headerId) => {
        onActionSelectHeaderId(headerId);
        onClose();
    }

    return (
        <>
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
                        뷰헤더 선택
                    </div>
                </div>
                <ContentContainer>
                    {erpCollectionHeaders?.map(r => {
                        return (
                            <ItemBox
                                key={r.id}
                                onClick={() => handleSelectHeader(r.id)}
                                style={{
                                    border: erpCollectionHeader?.id === r.id ? '1px solid var(--mainColor)' : ''
                                }}
                            >
                                <div>
                                    <div className='name'>{r.name}</div>
                                    <div className='description'>{r.description || '지정된 설명이 없습니다.'}</div>
                                </div>
                                <div className='mgl-flex'>
                                    <SingleBlockButton
                                        type='button'
                                        className='icon-button-item'
                                        onClick={(e) => handleClickSettingButton(e, r.id)}
                                    >
                                        <CustomImage
                                            src='/images/icon/settings_default_808080.svg'
                                        />
                                    </SingleBlockButton>
                                </div>
                            </ItemBox>
                        );
                    })}
                </ContentContainer>
            </Container>
        </>
    );
}