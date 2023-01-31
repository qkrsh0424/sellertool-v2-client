import SingleBlockButton from "../../../../../../modules/button/SingleBlockButton";
import CustomImage from "../../../../../../modules/image/CustomImage";
import { Container, ContentWrapper } from "./EditValueSplitterModal.styled";

export default function EditValueSplitterModalComponent({
    targetFormDetail,
    splitters,
    onClose,
    onChangeValueSplitter
}) {
    const handleChangeValueSplitter = (value) => {
        onChangeValueSplitter(value, targetFormDetail.id);
        onClose();
    }
    return (
        <>
            <Container>
                <div className='header-close-button-box'>
                    <button
                        type='button'
                        className='header-close-button-el'
                        onClick={() => onClose()}
                    >
                        <CustomImage
                            src='/images/icon/close_default_959eae.svg'
                        />
                    </button>
                </div>
                <ContentWrapper>
                    {splitters?.map(splitter => {
                        switch (splitter) {
                            case '\n':
                            case '\t':
                            case ' ':
                                return (
                                    <SingleBlockButton
                                        key={splitter}
                                        type='button'
                                        className={`button-item ${splitter === targetFormDetail?.valueSplitter ? 'button-item-active' : ''}`}
                                        onClick={() => handleChangeValueSplitter(splitter)}
                                    >
                                        {splitter === '\n' &&
                                            <>
                                                <span>줄바꿈</span>
                                            </>
                                        }
                                        {splitter === '\t' &&
                                            <>
                                                <span>들여쓰기</span>
                                            </>
                                        }
                                        {splitter === ' ' &&
                                            <>
                                                <span>띄어쓰기</span>
                                            </>
                                        }
                                    </SingleBlockButton>
                                );
                            default:
                                return (
                                    <SingleBlockButton
                                        key={splitter}
                                        type='button'
                                        className={`button-item ${splitter === targetFormDetail?.valueSplitter ? 'button-item-active' : ''}`}
                                        onClick={() => handleChangeValueSplitter(splitter)}
                                    >
                                        <span>{splitter}</span>
                                    </SingleBlockButton>
                                );
                        }
                    })}
                </ContentWrapper>
            </Container>
        </>
    );
}