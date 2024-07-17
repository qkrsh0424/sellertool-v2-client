import { useEffect, useState } from "react";
import { CustomDialog } from "../../../../../../../../components/dialog/v1/CustomDialog";
import * as St from './MdViewSecret.styled';
import { useApiHook } from "../../../hooks/useApiHook";
import CustomBlockButton from "../../../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import CustomImage from "../../../../../../../modules/image/CustomImage";
import { ClipboardUtils } from "../../../../../../../../utils/ClipboardUtils";
import { customToast } from "../../../../../../../../components/toast/custom-react-toastify/v1";

export function MdViewSecret({
    open,
    onClose,
    targetApiKeyId,
    workspace
}) {
    const apiHook = useApiHook();

    const [secretKey, setSecretKey] = useState(null);

    useEffect(() => {
        if (!targetApiKeyId || !workspace?.id) {
            return;
        }

        reqFetchSearchDetail();
    }, [targetApiKeyId, workspace?.id]);

    const reqFetchSearchDetail = async () => {
        const params = {
            id: targetApiKeyId
        }

        const headers = {
            wsId: workspace?.id
        }
        const result = await apiHook.searchDetail({ params: params, headers: headers });

        if (result?.content) {
            setSecretKey(result?.content?.secretKey);
        }
    }

    const handleCopyToClipboard = (e) => {
        e.stopPropagation();
        ClipboardUtils.copyToClipboard(secretKey);
        customToast.warning('시크릿 키를 다른 곳에 노출하지 마시고 반드시 안전한 곳에 보관해 두시기 바랍니다.');
    }

    return (
        <>
            <CustomDialog open={open} onClose={onClose} backgroundColor={'#fff'}>
                <St.BodyContainer>
                    <St.Title>
                        <div>Secret Key</div>
                        <div className='copyBox'>
                            <CustomBlockButton
                                type='button'
                                onClick={(e) => handleCopyToClipboard(e)}
                            >
                                <CustomImage src='/images/icon/copy_default_808080.svg' />
                            </CustomBlockButton>
                        </div>
                    </St.Title>
                    <St.SecretKeyText>{secretKey}</St.SecretKeyText>
                    <St.WarningText>
                        시크릿 키를 다른 곳에 노출하지 마시고 반드시 안전한 곳에 보관해 두시기 바랍니다.
                    </St.WarningText>
                </St.BodyContainer>
            </CustomDialog>
        </>
    );
}