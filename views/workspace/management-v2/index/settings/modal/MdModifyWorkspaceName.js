import { useEffect, useState } from "react";
import { CustomDialog } from "../../../../../../components/dialog/v1/CustomDialog";
import { St } from "./MdModifyWorkspaceName.styled";
import CustomBlockButton from "../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import useDisabledBtn from "../../../../../../hooks/button/useDisabledBtn";
import _ from "lodash";
import { customToast, defaultOptions } from "../../../../../../components/toast/custom-react-toastify/v1";

export default function MdModifyWorkspaceName({
    open = false,
    workspace,
    onClose = () => { },
    onSubmit = () => { }
}) {
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();
    const [workspaceName, setWorkspaceName] = useState(null);

    useEffect(() => {
        if (!workspace?.name) {
            return;
        }

        setWorkspaceName(_.cloneDeep(workspace?.name));

    }, [workspace?.name]);

    const handleChangeWorkspaceNameFromEvent = (e) => {
        const value = e.target.value;

        setWorkspaceName(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabledBtn(true);

        if (workspaceName.length < 2 || workspaceName.length > 30) {
            customToast.warn('워크스페이스 이름은 2-30자 이내로 지정해 주세요.', {
                ...defaultOptions
            })
            return;
        }

        let body = {
            id: workspace?.id,
            name: workspaceName?.trim()
        }

        onSubmit(body);
    }

    return (
        <>
            <CustomDialog
                open={open}
                maxWidth="xs"
                onClose={() => onClose()}
            >
                <CustomDialog.CloseButton onClose={() => onClose()} />
                <CustomDialog.Title>변경할 <span style={{ color: 'var(--mainColor)' }}>워크스페이스 이름</span>을 지정해 주세요.</CustomDialog.Title>
                <St.Container>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className='content-group'>
                            <div className='content-box'>
                                <div className='input-box'>
                                    <input
                                        type='text'
                                        className='input-el'
                                        value={workspaceName || ''}
                                        placeholder="워크스페이스 이름 2-30자"
                                        onChange={(e) => handleChangeWorkspaceNameFromEvent(e)}
                                        maxLength={30}
                                        required
                                    ></input>
                                </div>
                            </div>
                        </div>
                        <St.ButtonGroup>
                            <CustomBlockButton
                                type='button'
                                className='cancel-btn'
                                onClick={() => onClose()}
                            >
                                취소
                            </CustomBlockButton>
                            <CustomBlockButton
                                type='submit'
                                className='confirm-btn'
                            >
                                확인
                            </CustomBlockButton>
                        </St.ButtonGroup>
                    </form>
                </St.Container>
            </CustomDialog>
        </>
    );
}