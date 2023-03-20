import _ from 'lodash';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CustomBlockButton from '../../../../../../components/buttons/block-button/v1/CustomBlockButton';
import { CustomDialog } from '../../../../../../components/dialog/v1/CustomDialog';
import CustomInput from '../../../../../../components/input/default/v1/CustomInput';
import { CustomRadioGroup } from '../../../../../../components/radio/v1/CustomRadio';
import useDisabledBtn from '../../../../../../hooks/button/useDisabledBtn';
import LineBreakerBottom from "../../../../../modules/fragment/LineBreakerBottom";

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

const AuthItemBox = styled.div`
    margin-top: 30px;
    border: none;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: var(--defaultBoxShadow);

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

export default function EditModalComponent({
    open,
    refWorkspaceAuthItems,
    targetWorkspaceAuthTemplate,
    onClose,
    onSubmit
}) {
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();
    const [formValue, setFormValue] = useState(null);
    const [workspaceAuthItems, setWorkspaceAuthItems] = useState(null);

    useEffect(() => {
        if (!refWorkspaceAuthItems || !targetWorkspaceAuthTemplate) {
            return;
        }
        init();
    }, [refWorkspaceAuthItems, targetWorkspaceAuthTemplate]);

    const init = () => {
        const originForm = _.cloneDeep(targetWorkspaceAuthTemplate);
        const newFormValue = {
            id: originForm?.id,
            name: originForm?.name,
            useYn: originForm?.useYn,
            createdAt: originForm?.createdAt,
            updatedAt: originForm?.updatedAt,
        }
        const newWorkspaceAuthItems = originForm?.workspaceAuthItems?.map(r => {
            return {
                cid: r?.cid,
                code: r?.code,
                workspaceAuthTemplateId: r?.workspaceAuthTemplateId,
                essentialYn: r?.essentialYn,
                status: 'existed'
            }
        });

        // refWorkspaceAuthItems 에 새롭게 추가된 권한 정보가 있을 수 있기 때문에 새롭게 추가된게 있다면 추가한다.
        // 그리고 status 를 new 라고 지정해줘서 서버가 해당 아이템은 새롭게 추가되어야 될 아이템이라고 힌트를 준다.
        refWorkspaceAuthItems?.reduce((accumulator, currentValue, index, src) => {
            accumulator.push(...currentValue.authItems);
            return accumulator;
        }, [])
            .forEach(r => {
                if (!newWorkspaceAuthItems?.some(r2 => r2.code === r.code)) {
                    newWorkspaceAuthItems.push({
                        cid: null,
                        code: r?.code,
                        workspaceAuthTemplateId: null,
                        essentialYn: 'n',
                        status: 'new'
                    })
                }
            });

        setFormValue(newFormValue);
        setWorkspaceAuthItems(newWorkspaceAuthItems);
    }

    const handleChangeFormValueOfName = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    const toggleEssentialYn = (code) => {
        setWorkspaceAuthItems(
            workspaceAuthItems.map(r => {
                if (r.code === code) {
                    return {
                        ...r,
                        essentialYn: r.essentialYn === 'y' ? 'n' : 'y'
                    }
                } else {
                    return { ...r }
                }
            })
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setDisabledBtn(true);
        const body = {
            ...formValue,
            workspaceAuthItems: [...workspaceAuthItems]
        }
        onSubmit(body);
    }

    return (
        <>
            <CustomDialog
                open={open}
                onClose={() => onClose()}
                maxWidth='sm'
            >
                <CustomDialog.CloseButton onClose={() => onClose()} />
                <CustomDialog.Title>권한 템플릿 수정</CustomDialog.Title>
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