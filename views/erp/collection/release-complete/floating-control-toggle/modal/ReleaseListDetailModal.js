import useProductOptionHook from "../hooks/useProductOptionHook";
import styled from 'styled-components';
import CustomImage from "../../../../../modules/image/CustomImage";
import { useEffect, useState } from "react";
import ResizableTh from "../../../../../modules/table/ResizableTh";
import { numberFormatUtils } from "../../../../../../utils/numberFormatUtils";
import { dateToYYYYMMDDhhmmss } from "../../../../../../utils/dateFormatUtils";

const Container = styled.div`
    background: var(--defaultBackground);
    
    .header-close-button-box{
        display: flex;
        justify-content: flex-end;
        padding: 20px 20px 0 20px;

        .header-close-button-el{
            user-select: none;
            -webkit-tap-highlight-color: #00000000;
            width:40px;
            height: 40px;
            padding: 0;
            margin:0;
            border:none;
            background:none;
            cursor: pointer;

            .header-close-button-icon{
                width:100%;
                height: 100%;
            }
        }
    
    }

    .title-box{
        padding: 0 20px;

        .title{
            border-bottom: 1px solid #000;
            font-size: 20px;
            font-weight: 400;
            color:#303030;
            padding-bottom: 20px;

            .accent-text{
                color:var(--mainColor);
            }
        }
    }
`;

const ProductInfo = styled.div`
    padding: 20px;
    .thumbnail{
        width: 120px;
        height: 120px;
        border:1px solid #f0f0f0;
        border-radius: 10px;
        overflow: hidden;
    }
    
    .info{
        flex:1;
        background: #fff;
        margin-left: 10px;
        border: 1px solid #f0f0f0;
        border-radius: 10px;
        padding: 10px;

        .productName{
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 5px;
            color: #404040;
        }

        .productOptionName{
            font-size: 15px;
            font-weight: 600;
            margin-bottom: 10px;
            color: #404040;
        }

        .stockUnit{
            font-size: 13px;
            font-weight: 600;
            margin-bottom: 10px;
            color: #606060;
        }

        .category{
            font-size: 13px;
            font-weight: 500;
            color: #808080;
        }

    }
`;

export const TableWrapper = styled.div`
    padding: 20px;
    .empty-box{
        padding: 50px 0;

        .text{
            display: flex;
            align-items: center;
            justify-content: center;
            .accent{
                font-weight: 600;
                color: var(--mainColor)
            }
            .icon-figure{
                margin: 0 5px;
                width:20px;
                height: 20px;
            }
        }
    }
`;

export const TableBox = styled.div`
    overflow: auto;
    min-height: 300px;
    max-height: 300px;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    background:#fcfcfc;

    &::-webkit-scrollbar{
        background: #e1e1e130;
        height:5px;
        width: 5px;
    }

    &::-webkit-scrollbar-track{
        border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb{
        background-color: #00000010;
        border-radius: 10px;
    }

    table{
        position:relative;
        text-align: center;
        width: fit-content;
        table-layout: fixed;
        border: none;
    }

    table thead{
        
    }

    table thead th {
        height: 35px;

        box-sizing: border-box;
        padding:10px 5px;

        background:#f7f7f7;
        color: #333;
        font-weight: 600;
        position: sticky;
        top:0;
        border-bottom: 1px solid #e0e0e0;
        border-right: 1px solid #f0f0f0;

        line-height: 1.5;
        word-break: keep-all;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        font-size: 12px;
        
        .control-button-item{
            width:20px;
            height: 20px;
            margin:0;
            padding:0;
            margin-left: 3px;
            background: none;
            border-radius: 50%;
            border: none;
            .icon-figure{
                width:80%;
                height: 80%;
            }
        }
    }

    table tbody tr{
        &:hover{
            background:#f8f8f8;

            .fixed-col-left {
                background:#f8f8f8;
            }
        }
    }

    table tbody td{
        height: 35px;

        box-sizing: border-box;

        border-bottom: 1px solid #e0e0e0;
        line-height: 1.5;
        word-break: keep-all;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        font-size: 12px;
        color: #333;
        
        .input-item{
            background: none;
            text-align: center;
            padding: 0 10px;
            box-sizing: border-box;
            width: 100%;
            height: 44px;
            border: none;
            outline:none;
            cursor: pointer;
            border-radius: 5px;
            font-size: 12px;

            word-break: keep-all;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;

            &:focus{
                border: 1.5px solid var(--defaultBlueColor);
                box-shadow: var(--defaultBoxShadow);
                background: var(--defaultBlueColorOpacity100);
                cursor: text;
            }
        }

        .div-item{
            background: none;
            text-align: center;
            padding: 10px;
            box-sizing: border-box;
            width: 100%;
            border: none;
            font-size: 12px;
            color: #404040;
            font-weight: 400;

            word-break: keep-all;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
        }

        .button-item{
            margin:0;
            background: none;
            text-align: center;
            padding: 0 10px;
            box-sizing: border-box;
            width: 100%;
            height: 44px;
            border: none;
            outline:none;
            cursor: pointer;
            border-radius: 5px;
            font-size: 12px;

            word-break: keep-all;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
        }
    }

    .optionCodeTd{
        background: var(--mainColorOpacity100);
    }

    table .fixed-col-left {
        position: sticky;
        background: white;
        left: 0;
        z-index:10;
        border-right: 1px solid #e0e0e060;
        box-shadow: 6px 0 5px -7px #e0e0e0;
    }

    .status-button{
        height: 30px;
        width: 150px;
        padding:0;
        margin: auto;
        font-size: 12px;
    }

    .delete-button-item{
        width:30px;
        height: 30px;
        margin:0;
        padding:0;
        margin-left: auto;
        margin-right: auto;
        border-radius: 5px;

        .icon-figure{
            width:70%;
            height: 70%;
            margin-left: auto;
            margin-right: auto;
        }
    }
`;

export default function ReleaseListDetailModal({
    erpCollectionHeader,
    selectedErpItems,
    selectedReleaseItem,
    inventoryStocks,
    onClose
}) {
    const {
        productOption
    } = useProductOptionHook(selectedReleaseItem?.productOptionId);

    let inventoryStock = inventoryStocks?.find(r => r.productOptionId === productOption?.id);

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
                {productOption &&
                    <ProductInfo>
                        <div className='mgl-flex'>
                            <div className='thumbnail'>
                                <CustomImage
                                    src={productOption?.product?.thumbnailUri}
                                />
                            </div>
                            <div className='info'>
                                <div className='productName'>{productOption?.product?.name}</div>
                                <div className='productOptionName'>{productOption?.name}</div>
                                {productOption?.packageYn === 'y' ?
                                    <div className='stockUnit' style={{ color: 'var(--defaultGreenColor)' }}>패키지상품</div>
                                    :
                                    <div className='stockUnit' style={{ color: inventoryStock?.stockUnit <= 0 ? 'var(--defaultRedColor)' : '' }}>남은재고 : {inventoryStock?.stockUnit} 개</div>
                                }
                                <div className='category'>{productOption?.productCategory?.name} &gt; {productOption?.productSubCategory?.name}</div>
                            </div>
                        </div>
                    </ProductInfo>
                }
                <TableWrapper>
                    <TableBox>
                        <table
                            cellSpacing={0}
                        >
                            <TableHead
                                erpCollectionHeader={erpCollectionHeader}
                            />
                            <TableBody
                                erpCollectionHeader={erpCollectionHeader}
                                selectedErpItems={selectedErpItems}
                                inventoryStock={inventoryStock}
                                productOption={productOption}
                                selectedReleaseItem={selectedReleaseItem}
                            />
                        </table>
                    </TableBox>
                </TableWrapper>
            </Container>
        </>
    );
}

function TableHead({
    erpCollectionHeader
}) {
    return (
        <thead>
            <tr>
                <th
                    className="fixed-header"
                    scope="col"
                    width={50}
                    style={{
                        zIndex: '10'
                    }}
                >
                    No.
                </th>
                {erpCollectionHeader?.erpCollectionHeaderDetails?.map?.((r, index) => {
                    return (
                        <ResizableTh
                            key={index}
                            className="fixed-header"
                            scope="col"
                            width={180}
                            style={{
                                zIndex: '10'
                            }}
                        >
                            <div className='mgl-flex mgl-flex-justifyContent-center mgl-flex-alignItems-center'>
                                {r.required &&
                                    <span className='required-tag'></span>
                                }
                                {r.customHeaderName}
                            </div>
                        </ResizableTh>
                    )
                })}
            </tr>
        </thead>
    );
}

function TableBody({
    erpCollectionHeader,
    selectedErpItems,
    inventoryStock,
    productOption,
    selectedReleaseItem
}) {
    if (!selectedReleaseItem?.productOptionId && !productOption) {
        return (
            <tbody>
                {selectedErpItems?.filter(r => r.productOptionId === null)?.map((erpItem, index) => {
                    let isOutOfStock = inventoryStock && inventoryStock?.stockUnit <= 0;
                    let isPackaged = erpItem.packageYn === 'y' ? true : false;

                    return (
                        <tr
                            key={erpItem.id}
                            style={{
                                position: 'relative',
                                background: !erpItem.productOptionId ? 'var(--defaultYellowColorOpacity30)' : (isOutOfStock && !isPackaged) ? 'var(--defaultRedColorOpacity30)' : ''
                            }}
                        >
                            <td>
                                {index + 1}
                            </td>
                            {erpCollectionHeader?.erpCollectionHeaderDetails.map((header) => {
                                let matchedFieldName = header.matchedFieldName;

                                if (matchedFieldName === 'unit' || matchedFieldName === 'price' || matchedFieldName === 'deliveryCharge') {
                                    return (
                                        <td key={matchedFieldName}>
                                            <div className='div-item'>{numberFormatUtils.numberWithCommas(erpItem[matchedFieldName])}</div>
                                        </td>

                                    );
                                } else if (matchedFieldName === 'createdAt' || matchedFieldName === 'salesAt' || matchedFieldName === 'releaseAt') {
                                    return (
                                        <td key={matchedFieldName}>
                                            <div className='div-item'>{dateToYYYYMMDDhhmmss(erpItem[matchedFieldName])}</div>
                                        </td>
                                    )
                                } else if (matchedFieldName === 'optionStockUnit') {
                                    if (isPackaged) {
                                        return (
                                            <td key={`col-${matchedFieldName}`} style={{ color: 'var(--defaultGreenColor)' }}>패키지상품</td>
                                        )
                                    } else {
                                        return (
                                            <td key={`col-${matchedFieldName}`} style={{ background: (isOutOfStock && !isPackaged) ? 'var(--defaultRedColorOpacity30)' : '' }}>{inventoryStock ? inventoryStock.stockUnit : '옵션코드 미지정'}</td>
                                        )
                                    }
                                } else {
                                    return (
                                        <td key={matchedFieldName}>
                                            <div className='div-item'>{erpItem[matchedFieldName]}</div>
                                        </td>
                                    );
                                }

                            })}
                        </tr>
                    );
                })}
            </tbody>
        );
    }
    return (
        <tbody>
            {selectedErpItems?.filter(r => r.productOptionId === productOption?.id)?.map((erpItem, index) => {
                let isOutOfStock = inventoryStock && inventoryStock?.stockUnit <= 0;
                let isPackaged = erpItem.packageYn === 'y' ? true : false;

                return (
                    <tr
                        key={erpItem.id}
                        style={{
                            position: 'relative',
                            background: !erpItem.productOptionId ? 'var(--defaultYellowColorOpacity30)' : (isOutOfStock && !isPackaged) ? 'var(--defaultRedColorOpacity30)' : ''
                        }}
                    >
                        <td>
                            {index + 1}
                        </td>
                        {erpCollectionHeader?.erpCollectionHeaderDetails.map((header) => {
                            let matchedFieldName = header.matchedFieldName;

                            if (matchedFieldName === 'unit' || matchedFieldName === 'price' || matchedFieldName === 'deliveryCharge') {
                                return (
                                    <td key={matchedFieldName}>
                                        <div className='div-item'>{numberFormatUtils.numberWithCommas(erpItem[matchedFieldName])}</div>
                                    </td>

                                );
                            } else if (matchedFieldName === 'createdAt' || matchedFieldName === 'salesAt' || matchedFieldName === 'releaseAt') {
                                return (
                                    <td key={matchedFieldName}>
                                        <div className='div-item'>{dateToYYYYMMDDhhmmss(erpItem[matchedFieldName])}</div>
                                    </td>
                                )
                            } else if (matchedFieldName === 'optionStockUnit') {
                                if (isPackaged) {
                                    return (
                                        <td key={`col-${matchedFieldName}`} style={{ color: 'var(--defaultGreenColor)' }}>패키지상품</td>
                                    )
                                } else {
                                    return (
                                        <td key={`col-${matchedFieldName}`} style={{ background: (isOutOfStock && !isPackaged) ? 'var(--defaultRedColorOpacity30)' : '' }}>{inventoryStock ? inventoryStock.stockUnit : '옵션코드 미지정'}</td>
                                    )
                                }
                            } else {
                                return (
                                    <td key={matchedFieldName}>
                                        <div className='div-item'>{erpItem[matchedFieldName]}</div>
                                    </td>
                                );
                            }

                        })}
                    </tr>
                );
            })}
        </tbody>
    );
}