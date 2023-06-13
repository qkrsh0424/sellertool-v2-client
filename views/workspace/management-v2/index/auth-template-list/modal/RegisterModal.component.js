import { CustomDialog } from "../../../../../../components/dialog/v1/CustomDialog";
import styled from 'styled-components';
import CustomInput from "../../../../../../components/input/default/v1/CustomInput";
import { CustomRadioGroup } from "../../../../../../components/radio/v1/CustomRadio";
import { useState } from "react";
import LineBreakerBottom from "../../../../../modules/fragment/LineBreakerBottom";
import CustomBlockButton from "../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import useWorkspaceAuthItems from "../hooks/useWorkspaceAuthItems";
import useDisabledBtn from "../../../../../../hooks/button/useDisabledBtn";

const ContentContainer = styled.div`
    padding: 0 20px;
    .label{
        font-size: 12px;
        color:#404040;
        margin-bottom: 10px;
        font-weight: 700;
    }
`;

const InputBox = styled.div`
    margin-top: 30px;
    .input{
        border-radius: 5px;
        height: 48px;
    }
`;

const BatchSelectButtonGroup = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const BatchSelectButton = styled(CustomBlockButton)`
    width: auto;
    height: 30px;
    padding: 0 10px;
    font-size: 11px;
    font-weight: 600;
    border: 1px solid #f0f0f0;
    background: #f0f0f0;
    color: #666;
    border-radius: 5px;
    margin-right: 5px;
    margin-bottom: 10px;
    &:last-child{
        margin-right: 0;
    }
`;

const AuthItems = styled.div`

`;

const AuthItemBox = styled.div`
    margin-top: 30px;
    border: none;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: var(--defaultBoxShadow);

    &:first-child{
        margin-top: 0;
    }

    .name{
        padding: 10px 20px;
        font-size: 16px;
        font-weight: 600;
        background: var(--contentHeadBackground);
    }

    .auth-items{
        padding: 20px 20px 10px 20px;
        display: flex;
        flex-wrap: wrap;
        
        .permission-button-el{
            padding:0 10px;
            margin-right: 10px;
            margin-bottom: 10px;
            width:80px;
            height: 34px;
            text-align: left;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: 5px;
            color:#606060;
            font-size: 12px;
            font-weight: 600;
            background: #fff;

            .permission-button-bulb{
                display: inline-block;
                border-radius: 50%;
                width: 13px;
                height: 13px;
            }

            .permission-button-bulb-on{
                background: var(--defaultGreenColor);
            }

            .permission-button-bulb-off{
                background: var(--defaultRedColor);
            }
        }
    }
`;
export default function RegisterModalComponent({ open, refWorkspaceAuthItems, onClose, onSubmit }) {
    const {
        workspaceAuthItems,
        toggleEssentialYn,
        onSelectAll,
        onSelectClearAll,
        onSelectAllForOMSAdmin
    } = useWorkspaceAuthItems(refWorkspaceAuthItems);
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();

    const [formValue, setFormValue] = useState({
        cid: null,
        id: null,
        name: '',
        useYn: 'y',
        createdAt: null,
        updatedAt: null,
        workspaceId: null,
        deletedFlag: false,
    });

    const handleChangeFormValueOfName = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setDisabledBtn(true);

        let body = {
            ...formValue,
            workspaceAuthItems: workspaceAuthItems
        }
        onSubmit(body);
    }
    return (
        <>
            <CustomDialog
                open={open}
                onClose={() => onClose()}
                maxWidth={'sm'}
            >
                <CustomDialog.CloseButton onClose={() => onClose()} />
                <CustomDialog.Title>권한 템플릿 생성</CustomDialog.Title>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <ContentContainer>
                        <InputBox>
                            <div className='label'>템플릿명</div>
                            <CustomInput
                                type='text'
                                className='input'
                                name={'name'}
                                value={formValue?.name || ''}
                                onChange={(e) => handleChangeFormValueOfName(e)}
                                maxLength={50}
                                placeholder={'최대 50자까지 입력 가능합니다.'}
                                required
                            />
                        </InputBox>
                        <InputBox>
                            <div className='label'>템플릿 사용여부</div>
                            <CustomRadioGroup isFlex>
                                <CustomRadioGroup.Radio
                                    label={'사용'}
                                    style={{ marginRight: '10px' }}
                                    size={14}
                                    name='useYn'
                                    checked={formValue?.useYn === 'y'}
                                    value={'y'}
                                    onChange={(e) => handleChangeFormValueOfName(e)}
                                />
                                <CustomRadioGroup.Radio
                                    label={'사용안함'}
                                    size={14}
                                    name='useYn'
                                    checked={formValue?.useYn === 'n'}
                                    value={'n'}
                                    onChange={(e) => handleChangeFormValueOfName(e)}
                                />
                            </CustomRadioGroup>
                        </InputBox>
                        <LineBreakerBottom gapTop={30} gapBottom={30} />
                        <BatchSelectButtonGroup>
                            <BatchSelectButton
                                type='button'
                                onClick={() => onSelectAll()}
                            >
                                전체선택
                            </BatchSelectButton>
                            <BatchSelectButton
                                type='button'
                                onClick={() => onSelectClearAll()}
                            >
                                전체해제
                            </BatchSelectButton>
                            <BatchSelectButton
                                type='button'
                                onClick={() => onSelectAllForOMSAdmin()}
                            >
                                발주 관리자 모두선택
                            </BatchSelectButton>
                        </BatchSelectButtonGroup>
                        <AuthItems>
                            {refWorkspaceAuthItems?.map(refWorkspaceAuthItems => {
                                return (
                                    <AuthItemBox key={refWorkspaceAuthItems.serviceType}>
                                        <div className='name'>{refWorkspaceAuthItems?.serviceName}</div>
                                        <div className='auth-items'>
                                            {refWorkspaceAuthItems?.authItems?.map(refAuthItem => {
                                                let authItem = workspaceAuthItems?.find(r => r.code === refAuthItem.code);

                                                return (
                                                    <CustomBlockButton
                                                        key={refAuthItem.code}
                                                        type='button'
                                                        className='permission-button-el'
                                                        onClick={() => toggleEssentialYn(refAuthItem.code)}
                                                    >
                                                        {refAuthItem?.authName}
                                                        {(authItem && authItem?.essentialYn === 'y') ?
                                                            <span className='permission-button-bulb permission-button-bulb-on'></span>
                                                            :
                                                            <span className='permission-button-bulb permission-button-bulb-off'></span>
                                                        }
                                                    </CustomBlockButton>
                                                );
                                            })}
                                        </div>
                                    </AuthItemBox>
                                );
                            })}
                        </AuthItems>
                    </ContentContainer>
                    <CustomDialog.FooterButtonGroup isFlex style={{ marginTop: '30px' }}>
                        <CustomDialog.FooterButton type='button' style={{ background: 'var(--defaultModalCloseColor)', color: '#fff', width: '40%' }} onClick={() => onClose()}>취소</CustomDialog.FooterButton>
                        <CustomDialog.FooterButton type='submit' style={{ background: 'var(--mainColor)', color: '#fff', flex: 1 }} disabled={disabledBtn}>확인</CustomDialog.FooterButton>
                    </CustomDialog.FooterButtonGroup>
                </form>
            </CustomDialog>
        </>
    );
}