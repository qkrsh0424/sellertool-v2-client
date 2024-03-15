import CustomBlockButton from '../../../../components/buttons/block-button/v1/CustomBlockButton';
import CustomInput from '../../../../components/input/default/v1/CustomInput';
import CustomSelect from '../../../../components/select/default/v1/CustomSelect';
import { customToast } from '../../../../components/toast/custom-react-toastify/v1';
import { usePurchasingApplicationHook } from '../../hooks/usePurchasingApplicationHook';
import * as St from './FdForm.styled';

export function FdForm(props) {
    const purchasingApplicationHook = usePurchasingApplicationHook();

    const createPurchasingApplicationForm = purchasingApplicationHook?.createPurchasingApplicationForm;

    const handleChangeNameFromEvent = (e) => {
        let value = e.target.value;

        purchasingApplicationHook.onSetCreatePurchasingApplicationForm({
            ...createPurchasingApplicationForm,
            name: value
        });
    }

    const handleChangeContactFromEvent = (e) => {
        let value = e.target.value;

        purchasingApplicationHook.onSetCreatePurchasingApplicationForm({
            ...createPurchasingApplicationForm,
            contact: value
        })
    }

    const handleChangeBusinessNameFromEvent = (e) => {
        let value = e.target.value;

        purchasingApplicationHook.onSetCreatePurchasingApplicationForm({
            ...createPurchasingApplicationForm,
            businessName: value
        })
    }

    const handleChangeSalesMethodFromEvent = (e) => {
        let value = e.target.value;

        purchasingApplicationHook.onSetCreatePurchasingApplicationForm({
            ...createPurchasingApplicationForm,
            salesMethod: value
        })
    }

    const handleChangePurchaseQuantityFromEvent = (e, reqIndex) => {
        let value = e.target.value;

        purchasingApplicationHook.onSetCreatePurchasingApplicationForm({
            ...createPurchasingApplicationForm,
            purchasingApplicationOptionList: createPurchasingApplicationForm?.purchasingApplicationOptionList?.map((r, index) => {
                if (index === reqIndex) {
                    return {
                        ...r,
                        purchaseQuantity: value
                    }
                }
                return { ...r }
            })
        })
    }

    const handleOpenSubmitModal = (e) => {
        e.preventDefault();
        if (createPurchasingApplicationForm?.name?.length < 1 || createPurchasingApplicationForm?.name?.length > 20) {
            customToast.error('성함은 1-20자 필수 입력입니다.');
            return;
        }

        if(createPurchasingApplicationForm?.contact?.length < 10 || createPurchasingApplicationForm?.contact?.length > 12){
            customToast.error('연락처는 1-12자 필수 입력입니다. \'-\'를 제외한 연락처를 입력해주세요.');
            return;
        }

        if(createPurchasingApplicationForm?.businessName?.length < 1 || createPurchasingApplicationForm?.businessName?.length > 20){
            customToast.error('사업자명은 1-20자 필수 입력입니다.');
            return;
        }

        if(createPurchasingApplicationForm?.salesMethod?.length < 1 || createPurchasingApplicationForm?.salesMethod?.length > 300){
            customToast.error('판매방식은 1-300자 필수 입력입니다.');
            return;
        }

        if(createPurchasingApplicationForm?.purchasingApplicationOptionList?.length < 1){
            customToast.error('옵션을 선택해 주세요.');
            return;
        }
    }

    console.log(createPurchasingApplicationForm);
    return (
        <>
            <St.Container>
                <form onSubmit={(e) => handleOpenSubmitModal(e)}>
                    <St.Wrapper>
                        <St.TitleContainer>
                            구매 신청서
                        </St.TitleContainer>
                        <St.ControlContainer>
                            <CustomInput
                                type='text'
                                placeholder='성함'
                                value={createPurchasingApplicationForm?.name || ''}
                                onChange={(e) => handleChangeNameFromEvent(e)}
                                maxLength={20}
                            />
                        </St.ControlContainer>
                        <St.ControlContainer>
                            <CustomInput
                                type='text'
                                placeholder={`'-'를 제외한 연락처 ex)01012341234'`}
                                value={createPurchasingApplicationForm?.contact || ''}
                                onChange={(e) => handleChangeContactFromEvent(e)}
                                maxLength={12}
                            />
                        </St.ControlContainer>
                        <St.ControlContainer>
                            <CustomInput
                                type='text'
                                placeholder='사업자명'
                                value={createPurchasingApplicationForm?.businessName || ''}
                                onChange={(e) => handleChangeBusinessNameFromEvent(e)}
                                maxLength={20}
                            />
                        </St.ControlContainer>
                        <St.ControlContainer>
                            <textarea
                                placeholder='판매방식'
                                value={createPurchasingApplicationForm?.salesMethod || ''}
                                onChange={(e) => handleChangeSalesMethodFromEvent(e)}
                                maxLength={300}
                            ></textarea>
                        </St.ControlContainer>
                        <St.ControlContainer>
                            <CustomSelect>
                                <option>옵션 선택</option>
                            </CustomSelect>
                        </St.ControlContainer>
                        {createPurchasingApplicationForm?.purchasingApplicationOptionList?.map((purchasingApplicationOption, index) => {
                            return (
                                <St.ControlContainer key={index}>
                                    <label>{purchasingApplicationOption?.name}</label>
                                    <CustomInput
                                        type='number'
                                        placeholder='희망 구매 수량'
                                        value={purchasingApplicationOption?.purchaseQuantity}
                                        onChange={(e) => handleChangePurchaseQuantityFromEvent(e, index)}
                                        max={999999}
                                    />
                                </St.ControlContainer>
                            );
                        })}
                        <St.FooterButtonGroup>
                            <CustomBlockButton
                                type='button'
                                className='cancel'
                            >
                                취소
                            </CustomBlockButton>
                            <CustomBlockButton
                                type='submit'
                                className='submit'
                            >
                                제출
                            </CustomBlockButton>
                        </St.FooterButtonGroup>
                    </St.Wrapper>
                </form>
            </St.Container>
        </>
    );
}