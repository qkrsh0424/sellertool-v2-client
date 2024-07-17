import { useState } from 'react';
import CustomBlockButton from '../../../../../../../components/buttons/block-button/v1/CustomBlockButton';
import CustomImage from '../../../../../../modules/image/CustomImage';
import * as St from './FdApiKeyList.styled';
import { MdViewSecret } from './modals/MdViewSecret';
import { ClipboardUtils } from '../../../../../../../utils/ClipboardUtils';
import { customBackdropController } from '../../../../../../../components/backdrop/default/v1';
import { MdEditApiKey } from './modals/MdEditApiKey';

export function FdApiKeyList({
    workspace,
    apiKeyList,
    onReqDeleteKey,
    onReqPatchDescription
}) {
    const [targetApiKeyId, setTargetApiKeyId] = useState(null);
    const [editApiKey, setEditApiKey] = useState(null);

    const handleOpenViewSecretModal = (id) => {
        setTargetApiKeyId(id);
    }

    const handleCloseViewSecretModal = () => {
        setTargetApiKeyId(null);
    }

    const handleOpenEditApiKeyModal = (apiKey) => {
        setEditApiKey(apiKey);
    }

    const handleCloseEditApiKeyModal = () => {
        setEditApiKey(null);
    }

    const handleCopyToClipboard = (e, text) => {
        e.stopPropagation();
        ClipboardUtils.copyToClipboard(text);
    }

    const handleDelete = async (id) => {
        if (!window.confirm('정말로 API키를 삭제 하겠습니끼?')) {
            return;
        }

        customBackdropController().showBackdrop();
        await onReqDeleteKey(id);
        customBackdropController().hideBackdrop();
    }

    const handleEditDescription = async (description) => {
        const body = {
            id: editApiKey?.id,
            description: description
        }

        customBackdropController().showBackdrop();
        await onReqPatchDescription({ body })
        customBackdropController().hideBackdrop();

        handleCloseEditApiKeyModal();
    }

    const modalOpen = targetApiKeyId ? true : false;
    const editApiKeyModalOpen = editApiKey ? true : false;

    return (
        <>
            <St.Container>
                <St.BodyWrapper>
                    {apiKeyList?.map(apiKey => {
                        return (
                            <St.CardWrapper key={apiKey?.id}>
                                <div className='flex'>
                                    <div className='contentWrapper'>
                                        <div className='title'>API Key</div>
                                        <div className='apiKeyBox'>
                                            <div>{apiKey?.apiKey}</div>
                                            <div className='copyBox'>
                                                <CustomBlockButton
                                                    type='button'
                                                    onClick={(e) => handleCopyToClipboard(e, apiKey?.apiKey)}
                                                >
                                                    <CustomImage src='/images/icon/copy_default_808080.svg' />
                                                </CustomBlockButton>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='contentWrapper'>
                                        <div className='title'>Secret Key</div>
                                        <div className='secretKeyViewButtonBox'>
                                            <CustomBlockButton
                                                type='button'
                                                onClick={() => handleOpenViewSecretModal(apiKey?.id)}
                                            >보기</CustomBlockButton>
                                        </div>
                                    </div>
                                </div>
                                <div className='contentWrapper'>
                                    <div className='title'>설명</div>
                                    <div className='descriptionBox'>
                                        <div>{apiKey?.description}</div>
                                        <div className='editBox'>
                                            <CustomBlockButton
                                                type='button'
                                                onClick={() => handleOpenEditApiKeyModal(apiKey)}
                                            >
                                                <CustomImage src='/images/icon/edit_default_808080.svg' />
                                            </CustomBlockButton>
                                        </div>
                                    </div>
                                </div>
                                <div className='deleteButtonBox'>
                                    <CustomBlockButton
                                        type='button'
                                        onClick={() => handleDelete(apiKey?.id)}
                                    >
                                        <CustomImage src='/images/icon/close_default_e56767.svg' />
                                    </CustomBlockButton>
                                </div>
                            </St.CardWrapper>
                        );
                    })}
                </St.BodyWrapper>
            </St.Container>

            {modalOpen &&
                <MdViewSecret
                    open={modalOpen}
                    onClose={handleCloseViewSecretModal}
                    targetApiKeyId={targetApiKeyId}
                    workspace={workspace}
                />
            }

            {editApiKeyModalOpen &&
                <MdEditApiKey
                    open={editApiKeyModalOpen}
                    onClose={handleCloseEditApiKeyModal}
                    editApiKey={editApiKey}
                    onSubmit={handleEditDescription}
                />
            }
        </>
    );
}