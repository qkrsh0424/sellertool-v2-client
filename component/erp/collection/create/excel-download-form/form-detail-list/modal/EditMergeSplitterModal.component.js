import SingleBlockButton from "../../../../../../modules/button/SingleBlockButton";
import CustomImage from "../../../../../../modules/image/CustomImage";
import { Container, ContentWrapper } from "./EditMergeSplitterModal.styled";

export default function EditMergeSplitterModalComponent({
    targetFormDetail,
    splitters,
    onClose,
    onChangeMergeSplitter
}) {
    const handleChangeSplitter = (value) => {
        onChangeMergeSplitter(value, targetFormDetail.id);
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
                                        className={`button-item ${splitter === targetFormDetail?.mergeSplitter ? 'button-item-active' : ''}`}
                                        onClick={() => handleChangeSplitter(splitter)}
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
                                        className={`button-item ${splitter === targetFormDetail?.mergeSplitter ? 'button-item-active' : ''}`}
                                        onClick={() => handleChangeSplitter(splitter)}
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