import { useState } from "react";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import CustomImage from "../../../../modules/image/CustomImage";
import ConfirmModalComponentV2 from "../../../../modules/modal/ConfirmModalComponentV2";
import InfiniteScrollObserver from "../../../../modules/observer/InfiniteScrollObserver";
import ResizableTh from "../../../../modules/table/ResizableTh";
import { Container, ControlWrapper, CountBox, DeleteTd, TableBox, TableWrapper } from "./styles/UploadDataListField.styled";

const TABLE_DATA_VIEW_SIZE = 50;
const TABLE_DATA_INC_DEC_SIZE = 30;

export default function UploadDataListFieldComponent({
    uploadDatas,
    onActionDeleteUploadData,
    onActionDeleteUploadDataAll,
    onSubmitSaveUploadDatas
}) {
    const handleSubmitSaveDatas = (e) => {
        e.preventDefault();

        onSubmitSaveUploadDatas(uploadDatas);
    }

    return (
        <>
            <Container>
                <ControlWrapper>
                    <CountBox><span className='accent'>{uploadDatas.length}</span> 건</CountBox>
                    <SingleBlockButton
                        type='button'
                        className='button-item'
                        onClick={(e) => handleSubmitSaveDatas(e)}
                    >
                        데이터 저장
                    </SingleBlockButton>
                </ControlWrapper>
                <Table
                    uploadDatas={uploadDatas}
                    onActionDeleteUploadData={onActionDeleteUploadData}
                    onActionDeleteUploadDataAll={onActionDeleteUploadDataAll}
                />
            </Container>
        </>
    );
}

function Table({
    uploadDatas,
    onActionDeleteUploadData,
    onActionDeleteUploadDataAll
}) {
    const [viewSize, setViewSize] = useState(TABLE_DATA_VIEW_SIZE);
    const [deleteAllModalOpen, setDeleteAllModalOpen] = useState(false);

    const handleFetchMoreItemsView = () => {
        let newViewSize = viewSize + TABLE_DATA_INC_DEC_SIZE;

        setViewSize(newViewSize);
    }

    const handleOpenDeleteAllModal = () => {
        if (uploadDatas?.length > 0) {
            setDeleteAllModalOpen(true);
        }
    }

    const handleCloseDeleteAllModal = () => {
        setDeleteAllModalOpen(false);
    }

    const handleSubmitDeleteAll = () => {
        onActionDeleteUploadDataAll();
        handleCloseDeleteAllModal();
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
                                <th
                                    className="fixed-header"
                                    width={50}
                                    scope="col"
                                    style={{
                                        zIndex: '10',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => handleOpenDeleteAllModal()}
                                >
                                    삭제
                                </th>
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
                                    >
                                        <DeleteTd>
                                            <button
                                                type='button'
                                                className='button-item'
                                                onClick={() => onActionDeleteUploadData(index)}
                                            >
                                                <CustomImage
                                                    src='/images/icon/delete_default_e56767.svg'
                                                />
                                            </button>
                                        </DeleteTd>
                                        {TABLE_HEADERS?.map(header => {
                                            return (
                                                <td key={header.fieldName}>
                                                    {data[header.fieldName]}
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
            {deleteAllModalOpen &&
                <ConfirmModalComponentV2
                    open={deleteAllModalOpen}
                    onClose={handleCloseDeleteAllModal}
                    onConfirm={handleSubmitDeleteAll}
                    title={'삭제 확인메세지'}
                    message={`${uploadDatas?.length} 건의 데이터를 모두 삭제 합니다.`}
                    confirmBtnStyle={{
                        background: 'var(--defaultRedColor)'
                    }}
                />
            }
        </>
    );
}

const TABLE_HEADERS = [
    {
        fieldName: "channelOrderDate",
        headerName: "판매채널 주문일시",
        defaultWidth: 150
    },
    {
        fieldName: "prodName",
        headerName: "상품명",
        defaultWidth: 250
    },
    {
        fieldName: "optionName",
        headerName: "옵션정보",
        defaultWidth: 200
    },
    {
        fieldName: "unit",
        headerName: "수량",
        defaultWidth: 50
    },
    {
        fieldName: "receiver",
        headerName: "수취인명",
        defaultWidth: 80
    },
    {
        fieldName: "receiverContact1",
        headerName: "전화번호1",
        defaultWidth: 150
    },
    {
        fieldName: "receiverContact2",
        headerName: "전화번호2",
        defaultWidth: 150
    },
    {
        fieldName: "destination",
        headerName: "주소",
        defaultWidth: 250
    },
    {
        fieldName: "destinationDetail",
        headerName: "주소 상세",
        defaultWidth: 150
    },
    {
        fieldName: "salesChannel",
        headerName: "판매채널",
        defaultWidth: 150
    },
    {
        fieldName: "orderNumber1",
        headerName: "주문번호1",
        defaultWidth: 150
    },
    {
        fieldName: "orderNumber2",
        headerName: "주문번호2",
        defaultWidth: 150
    },
    {
        fieldName: "channelProdCode",
        headerName: "상품코드",
        defaultWidth: 150
    },
    {
        fieldName: "channelOptionCode",
        headerName: "옵션코드",
        defaultWidth: 150
    },
    {
        fieldName: "zipCode",
        headerName: "우편번호",
        defaultWidth: 150
    },
    {
        fieldName: "courier",
        headerName: "택배사",
        defaultWidth: 150
    },
    {
        fieldName: "transportType",
        headerName: "배송방식",
        defaultWidth: 150
    },
    {
        fieldName: "deliveryMessage",
        headerName: "배송메세지",
        defaultWidth: 200
    },
    {
        fieldName: "waybillNumber",
        headerName: "운송장번호",
        defaultWidth: 150
    },
    {
        fieldName: "price",
        headerName: "판매금액",
        defaultWidth: 100
    },
    {
        fieldName: "deliveryCharge",
        headerName: "배송비",
        defaultWidth: 100
    },
    {
        fieldName: "barcode",
        headerName: "바코드",
        defaultWidth: 150
    },
    {
        fieldName: "prodCode",
        headerName: "[M] 상품코드",
        defaultWidth: 150
    },
    {
        fieldName: "optionCode",
        headerName: "[M] 옵션코드",
        defaultWidth: 150
    },
    {
        fieldName: "releaseOptionCode",
        headerName: "[M] 출고옵션코드",
        defaultWidth: 150
    },
    {
        fieldName: "managementMemo1",
        headerName: "관리메모1",
        defaultWidth: 150
    },
    {
        fieldName: "managementMemo2",
        headerName: "관리메모2",
        defaultWidth: 150
    },
    {
        fieldName: "managementMemo3",
        headerName: "관리메모3",
        defaultWidth: 150
    },
    {
        fieldName: "managementMemo4",
        headerName: "관리메모4",
        defaultWidth: 150
    },
    {
        fieldName: "managementMemo5",
        headerName: "관리메모5",
        defaultWidth: 150
    },
    {
        fieldName: "managementMemo6",
        headerName: "관리메모6",
        defaultWidth: 150
    },
    {
        fieldName: "managementMemo7",
        headerName: "관리메모7",
        defaultWidth: 150
    },
    {
        fieldName: "managementMemo8",
        headerName: "관리메모8",
        defaultWidth: 150
    },
    {
        fieldName: "managementMemo9",
        headerName: "관리메모9",
        defaultWidth: 150
    },
    {
        fieldName: "managementMemo10",
        headerName: "관리메모10",
        defaultWidth: 150
    },
];