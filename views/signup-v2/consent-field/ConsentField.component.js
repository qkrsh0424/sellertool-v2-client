import Link from "next/link";
import SingleBlockButton from "../../modules/button/SingleBlockButton";
import CustomCheckboxV2 from "../../modules/checkbox/CustomCheckboxV2";
import CustomImage from "../../modules/image/CustomImage";
import { Container, FormGroup, HeaderWrapper, InputBox, LogoBox, Wrapper } from "./ConsentField.styled";

export default function ConsentFieldComponent(props) {


    return (
        <>
            <Container>
                <LogoBox>
                    <Link href='/' passHref>
                        <a>
                            <CustomImage src='/images/logo/logo1.png' priority={true} loading='eager'/>
                        </a>
                    </Link>
                </LogoBox>
                <Wrapper>
                    <HeaderWrapper>
                        <div className='head-box'>
                            <div
                                className='prev-button-el'
                            >
                            </div>
                        </div>
                        <div className='head-box'>
                            <div className='title'>
                                셀러툴 약관동의
                            </div>
                        </div>
                        <div className='head-box'>
                            <div className='page'>
                                1 / 2
                            </div>
                        </div>
                    </HeaderWrapper>
                    <FormGroup>
                        <InputBox>
                            <CustomCheckboxV2
                                selectedCheckBoxClassName={'checkbox-el'}
                                checked={props.returnSelectedAll() || false}
                                onChange={props.onSelectAll}
                                label={
                                    <div
                                        className='label-el'
                                    >
                                        전체동의
                                    </div>
                                }
                            />
                        </InputBox>
                        <InputBox>
                            <CustomCheckboxV2
                                selectedCheckBoxClassName={'checkbox-el'}
                                name='serviceTermsYn'
                                checked={props.consentForm.serviceTermsYn === 'y' ? true : false}
                                onChange={props.onChangeValueOfName}
                                label={
                                    <div
                                        className='label-el'
                                    >
                                        서비스 <Link href='/consent/service-terms' passHref target="_blank" rel="noopener noreferrer"><span className='label-link'>이용약관</span></Link> 동의 (필수)
                                    </div>
                                }
                            />
                        </InputBox>
                        <InputBox>
                            <CustomCheckboxV2
                                selectedCheckBoxClassName={'checkbox-el'}
                                name='privacyPolicyYn'
                                checked={props.consentForm.privacyPolicyYn === 'y' ? true : false}
                                onChange={props.onChangeValueOfName}
                                label={
                                    <div
                                        className='label-el'
                                    >
                                        서비스 <Link className='label-link' href='/consent/privacy-policy' passHref target="_blank" rel="noopener noreferrer"><span className='label-link'>개인정보취급방침</span></Link> 동의 (필수)
                                    </div>
                                }
                            />
                        </InputBox>
                        <InputBox>
                            <CustomCheckboxV2
                                selectedCheckBoxClassName={'checkbox-el'}
                                name='marketingYn'
                                checked={props.consentForm.marketingYn === 'y' ? true : false}
                                onChange={props.onChangeValueOfName}
                                label={
                                    <div
                                        className='label-el'
                                    >
                                        서비스 마케팅정보 수신 동의 (선택)
                                    </div>
                                }
                            />
                        </InputBox>
                        <SingleBlockButton
                            type='button'
                            className='submit-button'
                            onClick={props.onActionOpenSignupFormMode}
                            disabled={(props.consentForm.serviceTermsYn !== 'y' || props.consentForm.privacyPolicyYn !== 'y')}
                        >
                            다음
                        </SingleBlockButton>
                    </FormGroup>
                </Wrapper>
            </Container>
        </>
    );
}