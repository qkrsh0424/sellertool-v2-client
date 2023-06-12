import { useEffect, useState } from "react";
import { dateToYYYYMMDDhhmmss } from "../../../../../../utils/dateFormatUtils";
import { numberFormatUtils } from "../../../../../../utils/numberFormatUtils";
import SingleBlockButton from "../../../../../modules/button/SingleBlockButton";
import CustomImage from "../../../../../modules/image/CustomImage";
import useSingleUploadDatasForm from "../hooks/useSingleUploadDatasForm";
import { AddButtonBox, Container, CountBox, ControlTd, SubmitButtonContainer, TableBox, TableWrapper } from "../styles/SingleUploaderModal.styled";
import EditChannelOrderDateModalComponent from "./EditChannelOrderDateModal.component";
import { CustomDialog } from "../../../../../../components/dialog/v1/CustomDialog";
import ResizableTh from "../../../../../../components/table/th/v1/ResizableTh";

export default function SingleUploaderModalComponent({
    open = false,
    onClose = () => { },
    onConfirm
}) {
    const {
        singleUploadDatasForm,
        onAddSingleUploadData,
        onDeleteSingleUploadData,
        onCopySingleUploadData,
        onChangeOptionValueOfName,
        onChangeChannelOrderDate,
        onChangeChannelOrderDateAll,
        onChangeNumberValueOfName,
        checkSubmitFormatValid
    } = useSingleUploadDatasForm();

    const [targetIndex, setTargetIndex] = useState(null);
    const [editChannelOrderDateModalOpen, setEditChannelOrderDateModalOpen] = useState(false);
    const [editAllChannelOrderDateModalOpen, setEditAllChannelOrderDateModalOpen] = useState(false);

    useEffect(() => {
        onAddSingleUploadData(getInitialSingleUploadData());
    }, []);

    const handleAddSingleUploadData = () => {
        onAddSingleUploadData(getInitialSingleUploadData());
    }

    const handleDeleteSingleUploadData = (reqIndex) => {
        onDeleteSingleUploadData(reqIndex);
    }

    const handleSubmitConfirm = (e) => {
        e.preventDefault();
        try {
            checkSubmitFormatValid();
        } catch (err) {
            alert(err.message);
            return;
        }
        onConfirm(singleUploadDatasForm);
        onClose();
    }

    const toggleEditChannelOrderDateModalOpen = (setOpen, idx) => {
        if (setOpen) {
            setTargetIndex(idx);
        } else {
            setTargetIndex(null);
        }
        setEditChannelOrderDateModalOpen(setOpen);
    }

    const toggleEditAllChannelOrderDateModalOpen = (setOpen) => {
        setEditAllChannelOrderDateModalOpen(setOpen);
    }

    const handleChangeChannelOrderDate = (value) => {
        onChangeChannelOrderDate(value, targetIndex);
        toggleEditChannelOrderDateModalOpen(false);
    }

    const handleChangeChannelOrderDateAll = (value) => {
        onChangeChannelOrderDateAll(value);
        toggleEditAllChannelOrderDateModalOpen(false);
    }

    return (
        <>
            <CustomDialog
                open={open}
                maxWidth="lg"
            >
                <CustomDialog.CloseButton onClose={() => onClose()} />
                <CustomDialog.Title>발주단건등록</CustomDialog.Title>
                <Container>
                    <AddButtonBox>
                        <CountBox>
                            <span className='accent'>{singleUploadDatasForm?.length}</span> 건
                        </CountBox>
                        <SingleBlockButton
                            type='button'
                            className='button-item'
                            onClick={() => handleAddSingleUploadData()}
                        >
                            <div className='button-icon-figure'>
                                <CustomImage
                                    src='/images/icon/add_default_ffffff.svg'
                                />
                            </div>
                        </SingleBlockButton>
                    </AddButtonBox>
                    <form onSubmit={(e) => handleSubmitConfirm(e)}>
                        <Table
                            uploadDatas={singleUploadDatasForm}
                            onActionDeleteUploadData={handleDeleteSingleUploadData}
                            onActionCopyUploadData={onCopySingleUploadData}
                            onChangeOptionValueOfName={onChangeOptionValueOfName}
                            onChangeNumberValueOfName={onChangeNumberValueOfName}
                            toggleEditChannelOrderDateModalOpen={toggleEditChannelOrderDateModalOpen}
                            toggleEditAllChannelOrderDateModalOpen={toggleEditAllChannelOrderDateModalOpen}
                        />
                        <SubmitButtonContainer>
                            <SingleBlockButton
                                type='button'
                                className='button-item'
                                style={{
                                    width: '40%',
                                    background: 'var(--defaultModalCloseColor)'
                                }}
                                onClick={() => onClose()}
                            >
                                취소
                            </SingleBlockButton>
                            <SingleBlockButton
                                type='submit'
                                className='button-item'
                                style={{
                                    flex: 1,
                                    background: 'var(--mainColor)'
                                }}
                            >
                                확인
                            </SingleBlockButton>
                        </SubmitButtonContainer>
                    </form>
                </Container>
            </CustomDialog>

            {editChannelOrderDateModalOpen &&
                <EditChannelOrderDateModalComponent
                    open={editChannelOrderDateModalOpen}
                    channelOrderDate={singleUploadDatasForm[targetIndex]?.channelOrderDate}
                    onClose={() => toggleEditChannelOrderDateModalOpen(false)}
                    onConfirm={(value) => handleChangeChannelOrderDate(value)}
                />
            }

            {editAllChannelOrderDateModalOpen &&
                <EditChannelOrderDateModalComponent
                    open={editAllChannelOrderDateModalOpen}
                    channelOrderDate={null}
                    onClose={() => toggleEditAllChannelOrderDateModalOpen(false)}
                    onConfirm={(value) => handleChangeChannelOrderDateAll(value)}
                />
            }
        </>
    );
}

function Table({
    uploadDatas,
    onActionDeleteUploadData,
    onActionCopyUploadData,
    onChangeOptionValueOfName,
    onChangeNumberValueOfName,
    toggleEditChannelOrderDateModalOpen,
    toggleEditAllChannelOrderDateModalOpen
}) {
    return (
        <TableWrapper>
            <TableBox>
                <table
                    cellSpacing={0}
                >
                    <TableHead
                        toggleEditAllChannelOrderDateModalOpen={toggleEditAllChannelOrderDateModalOpen}
                    />
                    <tbody>
                        {uploadDatas?.map((data, index) => {
                            return (
                                <tr
                                    key={index}
                                >
                                    <td>
                                        {index + 1}
                                    </td>
                                    <ControlTd>
                                        <button
                                            type='button'
                                            className='button-item'
                                            onClick={() => onActionDeleteUploadData(index)}
                                        >
                                            <CustomImage
                                                src='/images/icon/delete_default_e56767.svg'
                                            />
                                        </button>
                                    </ControlTd>
                                    <ControlTd>
                                        <button
                                            type='button'
                                            className='button-item'
                                            onClick={() => onActionCopyUploadData(index)}
                                        >
                                            <CustomImage
                                                src='/images/icon/copy_default_418cff.svg'
                                            />
                                        </button>
                                    </ControlTd>
                                    {HEADERS?.map((header) => {
                                        if (header.fieldName === 'unit' || header.fieldName === 'price' || header.fieldName === 'deliveryCharge') {
                                            return (
                                                <td
                                                    key={header.fieldName}
                                                >
                                                    <input
                                                        type='text'
                                                        className='input-item'
                                                        name={header.fieldName}
                                                        value={numberFormatUtils.numberWithCommas(data[header.fieldName])}
                                                        placeholder={`${header.headerName}을(를) 입력`}
                                                        onChange={(e) => onChangeNumberValueOfName(e, index)}
                                                    ></input>
                                                </td>
                                            );
                                        }

                                        if (header.fieldName === 'channelOrderDate') {
                                            return (
                                                <td
                                                    key={header.fieldName}
                                                >
                                                    <SingleBlockButton
                                                        type='button'
                                                        className='button-item'
                                                        onClick={() => toggleEditChannelOrderDateModalOpen(true, index)}
                                                    >
                                                        {data[header.fieldName] ? dateToYYYYMMDDhhmmss(data[header.fieldName]) : ''}
                                                    </SingleBlockButton>
                                                </td>
                                            );
                                        }

                                        return (
                                            <td
                                                key={header.fieldName}
                                            >
                                                <input
                                                    type='text'
                                                    className='input-item'
                                                    name={header.fieldName}
                                                    value={data[header.fieldName]}
                                                    placeholder={`${header.headerName}을(를) 입력`}
                                                    onChange={(e) => onChangeOptionValueOfName(e, index)}
                                                ></input>
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </TableBox>
        </TableWrapper>
    );
}

function TableHead({
    toggleEditAllChannelOrderDateModalOpen
}) {
    return (
        <thead>
            <tr>
                <th
                    className="fixed-header"
                    width={50}
                    scope="col"
                    style={{
                        zIndex: '10'
                    }}
                >
                    No.
                </th>
                <th
                    className="fixed-header"
                    width={50}
                    scope="col"
                    style={{
                        zIndex: '10'
                    }}
                >
                    삭제
                </th>
                <th
                    className="fixed-header"
                    width={50}
                    scope="col"
                    style={{
                        zIndex: '10'
                    }}
                >
                    복사
                </th>
                {HEADERS?.map((r, index) => {
                    if (r.fieldName === 'channelOrderDate') {
                        return (
                            <ResizableTh
                                key={index}
                                className="fixed-header"
                                scope="col"
                                width={r.defaultWidth}
                                style={{
                                    zIndex: '10',
                                    color: r.requiredFlag ? 'var(--defaultRedColor)' : ''
                                }}
                            >
                                <div className='mgl-flex mgl-flex-justifyContent-center mgl-flex-alignItems-center'>
                                    {r.required &&
                                        <span className='required-tag'></span>
                                    }
                                    {r.headerName}
                                    <SingleBlockButton
                                        type='button'
                                        className='control-button-item'
                                        onClick={() => toggleEditAllChannelOrderDateModalOpen(true)}
                                    >
                                        <div className='icon-figure'>
                                            <CustomImage
                                                src={'/images/icon/edit_note_808080.svg'}
                                            />
                                        </div>
                                    </SingleBlockButton>
                                </div>
                            </ResizableTh>
                        )
                    }
                    return (
                        <ResizableTh
                            key={index}
                            className="fixed-header"
                            scope="col"
                            width={r.defaultWidth}
                            style={{
                                zIndex: '10',
                                color: r.requiredFlag ? 'var(--defaultRedColor)' : ''
                            }}
                        >
                            {r.headerName} {r.requiredFlag && '(필수)'}
                        </ResizableTh>
                    )
                })}
            </tr>
        </thead>
    );
}

const HEADERS = [
    {
        fieldName: "channelOrderDate",
        headerName: "판매채널 주문일시",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'datetime',
    },
    {
        fieldName: "prodName",
        headerName: "상품명",
        defaultWidth: 150,
        requiredFlag: true,
        valueType: 'string',
    },
    {
        fieldName: "optionName",
        headerName: "옵션정보",
        defaultWidth: 150,
        requiredFlag: true,
        valueType: 'string',
    },
    {
        fieldName: "unit",
        headerName: "수량",
        defaultWidth: 150,
        requiredFlag: true,
        valueType: 'number',
    },
    {
        fieldName: "receiver",
        headerName: "수취인명",
        defaultWidth: 150,
        requiredFlag: true,
        valueType: 'string',
    },
    {
        fieldName: "receiverContact1",
        headerName: "전화번호1",
        defaultWidth: 150,
        requiredFlag: true,
        valueType: 'string',
    },
    {
        fieldName: "receiverContact2",
        headerName: "전화번호2",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'string',
    },
    {
        fieldName: "destination",
        headerName: "주소",
        defaultWidth: 150,
        requiredFlag: true,
        valueType: 'string',
    },
    {
        fieldName: "destinationDetail",
        headerName: "주소 상세",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'string',
    },
    {
        fieldName: "salesChannel",
        headerName: "판매채널",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'string',
    },
    {
        fieldName: "orderNumber1",
        headerName: "주문번호1",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'string',
    },
    {
        fieldName: "orderNumber2",
        headerName: "주문번호2",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'string',
    },
    {
        fieldName: "channelProdCode",
        headerName: "상품코드",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'string',
    },
    {
        fieldName: "channelOptionCode",
        headerName: "옵션코드",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'string',
    },
    {
        fieldName: "zipCode",
        headerName: "우편번호",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'string',
    },
    {
        fieldName: "courier",
        headerName: "택배사",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'string',
    },
    {
        fieldName: "transportType",
        headerName: "배송방식",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'string',
    },
    {
        fieldName: "deliveryMessage",
        headerName: "배송메세지",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'string',
    },
    {
        fieldName: "waybillNumber",
        headerName: "운송장번호",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'string',
    },
    {
        fieldName: "price",
        headerName: "판매금액",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'number',
    },
    {
        fieldName: "deliveryCharge",
        headerName: "배송비",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'number',
    },
    {
        fieldName: "barcode",
        headerName: "바코드",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'string',
    },
    {
        fieldName: "prodCode",
        headerName: "[M] 상품코드",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'string',
    },
    {
        fieldName: "optionCode",
        headerName: "[M] 옵션코드",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'string',
    },
    {
        fieldName: "releaseOptionCode",
        headerName: "[M] 출고옵션코드",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'string',
    },
    {
        fieldName: "managementMemo1",
        headerName: "관리메모1",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'string',
    },
    {
        fieldName: "managementMemo2",
        headerName: "관리메모2",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'string',
    },
    {
        fieldName: "managementMemo3",
        headerName: "관리메모3",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'string',
    },
    {
        fieldName: "managementMemo4",
        headerName: "관리메모4",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'string',
    },
    {
        fieldName: "managementMemo5",
        headerName: "관리메모5",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'string',
    },
    {
        fieldName: "managementMemo6",
        headerName: "관리메모6",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'string',
    },
    {
        fieldName: "managementMemo7",
        headerName: "관리메모7",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'string',
    },
    {
        fieldName: "managementMemo8",
        headerName: "관리메모8",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'string',
    },
    {
        fieldName: "managementMemo9",
        headerName: "관리메모9",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'string',
    },
    {
        fieldName: "managementMemo10",
        headerName: "관리메모10",
        defaultWidth: 150,
        requiredFlag: false,
        valueType: 'string',
    },
];

const getInitialSingleUploadData = () => {
    return {
        channelOrderDate: dateToYYYYMMDDhhmmss(new Date()),
        prodName: "",
        optionName: "",
        unit: "0",
        receiver: "",
        receiverContact1: "",
        receiverContact2: "",
        destination: "",
        destinationDetail: "",
        salesChannel: "",
        orderNumber1: "",
        orderNumber2: "",
        channelProdCode: "",
        channelOptionCode: "",
        zipCode: "",
        courier: "",
        transportType: "",
        deliveryMessage: "",
        waybillNumber: "",
        price: "0",
        deliveryCharge: "0",
        barcode: "",
        prodCode: "",
        optionCode: "",
        releaseOptionCode: "",
        releaseLocation: "",
        managementMemo1: "",
        managementMemo2: "",
        managementMemo3: "",
        managementMemo4: "",
        managementMemo5: "",
        managementMemo6: "",
        managementMemo7: "",
        managementMemo8: "",
        managementMemo9: "",
        managementMemo10: "",
    }
}