import { useState } from "react";
import CustomBlockButton from "../../../../../components/buttons/block-button/v1/CustomBlockButton";
import { Container, ModalContentContainer, Wrapper } from "./TipField.styled";
import { CustomDialog } from "../../../../../components/dialog/v1/CustomDialog";

export default function TipFieldComponent(props) {
    const [cellNoticeModalOpen, setCellNoticeModalOpen] = useState(false);
    const [selectedFieldName, setSelectedFieldName] = useState('channelOrderDate');

    const toggleCellNoticeModalOpen = (setOpen) => {
        setCellNoticeModalOpen(setOpen);
    }
    return (
        <>
            <Container>
                <Wrapper>
                    <div className='title'>
                        주문수집 TIP
                    </div>
                    <ul>
                        <li>
                            <CustomBlockButton
                                type='button'
                                className='cell-notice-modal-button'
                                onClick={() => toggleCellNoticeModalOpen(true)}
                            >필드별 유의사항</CustomBlockButton>
                        </li>
                        <li><b>데이터의 중복 업로드</b>를 방지하시려면 <b className='accent'>&quot;주문번호1&quot;</b> 을 반드시 기입해 주세요.</li>
                        <li>셀러툴의 <b>관리 상품 정보들과 자동으로 매칭</b>되기를 원하시면 <b className='accent'>&quot;[M] 옵션코드&quot;</b> 와 <b className='accent'>&quot;[M] 출고옵션코드&quot;</b> 를 반드시 기입해 주세요.</li>
                        <li>판매 분석을 통해 <b>판매 스토어별 통계자료</b>를 얻기 위해서는 <b className='accent'>&quot;판매채널&quot;</b> 을 반드시 기입해 주세요.</li>
                    </ul>
                </Wrapper>
            </Container>

            {cellNoticeModalOpen &&
                <CustomDialog
                    open={cellNoticeModalOpen}
                    onClose={() => toggleCellNoticeModalOpen(false)}
                >
                    <CustomDialog.CloseButton onClose={() => toggleCellNoticeModalOpen(false)} />
                    <CustomDialog.Title>필드별 유의사항</CustomDialog.Title>
                    <ModalContentContainer>
                        <div className='fieldNameList-wrapper'>
                            <div style={{ fontSize: '12px', marginBottom: '10px' }}>
                                <span style={{ color: 'var(--defaultRedColor)' }}>*</span> 는 필수 값 입니다.
                            </div>
                            {TABLE_HEADERS?.map(header => {
                                return (
                                    <>
                                        <button
                                            type='button'
                                            className={`select-button ${header?.fieldName === selectedFieldName ? 'selected' : ''}`}
                                            onClick={() => { setSelectedFieldName(header?.fieldName) }}
                                        >
                                            {header?.required && <span style={{ color: 'var(--defaultRedColor)' }}>*</span>} {header?.headerName}
                                        </button>
                                    </>
                                );
                            })}
                        </div>
                        <div className='description-wrapper'>
                            {TABLE_HEADERS?.find(r => r.fieldName === selectedFieldName)?.tip}
                        </div>
                    </ModalContentContainer>
                </CustomDialog>
            }
        </>
    );
}

const TABLE_HEADERS = [
    {
        fieldName: "channelOrderDate",
        headerName: "판매채널 주문일시",
        defaultWidth: 150,
        required: false,
        tip: (
            <>
                <div className='label'>판매채널 주문일시 필드는 아래의 형식을 참고해주세요.</div>
                <ul>
                    <li>필수값 여부 : 선택</li>
                    <li>
                        허용 데이터 형식 :
                        <ul>
                            <li>yyyy-MM-dd</li>
                            <li>yyyy-MM-dd HH:mm:ss</li>
                            <li>yyyy/MM/dd HH:mm:ss</li>
                            <li>yyyy.MM.dd HH:mm:ss</li>
                            <li>yyyy-MM-dd HH:mm</li>
                            <li>yyyy/MM/dd HH:mm</li>
                            <li>yyyy.MM.dd HH:mm</li>
                            <li>yyyy-MM-dd HH</li>
                            <li>yyyy/MM/dd HH</li>
                            <li>yyyy.MM.dd HH</li>
                            <li>yyyy-MM-dd</li>
                            <li>yyyy/MM/dd</li>
                            <li>yyyy.MM.dd</li>
                            <li>yy-MM-dd HH:mm:ss</li>
                            <li>yy/MM/dd HH:mm:ss</li>
                            <li>yy.MM.dd HH:mm:ss</li>
                            <li>yy-MM-dd HH:mm</li>
                            <li>yy/MM/dd HH:mm</li>
                            <li>yy.MM.dd HH:mm</li>
                            <li>yy-MM-dd HH</li>
                            <li>yy/MM/dd HH</li>
                            <li>yy.MM.dd HH</li>
                            <li>yy-MM-dd</li>
                            <li>yy/MM/dd</li>
                            <li>yy.MM.dd</li>
                        </ul>
                    </li>
                </ul>
            </>
        )
    },
    {
        fieldName: "prodName",
        headerName: "상품명",
        defaultWidth: 250,
        required: true,
        tip: (
            <>
                <div className='label'>상품명 필드는 아래의 형식을 참고해주세요.</div>
                <ul>
                    <li>필수값 여부 : 필수</li>
                    <li>데이터 타입 : 문자열</li>
                    <li>최소 글자수 : 1자</li>
                    <li>최대 글자수 : 300자</li>
                    <li>첫 글자 공백 허용 여부: 허용안함</li>
                    <li>마지막 글자 공백 허용 여부: 허용안함</li>
                </ul>
            </>
        )
    },
    {
        fieldName: "optionName",
        headerName: "옵션정보",
        defaultWidth: 200,
        required: true,
        tip: (
            <>
                <div className='label'>옵션정보 필드는 아래의 형식을 참고해주세요.</div>
                <ul>
                    <li>필수값 여부 : 필수</li>
                    <li>데이터 타입 : 문자열</li>
                    <li>최소 글자수 : 1자</li>
                    <li>최대 글자수 : 300자</li>
                    <li>첫 글자 공백 허용 여부: 허용안함</li>
                    <li>마지막 글자 공백 허용 여부: 허용안함</li>
                </ul>
            </>
        )
    },
    {
        fieldName: "unit",
        headerName: "수량",
        defaultWidth: 50,
        required: true,
        tip: (
            <>
                <div className='label'>수량 필드는 아래의 형식을 참고해주세요.</div>
                <ul>
                    <li>필수값 여부 : 필수</li>
                    <li>데이터 타입 : 숫자</li>
                    <li>최소 값 : 1</li>
                    <li>최대 값 : 99999</li>
                </ul>
            </>
        )
    },
    {
        fieldName: "receiver",
        headerName: "수취인명",
        defaultWidth: 80,
        required: true,
        tip: (
            <>
                <div className='label'>수취인명 필드는 아래의 형식을 참고해주세요.</div>
                <ul>
                    <li>필수값 여부 : 필수</li>
                    <li>데이터 타입 : 문자열</li>
                    <li>최소 글자수 : 1자</li>
                    <li>최대 글자수 : 50자</li>
                    <li>첫 글자 공백 허용 여부: 허용안함</li>
                    <li>마지막 글자 공백 허용 여부: 허용안함</li>
                </ul>
            </>
        )
    },
    {
        fieldName: "receiverContact1",
        headerName: "전화번호1",
        defaultWidth: 150,
        required: true,
        tip: (
            <>
                <div className='label'>전화번호1 필드는 아래의 형식을 참고해주세요.</div>
                <ul>
                    <li>필수값 여부 : 필수</li>
                    <li>데이터 타입 : 문자열</li>
                    <li>최소 글자수 : 1자</li>
                    <li>최대 글자수 : 20자</li>
                    <li>첫 글자 공백 허용 여부: 허용안함</li>
                    <li>마지막 글자 공백 허용 여부: 허용안함</li>
                </ul>
            </>
        )
    },
    {
        fieldName: "receiverContact2",
        headerName: "전화번호2",
        defaultWidth: 150,
        required: false,
        tip: (
            <>
                <div className='label'>전화번호2 필드는 아래의 형식을 참고해주세요.</div>
                <ul>
                    <li>필수값 여부 : 선택</li>
                    <li>데이터 타입 : 문자열</li>
                    <li>최소 글자수 : 0자</li>
                    <li>최대 글자수 : 20자</li>
                    <li>첫 글자 공백 허용 여부: 허용안함</li>
                    <li>마지막 글자 공백 허용 여부: 허용안함</li>
                </ul>
            </>
        )
    },
    {
        fieldName: "destination",
        headerName: "주소",
        defaultWidth: 250,
        required: true,
        tip: (
            <>
                <div className='label'>주소 필드는 아래의 형식을 참고해주세요.</div>
                <ul>
                    <li>필수값 여부 : 필수</li>
                    <li>데이터 타입 : 문자열</li>
                    <li>최소 글자수 : 1자</li>
                    <li>최대 글자수 : 255자</li>
                    <li>첫 글자 공백 허용 여부: 허용안함</li>
                    <li>마지막 글자 공백 허용 여부: 허용안함</li>
                </ul>
            </>
        )
    },
    {
        fieldName: "destinationDetail",
        headerName: "주소 상세",
        defaultWidth: 150,
        required: false,
        tip: (
            <>
                <div className='label'>주소 상세 필드는 아래의 형식을 참고해주세요.</div>
                <ul>
                    <li>필수값 여부 : 선택</li>
                    <li>데이터 타입 : 문자열</li>
                    <li>최소 글자수 : 0자</li>
                    <li>최대 글자수 : 255자</li>
                    <li>첫 글자 공백 허용 여부: 허용안함</li>
                    <li>마지막 글자 공백 허용 여부: 허용안함</li>
                </ul>
            </>
        )
    },
    {
        fieldName: "salesChannel",
        headerName: "판매채널",
        defaultWidth: 150,
        required: false,
        tip: (
            <>
                <div className='label'>판매채널 필드는 아래의 형식을 참고해주세요.</div>
                <ul>
                    <li>필수값 여부 : 선택</li>
                    <li>데이터 타입 : 문자열</li>
                    <li>최소 글자수 : 0자</li>
                    <li>최대 글자수 : 40자</li>
                    <li>첫 글자 공백 허용 여부: 허용안함</li>
                    <li>마지막 글자 공백 허용 여부: 허용안함</li>
                </ul>
            </>
        )
    },
    {
        fieldName: "orderNumber1",
        headerName: "주문번호1",
        defaultWidth: 150,
        required: false,
        tip: (
            <>
                <div className='label'>주문번호1 필드는 아래의 형식을 참고해주세요.</div>
                <ul>
                    <li>필수값 여부 : 선택</li>
                    <li>데이터 타입 : 문자열</li>
                    <li>최소 글자수 : 0자</li>
                    <li>최대 글자수 : 36자</li>
                    <li>첫 글자 공백 허용 여부: 허용안함</li>
                    <li>마지막 글자 공백 허용 여부: 허용안함</li>
                </ul>
            </>
        )
    },
    {
        fieldName: "orderNumber2",
        headerName: "주문번호2",
        defaultWidth: 150,
        required: false,
        tip: (
            <>
                <div className='label'>주문번호2 필드는 아래의 형식을 참고해주세요.</div>
                <ul>
                    <li>필수값 여부 : 선택</li>
                    <li>데이터 타입 : 문자열</li>
                    <li>최소 글자수 : 0자</li>
                    <li>최대 글자수 : 36자</li>
                    <li>첫 글자 공백 허용 여부: 허용안함</li>
                    <li>마지막 글자 공백 허용 여부: 허용안함</li>
                </ul>
            </>
        )
    },
    {
        fieldName: "channelProdCode",
        headerName: "상품코드",
        defaultWidth: 150,
        required: false,
        tip: (
            <>
                <div className='label'>상품코드 필드는 아래의 형식을 참고해주세요.</div>
                <ul>
                    <li>필수값 여부 : 선택</li>
                    <li>데이터 타입 : 문자열</li>
                    <li>최소 글자수 : 0자</li>
                    <li>최대 글자수 : 36자</li>
                    <li>첫 글자 공백 허용 여부: 허용안함</li>
                    <li>마지막 글자 공백 허용 여부: 허용안함</li>
                </ul>
            </>
        )
    },
    {
        fieldName: "channelOptionCode",
        headerName: "옵션코드",
        defaultWidth: 150,
        required: false,
        tip: (
            <>
                <div className='label'>옵션코드 필드는 아래의 형식을 참고해주세요.</div>
                <ul>
                    <li>필수값 여부 : 선택</li>
                    <li>데이터 타입 : 문자열</li>
                    <li>최소 글자수 : 0자</li>
                    <li>최대 글자수 : 36자</li>
                    <li>첫 글자 공백 허용 여부: 허용안함</li>
                    <li>마지막 글자 공백 허용 여부: 허용안함</li>
                </ul>
            </>
        )
    },
    {
        fieldName: "zipCode",
        headerName: "우편번호",
        defaultWidth: 150,
        required: false,
        tip: (
            <>
                <div className='label'>우편번호 필드는 아래의 형식을 참고해주세요.</div>
                <ul>
                    <li>필수값 여부 : 선택</li>
                    <li>데이터 타입 : 문자열</li>
                    <li>최소 글자수 : 0자</li>
                    <li>최대 글자수 : 15자</li>
                    <li>첫 글자 공백 허용 여부: 허용안함</li>
                    <li>마지막 글자 공백 허용 여부: 허용안함</li>
                </ul>
            </>
        )
    },
    {
        fieldName: "courier",
        headerName: "택배사",
        defaultWidth: 150,
        required: false,
        tip: (
            <>
                <div className='label'>택배사 필드는 아래의 형식을 참고해주세요.</div>
                <ul>
                    <li>필수값 여부 : 선택</li>
                    <li>데이터 타입 : 문자열</li>
                    <li>최소 글자수 : 0자</li>
                    <li>최대 글자수 : 45자</li>
                    <li>첫 글자 공백 허용 여부: 허용안함</li>
                    <li>마지막 글자 공백 허용 여부: 허용안함</li>
                </ul>
            </>
        )
    },
    {
        fieldName: "transportType",
        headerName: "배송방식",
        defaultWidth: 150,
        required: false,
        tip: (
            <>
                <div className='label'>배송방식 필드는 아래의 형식을 참고해주세요.</div>
                <ul>
                    <li>필수값 여부 : 선택</li>
                    <li>데이터 타입 : 문자열</li>
                    <li>최소 글자수 : 0자</li>
                    <li>최대 글자수 : 45자</li>
                    <li>첫 글자 공백 허용 여부: 허용안함</li>
                    <li>마지막 글자 공백 허용 여부: 허용안함</li>
                </ul>
            </>
        )
    },
    {
        fieldName: "deliveryMessage",
        headerName: "배송메세지",
        defaultWidth: 200,
        required: false,
        tip: (
            <>
                <div className='label'>배송메세지 필드는 아래의 형식을 참고해주세요.</div>
                <ul>
                    <li>필수값 여부 : 선택</li>
                    <li>데이터 타입 : 문자열</li>
                    <li>최소 글자수 : 0자</li>
                    <li>최대 글자수 : 255자</li>
                    <li>첫 글자 공백 허용 여부: 허용안함</li>
                    <li>마지막 글자 공백 허용 여부: 허용안함</li>
                </ul>
            </>
        )
    },
    {
        fieldName: "waybillNumber",
        headerName: "운송장번호",
        defaultWidth: 150,
        required: false,
        tip: (
            <>
                <div className='label'>운송장번호 필드는 아래의 형식을 참고해주세요.</div>
                <ul>
                    <li>필수값 여부 : 선택</li>
                    <li>데이터 타입 : 문자열</li>
                    <li>최소 글자수 : 0자</li>
                    <li>최대 글자수 : 50자</li>
                    <li>첫 글자 공백 허용 여부: 허용안함</li>
                    <li>마지막 글자 공백 허용 여부: 허용안함</li>
                </ul>
            </>
        )
    },
    {
        fieldName: "price",
        headerName: "판매금액",
        defaultWidth: 100,
        required: false,
        tip: (
            <>
                <div className='label'>판매금액 필드는 아래의 형식을 참고해주세요.</div>
                <ul>
                    <li>필수값 여부 : 선택</li>
                    <li>데이터 타입 : 숫자</li>
                    <li>최소 값 : 0</li>
                    <li>최대 값 : 999,999,999</li>
                </ul>
            </>
        )
    },
    {
        fieldName: "deliveryCharge",
        headerName: "배송비",
        defaultWidth: 100,
        required: false,
        tip: (
            <>
                <div className='label'>배송비 필드는 아래의 형식을 참고해주세요.</div>
                <ul>
                    <li>필수값 여부 : 선택</li>
                    <li>데이터 타입 : 숫자</li>
                    <li>최소 값 : 0</li>
                    <li>최대 값 : 999,999,999</li>
                </ul>
            </>
        )
    },
    {
        fieldName: "barcode",
        headerName: "바코드",
        defaultWidth: 150,
        required: false,
        tip: (
            <>
                <div className='label'>바코드 필드는 아래의 형식을 참고해주세요.</div>
                <ul>
                    <li>필수값 여부 : 선택</li>
                    <li>데이터 타입 : 문자열</li>
                    <li>최소 글자수 : 0자</li>
                    <li>최대 글자수 : 200자</li>
                    <li>첫 글자 공백 허용 여부: 허용안함</li>
                    <li>마지막 글자 공백 허용 여부: 허용안함</li>
                </ul>
            </>
        )
    },
    {
        fieldName: "prodCode",
        headerName: "[M] 상품코드",
        defaultWidth: 150,
        required: false,
        tip: (
            <>
                <div className='label'>[M] 상품코드 필드는 아래의 형식을 참고해주세요.</div>
                <ul>
                    <li>필수값 여부 : 선택</li>
                    <li>데이터 타입 : 문자열</li>
                    <li>최소 글자수 : 0자</li>
                    <li>최대 글자수 : 30자</li>
                    <li>첫 글자 공백 허용 여부: 허용안함</li>
                    <li>마지막 글자 공백 허용 여부: 허용안함</li>
                </ul>
            </>
        )
    },
    {
        fieldName: "optionCode",
        headerName: "[M] 옵션코드",
        defaultWidth: 150,
        required: false,
        tip: (
            <>
                <div className='label'>[M] 옵션코드 필드는 아래의 형식을 참고해주세요.</div>
                <ul>
                    <li>필수값 여부 : 선택</li>
                    <li>데이터 타입 : 문자열</li>
                    <li>최소 글자수 : 0자</li>
                    <li>최대 글자수 : 20자</li>
                    <li>첫 글자 공백 허용 여부: 허용안함</li>
                    <li>마지막 글자 공백 허용 여부: 허용안함</li>
                </ul>
            </>
        )
    },
    {
        fieldName: "releaseOptionCode",
        headerName: "[M] 출고옵션코드",
        defaultWidth: 150,
        required: false,
        tip: (
            <>
                <div className='label'>[M] 출고옵션코드 필드는 아래의 형식을 참고해주세요.</div>
                <ul>
                    <li>필수값 여부 : 선택</li>
                    <li>데이터 타입 : 문자열</li>
                    <li>최소 글자수 : 0자</li>
                    <li>최대 글자수 : 20자</li>
                    <li>첫 글자 공백 허용 여부: 허용안함</li>
                    <li>마지막 글자 공백 허용 여부: 허용안함</li>
                </ul>
            </>
        )
    },
    {
        fieldName: "managementMemo1",
        headerName: "관리메모1",
        defaultWidth: 150,
        required: false,
        tip: (
            <>
                <div className='label'>관리메모1 필드는 아래의 형식을 참고해주세요.</div>
                <ul>
                    <li>필수값 여부 : 선택</li>
                    <li>데이터 타입 : 문자열</li>
                    <li>최소 글자수 : 0자</li>
                    <li>최대 글자수 : 200자</li>
                    <li>첫 글자 공백 허용 여부: 허용안함</li>
                    <li>마지막 글자 공백 허용 여부: 허용안함</li>
                </ul>
            </>
        )
    },
    {
        fieldName: "managementMemo2",
        headerName: "관리메모2",
        defaultWidth: 150,
        required: false,
        tip: (
            <>
                <div className='label'>관리메모2 필드는 아래의 형식을 참고해주세요.</div>
                <ul>
                    <li>필수값 여부 : 선택</li>
                    <li>데이터 타입 : 문자열</li>
                    <li>최소 글자수 : 0자</li>
                    <li>최대 글자수 : 200자</li>
                    <li>첫 글자 공백 허용 여부: 허용안함</li>
                    <li>마지막 글자 공백 허용 여부: 허용안함</li>
                </ul>
            </>
        )
    },
    {
        fieldName: "managementMemo3",
        headerName: "관리메모3",
        defaultWidth: 150,
        required: false,
        tip: (
            <>
                <div className='label'>관리메모3 필드는 아래의 형식을 참고해주세요.</div>
                <ul>
                    <li>필수값 여부 : 선택</li>
                    <li>데이터 타입 : 문자열</li>
                    <li>최소 글자수 : 0자</li>
                    <li>최대 글자수 : 200자</li>
                    <li>첫 글자 공백 허용 여부: 허용안함</li>
                    <li>마지막 글자 공백 허용 여부: 허용안함</li>
                </ul>
            </>
        )
    },
    {
        fieldName: "managementMemo4",
        headerName: "관리메모4",
        defaultWidth: 150,
        required: false,
        tip: (
            <>
                <div className='label'>관리메모4 필드는 아래의 형식을 참고해주세요.</div>
                <ul>
                    <li>필수값 여부 : 선택</li>
                    <li>데이터 타입 : 문자열</li>
                    <li>최소 글자수 : 0자</li>
                    <li>최대 글자수 : 200자</li>
                    <li>첫 글자 공백 허용 여부: 허용안함</li>
                    <li>마지막 글자 공백 허용 여부: 허용안함</li>
                </ul>
            </>
        )
    },
    {
        fieldName: "managementMemo5",
        headerName: "관리메모5",
        defaultWidth: 150,
        required: false,
        tip: (
            <>
                <div className='label'>관리메모5 필드는 아래의 형식을 참고해주세요.</div>
                <ul>
                    <li>필수값 여부 : 선택</li>
                    <li>데이터 타입 : 문자열</li>
                    <li>최소 글자수 : 0자</li>
                    <li>최대 글자수 : 200자</li>
                    <li>첫 글자 공백 허용 여부: 허용안함</li>
                    <li>마지막 글자 공백 허용 여부: 허용안함</li>
                </ul>
            </>
        )
    },
    {
        fieldName: "managementMemo6",
        headerName: "관리메모6",
        defaultWidth: 150,
        required: false,
        tip: (
            <>
                <div className='label'>관리메모6 필드는 아래의 형식을 참고해주세요.</div>
                <ul>
                    <li>필수값 여부 : 선택</li>
                    <li>데이터 타입 : 문자열</li>
                    <li>최소 글자수 : 0자</li>
                    <li>최대 글자수 : 200자</li>
                    <li>첫 글자 공백 허용 여부: 허용안함</li>
                    <li>마지막 글자 공백 허용 여부: 허용안함</li>
                </ul>
            </>
        )
    },
    {
        fieldName: "managementMemo7",
        headerName: "관리메모7",
        defaultWidth: 150,
        required: false,
        tip: (
            <>
                <div className='label'>관리메모7 필드는 아래의 형식을 참고해주세요.</div>
                <ul>
                    <li>필수값 여부 : 선택</li>
                    <li>데이터 타입 : 문자열</li>
                    <li>최소 글자수 : 0자</li>
                    <li>최대 글자수 : 200자</li>
                    <li>첫 글자 공백 허용 여부: 허용안함</li>
                    <li>마지막 글자 공백 허용 여부: 허용안함</li>
                </ul>
            </>
        )
    },
    {
        fieldName: "managementMemo8",
        headerName: "관리메모8",
        defaultWidth: 150,
        required: false,
        tip: (
            <>
                <div className='label'>관리메모8 필드는 아래의 형식을 참고해주세요.</div>
                <ul>
                    <li>필수값 여부 : 선택</li>
                    <li>데이터 타입 : 문자열</li>
                    <li>최소 글자수 : 0자</li>
                    <li>최대 글자수 : 200자</li>
                    <li>첫 글자 공백 허용 여부: 허용안함</li>
                    <li>마지막 글자 공백 허용 여부: 허용안함</li>
                </ul>
            </>
        )
    },
    {
        fieldName: "managementMemo9",
        headerName: "관리메모9",
        defaultWidth: 150,
        required: false,
        tip: (
            <>
                <div className='label'>관리메모9 필드는 아래의 형식을 참고해주세요.</div>
                <ul>
                    <li>필수값 여부 : 선택</li>
                    <li>데이터 타입 : 문자열</li>
                    <li>최소 글자수 : 0자</li>
                    <li>최대 글자수 : 200자</li>
                    <li>첫 글자 공백 허용 여부: 허용안함</li>
                    <li>마지막 글자 공백 허용 여부: 허용안함</li>
                </ul>
            </>
        )
    },
    {
        fieldName: "managementMemo10",
        headerName: "관리메모10",
        defaultWidth: 150,
        required: false,
        tip: (
            <>
                <div className='label'>관리메모10 필드는 아래의 형식을 참고해주세요.</div>
                <ul>
                    <li>필수값 여부 : 선택</li>
                    <li>데이터 타입 : 문자열</li>
                    <li>최소 글자수 : 0자</li>
                    <li>최대 글자수 : 200자</li>
                    <li>첫 글자 공백 허용 여부: 허용안함</li>
                    <li>마지막 글자 공백 허용 여부: 허용안함</li>
                </ul>
            </>
        )
    },
];