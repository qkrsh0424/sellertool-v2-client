import { useRouter } from "next/router";
import { FdBottomButtons, FdPaymentConfirm, FdPaymentInfo, FdProductInfo } from "./components";
import { Container } from "./index.styled";
import { useDataSourceHook } from "./hooks/useDataSourceHook";
import { useEffect } from "react";
import { useRefSubscriptionPlanHook } from "./hooks/useRefSubscriptionPlanHook";
import { useTargetWorkspaceHook } from "./hooks/useTargetWorkspaceHook";
import { usePaymentPrepareFormHook } from "./hooks/usePaymentPrepareFormHook";
import { useSelector } from "react-redux";
import { customToast, defaultOptions } from "../../../../components/toast/custom-react-toastify/v1";
import formatValidUtils from "../../../../utils/formatValidUtils";
import { customBackdropController } from "../../../../components/backdrop/default/v1";
import { PortoneUtils } from "../../../../utils/PortoneUtils";

const portoneUtils = PortoneUtils();

export default function MainComponent(props) {
    const router = useRouter();
    const userRedux = useSelector(state => state?.userRedux);
    const workspaceId = router?.query?.wsId;
    const subscriptionPlanId = router?.query?.spId;
    const paymentType = router?.query?.paymentType;
    const customBackdropControl = customBackdropController();

    const dataSourceHook = useDataSourceHook();
    const refSubscriptionPlanHook = useRefSubscriptionPlanHook();
    const targetWorkspaceHook = useTargetWorkspaceHook();
    const paymentPrepareFormHook = usePaymentPrepareFormHook();

    useEffect(() => {
        if (!userRedux?.userInfo) {
            return;
        }

        paymentPrepareFormHook.onSetPaymentPrepareForm({
            ...paymentPrepareFormHook?.paymentPrepareForm,
            buyerName: userRedux?.userInfo?.name,
            buyerPhoneNumber: userRedux?.userInfo?.phoneNumber,
            buyerEmail: userRedux?.userInfo?.email,
        })
    }, [userRedux?.userInfo]);

    useEffect(() => {
        async function fetchRefSubscriptionPlan() {
            await dataSourceHook.onReqFetchWorkspace({
                params: {
                    workspaceId: workspaceId
                }
            }, (results, response) => {
                targetWorkspaceHook.onSetTargetWorkspace(results);
            })
        }

        async function fetchWorkspace() {
            await dataSourceHook.onReqFetchRefSubscriptionPlan({
                params: {
                    subscriptionPlanId: subscriptionPlanId
                }
            }, (results, response) => {
                refSubscriptionPlanHook.onSetRefSubscriptionPlan(results);
            })
        }

        async function initialize() {
            if (!workspaceId || !subscriptionPlanId) {
                return;
            }
            fetchRefSubscriptionPlan();
            fetchWorkspace();

        }
        initialize();
    }, [workspaceId, subscriptionPlanId]);

    const onCancel = () => {
        router.replace({
            pathname: '/workspace/management',
            query: {
                wsId: workspaceId,
                view: 'SUBSCRIPTION_PLAN'
            }
        })
    }

    const onSubmitForm = async () => {
        const isMaster = targetWorkspaceHook?.targetWorkspace?.masterFlag;
        const buyerName = paymentPrepareFormHook?.paymentPrepareForm?.buyerName;
        const buyerPhoneNumber = paymentPrepareFormHook?.paymentPrepareForm?.buyerPhoneNumber;
        const buyerEmail = paymentPrepareFormHook?.paymentPrepareForm?.buyerEmail;
        const serviceTermsYn = paymentPrepareFormHook?.paymentPrepareForm?.serviceTermsYn;

        try {
            if (!isMaster) {
                throw new Error('워크스페이스의 관리자가 아닙니다.');
            }

            if (!buyerName || buyerName?.length < 1) {
                throw new Error('이름(실명)은 필수 입력입니다.');
            }

            if (!buyerPhoneNumber || !(buyerPhoneNumber?.length === 10 || buyerPhoneNumber?.length === 11)) {
                throw new Error('휴대폰 번호를 정확히 입력해 주세요.');
            }

            if (!buyerEmail || !formatValidUtils.isEmailFormatValid(buyerEmail)) {
                throw new Error('이메일 주소를 정확히 입력해 주세요.');
            }

            if (serviceTermsYn !== 'y') {
                throw new Error('이용약관에 동의해 주세요.');
            }

        } catch (err) {
            customToast.error(
                err.message,
                {
                    ...defaultOptions,
                    toastId: err.message
                }
            )
            return;
        }

        customBackdropControl.showBackdrop();
        const body = {
            ...paymentPrepareFormHook?.paymentPrepareForm,
            appliedWorkspaceId: targetWorkspaceHook?.targetWorkspace?.id,
            refSubscriptionPlanId: refSubscriptionPlanHook?.refSubscriptionPlan?.id
        }

        let preparePaymentsResults = null;
        await dataSourceHook.onReqPreparePayments({
            body: body,
        }, (results, response) => {
            preparePaymentsResults = results
        });
        customBackdropControl.hideBackdrop();

        await portoneUtils.requestPay({
            payData: {
                pg: preparePaymentsResults?.pg,
                pay_method: preparePaymentsResults?.payMethod,
                merchant_uid: preparePaymentsResults?.merchantUid,
                name: preparePaymentsResults?.productName,
                amount: preparePaymentsResults?.amount,
                buyer_email: preparePaymentsResults?.buyerEmail,
                buyer_name: preparePaymentsResults?.buyerName,
                buyer_tel: preparePaymentsResults?.buyerPhoneNumber,
                buyer_addr: preparePaymentsResults?.buyerAddress,
                buyer_postcode: preparePaymentsResults?.buyerPostcode
            }
        }, (response) => {
            // apply_num: "30003184"
            // bank_name: null
            // buyer_addr: ""
            // buyer_email: "piaar.techteam@gmail.com"
            // buyer_name: "후닛훈"
            // buyer_postcode: ""
            // buyer_tel: "01085356112"
            // card_name: "국민KB카드"
            // card_number: "62337400****6021"
            // card_quota: 0
            // currency: "KRW"
            // custom_data: null
            // imp_uid: "imp_926994632760"
            // merchant_uid: "mid_c2d10df5-11c8-4a6a-9b82-1b669b850637"
            // name: "후닛훈"
            // paid_amount: 925
            // paid_at: 1690424028
            // pay_method: "card"
            // pg_provider: "nice"
            // pg_tid: "nictest04m01012307271113477313"
            // pg_type: "payment"
            // receipt_url: "https://npg.nicepay.co.kr/issue/IssueLoader.do?TID=nictest04m01012307271113477313&type=0&InnerWin=Y"
            // status: "paid"
            // success: true
            console.log(response);
            if (response?.success) {
                alert('결제가 성공적으로 완료되었습니다.');
                router.replace({
                    pathname: '/workspace/management',
                    query: {
                        wsId: workspaceId,
                        view: 'SUBSCRIPTION_PLAN'
                    }
                })
            } else {
                alert(response?.error_msg);
                router.reload();
            }
        });
    }

    return (
        <>
            <Container>
                <FdProductInfo
                    targetWorkspace={targetWorkspaceHook?.targetWorkspace}
                    refSubscriptionPlan={refSubscriptionPlanHook?.refSubscriptionPlan}
                />
                <FdPaymentInfo
                    paymentPrepareForm={paymentPrepareFormHook?.paymentPrepareForm}
                    onChangeValueOfName={paymentPrepareFormHook?.onChangeValueOfName}
                />
                <FdPaymentConfirm
                    paymentPrepareForm={paymentPrepareFormHook?.paymentPrepareForm}
                    refSubscriptionPlan={refSubscriptionPlanHook?.refSubscriptionPlan}
                    targetWorkspace={targetWorkspaceHook?.targetWorkspace}
                    onChangeValueOfName={paymentPrepareFormHook?.onChangeValueOfName}
                    onCancel={onCancel}
                    onSubmitForm={onSubmitForm}
                />
            </Container>
        </>
    );
}