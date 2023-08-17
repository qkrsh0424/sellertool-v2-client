import CustomImage from "../../../../../../../components/image/CustomImage";
import { St } from "./FdCheckNotice.styled";

export function FdCheckNotice(props) {
    return (
        <>
            <St.Container>
                <St.Wrapper>
                    <St.TitleBox>
                        <div className='icon'>
                            <CustomImage
                                src='/images/icon/check_circle_e56767.svg'
                            />
                        </div>
                        <div className='title'>
                            구독플랜 유의사항
                        </div>
                    </St.TitleBox>
                    <St.ItemList>
                        <div className='item'>
                            <div className='item-title'>
                                결제취소 및 환불
                            </div>
                            <ul className='item-desc-list'>
                                <li className='item-desc'>회원이 구매한 유료서비스는 서비스 특성상 결제취소 되지 않습니다. 단, 구독플랜을 구매하였으나 사용하지 않은 상태에서 구매 후 7일이내에 계약해지를 요구하는 경우 결제취소 및 환불처리 됩니다.</li>
                                <li className='item-desc'>환불에 대한 신청은 셀러툴 고객센터 전화(02-338-9464) 또는 이메일(help@piaar.co.kr)을 통해 접수합니다.</li>
                                <li className='item-desc'>회원은 반드시 셀러툴 고객센터를 통해 결제취소 및 환불을 요청하여야 하며, 회사는 소정의 절차를 거쳐서 처리합니다. (~7일 소요)</li>
                                <li className='item-desc'>결제취소 및 환불 관련 자세한 내용은 <a href='https://assets.sellertool.io/consent_form/service_terms_v1.html' target="_blank" rel="noreferrer">이용약관 &quot;제 19조 [이용요금 결제취소 및 환불]&quot;</a> 부분을 참고하시기 바랍니다.</li>
                            </ul>
                        </div>

                    </St.ItemList>
                </St.Wrapper>
            </St.Container>
        </>
    );
}