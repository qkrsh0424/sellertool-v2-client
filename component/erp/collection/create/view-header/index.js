import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import useDisabledBtn from "../../../../../hooks/button/useDisabledBtn";
import useErpCollectionHeadersFormHook from "./hooks/useErpCollectionHeadersFormHook";
import useRefErpCollectionHeadersHook from "./hooks/useRefErpCollectionHeadersHook";
import { Container, HeadContainer, Wrapper } from "./index.styled";
import NameFieldComponent from "./name-field/NameField.component";
import SelectItemListComponent from "./select-item-list/SelectItemList.component";
import SubmitFieldComponent from "./submit-field/SubmitField.component";

export default function MainComponent(props) {
    const router = useRouter();
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const {
        refErpCollectionHeaders,
    } = useRefErpCollectionHeadersHook();

    const {
        erpCollectionHeadersForm,
        reqCreateErpCollectionHeader,
        onActionSelectErpCollectionHeader,
        onActionReorderForm,
        onChangeCustomHeaderName,
        onActionDeleteErpCollectionHeader,
        onActionSelectAll,
        onActionSelectClearAll,
        checkSubmitValid,
        getSubmitValue
    } = useErpCollectionHeadersFormHook({
        refErpCollectionHeaders: refErpCollectionHeaders
    });

    const handleChangeName = (e) => {
        let value = e.target.value;

        setName(value);
    }

    const handleChangeDescription = (e) => {
        let value = e.target.value;

        setDescription(value);
    }

    const checkNameFormatValid = () => {
        if (name?.length < 1 || name?.length > 20) {
            throw new Error('뷰헤더명은 1-20자로 작성해 주세요.');
        }
    }

    const checkDescriptionFormatValid = () => {
        if (description?.length > 50) {
            throw new Error('설명은 50자 이내로 작성해 주세요.');
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabledBtn(true);
        try {
            checkNameFormatValid();
            checkDescriptionFormatValid()
            checkSubmitValid();
        } catch (err) {
            alert(err.message);
            return;
        }

        let body = {
            name: name,
            description: description,
            erpCollectionHeaderDetails: getSubmitValue(),
            workspaceId: workspaceRedux?.workspaceInfo?.id
        }

        await reqCreateErpCollectionHeader({
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
                            <div className='title'>뷰헤더 생성</div>
                        </HeadContainer>
                        <NameFieldComponent
                            name={name}
                            onChangeName={handleChangeName}
                            description={description}
                            onChangeDescription={handleChangeDescription}
                        />
                        <SelectItemListComponent
                            refErpCollectionHeaders={refErpCollectionHeaders}
                            erpCollectionHeadersForm={erpCollectionHeadersForm}
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