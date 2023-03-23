import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';
import { userDataConnect } from '../../../../data_connect/userDataConnect';
import FindWithEmailComponent from './find-with-email/FindWithEmail.component';
import FindWithPhoneComponent from './find-with-phone/FindWithPhone.component';
import ModeTypeComponent from './mode-type/ModeType.component';
const Container = styled.div`
    min-height: 100vh;
    background:var(--defaultBackground);
`;

const MODE_TYPE = (toggleChangeModeType, handleSubmitFindByPhoneNumberValidation, handleSubmitFindByEmailValidation) => ({
    email: <FindWithEmailComponent toggleChangeModeType={toggleChangeModeType} onSubmitNext={handleSubmitFindByEmailValidation} />,
    phone: <FindWithPhoneComponent toggleChangeModeType={toggleChangeModeType} onSubmitNext={handleSubmitFindByPhoneNumberValidation} />,
    default: <ModeTypeComponent toggleChangeModeType={toggleChangeModeType} />
})
export default function MainComponent(props) {
    const router = useRouter();
    const [modeType, setModeType] = useState('default');

    const toggleChangeModeType = (type) => {
        setModeType(type);
    }

    const handleSubmitFindByPhoneNumberValidation = async (validationForm) => {
        await userDataConnect().findPasswordByPhoneNumberValidation(validationForm)
            .then(res => {
                if (res.status === 200) {
                    router.push({
                        pathname: '/find/password/reset',
                        query: {
                            resetToken: res?.data?.data?.resetPasswordToken
                        }
                    })
                    console.log(res);
                }
            })
            .catch(err => {
                let res = err.response;

                if (!res) {
                    alert('네트워크 환경이 원활하지 않습니다.');
                    return;
                }

                if (res.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res.data.memo);
            })
            ;
    }

    const handleSubmitFindByEmailValidation = async (validationForm) => {
        await userDataConnect().findPasswordByEmailValidation(validationForm)
            .then(res => {
                if (res.status === 200) {
                    router.push({
                        pathname: '/find/password/reset',
                        query: {
                            resetToken: res?.data?.data?.resetPasswordToken
                        }
                    })
                    console.log(res);
                }
            })
            .catch(err => {
                let res = err.response;

                if (!res) {
                    alert('네트워크 환경이 원활하지 않습니다.');
                    return;
                }

                if (res.status === 500) {
                    alert('undefined error.');
                    return;
                }

                alert(res.data.memo);
            })
            ;
    }

    return (
        <Container>
            {MODE_TYPE(toggleChangeModeType, handleSubmitFindByPhoneNumberValidation, handleSubmitFindByEmailValidation)[modeType]}
        </Container>
    );
}