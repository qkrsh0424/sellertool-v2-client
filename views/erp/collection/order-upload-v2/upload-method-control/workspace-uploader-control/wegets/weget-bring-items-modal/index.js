import { useEffect, useState } from "react";
import { CustomDialog } from "../../../../../../../../components/dialog/v1/CustomDialog";
import styled from 'styled-components';
import { customToast } from "../../../../../../../../components/toast/custom-react-toastify/v1";
import { customSignitureUtils } from "../../../../../../../../utils/customSignitureUtils";
import axios from "axios";
import moment from "moment";
import ResizableTh from "../../../../../../../../components/table/th/v1/ResizableTh";
import { ChevronLeft, ChevronRight, ClipboardPlus } from "lucide-react";
import CustomBlockButton from "../../../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import InfiniteScrollObserver from "../../../../../../../modules/observer/InfiniteScrollObserver";
import { Link } from "@mui/material";
import { CustomDateUtils } from "../../../../../../../../utils/CustomDateUtils";
import { CustomURIEncoderUtils } from "../../../../../../../../utils/CustomURIEncoderUtils";
import { dateToYYYYMMDDhhmmss } from "../../../../../../../../utils/dateFormatUtils";
import _ from "lodash";

const StyledBody = styled.div`
    padding: 10px;
`;

const StyledOrderTypeButtons = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    button{
        width: auto;
        padding: 8px 16px;
        height: auto;
        border-radius: 5px;

        &.selected{
            background: var(--mainColor);
            color: #fff;
        }
    }
`;

const StyledPageable = styled.div`
    margin-top: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: flex-end;

    .not-allowed{
        color:#e0e0e0;
    }
`;

const StyledBulkControl = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    margin-top: 10px;
    justify-content: space-between;
    button{
        width: auto;
        height: auto;
        padding: 8px 16px;
        border-radius: 5px;
        background: #efefef;
        color: #333;
        border: 1px solid #efefef;
        font-size: 12px;

        &.bring-button{
            background: var(--mainColor);
            color: #fff;
        }
    }
`;

const TableWrapper = styled.div`
    margin-top: 10px;

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

const TableBox = styled.div`
    overflow: auto;
    min-height: 300px;
    max-height: 300px;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    box-shadow: var(--defaultBoxShadow);
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
    }

    table tbody tr{
        &:hover{
            background:#f8f8f8;

            .fixed-col-left {
                background:#f8f8f8;
            }
        }

        &.selected{
            background: #e0f7fa;   
        }
    }

    table tbody td{
        height: 35px;

        box-sizing: border-box;
        padding:10px 5px;

        border-bottom: 1px solid #e0e0e0;
        line-height: 1.5;
        word-break: keep-all;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        font-size: 12px;
        color: #333;
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
`;
const API_SERVER_ADDRESS = process.env.NODE_ENV == 'development' ? process.env.development.apiServerAddress : process.env.production.apiServerAddress

const TABLE_DATA_VIEW_SIZE = 50;
const TABLE_DATA_INC_DEC_SIZE = 30;

export function BringItemsModal({
    open,
    onClose,
    selectedManagedWorkspaceApi,
    onBringErpItemsFromOtherWorkspace
}) {
    const [orderType, setOrderType] = useState('ALL'); // ALL, NEW, CONFIRMED, COMPLETED, HOLD
    const [erpItems, setErpItems] = useState([]);
    const [hasNext, setHasNext] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(300);

    const [selectedErpItems, setSelectedErpItems] = useState([]);

    useEffect(() => {
        if (!selectedManagedWorkspaceApi?.managedWorkspaceApiKey || !selectedManagedWorkspaceApi?.managedWorkspaceSecretKey) {
            return;
        }
        handleReqFetchErpItems();
    }, [
        selectedManagedWorkspaceApi?.managedWorkspaceApiKey,
        selectedManagedWorkspaceApi?.managedWorkspaceSecretKey,
        orderType,
        page,
        pageSize
    ]);

    const handleReqFetchErpItems = async () => {
        const timestamp = Date.now().toString();
        const signiture = customSignitureUtils.generateSigniture({ apiKey: selectedManagedWorkspaceApi?.managedWorkspaceApiKey, secretKey: selectedManagedWorkspaceApi?.managedWorkspaceSecretKey, timestamp: timestamp })

        let headers = customSignitureUtils.makeHeaders({ apiKey: selectedManagedWorkspaceApi?.managedWorkspaceApiKey, timestamp: timestamp, signiture: signiture });
        const toDateTime = moment().endOf('day').toDate();
        const fromDateTime = moment().startOf('day').toDate();
        let params = {
            dateRangeType: 'created_at',
            orderType: (!orderType || orderType === 'ALL') ? null : orderType,
            fromDateTime: fromDateTime,
            toDateTime: toDateTime,
            page: page,
            pageSize: pageSize,
        }

        const fetchResult = await axios.get(`${API_SERVER_ADDRESS}/api/erp-items`, {
            headers: headers,
            params: params
        }).then(res => {
            if (res.status === 200) {
                return {
                    res: res,
                    content: res.data?.content
                }
            }
        }).catch(err => {
            if (!err) {
                customToast.error('서버와의 연결이 원할하지 않습니다.');
                return;
            }

            let res = err.response;

            customToast.error(res?.data?.message);
        });

        if (fetchResult?.content) {
            setErpItems(fetchResult?.content?.items);
            setHasNext(fetchResult?.content?.hasNext);
            setPage(fetchResult?.content?.page);
            setPageSize(fetchResult?.content?.pageSize);
        }
    }

    return (
        <>
            <CustomDialog
                open={open}
                onClose={onClose}
                maxWidth="xl"
            >
                <CustomDialog.Header style={{ padding: 10 }}>
                    <CustomDialog.Header.Fake />
                    <CustomDialog.Header.Title>가져오기</CustomDialog.Header.Title>
                    <CustomDialog.Header.Close onClick={onClose} />
                </CustomDialog.Header>
                <StyledBody>
                    <StyledOrderTypeButtons>
                        <CustomBlockButton
                            type='button'
                            onClick={() => {
                                setOrderType('ALL');
                                setPage(1);
                            }}
                            className={orderType === 'ALL' ? 'selected' : ''}
                        >
                            전체
                        </CustomBlockButton>
                        <CustomBlockButton
                            type='button'
                            onClick={() => {
                                setOrderType('NEW')
                                setPage(1);
                            }}
                            className={orderType === 'NEW' ? 'selected' : ''}
                        >
                            신규주문
                        </CustomBlockButton>
                        <CustomBlockButton
                            type='button'
                            onClick={() => {
                                setOrderType('CONFIRMED')
                                setPage(1);
                            }}
                            className={orderType === 'CONFIRMED' ? 'selected' : ''}
                        >
                            주문확정
                        </CustomBlockButton>
                        <CustomBlockButton
                            type='button'
                            onClick={() => {
                                setOrderType('COMPLETED')
                                setPage(1);
                            }}
                            className={orderType === 'COMPLETED' ? 'selected' : ''}
                        >
                            출고완료
                        </CustomBlockButton>
                        <CustomBlockButton
                            type='button'
                            onClick={() => {
                                setOrderType('HOLD')
                                setPage(1);
                            }}
                            className={orderType === 'HOLD' ? 'selected' : ''}
                        >
                            보류
                        </CustomBlockButton>
                    </StyledOrderTypeButtons>
                    <StyledPageable>
                        <span style={{ fontSize: '13px' }}>{erpItems?.length}개</span>
                        <ChevronLeft
                            style={{ cursor: page > 1 ? 'pointer' : 'not-allowed' }}
                            className={page <= 1 ? 'not-allowed' : ''}
                            onClick={() => {
                                if (page > 1) {
                                    setPage(page - 1);
                                }
                            }}
                        />
                        <span>{page || 0}</span>
                        <ChevronRight
                            style={{ cursor: hasNext ? 'pointer' : 'not-allowed' }}
                            className={!hasNext ? 'not-allowed' : ''}
                            onClick={() => {
                                if (hasNext) {
                                    setPage(page + 1);
                                }
                            }}
                        />
                    </StyledPageable>
                    {erpItems &&
                        <Table
                            uploadDatas={erpItems}
                            selectedErpItems={selectedErpItems}
                            onSelectErpItem={(item) => {
                                setSelectedErpItems(prev => {
                                    if (prev?.find(r => r.erpItem?.id === item.erpItem?.id)) {
                                        return prev.filter(r => r.erpItem?.id !== item.erpItem?.id);
                                    }
                                    return [...prev, item];
                                })
                            }}
                        />
                    }
                    <StyledBulkControl>
                        <div style={{ display: 'flex', gap: '5px' }}>
                            <CustomBlockButton
                                type='button'
                                onClick={() => {
                                    setSelectedErpItems(_.cloneDeep(erpItems));
                                }}
                            >
                                전체선택
                            </CustomBlockButton>
                            <CustomBlockButton
                                type='button'
                                onClick={() => {
                                    setSelectedErpItems([]);
                                }}
                            >
                                전체해제
                            </CustomBlockButton>
                        </div>
                        <div>
                            <CustomBlockButton
                                type='button'
                                className='bring-button'
                                onClick={() => {
                                    if (selectedErpItems?.length === 0) {
                                        customToast.error('선택된 주문이 없습니다.');
                                        return;
                                    }
                                    onBringErpItemsFromOtherWorkspace(selectedErpItems);
                                    onClose();
                                }}
                            >
                                가져오기
                            </CustomBlockButton>
                        </div>
                    </StyledBulkControl>
                </StyledBody>
            </CustomDialog>
        </>
    );
}

function Table({
    uploadDatas,
    selectedErpItems,
    onSelectErpItem
}) {
    const [viewSize, setViewSize] = useState(TABLE_DATA_VIEW_SIZE);

    const handleFetchMoreItemsView = () => {
        let newViewSize = viewSize + TABLE_DATA_INC_DEC_SIZE;

        setViewSize(newViewSize);
    }

    return (
        <>
            <TableWrapper>
                <TableBox>
                    <table
                        cellSpacing={0}
                    >
                        <thead>
                            <tr>
                                {TABLE_HEADERS?.map((r, index) => {
                                    return (
                                        <ResizableTh
                                            key={index}
                                            className="fixed-header"
                                            scope="col"
                                            width={r.defaultWidth}
                                            style={{
                                                zIndex: '10'
                                            }}
                                        >
                                            {r.headerName}
                                        </ResizableTh>
                                    )
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {uploadDatas?.slice(0, viewSize)?.map((data, index) => {
                                return (
                                    <tr
                                        key={index}
                                        className={selectedErpItems?.find(r => r.erpItem?.id === data.erpItem?.id) ? 'selected' : ''}
                                        onClick={() => {
                                            onSelectErpItem(data);
                                        }}
                                    >
                                        {TABLE_HEADERS?.map(header => {
                                            if (header.fieldName === 'erpItem.channelOrderDate') {
                                                return (
                                                    <td key={header.fieldName}>
                                                        {_.get(data, header.fieldName) ? dateToYYYYMMDDhhmmss(_.get(data, header.fieldName)) : ''}
                                                    </td>
                                                );
                                            }

                                            return (
                                                <td key={header.fieldName}>
                                                    {_.get(data, header.fieldName)}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                            <InfiniteScrollObserver
                                elementTagType={'tr'}
                                totalSize={uploadDatas?.length || 0}
                                startOffset={0}
                                endOffset={viewSize}
                                fetchData={handleFetchMoreItemsView}
                                loadingElementTag={
                                    <td style={{ textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#444', paddingLeft: '50px' }} colSpan={100}>
                                        로딩중...
                                    </td>
                                }
                                endElementTag={
                                    <td style={{ textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#444', paddingLeft: '50px' }} colSpan={100}>
                                        마지막 데이터 입니다.
                                    </td>
                                }
                            />
                        </tbody>
                    </table>
                </TableBox>
            </TableWrapper>
        </>
    );
}

const TABLE_HEADERS = [
    {
        fieldName: "erpItem.channelOrderDate",
        headerName: "판매채널 주문일시",
        defaultWidth: 150
    },
    {
        fieldName: "erpItemOrderInfo.prodName",
        headerName: "상품명",
        defaultWidth: 250
    },
    {
        fieldName: "erpItemOrderInfo.optionName",
        headerName: "옵션정보",
        defaultWidth: 200
    },
    {
        fieldName: "erpItemOrderInfo.unit",
        headerName: "수량",
        defaultWidth: 50
    },
    {
        fieldName: "erpItemReceiverInfo.receiver",
        headerName: "수취인명",
        defaultWidth: 80
    },
    {
        fieldName: "erpItemReceiverInfo.receiverContact1",
        headerName: "전화번호1",
        defaultWidth: 150
    },
    {
        fieldName: "erpItemReceiverInfo.receiverContact2",
        headerName: "전화번호2",
        defaultWidth: 150
    },
    {
        fieldName: "erpItemDeliveryInfo.destination",
        headerName: "주소",
        defaultWidth: 250
    },
    {
        fieldName: "erpItemDeliveryInfo.destinationDetail",
        headerName: "주소 상세",
        defaultWidth: 150
    },
    {
        fieldName: "erpItemOrderInfo.salesChannel",
        headerName: "판매채널",
        defaultWidth: 150
    },
    {
        fieldName: "erpItemOrderInfo.orderNumber1",
        headerName: "주문번호1",
        defaultWidth: 150
    },
    {
        fieldName: "erpItemOrderInfo.orderNumber2",
        headerName: "주문번호2",
        defaultWidth: 150
    },
    {
        fieldName: "erpItemOrderInfo.channelProdCode",
        headerName: "상품코드",
        defaultWidth: 150
    },
    {
        fieldName: "erpItemOrderInfo.channelOptionCode",
        headerName: "옵션코드",
        defaultWidth: 150
    },
    {
        fieldName: "erpItemDeliveryInfo.zipCode",
        headerName: "우편번호",
        defaultWidth: 150
    },
    {
        fieldName: "erpItemDeliveryInfo.courier",
        headerName: "택배사",
        defaultWidth: 150
    },
    {
        fieldName: "erpItemDeliveryInfo.transportType",
        headerName: "배송방식",
        defaultWidth: 150
    },
    {
        fieldName: "erpItemDeliveryInfo.deliveryMessage",
        headerName: "배송메세지",
        defaultWidth: 200
    },
    {
        fieldName: "erpItemDeliveryInfo.waybillNumber",
        headerName: "운송장번호",
        defaultWidth: 150
    },
    {
        fieldName: "erpItemOrderInfo.price",
        headerName: "판매금액",
        defaultWidth: 100
    },
    {
        fieldName: "erpItemOrderInfo.deliveryCharge",
        headerName: "배송비",
        defaultWidth: 100
    },
    {
        fieldName: "erpItemOrderInfo.barcode",
        headerName: "바코드",
        defaultWidth: 150
    },
    {
        fieldName: "erpItem.prodCode",
        headerName: "[M] 상품코드",
        defaultWidth: 150
    },
    {
        fieldName: "erpItem.optionCode",
        headerName: "[M] 옵션코드",
        defaultWidth: 150
    },
    {
        fieldName: "erpItem.releaseOptionCode",
        headerName: "[M] 출고옵션코드",
        defaultWidth: 150
    },
    {
        fieldName: "erpItemManagementMemo.managementMemo1",
        headerName: "관리메모1",
        defaultWidth: 150
    },
    {
        fieldName: "erpItemManagementMemo.managementMemo2",
        headerName: "관리메모2",
        defaultWidth: 150
    },
    {
        fieldName: "erpItemManagementMemo.managementMemo3",
        headerName: "관리메모3",
        defaultWidth: 150
    },
    {
        fieldName: "erpItemManagementMemo.managementMemo4",
        headerName: "관리메모4",
        defaultWidth: 150
    },
    {
        fieldName: "erpItemManagementMemo.managementMemo5",
        headerName: "관리메모5",
        defaultWidth: 150
    },
    {
        fieldName: "erpItemManagementMemo.managementMemo6",
        headerName: "관리메모6",
        defaultWidth: 150
    },
    {
        fieldName: "erpItemManagementMemo.managementMemo7",
        headerName: "관리메모7",
        defaultWidth: 150
    },
    {
        fieldName: "erpItemManagementMemo.managementMemo8",
        headerName: "관리메모8",
        defaultWidth: 150
    },
    {
        fieldName: "erpItemManagementMemo.managementMemo9",
        headerName: "관리메모9",
        defaultWidth: 150
    },
    {
        fieldName: "erpItemManagementMemo.managementMemo10",
        headerName: "관리메모10",
        defaultWidth: 150
    },
];