import { useState } from 'react';
import styled from 'styled-components';
import { userDataConnect } from '../../../data_connect/userDataConnect';
import FindWithEmailComponent from './find-with-email/FindWithEmail.component';
import FindWithPhoneComponent from './find-with-phone/FindWithPhone.component';
import ModeTypeComponent from './mode-type/ModeType.component';
import ResultFieldComponent from './result-field/ResultField.component';

const Container = styled.div`
    background:var(--defaultBackground);
`;

const MODE_TYPE = (toggleModeType, handleSubmitFindByPhoneNumberValidation, handleSubmitFindByEmailValidation, info) => ({
    phone:
        <FindWithPhoneComponent
            toggleModeType={toggleModeType}
            onSubmitNext={handleSubmitFindByPhoneNumberValidation}
        />,
    email:
        <FindWithEmailComponent
            toggleModeType={toggleModeType}
            onSubmitNext={handleSubmitFindByEmailValidation}
        />,
    result:
        <ResultFieldComponent
            info={info}
            toggleModeType={toggleModeType}
        />,
    default:
        <ModeTypeComponent
            toggleModeType={toggleModeType}
        />
})

export default function MainComponent(props) {
    const [modeType, setModeType] = useState('default');
    const [info, setInfo] = useState(null);

    const toggleModeType = (type) => {
        setModeType(type);
    }

    const handleSubmitFindByPhoneNumberValidation = async (validationForm) => {
        await userDataConnect().findUsernameByPhoneNumberValidation(validationForm)
            .then(res => {
                if (res.status === 200) {
                    setModeType('result');
                    setInfo(res.data.data);
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
        await userDataConnect().findUsernameByEmailValidation(validationForm)
            .then(res => {
                if (res.status === 200) {
                    setModeType('result');
                    setInfo(res.data.data);
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
            {MODE_TYPE(toggleModeType, handleSubmitFindByPhoneNumberValidation, handleSubmitFindByEmailValidation, info)[modeType]}
        </Container>
    );
}