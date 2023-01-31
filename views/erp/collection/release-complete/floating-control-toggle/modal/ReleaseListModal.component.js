import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { erpItemDataConnect } from "../../../../../../data_connect/erpItemDataConnect";
import { dateToYYYYMMDDhhmmssFile } from "../../../../../../utils/dateFormatUtils";
import SingleBlockButton from "../../../../../modules/button/SingleBlockButton";
import CustomImage from "../../../../../modules/image/CustomImage";
import CommonModalComponent from "../../../../../modules/modal/CommonModalComponent";
import useInventoryStocksHook from "../hooks/useInventoryStocksHook";
import { Container, ExcelDownloadButton, ReleaseList } from "../styles/ReleaseListModal.styled";
import ReleaseListDetailModal from "./ReleaseListDetailModal";

export default function ReleaseListModalComponent({
    erpCollectionHeader,
    selectedErpItems,
    onClose
}) {
    const workspaceRedux = useSelector(state => state.workspaceRedux);

    const [releaseList, setReleaseList] = useState(null);
    const [selectedReleaseItem, setSelectedReleaseItem] = useState(null);
    const [releaseListDetailModalOpen, setReleaseListDetailModalOpen] = useState(false);
    const {
        inventoryStocks
    } = useInventoryStocksHook(selectedErpItems);

    useEffect(() => {
        if (!selectedErpItems) {
            return;
        }

        initialize();
    }, [selectedErpItems]);

    const initialize = () => {
        let selectedItemsSize = selectedErpItems.length;
        let productOptionIdSet = new Set();
        let datas = [];

        for (let i = 0; i < selectedItemsSize; i++) {
            let productOptionId = selectedErpItems[i].productOptionId;
            let optionCode = selectedErpItems[i].optionCode;
            let productCategoryName = selectedErpItems[i].productCategoryName;
            let productName = selectedErpItems[i].productName;
            let productOptionName = selectedErpItems[i].productOptionName;
            let productOptionReleaseLocation = selectedErpItems[i].productOptionReleaseLocation;
            let productOptionTag = selectedErpItems[i].productOptionTag;
            let productSubCategoryName = selectedErpItems[i].productSubCategoryName;
            let productTag = selectedErpItems[i].productTag;
            let unit = parseInt(selectedErpItems[i].unit);

            if (productOptionIdSet.has(productOptionId)) {
                let data = datas.find(r => r.productOptionId === productOptionId);
                data.unit += unit;
            } else {
                productOptionIdSet.add(productOptionId);
                datas.push({
                    productOptionId: productOptionId,
                    optionCode: optionCode,
                    productCategoryName: productCategoryName,
                    productName: productName,
                    productOptionName: productOptionName,
                    productOptionReleaseLocation: productOptionReleaseLocation,
                    productOptionTag: productOptionTag,
                    productSubCategoryName: productSubCategoryName,
                    productTag: productTag,
                    unit: unit
                })
            }
        }

        datas.sort((a, b) => {
            let productNameA = a.productName;
            let productNameB = b.productName;
            return (productNameB === null) - (productNameA === null) || +(productNameA > productNameB) || -(productNameA < productNameB);
        });

        setReleaseList(datas);
    }

    const toggleReleaseListDetailModalOpen = (setOpen, target) => {
        if (setOpen) {
            setReleaseListDetailModalOpen(true);
            setSelectedReleaseItem(target);
            return;
        } else {
            setReleaseListDetailModalOpen(false);
            setSelectedReleaseItem(null);
        }
    }

    const handleDownloadExcel = async () => {
        let datas = releaseList?.map(r => {
            if (!r.productOptionId) {
                return {
                    optionCode: '옵션코드 미지정',
                    productCategoryName: '옵션코드 미지정',
                    productName: '옵션코드 미지정',
                    productOptionId: null,
                    productOptionName: '옵션코드 미지정',
                    productOptionReleaseLocation: '옵션코드 미지정',
                    productOptionTag: '옵션코드 미지정',
                    productSubCategoryName: '옵션코드 미지정',
                    productTag: '옵션코드 미지정',
                    stockUnit: null,
                    unit: r.unit
                }
            }

            let inventoryStock = inventoryStocks?.find(r2 => r2.productOptionId === r.productOptionId);

            return {
                ...r,
                stockUnit: inventoryStock?.stockUnit
            }


        })

        let body = {
            workspaceId: workspaceRedux?.workspaceInfo?.id,
            items: datas
        }

        // TODO : 로직 완성해야됨. 23.01.26
        console.log(body);

        await erpItemDataConnect().releaseListExcelDownload(body)
            .then(res => {
                const url = window.URL.createObjectURL(new Blob([res.data], { type: res.headers['content-type'] }));
                const link = document.createElement('a');
                link.href = url;

                let date = dateToYYYYMMDDhhmmssFile(new Date());

                link.setAttribute('download', date + '_주문수집_데이터_엑셀.xlsx');
                document.body.appendChild(link);
                link.click();
            })
            .catch(err => {
                let res = err.response;
                if (res?.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res?.data.memo);
            })
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
                <ExcelDownloadButton>
                    <SingleBlockButton
                        type='button'
                        className='button-item'
                        onClick={() => handleDownloadExcel()}
                    >
                        엑셀 다운로드
                    </SingleBlockButton>
                </ExcelDownloadButton>
                <ReleaseList>
                    {releaseList?.map((r, index) => {
                        if (!r.productOptionId) {
                            return (
                                <div
                                    key={index}
                                    className='box'
                                    style={{
                                        border: '1px solid var(--defaultRedColor)'
                                    }}
                                    onClick={() => toggleReleaseListDetailModalOpen(true, r)}
                                >
                                    <div className='none-code'>
                                        <div>옵션코드 미지정</div>
                                        <div className='unit'>수량 : {r.unit}</div>
                                    </div>
                                </div>
                            );
                        } else {
                            let inventoryStock = inventoryStocks?.find(r2 => r2.productOptionId === r.productOptionId);
                            let stockUnit = inventoryStock?.stockUnit;
                            let isOutOfStocks = stockUnit < r.unit;

                            return (
                                <div
                                    key={index}
                                    className='box'
                                    onClick={() => toggleReleaseListDetailModalOpen(true, r)}
                                >
                                    <div className='infoAndUnit'>
                                        <div>
                                            <div>{r.productName} <span className='tag'>({r.productTag})</span></div>
                                            <div>{r.productOptionName} <span className='tag'>({r.productOptionTag})</span></div>
                                        </div>
                                        <div>
                                            <div className='unit'>수량 : {r.unit}</div>
                                            <div
                                                className='stock'
                                                style={{
                                                    color: isOutOfStocks ? 'var(--defaultRedColor)' : ''
                                                }}
                                            >남은재고 : {stockUnit}</div>
                                        </div>
                                    </div>
                                    <div className='codeAndCategories'>
                                        <div>{r.optionCode}</div>
                                        <div>{r.productCategoryName} &gt; {r.productSubCategoryName}</div>
                                    </div>
                                </div>
                            );
                        }
                    })}
                </ReleaseList>
            </Container>

            <CommonModalComponent
                open={releaseListDetailModalOpen}
                onClose={() => toggleReleaseListDetailModalOpen(false)}
                maxWidth={'xl'}
            >
                <ReleaseListDetailModal
                    erpCollectionHeader={erpCollectionHeader}
                    selectedErpItems={selectedErpItems}
                    selectedReleaseItem={selectedReleaseItem}
                    inventoryStocks={inventoryStocks}
                    onClose={() => toggleReleaseListDetailModalOpen(false)}
                />
            </CommonModalComponent>
        </>
    );
}