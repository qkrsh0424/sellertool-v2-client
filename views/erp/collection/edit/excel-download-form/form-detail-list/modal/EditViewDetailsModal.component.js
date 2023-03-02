import _ from "lodash";
import { useEffect, useState } from "react";
import SingleBlockButton from "../../../../../../modules/button/SingleBlockButton";
import CustomImage from "../../../../../../modules/image/CustomImage";
import { ButtonContainer, Container, ContentWrapper, GridContainer } from "./EditViewDetailsModal.styled";

export default function EditViewDetailsModalComponent({
    targetFormDetail,
    refErpCollectionHeaders,
    onClose,
    onChangeViewDetails
}) {
    const [viewDetails, setViewDetails] = useState([]);

    useEffect(() => {
        if (!targetFormDetail) {
            return;
        }

        setViewDetails(_.cloneDeep(targetFormDetail?.viewDetails));
    }, [targetFormDetail]);

    const handleAddViewDetails = (viewDetail) => {
        if (viewDetails?.includes(viewDetail)) {
            setViewDetails(viewDetails?.filter(r => r !== viewDetail));
            return;
        }

        if (viewDetails?.length >= 5) {
            alert('최대 5개 까지 설정 가능합니다.');
            return;
        }

        setViewDetails([...viewDetails?.concat(viewDetail)]);
    }

    const handleSubmitSetViewDetails = (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (viewDetails?.length > 5) {
            alert('최대 5개 까지 설정 가능합니다.');
            return;
        }

        onChangeViewDetails(viewDetails, targetFormDetail?.id);
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
                <form onSubmit={(e) => handleSubmitSetViewDetails(e)}>
                    <ContentWrapper>
                        <GridContainer>
                            {refErpCollectionHeaders?.map((refErpCollectionHeader, index) => {
                                let isSelected = viewDetails?.includes(refErpCollectionHeader?.matchedFieldName);

                                return (
                                    <div
                                        key={index}
                                        className={`grid-item ${isSelected ? 'selected' : ''}`}
                                        onClick={() => handleAddViewDetails(refErpCollectionHeader?.matchedFieldName)}
                                    >
                                        {refErpCollectionHeader.originHeaderName}
                                    </div>
                                );
                            })}
                        </GridContainer>
                    </ContentWrapper>
                    <ButtonContainer>
                        <SingleBlockButton
                            type='button'
                            className='button-el'
                            style={{
                                background: '#959eae',
                                width: '40%'
                            }}
                            onClick={() => onClose()}
                        >
                            닫기
                        </SingleBlockButton>
                        <SingleBlockButton
                            type='submit'
                            className='button-el'
                            style={{
                                background: 'var(--mainColor)',
                                flex: 1
                            }}
                        >
                            확인
                        </SingleBlockButton>
                    </ButtonContainer>
                </form>
            </Container>
        </>
    );
}