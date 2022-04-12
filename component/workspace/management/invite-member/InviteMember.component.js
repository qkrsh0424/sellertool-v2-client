import { useState } from "react";
import CommonModalComponent from "../../../modules/CommonModalComponent";
import InviteModalComponent from "../invite-modal/InviteModal.component";
import { Container, HeadFieldWrapper } from "./InviteMember.styled";

function HeaderFieldView({ onActionOpenInviteModal }) {
    return (
        <HeadFieldWrapper>
            <div className='title-el'>
                멤버 초대
            </div>
            <button
                className='button-el'
                onClick={onActionOpenInviteModal}
            >
                초대하기
            </button>
        </HeadFieldWrapper>
    );
}
const InviteMemberComponent = (props) => {
    const [inviteModalOpen, setInviteModalOpen] = useState(false);

    const __invite = {
        action: {
            openModal: () => {
                setInviteModalOpen(true);
            },
            closeModal: () => {
                setInviteModalOpen(false);
            }
        }
    }
    return (
        <>
            <Container>
                <HeaderFieldView
                    onActionOpenInviteModal={__invite.action.openModal}
                />
            </Container>

            {/* Modal */}
            <CommonModalComponent
                open={inviteModalOpen}

                onClose={__invite.action.closeModal}
            >
                <InviteModalComponent></InviteModalComponent>
            </CommonModalComponent>
        </>
    );
}
export default InviteMemberComponent;