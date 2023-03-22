import { CustomDialog } from "../../../../../../components/dialog/v1/CustomDialog";
import styled from 'styled-components';
import { useEffect, useState } from "react";
import { productOptionPackageDataConnect } from "../../../../../../data_connect/productOptionPackageDataConnect";
import { inventoryDataConnect } from "../../../../../../data_connect/inventoryDataConnect";
import { useSelector } from "react-redux";
import CustomBlockButton from "../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import _ from "lodash";

const ContentContainer = styled.div`
    padding: 20px;
`;

const ItemGroup = styled.div`
    display: flex;
    margin-top: 20px;
    align-items: center;

    @media all and (max-width: 992px){
        flex-direction: column;
    }
`;

const ButtonGroup = styled.div`
    padding: 10px;

    .button-item{
        border-radius: 5px;
        font-size: 12px;
        width: 130px;
        &:last-child{
            margin-top: 5px;
        }
    }
`;

const ItemWrapper = styled.div`
    flex:1;
    width: 100%;

    .title{
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 10px;
    }
`;

const ItemList = styled.div`
    border: 1px solid #f0f0f0;
    background: #fff;
    height: 350px;
    overflow: auto;
    border-radius: 10px;
    box-shadow: var(--defaultBoxShadow);
`;

const ItemBox = styled.div`
    border-bottom: 1px solid #f0f0f0;
    padding: 10px;
    .packageFlag{
        font-size: 13px;
        color: var(--defaultGreenColor);
    }

    .name{
        font-weight: 700;
        color: #404040;
        font-size: 14px;
    }

    .unit{
        margin-top: 10px;
        font-size: 12px;
        color: #606060;
    }

    .overflow-stock{
        margin-top: 10px;
        font-size: 12px;
        font-weight: 700;
        color: var(--defaultRedColor);
    }
`;

const MessageBox = styled.div`
    padding: 30px 0;
    text-align: center;
    font-size: 17px;
    font-weight: 600;
`;

const sortByProductNameAndProductOptionName = (items) => {
    return items?.sort((a, b) => {
        let A = null;
        let B = null;

        if (a.productOptionId) {
            A = a.productName + a.productOptionName;
        }

        if (b.productOptionId) {
            B = b.productName + b.productOptionName;
        }

        return (B === null) - (A === null) || +(A > B) || -(A < B);
    });
}

const mergeItems = (items) => {
    let productOptionIdSet = new Set();
    let resultItems = [];

    items.forEach(item => {
        let productOptionId = item?.productOptionId;
        let unit = item?.unit;

        if (productOptionIdSet.has(productOptionId)) {
            resultItems?.forEach(item => {
                if (item?.productOptionId === productOptionId) {
                    item.unit = parseInt(item.unit) + parseInt(unit);
                }
            });
        } else {
            productOptionIdSet.add(productOptionId);

            resultItems.push({
                productOptionId: item.productOptionId,
                productName: item.productName,
                productOptionName: item.productOptionName,
                packageYn: item.packageYn,
                unit: parseInt(item.unit)
            })
        }
    });

    return resultItems;
}

export default function StatusNextModalComponent({
    selectedErpItems,
    open,
    onClose,
    onConfirm,
}) {

    return (
        <>
            {open &&
                <CustomDialog
                    open={open}
                    onClose={onClose}
                    maxWidth={'xl'}
                >
                    <CustomDialog.CloseButton onClose={() => onClose()} />
                    <CustomDialog.Title>출고전환 확인메세지</CustomDialog.Title>
                    <Content
                        selectedErpItems={selectedErpItems}
                    />

                    <CustomDialog.FooterButtonGroup isFlex style={{ position: 'sticky', bottom: '0', }}>
                        <CustomDialog.FooterButton
                            backgroundColor={'var(--defaultModalCloseColor)'}
                            fontColor={'#fff'}
                            width={'40%'}
                            onClick={() => onClose()}
                        >취소</CustomDialog.FooterButton>
                        <CustomDialog.FooterButton
                            flex={1}
                            backgroundColor={'var(--mainColor)'}
                            fontColor={'#fff'}
                            onClick={() => onConfirm()}
                        >확인</CustomDialog.FooterButton>
                    </CustomDialog.FooterButtonGroup>
                </CustomDialog>
            }
        </>
    );
}

function Content({
    selectedErpItems
}) {
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const [inventoryStocks, setInventoryStocks] = useState(null);
    const [initialClassifyItems, setInitialClassifyItems] = useState(null);
    const [classifyItems, setClassifyItems] = useState(null);
    const [packageParentItems, setPackageParentItems] = useState(null);
    const [packageChildItems, setPackageChildItems] = useState(null);

    useEffect(() => {
        if (!selectedErpItems || !workspaceRedux?.workspaceInfo?.id) {
            return;
        }

        initialize();

        return () => {
            setInventoryStocks(null);
            setInitialClassifyItems(null);
            setClassifyItems(null);
            setPackageParentItems(null);
            setPackageChildItems(null);
        }
    }, [selectedErpItems, workspaceRedux?.workspaceInfo?.id]);

    const initialize = async () => {
        let productInfoItems = [];

        let contents = selectedErpItems.map(r => {
            return {
                productOptionId: r.productOptionId,
                productName: r.productName,
                productOptionName: r.productOptionName,
                packageYn: r.packageYn,
                unit: parseInt(r.unit)
            }
        })

        productInfoItems = mergeItems(contents);
        productInfoItems = sortByProductNameAndProductOptionName(productInfoItems);

        let fetchedInventoryStocks = await fetchInventoryStocksByProductOptionIds(productInfoItems?.filter(r => r.productOptionId && r.packageYn !== 'y').map(r => r.productOptionId));

        setInitialClassifyItems(productInfoItems);
        setClassifyItems(productInfoItems);
        setPackageParentItems(productInfoItems?.filter(r => r.packageYn === 'y'));
        setInventoryStocks(fetchedInventoryStocks);
    }

    const handleClickDismantle = async () => {
        let newClassifyItems = _.cloneDeep(initialClassifyItems);
        let productInfoItems = [];
        let newPackageChildItems = [];

        if (!packageChildItems) {
            newPackageChildItems = await fetchPackageChildItems();
        } else {
            newPackageChildItems = [...packageChildItems];
        }


        newClassifyItems = [...newClassifyItems.filter(r => r.packageYn !== 'y'), ...newPackageChildItems];

        productInfoItems = mergeItems(newClassifyItems);
        productInfoItems = sortByProductNameAndProductOptionName(productInfoItems);

        let fetchedInventoryStocks = await fetchInventoryStocksByProductOptionIds(productInfoItems?.filter(r => r.productOptionId && r.packageYn !== 'y').map(r => r.productOptionId));

        setClassifyItems(productInfoItems);
        setInventoryStocks(fetchedInventoryStocks);
    }

    const fetchPackageChildItems = async () => {
        let body = {
            productOptionIds: packageParentItems?.map(r => r.productOptionId),
            workspaceId: workspaceRedux?.workspaceInfo?.id
        }

        let fetchedData = await productOptionPackageDataConnect().searchProductInfoListByProductOptionIds(body)
            .then(res => {
                if (res.status === 200) {
                    return res.data.data;
                }
            })
            .catch(err => {
                console.log(err, err.response);
                return null;
            })
            ;

        let result = fetchedData.map(content => {
            let parentItem = packageParentItems.find(r => r.productOptionId === content.parentProductOptionId);

            return {
                productOptionId: content.productOptionId,
                productName: content.productName,
                productOptionName: content.productOptionName,
                packageYn: 'n',
                unit: parseInt(content.unit) * parseInt(parentItem.unit)
            }
        })

        setPackageChildItems(result);
        return result;
    }

    const fetchInventoryStocksByProductOptionIds = async (productOptionIds) => {
        const headers = {
            wsId: workspaceRedux?.workspaceInfo?.id
        }

        const body = {
            productOptionIds:productOptionIds
        }

        return await inventoryDataConnect().searchList(body, headers)
            .then(res => {
                if (res.status === 200) {
                    return res.data.data;
                }
            })
            .catch(err => {
                console.log(err, err.response);
            })
    }

    return (
        <ContentContainer>
            <ItemGroup>
                <ItemWrapper>
                    <div className='title'>패키지 상품 리스트</div>
                    <ItemList>
                        {classifyItems?.filter(r => r.packageYn === 'y')?.map(r => {
                            return (
                                <ItemBox key={r.productOptionId}>
                                    {r.packageYn === 'y' && <div className='packageFlag'>[패키지]</div>}
                                    <div className='name'>{r.productName} &gt; {r.productOptionName}</div>
                                    <div className='unit'>수량: {r.unit}</div>
                                </ItemBox>
                            );
                        })}
                    </ItemList>
                </ItemWrapper>
                <ButtonGroup>
                    <CustomBlockButton
                        type='button'
                        onClick={() => handleClickDismantle()}
                        className='button-item'
                        style={{
                            borderColor: 'var(--mainColor)',
                            color: 'var(--mainColor)'
                        }}
                    >
                        패키지 분해
                    </CustomBlockButton>
                    <CustomBlockButton
                        type='button'
                        onClick={() => initialize()}
                        className='button-item'
                    >
                        패키지 합치기
                    </CustomBlockButton>
                </ButtonGroup>
                <ItemWrapper>
                    <div className='title'>일반 상품 리스트</div>
                    <ItemList>
                        {classifyItems?.filter(r => r.packageYn !== 'y')?.map(item => {
                            let unit = item.unit;

                            if (!item?.productOptionId) {
                                return (
                                    <ItemBox key={'undefinedItem'}>
                                        <div className='name' style={{ color: 'var(--defaultRedColor)' }}>미지정 상품</div>
                                        <div className='unit'>수량: {item.unit} / 재고수량: 미지정 상품</div>
                                    </ItemBox>
                                );
                            } else {
                                let inventoryStock = inventoryStocks?.find(r => r.productOptionId === item.productOptionId);
                                let stockUnit = inventoryStock?.stockUnit || 0;
                                let diffStockUnit = parseInt(unit) - parseInt(stockUnit);

                                return (
                                    <ItemBox key={item.productOptionId} style={{ background: diffStockUnit > 0 ? 'var(--defaultRedColorOpacity30)' : '' }}>
                                        <div className='name'>{item.productName} &gt; {item.productOptionName}</div>
                                        <div className='unit'>수량: {unit} / 재고수량: {inventoryStock?.stockUnit || 0}</div>
                                        {diffStockUnit > 0 && <div className='overflow-stock'>재고수량보다 {diffStockUnit} 개 많음</div>}
                                    </ItemBox>
                                );
                            }
                        })}
                    </ItemList>
                </ItemWrapper>
            </ItemGroup>
            <MessageBox>{selectedErpItems?.length} 건의 데이터를 출고전환 하시겠습니까?</MessageBox>
        </ContentContainer>
    );
}