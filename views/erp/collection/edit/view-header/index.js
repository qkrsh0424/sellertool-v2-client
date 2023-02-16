import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import useDisabledBtn from "../../../../../hooks/button/useDisabledBtn";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import ConfirmModalComponentV2 from "../../../../modules/modal/ConfirmModalComponentV2";
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
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();
    const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);

    const {
        refErpCollectionHeaders,
    } = useRefErpCollectionHeadersHook();

    const {
        erpCollectionHeader,
        reqUpdateErpCollectionHeader,
        reqDeleteErpCollectionHeader
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

    const handleOpenDeleteConfirmModal = () => {
        setDeleteConfirmModalOpen(true);
    }

    const handleCloseDeleteConfirmModal = () => {
        setDeleteConfirmModalOpen(false);
    }

    const handleSubmitDelete = async () => {
        let body = {
            id: erpCollectionHeader.id,
            workspaceId: workspaceRedux?.workspaceInfo?.id
        }

        await reqDeleteErpCollectionHeader({
            body: body,
            successCallback: () => {
                router.back();
            }
        });
    }
    return (
        <>
            <Container>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <Wrapper>
                        <HeadContainer>
                            <div className='mgl-flex mgl-flex-justifyContent-spaceBetween mgl-flex-alignItems-center'>
                                <div className='title'>뷰헤더 설정</div>
                                <SingleBlockButton
                                    type='button'
                                    className='delete-button-item'
                                    onClick={() => handleOpenDeleteConfirmModal()}
                                >
                                    삭제
                                </SingleBlockButton>
                            </div>
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

            {deleteConfirmModalOpen &&
                <ConfirmModalComponentV2
                    open={deleteConfirmModalOpen}
                    onClose={handleCloseDeleteConfirmModal}
                    title={'삭제 확인메세지'}
                    message={'현재 뷰헤더를 정말로 삭제 하시겠습니까?'}
                    confirmBtnStyle={{ background: 'var(--defaultRedColor)' }}
                    onConfirm={handleSubmitDelete}
                />
            }
        </>
    );
}