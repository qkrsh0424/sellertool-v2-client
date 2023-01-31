import { textAlign } from "@mui/system";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import useDisabledBtn from "../../../../../hooks/button/useDisabledBtn";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import CustomImage from "../../../../modules/image/CustomImage";
import CommonModalComponent from "../../../../modules/modal/CommonModalComponent";
import useProductOptionPackagesHook from "../../hooks/useProductOptionPackagesHook";
import { ButtonContainer, Container, ContentContainer, FlexBlock, LeftContentWrapper, ContentWrapper } from "../styles/ProductOptionPackageModal.styled";
import ProductOptionPackageSearchOptionModalComponent from "./ProductOptionPackageSearchOptionModal.component";

export default function ProductOptionPackageModalComponent({
    selectedOptionId,
    onReqFetchProductOptions,
    onClose
}) {
    // TODO: 모든 옵션 리스트 조회
    // TODO: 현재 선택된 옵션에 대한 옵션 패키지 리스트 조회하기
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();
    const workspaceRedux = useSelector(state => state.workspaceRedux);

    const {
        productOptionPackages,
        reqUpdateProductOptionPackages,
        onActionPushProductOptionPackage,
        onActionDeleteProductOptionPackage,
        onChangeProductOptionPackageTag,
        onChangeProductOptionPackageUnit,
        onChangeTargetOption,
        checkSubmitFormValid,
        getSubmitForm
    } = useProductOptionPackagesHook({
        selectedOptionId: selectedOptionId
    });
    const [searchOptionModalOpen, setSearchOptionModalOpen] = useState(false);
    const [selectedPackageIndex, setSelectedPackageIndex] = useState(null);

    const handleOpenSearchOptionModal = useCallback((index) => {
        setSelectedPackageIndex(index);
        setSearchOptionModalOpen(true);
    }, []);

    const handleCloseSearchOptionModal = useCallback(() => {
        setSearchOptionModalOpen(false);
        setSelectedPackageIndex(null);
    }, []);

    const handleSelectTargetOption = useCallback((optionId, optionCode) => {
        onChangeTargetOption(optionId, optionCode, selectedPackageIndex);
        handleCloseSearchOptionModal();
    }, [selectedPackageIndex, onChangeTargetOption]);

    const handleUpdateProductOptionPackages = async (e) => {
        e.preventDefault();

        if (!productOptionPackages || productOptionPackages?.length < 1) {
            await reqUpdateProductOptionPackages({
                body: {
                    productOptionId: selectedOptionId,
                    workspaceId: workspaceRedux?.workspaceInfo?.id,
                    productOptionPackages: []
                },
                successCallback: () => {
                    onReqFetchProductOptions();
                    onClose();
                }
            })
            return;
        }

        try {
            checkSubmitFormValid();
        } catch (err) {
            alert(err.message);
            return;
        }

        await reqUpdateProductOptionPackages({
            body: {
                productOptionId: selectedOptionId,
                workspaceId: workspaceRedux?.workspaceInfo?.id,
                productOptionPackages: getSubmitForm()
            },
            successCallback: () => {
                onReqFetchProductOptions();
                onClose();
            }
        })
    };

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
                <div className='title-box'>
                    <div className='title'>
                        <span className='accent-text'>옵션 패키지</span>를 설정해 주세요.
                    </div>
                </div>
                <form onSubmit={(e) => handleUpdateProductOptionPackages(e)}>
                    <ContentContainer>
                        <ContentWrapper>

                            <div className='item-list-wrapper'>
                                {productOptionPackages?.map((r, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className='body mgl-flex'
                                        >
                                            <div className='content-wrapper'>

                                                <div
                                                    className='content-item'
                                                    style={{
                                                        flex: 1
                                                    }}
                                                >
                                                    <div className='label'>패키지 태그</div>
                                                    <div className='input-box'>
                                                        <input
                                                            type='text'
                                                            value={r.tag || ''}
                                                            onChange={(e) => onChangeProductOptionPackageTag(e, index)}
                                                            className='input-item'
                                                        ></input>
                                                    </div>
                                                </div>
                                                <div className='mgl-flex'>
                                                    <div
                                                        className='content-item'
                                                        style={{
                                                            flex: 1
                                                        }}
                                                    >
                                                        <div className='label'>타겟 옵션코드</div>
                                                        <SingleBlockButton
                                                            type='button'
                                                            className='button-item'
                                                            onClick={() => handleOpenSearchOptionModal(index)}
                                                        >
                                                            {r.targetOptionCode ?? '타겟 옵션코드'}
                                                        </SingleBlockButton>
                                                    </div>
                                                    <div
                                                        className='content-item'
                                                        style={{
                                                            width: '80px'
                                                        }}
                                                    >
                                                        <div className='label'>수량</div>
                                                        <div className='input-box'>
                                                            <input
                                                                type='text'
                                                                value={r.unit || ''}
                                                                maxLength={3}
                                                                onChange={(e) => onChangeProductOptionPackageUnit(e, index)}
                                                                className='input-item'
                                                                style={{
                                                                    textAlign: 'center'
                                                                }}
                                                            ></input>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='delete-button-box'>
                                                <SingleBlockButton
                                                    type='button'
                                                    className='delete-button-item'
                                                    onClick={() => onActionDeleteProductOptionPackage(index)}
                                                >
                                                    <CustomImage
                                                        src='/images/icon/delete_default_e56767.svg'
                                                    />
                                                </SingleBlockButton>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className='add-button-box'>
                                <SingleBlockButton
                                    type='button'
                                    className='add-button-item'
                                    onClick={() => onActionPushProductOptionPackage()}
                                >
                                    <div className='icon-figure'>
                                        <CustomImage
                                            src='/images/icon/add_default_ffffff.svg'
                                        />
                                    </div>
                                </SingleBlockButton>
                            </div>
                        </ContentWrapper>
                    </ContentContainer>
                    <ButtonContainer>
                        <SingleBlockButton
                            type='button'
                            className='button-el'
                            style={{
                                background: '#959eae',
                                flex: 1
                            }}
                            onClick={() => onClose()}
                        >
                            취소
                        </SingleBlockButton>
                        <SingleBlockButton
                            type='submit'
                            className='button-el'
                            style={{
                                background: 'var(--mainColor)',
                                width: '60%'
                            }}
                            disabled={disabledBtn}
                        >
                            확인
                        </SingleBlockButton>
                    </ButtonContainer>
                </form>
            </Container>

            <CommonModalComponent
                open={searchOptionModalOpen}
                onClose={handleCloseSearchOptionModal}
            >
                <ProductOptionPackageSearchOptionModalComponent
                    productOptionPackages={productOptionPackages}
                    selectedPackageIndex={selectedPackageIndex}

                    onClose={handleCloseSearchOptionModal}
                    onActionSelectOptionId={handleSelectTargetOption}
                />
            </CommonModalComponent>
        </>
    );
}