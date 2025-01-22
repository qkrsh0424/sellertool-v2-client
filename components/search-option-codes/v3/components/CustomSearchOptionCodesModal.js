import useDisabledBtn from "../../../../hooks/button/useDisabledBtn";
import { useProdutOptionPageHook } from "../hooks";
import { ContentContainer, ContentWrapper } from "../styles";
import CustomBlockButton from "../../../buttons/block-button/v1/CustomBlockButton";
import PagenationComponentStateV2 from "../../../../views/modules/pagenation/PagenationStateComponentV2";
import { CustomDialog } from "../../../dialog/v1/CustomDialog";
import { useEffect, useRef, useState } from "react";
import CustomImage from "../../../../views/modules/image/CustomImage";
import { InventoryDataConnect } from "../../../../data_connect/inventoryDataConnect";
import { useSelector } from "react-redux";
import { customToast } from "../../../toast/custom-react-toastify/v1";

export function CustomSearchOptionCodesModal({
    open,
    initialSearchQuery,
    onClose,
    onSelect,
}) {
    const wsId = useSelector(state => state?.workspaceRedux?.workspaceInfo?.id);
    const paperRef = useRef(null);

    const {
        productOptionPage,
        searchQuery,
        reqFetchProductOptionPage,
        onChangeSearchQuery
    } = useProdutOptionPageHook({ initialSearchQuery: initialSearchQuery || null });

    const [stockDatas, setStockDatas] = useState([]);
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();

    useEffect(() => {
        if (!wsId || !productOptionPage) {
            return;
        }

        handleReqFetchInventoryStocks();
    }, [wsId, productOptionPage]);

    const handlePaging = (pageIndex) => {
        reqFetchProductOptionPage(pageIndex, productOptionPage.size);
        if (paperRef.current) {
            paperRef.current.scrollTop = 0;
        }
    }

    const handleSizing = (size) => {
        reqFetchProductOptionPage(1, size);
        if (paperRef.current) {
            paperRef.current.scrollTop = 0;
        }
    }

    const handleReqFetchInventoryStocks = async () => {
        const body = {
            productOptionIds: productOptionPage?.content?.map(productOption => productOption.id)
        }

        const fetchResult = await InventoryDataConnect.Common().searchList({ body, headers: { wsId: wsId } })
            .then(res => {
                return res?.status === 200 ? { res: res, content: res?.data?.data } : { res: res, content: null }
            })
            .catch(err => {
                customToast.error(err?.response?.data?.memo || '에러가 발생했습니다.');
                return null;
            });


        if (fetchResult?.content) {
            setStockDatas(fetchResult?.content);
        }
    }

    const handleSubmitFetchProductOptionPage = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDisabledBtn(true);
        reqFetchProductOptionPage(1);
    };

    return (
        <>
            <CustomDialog
                open={open}
                onClose={() => onClose()}
                backgroundColor={'#fff'}
                paperRef={paperRef}
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
                                    const stockData = stockDatas?.find(stock => stock.productOptionId === productOption.id);
                                    const isMinusStocks = !stockData?.stockUnit || stockData?.stockUnit <= 0;
                                    return (
                                        <div
                                            key={productOption.id}
                                            className='item-box'
                                            onClick={() => onSelect(productOption?.code, productOption)}
                                        >
                                            <div className='product-info'>
                                                <div>
                                                    {productOption?.product?.name} / {productOption.name}
                                                </div>
                                                {productOption?.packageYn === 'y' &&
                                                    <div className='package-info'>
                                                        패키지
                                                    </div>
                                                }
                                            </div>
                                            <div className='sub-info'>
                                                <div className='stock-info'>재고수량: <span style={isMinusStocks ? { color: 'var(--defaultRedColor)' } : { color: 'var(--defaultBlueColor)' }}>{stockData?.stockUnit || '-'}</span></div>
                                                <div className='extra-info'>
                                                    {productOption?.code} / {productOption?.productCategory?.name} &gt; {productOption?.productSubCategory?.name}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className='pagenation-wrapper'>
                            <div className='function-box'>
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
                            <CustomBlockButton
                                type='button'
                                className='up-button'
                                onClick={() => { paperRef.current.scrollTop = 0; }}
                            >
                                <CustomImage src='/images/icon/arrow_upward_000000.svg' />
                            </CustomBlockButton>
                        </div>
                    </ContentWrapper>
                </ContentContainer>
            </CustomDialog>
        </>
    );
}