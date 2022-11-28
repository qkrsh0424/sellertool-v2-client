import { useCallback, useEffect } from "react";
import useDisabledBtn from "../../../../../hooks/button/useDisabledBtn";
import valueUtils from "../../../../../utils/valueUtils";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import CustomImage from "../../../../modules/image/CustomImage";
import PagenationComponentStateV2 from "../../../../modules/pagenation/PagenationStateComponentV2";
import useProductOptionHook from "../../hooks/useProductOptionHook";
import useProdutOptionPageHook from "../../hooks/useProductOptionPageHook";
import { ButtonContainer, Container, ContentContainer, ContentWrapper, TargetOption } from "../styles/ProductOptionPackageSearchOptionModal.styled";

export default function ProductOptionPackageSearchOptionModalComponent({
    productOptionPackages,
    selectedPackageIndex,
    onClose,
    onActionSelectOptionId
}) {
    const {
        productOptionPage,
        pageable,
        searchQuery,
        reqFetchProductOptionPage,
        onChangePage,
        onChangeSize,
        onChangeSearchQuery
    } = useProdutOptionPageHook();
    const {
        productOption
    } = useProductOptionHook({
        productOptionId: productOptionPackages[selectedPackageIndex]?.targetOptionId
    });

    const [disabledBtn, setDisabledBtn] = useDisabledBtn();

    const handleSubmitFetchProductOptionPage = useCallback((e) => {
        e.preventDefault();
        setDisabledBtn(true);
        reqFetchProductOptionPage();
    }, [reqFetchProductOptionPage]);

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
                <ContentContainer>
                    {productOption &&
                        <TargetOption>
                            <div className='label'>현재 타겟 옵션</div>
                            <div className='target-info'>{productOption?.code}</div>
                            <div className='target-info'>{productOption?.productCategory?.name}&gt;{productOption?.productSubCategory?.name}&gt;{productOption?.product?.name}&gt;{productOption?.name}</div>
                        </TargetOption>
                    }
                    <ContentWrapper>
                        <form onSubmit={(e) => handleSubmitFetchProductOptionPage(e)}>
                            <div className='search-input-box'>
                                <input
                                    type='text'
                                    className='search-input-item'
                                    placeholder="검색어를 입력해 주세요."
                                    value={searchQuery || ''}
                                    onChange={(e) => onChangeSearchQuery(e)}
                                ></input>
                                <SingleBlockButton
                                    type='submit'
                                    className='search-button-item'
                                    disabled={disabledBtn}
                                >
                                    조회
                                </SingleBlockButton>
                            </div>
                        </form>
                        <div className='item-list-wrapper'>
                            <div className='item-list-box'>
                                {productOptionPage?.content?.map(productOption => {
                                    return (
                                        <div
                                            key={productOption.id}
                                            className='item-box'
                                            onClick={() => onActionSelectOptionId(productOption.id, productOption.code)}
                                        >
                                            <div className='option-info'>
                                                {productOption.code} / {productOption.name}
                                            </div>
                                            <div className='category-info'>
                                                {productOption?.productCategory?.name} / {productOption?.productSubCategory?.name} / {productOption?.product?.name}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className='pagenation-wrapper'>
                            <PagenationComponentStateV2
                                align={'center'}
                                pageIndex={productOptionPage?.number}
                                totalPages={productOptionPage?.totalPages}
                                isFirst={productOptionPage?.first}
                                isLast={productOptionPage?.last}
                                totalElements={productOptionPage?.totalElements}
                                sizeElements={[10, 20, 50]}
                                size={pageable?.size}
                                onChangePage={onChangePage}
                                onChangeSize={onChangeSize}
                            />
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
                        닫기
                    </SingleBlockButton>
                </ButtonContainer>
            </Container>
        </>
    );
}