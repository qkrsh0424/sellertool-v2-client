import Link from "next/link";
import CustomCheckboxV2 from "../../../../../../components/checkbox/CustomCheckboxV2";
import { numberFormatUtils } from "../../../../../../utils/numberFormatUtils";
import { STY } from "./FdPaymentConfirm.styled";
import CustomBlockButton from "../../../../../../components/buttons/block-button/v1/CustomBlockButton";

const returnDiscountedPrice = (price, discountRate) => {
    return price - (price * discountRate / 100);
}

export function FdPaymentConfirm({
    paymentPrepareForm,
    refSubscriptionPlan,
    targetWorkspace,
    onChangeValueOfName,
    onCancel,
    onSubmitForm
}) {
    const handleChangeServiceTermsYn = (e) => {
        let flag = e.target.checked;
        let yn = flag ? 'y' : 'n';

        onChangeValueOfName('serviceTermsYn', yn);
    }
    return (
        <>
            <STY.Container>
                <STY.Wrapper>
                    <STY.Title>
                        3. 결제 확인
                    </STY.Title>
                    <STY.ItemList>
                        <STY.ItemGroup>
                            <div className="label">
                                결제자 이름
                            </div>
                            <div className='text'>
                                {paymentPrepareForm?.buyerName || <span style={{ color: 'var(--defaultRedColor)' }}>[2. 결제 정보] 의 이름(실명)을 입력해 주세요.</span>}
                            </div>
                        </STY.ItemGroup>
                        <STY.ItemGroup>
                            <div className="label">
                                결제자 휴대폰 번호
                            </div>
                            <div className='text'>
                                {paymentPrepareForm?.buyerPhoneNumber || <span style={{ color: 'var(--defaultRedColor)' }}>[2. 결제 정보] 의 휴대폰 번호를 입력해 주세요.</span>}
                            </div>
                        </STY.ItemGroup>
                        <STY.ItemGroup>
                            <div className="label">
                                결제자 이메일 주소
                            </div>
                            <div className='text'>
                                {paymentPrepareForm?.buyerEmail || <span style={{ color: 'var(--defaultRedColor)' }}>[2. 결제 정보] 의 이메일 주소를 입력해 주세요.</span>}
                            </div>
                        </STY.ItemGroup>
                        <STY.ItemGroup>
                            <div className="label">
                                상품명
                            </div>
                            <div className='text'>
                                {refSubscriptionPlan?.name} ({refSubscriptionPlan?.period}일)
                            </div>
                        </STY.ItemGroup>
                        <STY.ItemGroup>
                            <div className="label">
                                구독플랜이 적용될 워크스페이스
                            </div>
                            <div className='text'>
                                {targetWorkspace?.name}
                            </div>
                        </STY.ItemGroup>
                        <STY.ItemGroup className='mgl-flex'>
                            <div
                                className="label"
                                style={{
                                    flex: 1
                                }}
                            >
                                결제방식
                            </div>
                            <div
                                className='text'
                                style={{
                                    flex: 1
                                }}
                            >
                                카드결제
                            </div>
                        </STY.ItemGroup>
                        <STY.ItemGroup className='mgl-flex'>
                            <div
                                className="label"
                                style={{
                                    flex: 1
                                }}
                            >
                                가격
                            </div>
                            <div
                                className='text'
                                style={{
                                    flex: 1
                                }}
                            >
                                {numberFormatUtils.numberWithCommas(refSubscriptionPlan?.price || '0')}₩
                            </div>
                        </STY.ItemGroup>
                        <STY.ItemGroup className='mgl-flex'>
                            <div
                                className="label"
                                style={{
                                    flex: 1
                                }}
                            >
                                할인율
                            </div>
                            <div
                                className='text'
                                style={{
                                    flex: 1
                                }}
                            >
                                {refSubscriptionPlan?.discountRate}%
                            </div>
                        </STY.ItemGroup>
                        <STY.ItemGroup className='mgl-flex'>
                            <div
                                className="label"
                                style={{
                                    flex: 1
                                }}
                            >
                                할인액
                            </div>
                            <div
                                className='text'
                                style={{
                                    flex: 1
                                }}
                            >
                                -{numberFormatUtils.numberWithCommas((refSubscriptionPlan?.price * refSubscriptionPlan?.discountRate / 100) || '0')}₩
                            </div>
                        </STY.ItemGroup>
                        <STY.ItemGroup
                            className='mgl-flex'
                            style={{
                                fontSize: '20px',
                                color: 'var(--defaultRedColor)',
                                fontWeight: '700',
                            }}
                        >
                            <div
                                style={{
                                    flex: 1
                                }}
                            >
                                결제 총액
                            </div>
                            <div
                                style={{
                                    flex: 1
                                }}
                            >
                                {numberFormatUtils.numberWithCommas(returnDiscountedPrice(refSubscriptionPlan?.price, refSubscriptionPlan?.discountRate) || '0')}₩
                            </div>
                        </STY.ItemGroup>
                        <STY.ItemGroup>
                            <div className='consent'>
                                입력하신 개인정보는 사이트내에서 이용될 예정이며 <Link href='https://assets.sellertool.io/consent_form/privacy_policy_v1.html' passHref><a target="_blank">개인정보처리방침</a></Link>을(를) 준수하고 있습니다.
                            </div>
                            <div className='consent'>
                                <CustomCheckboxV2
                                    size='20px'
                                    labelStyle={{
                                        color: '#606060',
                                        marginLeft: '15px',
                                    }}
                                    label={
                                        <>
                                            <span style={{ color: 'red' }}> *</span> 본인은 웹사이트 <Link href='https://assets.sellertool.io/consent_form/service_terms_v1.html' passHref><a target="_blank">이용약관</a></Link>을(를) 읽었으며 이에 동의합니다.
                                        </>
                                    }
                                    labelSize="16px"
                                    checked={paymentPrepareForm?.serviceTermsYn === 'y'}
                                    onChange={(e) => handleChangeServiceTermsYn(e)}
                                ></CustomCheckboxV2>
                            </div>
                        </STY.ItemGroup>
                    </STY.ItemList>
                    <STY.BottomButtonList>
                        <CustomBlockButton
                            type='button'
                            className='cancel-button'
                            onClick={() => onCancel()}
                        >
                            취소
                        </CustomBlockButton>
                        <CustomBlockButton
                            type='button'
                            className='confirm-button'
                            onClick={() => onSubmitForm()}
                        >
                            결제
                        </CustomBlockButton>
                    </STY.BottomButtonList>
                </STY.Wrapper>
            </STY.Container>
        </>
    );
}