import Image from "next/image";
import useDisabledBtn from "../../../../hooks/button/useDisabledBtn";
import SingleBlockButton from "../../../modules/button/SingleBlockButton";
import useUserConsentHook from "../hooks/useUserConsentHook";
import { Container, ContentWrapper, TitleFieldWrapper } from "./styles/Marketing.styled";

export default function MarketingComponent(props) {
    const {
        userConsent,
        reqChangeMarketingPhoneYn,
        reqChangeMarketingEmailYn
    } = useUserConsentHook();
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();

    const __handle = {
        submit: {
            changeUserConsentMarketingPhoneYn: async (yn) => {
                setDisabledBtn(true);
                let body = {
                    marketingPhoneYn: 'y'
                }

                if (yn === 'y') {
                    body.marketingPhoneYn = 'n';
                }

                await reqChangeMarketingPhoneYn({
                    body: body,
                    successCallback: () => {
                        if (body.marketingPhoneYn === 'y') {
                            alert('마케팅 정보 수신에 동의하셨습니다.');
                            return;
                        } else {
                            alert('마케팅 정보 수신 동의가 해제되었습니다.');
                            return;
                        }
                    }
                })
            },
            changeUserConsentMarketingEmailYn: async (yn) => {
                setDisabledBtn(true);
                let body = {
                    marketingEmailYn: 'y'
                }

                if (yn === 'y') {
                    body.marketingEmailYn = 'n';
                }

                await reqChangeMarketingEmailYn({
                    body: body,
                    successCallback: () => {
                        if (body.marketingEmailYn === 'y') {
                            alert('마케팅 정보 수신에 동의하셨습니다.');
                            return;
                        } else {
                            alert('마케팅 정보 수신 동의가 해제되었습니다.');
                            return;
                        }
                    }
                })
            }
        }
    }
    return (
        <>
            <Container>
                <TitleFieldWrapper>
                    마케팅 정보수신 동의
                </TitleFieldWrapper>
                <ContentWrapper>
                    <div className='content-group mgl-flex mgl-flex-alignItems-center'>
                        <div className='icon-figure'>
                            <Image
                                loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                src={'/images/icon/phone_default_808080.svg'}
                                layout='responsive'
                                width={1}
                                height={1}
                                objectFit={'cover'}
                                alt='image'
                                loading='lazy'
                            ></Image>
                        </div>
                        <div className='info-group mgl-flex mgl-flex-alignItems-center mgl-flex-justifyContent-spaceBetween'>
                            <div className='info-text'>
                                휴대전화
                            </div>
                            {userConsent &&
                                (
                                    <div>
                                        {userConsent?.marketingPhoneYn === 'y' &&
                                            <SingleBlockButton
                                                type='button'
                                                className='switch-button switch-button-on'
                                                onClick={() => __handle.submit.changeUserConsentMarketingPhoneYn(userConsent.marketingPhoneYn)}
                                                disabled={disabledBtn}
                                            >
                                                ON
                                            </SingleBlockButton>
                                        }
                                        {userConsent?.marketingPhoneYn === 'n' &&
                                            <SingleBlockButton
                                                type='button'
                                                className='switch-button switch-button-off'
                                                onClick={() => __handle.submit.changeUserConsentMarketingPhoneYn(userConsent.marketingPhoneYn)}
                                                disabled={disabledBtn}
                                            >
                                                OFF
                                            </SingleBlockButton>
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className='content-group mgl-flex mgl-flex-alignItems-center'>
                        <div className='icon-figure'>
                            <Image
                                loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                src={'/images/icon/mail_default_808080.svg'}
                                layout='responsive'
                                width={1}
                                height={1}
                                objectFit={'cover'}
                                alt='image'
                                loading='lazy'
                            ></Image>
                        </div>
                        <div className='info-group mgl-flex mgl-flex-alignItems-center mgl-flex-justifyContent-spaceBetween'>
                            <div className='info-text'>
                                이메일
                            </div>
                            {userConsent &&
                                (
                                    <div>
                                        {userConsent?.marketingEmailYn === 'y' &&
                                            <SingleBlockButton
                                                type='button'
                                                className='switch-button switch-button-on'
                                                onClick={() => __handle.submit.changeUserConsentMarketingEmailYn(userConsent.marketingEmailYn)}
                                                disabled={disabledBtn}
                                            >
                                                ON
                                            </SingleBlockButton>
                                        }
                                        {userConsent?.marketingEmailYn === 'n' &&
                                            <SingleBlockButton
                                                type='button'
                                                className='switch-button switch-button-off'
                                                onClick={() => __handle.submit.changeUserConsentMarketingEmailYn(userConsent.marketingEmailYn)}
                                                disabled={disabledBtn}
                                            >
                                                OFF
                                            </SingleBlockButton>
                                        }
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </ContentWrapper>
            </Container>
        </>
    );
}