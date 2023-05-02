import useDisabledBtn from "../../../../hooks/button/useDisabledBtn";
import useProdutOptionPageHook from "../useProductOptionPageHook";
import { ContentContainer, ContentWrapper } from "../EditOptionCodeModal.styled";
import CustomBlockButton from "../../../buttons/block-button/v1/CustomBlockButton";
import PagenationComponentStateV2 from "../../../../views/modules/pagenation/PagenationStateComponentV2";
import { CustomDialog } from "../../../dialog/v1/CustomDialog";

export default function CustomSearchOptionCodesModal({
    open,
    onClose,
    onSelect,
}) {
    const {
        productOptionPage,
        searchQuery,
        reqFetchProductOptionPage,
        onChangeSearchQuery
    } = useProdutOptionPageHook();

    const [disabledBtn, setDisabledBtn] = useDisabledBtn();

    const handlePaging = (pageIndex) => {
        reqFetchProductOptionPage(pageIndex, productOptionPage.size);
    }

    const handleSubmitFetchProductOptionPage = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDisabledBtn(true);
        reqFetchProductOptionPage(1);
    };

    const handleSizing = (size) => {
        reqFetchProductOptionPage(1, size);
    }

    return (
        <>
            <CustomDialog
                open={open}
                onClose={() => onClose()}
            >
                <CustomDialog.CloseButton onClose={() => onClose()} />
                <ContentContainer>
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
                                <CustomBlockButton
                                    type='submit'
                                    className='search-button-item'
                                    disabled={disabledBtn}
                                >
                                    조회
                                </CustomBlockButton>
                            </div>
                        </form>
                        <div className='item-list-wrapper'>
                            <div className='item-list-box'>
                                {productOptionPage?.content?.map(productOption => {
                                    return (
                                        <div
                                            key={productOption.id}
                                            className='item-box'
                                            onClick={() => onSelect(productOption.code)}
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
                                size={productOptionPage?.size}
                                onChangePage={handlePaging}
                                onChangeSize={handleSizing}
                            />
                        </div>
                    </ContentWrapper>
                </ContentContainer>
                <CustomDialog.FooterButtonGroup>
                    <CustomDialog.FooterButton
                        type='button'
                        style={{
                            background: '#959eae',
                            color: '#fff',
                            flex: 1
                        }}
                        onClick={() => onClose()}
                    >
                        닫기
                    </CustomDialog.FooterButton>
                </CustomDialog.FooterButtonGroup>
            </CustomDialog>
        </>
    );
}