import { useSelector } from "react-redux";
import CustomInput from "../../../../../../components/input/default/v1/CustomInput";
import { STY } from "./FdPaymentInfo.styled";

export function FdPaymentInfo({
    paymentPrepareForm,
    onChangeValueOfName
}) {
    const handleChangeBuyerName = (e) => {
        let value = e.target.value;

        onChangeValueOfName('buyerName', value);
    }

    const handleChangeBuyerPhoneNumber = (e) => {
        let value = e.target.value;

        const regex = /^[0-9]{0,11}$/
        if (regex.test(value)) {
            onChangeValueOfName('buyerPhoneNumber', value);
        }
    }

    const handleChangeBuyerEmail = (e) => {
        let value = e.target.value;

        onChangeValueOfName('buyerEmail', value);
    }
    return (
        <>
            <STY.Container>
                <STY.Wrapper>
                    <STY.Title>
                        2. 결제 정보
                    </STY.Title>
                    <STY.ItemList>
                        <STY.ItemGroup>
                            <div className="label">
                                이름(실명)<span style={{ color: 'red' }}> *</span>
                            </div>
                            <div>
                                <CustomInput
                                    type='text'
                                    className='input-item'
                                    placeholder='이름(실명)을 입력해 주세요.'
                                    value={paymentPrepareForm?.buyerName ?? ''}
                                    onChange={(e) => handleChangeBuyerName(e)}
                                ></CustomInput>
                            </div>
                        </STY.ItemGroup>
                        <STY.ItemGroup>
                            <div className="label">
                                휴대폰 번호<span style={{ color: 'red' }}> *</span>
                            </div>
                            <CustomInput
                                type='text'
                                className='input-item'
                                value={paymentPrepareForm.buyerPhoneNumber ?? ''}
                                onChange={(e) => handleChangeBuyerPhoneNumber(e)}
                                placeholder='숫자로만 입력해 주세요.'
                            ></CustomInput>
                        </STY.ItemGroup>
                        <STY.ItemGroup>
                            <div className="label">
                                이메일 주소<span style={{ color: 'red' }}> *</span>
                            </div>
                            <CustomInput
                                type='email'
                                className='input-item'
                                value={paymentPrepareForm.buyerEmail ?? ''}
                                onChange={(e) => handleChangeBuyerEmail(e)}
                                placeholder='example@example.com'
                            ></CustomInput>
                        </STY.ItemGroup>
                    </STY.ItemList>
                </STY.Wrapper>
            </STY.Container>
        </>
    );
}