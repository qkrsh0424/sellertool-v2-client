import { useState } from "react";

export default function useConsentFormHook() {
    const [consentForm, setConsentForm] = useState({
        serviceTermsYn: 'n',
        privacyPolicyYn: 'n',
        marketingYn: 'n'
    });

    const onChangeValueOfName = (e) => {
        let name = e.target.name;
        let checked = e.target.checked;

        setConsentForm({
            ...consentForm,
            [name]: checked ? 'y' : 'n'
        })
    }

    const onSelectAll = () => {
        if (returnSelectedAll()) {
            setConsentForm({
                serviceTermsYn: 'n',
                privacyPolicyYn: 'n',
                marketingYn: 'n'
            });
        } else {
            setConsentForm({
                serviceTermsYn: 'y',
                privacyPolicyYn: 'y',
                marketingYn: 'y'
            });
        }
    }

    const returnSelectedAll = () => {
        if (
            consentForm.serviceTermsYn === 'y'
            && consentForm.privacyPolicyYn === 'y'
            && consentForm.marketingYn === 'y'
        ) {
            return true;
        }

        return false;
    }

    return {
        consentForm,
        returnSelectedAll,
        onChangeValueOfName,
        onSelectAll
    }
}