import { useEffect, useState } from "react";
import { CustomDialog } from "../../../../../../components/dialog/v1/CustomDialog";
import styled from 'styled-components';
import CustomBlockButton from "../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import { useRouter } from "next/router";
import SearchTemplateModalComponent from "./SearchTemplateModal.component";
import _ from "lodash";
import useDisabledBtn from "../../../../../../hooks/button/useDisabledBtn";

const ContentContainer = styled.div`
    padding: 20px;
`;

const ContentWrapper = styled.div`
    background: #fff;
    border-radius: 15px;
    box-shadow: var(--defaultBoxShadow);
    padding: 20px;

    .current-selected{
        font-size: 14px;
        color: #404040;
        font-weight: 600;
    }

    .button-item{
        margin-top: 10px;
        height: 35px;
        border-radius: 5px;
        font-size: 13px;
        font-weight: 700;
    }
`;


export default function PermissionSettingModalV2Component({
    targetMember,
    open = false,
    onClose = () => { },
    onSubmit
}) {
    const router = useRouter();
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();
    const [selectedAuthTemplate, setSelectedAuthTemplate] = useState(null);
    const [searchTemplateModalOpen, setSearchTemplateModalOpen] = useState(false);

    useEffect(() => {
        if (!targetMember) {
            return;
        }

        init();
    }, [targetMember]);

    const init = () => {
        const newTargetMember = _.cloneDeep(targetMember);

        const data = {
            id: newTargetMember?.workspaceAuthTemplateId,
            name: newTargetMember?.workspaceAuthTemplateName,
            useYn: newTargetMember?.workspaceAuthTemplateUseYn
        }

        setSelectedAuthTemplate(data);
    }

    const routeToTemplateManagement = () => {
        router.push({
            pathname: router?.pathname,
            query: {
                wsId: router?.query?.wsId,
                view: 'AUTH_TEMPLATE'
            }
        })
    }

    const toggleSearchTemplateOpen = (open) => {
        setSearchTemplateModalOpen(open);
    }

    const changeSelectedAuthTemplate = (authTemplate) => {
        const data = {
            id: authTemplate?.id,
            name: authTemplate?.name,
            useYn: authTemplate?.useYn
        }
        setSelectedAuthTemplate(data);
        toggleSearchTemplateOpen(false);
    }

    const selectedAuthTemplateNull = () => {
        const data = {
            id: null,
            name: null,
            useYn: null
        }

        setSelectedAuthTemplate(data);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setDisabledBtn(true);

        const body = {
            workspaceMemberId: targetMember?.id,
            workspaceAuthTemplateId: selectedAuthTemplate?.id
        }

        onSubmit(body);
    }
    return (
        <>
            <CustomDialog
                open={open}
                onClose={() => onClose()}
            >
                <CustomDialog.CloseButton onClose={() => onClose()} />
                <CustomDialog.Title>해당 멤버의 권한을 설정해 주세요.</CustomDialog.Title>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <ContentContainer>
                        <ContentWrapper>
                            <div className='current-selected'>선택한 권한 템플릿 : {selectedAuthTemplate?.name || '미지정'}</div>
                            <CustomBlockButton
                                type='button'
                                className='button-item'
                                style={{
                                    background: '#222',
                                    border: 'none',
                                    color: '#fff'
                                }}
                                onClick={() => toggleSearchTemplateOpen(true)}
                            >
                                권한 템플릿 조회
                            </CustomBlockButton>
                            <CustomBlockButton
                                type='button'
                                className='button-item'
                                style={{
                                    background: 'var(--defaultRedColor)',
                                    border: 'none',
                                    color: '#fff'
                                }}
                                onClick={() => selectedAuthTemplateNull()}
                            >
                                권한 템플릿 해제
                            </CustomBlockButton>
                            <CustomBlockButton
                                type='button'
                                className='button-item'
                                onClick={() => routeToTemplateManagement()}
                            >
                                권한 템플릿 관리
                            </CustomBlockButton>
                        </ContentWrapper>
                    </ContentContainer>
                    <CustomDialog.FooterButtonGroup isFlex>
                        <CustomDialog.FooterButton
                            type='button'
                            onClick={() => onClose()}
                            style={{ background: 'var(--defaultModalCloseColor)', color: '#fff', width: '40%' }}
                        >취소</CustomDialog.FooterButton>
                        <CustomDialog.FooterButton
                            type='submit'
                            style={{ background: 'var(--mainColor)', color: '#fff', flex: 1 }}
                            disabled={disabledBtn}
                        >확인</CustomDialog.FooterButton>
                    </CustomDialog.FooterButtonGroup>
                </form>
            </CustomDialog>

            {searchTemplateModalOpen &&
                <SearchTemplateModalComponent
                    open={searchTemplateModalOpen}
                    onClose={() => toggleSearchTemplateOpen(false)}
                    onSubmit={changeSelectedAuthTemplate}
                />
            }
        </>
    );
}