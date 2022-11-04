import Image from "next/image";
import { useState } from "react";
import valueUtils from "../../../utils/valueUtils";
import SingleBlockButton from "../../modules/button/SingleBlockButton";
import CommonModalComponent from "../../modules/modal/CommonModalComponent";
import ResizableTh from "../../modules/table/ResizableTh";
import ModifyUploadHeaderDetailsModalComponent from "./modal/ModifyUploadHeaderDetailsModal.component";
import { ButtonGroup, Container, TableBox, TableWrapper, Title, Wrapper } from "./styles/UploadField.styled";

export default function UploadFieldComponent({
    excelTranslatorHeader,
    onSubmitModifyUploadHeaderDetail
}) {
    const [modifyUploadHeaderDetailsModalOpen, setModifyUploadHeaderDetailsModalOpen] = useState(false);

    const __handle = {
        action: {
            openModifyUploadHeaderDetailsModal: () => {
                setModifyUploadHeaderDetailsModalOpen(true);
            },
            closeModifyUploadHeaderDetailsModal: () => {
                setModifyUploadHeaderDetailsModalOpen(false);
            }
        },
        submit: {
            modifyUploadHeaderDetail: (uploadHeaderDetail) => {
                let body = {
                    id: excelTranslatorHeader.id,
                    uploadHeaderDetail: uploadHeaderDetail
                }

                onSubmitModifyUploadHeaderDetail({
                    body: body,
                    successCallback: () => {
                        __handle.action.closeModifyUploadHeaderDetailsModal();
                    }
                })
            }
        }
    }

    return (
        <>
            <Container>
                <Wrapper>
                    <Title>
                        업로드 엑셀
                    </Title>
                    <ButtonGroup className='mgl-flex'>
                        <div className='wrapper'>
                            <SingleBlockButton
                                type='button'
                                className='icon-button'
                            >
                                <div className='button-icon-figure'>
                                    <Image
                                        loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                        src={'/images/icon/download_default_808080.svg'}
                                        layout='responsive'
                                        width={1}
                                        height={1}
                                        objectFit={'cover'}
                                        alt='image'
                                        loading='lazy'
                                    ></Image>
                                </div>
                            </SingleBlockButton>
                            <SingleBlockButton
                                type='button'
                                className='icon-button'
                                onClick={() => __handle.action.openModifyUploadHeaderDetailsModal()}
                            >
                                <div className='button-icon-figure'>
                                    <Image
                                        loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                        src={'/images/icon/settings_default_808080.svg'}
                                        layout='responsive'
                                        width={1}
                                        height={1}
                                        objectFit={'cover'}
                                        alt='image'
                                        loading='lazy'
                                    ></Image>
                                </div>
                            </SingleBlockButton>
                        </div>
                    </ButtonGroup>
                    {!valueUtils.isEmptyValues(excelTranslatorHeader?.uploadHeaderDetail?.details) &&
                        (
                            <Table
                                uploadHeaderDetail={excelTranslatorHeader?.uploadHeaderDetail}
                            />
                        )
                    }
                    {valueUtils.isEmptyValues(excelTranslatorHeader?.uploadHeaderDetail?.details) &&
                        (
                            <TableWrapper>
                                <div className='empty-box'>
                                    <div className='text'>
                                        <span className='accent'>업로드 엑셀 &gt; 우측 상단</span>
                                        <div className='icon-figure'>
                                            <Image
                                                loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                                src={'/images/icon/settings_default_808080.svg'}
                                                layout='responsive'
                                                width={1}
                                                height={1}
                                                objectFit={'cover'}
                                                alt='image'
                                                loading='lazy'
                                            ></Image>
                                        </div>
                                        <span className='accent'>버튼</span>
                                    </div>
                                    <div className='text'>
                                        을 통해 양식을 먼저 설정해 주세요.
                                    </div>
                                </div>
                            </TableWrapper>
                        )
                    }
                </Wrapper>
            </Container>

            {modifyUploadHeaderDetailsModalOpen &&
                <CommonModalComponent
                    open={modifyUploadHeaderDetailsModalOpen}

                    onClose={__handle.action.closeModifyUploadHeaderDetailsModal}
                >
                    <ModifyUploadHeaderDetailsModalComponent
                        excelTranslatorHeader={excelTranslatorHeader}
                        onClose={__handle.action.closeModifyUploadHeaderDetailsModal}
                        onConfirm={__handle.submit.modifyUploadHeaderDetail}
                    />
                </CommonModalComponent>
            }
        </>
    );
}

function Table({
    uploadHeaderDetail
}) {
    return (
        <TableWrapper>
            <TableBox>
                <table
                    cellSpacing={0}
                >
                    <TableHead
                        uploadHeaderDetail={uploadHeaderDetail}
                    />
                    {/* <tbody>
                        {rentalOrderProducts?.map((r, index) => {
                            let pDate = dateFormatUtils().dateFromDateAndHH_mm(r.rentalOrderInfo.pickupDate, r.rentalOrderInfo.pickupTime);
                            let rDate = dateFormatUtils().dateFromDateAndHH_mm(r.rentalOrderInfo.returnDate, r.rentalOrderInfo.returnTime);
                            let diffHours = dateFormatUtils().getDiffHoursFromDates(pDate, rDate);

                            return (
                                <tr
                                    key={r.id}
                                    onClick={() => onActionSelectOne(r.id)}
                                >
                                    <td
                                        className='fixed-col-left'
                                    >
                                        <input
                                            type='checkbox'
                                            checked={selectIds.includes(r.id) || false}
                                            readOnly
                                        ></input>
                                    </td>
                                    <td
                                        className='fixed-col-left'
                                        style={{
                                            left: '50px'
                                        }}
                                    >{dateFormatUtils().dateToYYMMDDHHmmss(r.rentalOrderInfo.createdAt, 'Invalid Date')}</td>
                                    <td
                                        className='fixed-col-left'
                                        style={{
                                            left: '180px',
                                            width: '130px'
                                        }}
                                    >
                                        {r.rentalOrderInfo.borrower}
                                    </td>
                                    <td>{r.rentalOrderInfo.borrowerPhoneNumber}</td>
                                    <td>{r.productName}</td>
                                    <td>{r.unit} 개</td>
                                    <td>{dateFormatUtils().dateToYYMMDD(r.rentalOrderInfo.pickupDate, 'Invalid Date')} {r.rentalOrderInfo.pickupTime}</td>
                                    <td>{dateFormatUtils().dateToYYMMDD(r.rentalOrderInfo.returnDate, 'Invalid Date')} {r.rentalOrderInfo.returnTime}</td>
                                    <td>{r.rentalOrderInfo.pickupPlace}</td>
                                    <td>{r.rentalOrderInfo.returnPlace}</td>
                                    <td>{diffHours}H</td>
                                    <td>{numberFormatHandler().numberWithCommas(r.price || 0)} 원</td>
                                    <td>{r.discountYn === 'y' && (diffHours >= r.discountMinimumHour) ? r.discountRate : '0'} %</td>
                                    <td>

                                        {
                                            numberFormatHandler().numberWithCommas(__ext_calcTotalPrice({
                                                price: r.price,
                                                unit: r.unit,
                                                diffHours: diffHours,
                                                discountYn: r.discountYn,
                                                discountRate: r.discountRate,
                                                discountMinimumHour: r.discountMinimumHour
                                            }) || 0)
                                        } 원
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody> */}
                </table>
            </TableBox>
        </TableWrapper>
    );
}

function TableHead({
    uploadHeaderDetail
}) {
    return (
        <thead>
            <tr>
                {uploadHeaderDetail?.details?.map((r, index) => {
                    return (
                        <ResizableTh
                            key={index}
                            className="fixed-header"
                            scope="col"
                            width={150}
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
    );
}