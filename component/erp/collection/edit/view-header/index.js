import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import useDisabledBtn from "../../../../../hooks/button/useDisabledBtn";
import useErpCollectionHeaderDetailsFormHook from "./hooks/useErpCollectionHeaderDetailsFormHook";
import useErpCollectionHeaderFormHook from "./hooks/useErpCollectionHeaderFormHook";
import useErpCollectionHeaderHook from "./hooks/useErpCollectionHeaderHook";
import useRefErpCollectionHeadersHook from "./hooks/useRefErpCollectionHeadersHook";
import { Container, HeadContainer, Wrapper } from "./index.styled";
import NameFieldComponent from "./name-field/NameField.component";
import SelectItemListComponent from "./select-item-list/SelectItemList.component";
import SubmitFieldComponent from "./submit-field/SubmitField.component";

export default function MainComponent(props) {
    const router = useRouter();
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();
    const {
        refErpCollectionHeaders,
    } = useRefErpCollectionHeadersHook();

    const {
        erpCollectionHeader,
        reqUpdateErpCollectionHeader
    } = useErpCollectionHeaderHook();

    const {
        erpCollectionHeaderForm,
        onChangeName,
        onChangeDescription,
        checkErpCollectionHeaderFormValid
    } = useErpCollectionHeaderFormHook({
        erpCollectionHeader: erpCollectionHeader
    });

    const {
        erpCollectionHeaderDetailsForm,
        onActionSelectErpCollectionHeader,
        onActionReorderForm,
        onChangeCustomHeaderName,
        onActionDeleteErpCollectionHeader,
        onActionSelectAll,
        onActionSelectClearAll,
        checkErpCollectionHeaderDetailsFormValid,
        getSubmitValue
    } = useErpCollectionHeaderDetailsFormHook({
        erpCollectionHeader: erpCollectionHeader,
        refErpCollectionHeaders: refErpCollectionHeaders
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabledBtn(true);
        try {
            checkErpCollectionHeaderFormValid();
            checkErpCollectionHeaderDetailsFormValid();
        } catch (err) {
            alert(err.message);
            return;
        }

        let body = {
            ...erpCollectionHeaderForm,
            erpCollectionHeaderDetails: getSubmitValue(),
        }

        await reqUpdateErpCollectionHeader({
            body: body,
            successCallback: () => {
                router.back();
            }
        })
    }

    return (
        <>
            <Container>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <Wrapper>
                        <HeadContainer>
                            <div className='title'>뷰헤더 수정</div>
                        </HeadContainer>
                        <NameFieldComponent
                            name={erpCollectionHeaderForm?.name}
                            description={erpCollectionHeaderForm?.description}
                            onChangeName={onChangeName}
                            onChangeDescription={onChangeDescription}
                        />
                        <SelectItemListComponent
                            refErpCollectionHeaders={refErpCollectionHeaders}
                            erpCollectionHeaderDetailsForm={erpCollectionHeaderDetailsForm}
                            onActionSelectErpCollectionHeader={onActionSelectErpCollectionHeader}
                            onActionReorderForm={onActionReorderForm}
                            onChangeCustomHeaderName={onChangeCustomHeaderName}
                            onActionDeleteErpCollectionHeader={onActionDeleteErpCollectionHeader}
                            onActionSelectAll={onActionSelectAll}
                            onActionSelectClearAll={onActionSelectClearAll}
                        />
                    </Wrapper>
                    <SubmitFieldComponent
                        disabledBtn={disabledBtn}
                    />
                </form>
            </Container>
        </>
    );
}