import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CustomDialog } from "../../../../../../components/dialog/v1/CustomDialog";
import { workspaceAuthTemplateDataConnect } from "../../../../../../data_connect/workspaceAuthTemplateDateConnect";
import PagenationComponentStateV2 from "../../../../../modules/pagenation/PagenationStateComponentV2";
import styled from 'styled-components';
import CustomBlockButton from "../../../../../../components/buttons/block-button/v1/CustomBlockButton";

const ContentContainer = styled.div`
    padding: 20px;
`;

const ItemList = styled.div`
    border: 1px solid #f0f0f0;
    padding: 0 20px;
    box-shadow: var(--defaultBoxShadow);
    background: #fff;
    border-radius: 15px;
`;

const Item = styled.div`
    padding: 10px 0;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    font-weight: 600;

    .select-button{
        width: 60px;
        height: 30px;
        font-size: 12px;
        font-weight: 700;
        background: #222;
        color: #fff;
        border-radius: 5px;
        border: none;
    }

    &:last-child{
        border-bottom: none;
    }
`;

export default function SearchTemplateModalComponent({
    open = false,
    onClose = () => { },
    onSubmit
}) {
    const [size, setSize] = useState(20);
    const [page, setPage] = useState(1);

    const {
        workspaceAuthTemplatePage
    } = useWorkspaceAuthTemplatePageHook(size, page);

    const handlePaging = (value) => {
        setPage(value);
    }

    const handleSizing = (value) => {
        setSize(value);
    }

    const handleSelect = (workspaceAuthTemplate) => {
        onSubmit(workspaceAuthTemplate);
    }

    return (
        <>
            <CustomDialog
                open={open}
                onClose={() => onClose()}
            >
                <CustomDialog.CloseButton onClose={() => onClose()} />
                <ContentContainer>
                    <ItemList>
                        {workspaceAuthTemplatePage?.content?.map(workspaceAuthTemplate => {
                            return (
                                <Item key={workspaceAuthTemplate?.id}>
                                    <div>{workspaceAuthTemplate?.name}</div>
                                    <CustomBlockButton
                                        type='button'
                                        className='select-button'
                                        onClick={() => handleSelect(workspaceAuthTemplate)}
                                    >
                                        선택
                                    </CustomBlockButton>
                                </Item>
                            );
                        })}
                    </ItemList>
                    <PagenationComponentStateV2
                        style={{ marginTop: '20px' }}
                        align={'center'}
                        pageIndex={workspaceAuthTemplatePage?.number}
                        totalPages={workspaceAuthTemplatePage?.totalPages}
                        isFirst={workspaceAuthTemplatePage?.first}
                        isLast={workspaceAuthTemplatePage?.last}
                        totalElements={workspaceAuthTemplatePage?.totalElements}
                        sizeElements={[20, 50]}
                        size={workspaceAuthTemplatePage?.size}
                        onChangePage={handlePaging}
                        onChangeSize={handleSizing}
                    />
                </ContentContainer>
            </CustomDialog>
        </>
    );
}

function useWorkspaceAuthTemplatePageHook(size = 20, page = 1) {
    const router = useRouter();
    const wsId = router?.query?.wsId;
    const [workspaceAuthTemplatePage, setWorkspaceAuthTemplatePage] = useState(null);

    useEffect(() => {
        if (!wsId) {
            return;
        }

        reqFetch();
    }, [wsId, size, page]);

    const reqFetch = async () => {
        let headers = {
            wsId: wsId
        }

        const params = {
            size: size,
            page: page
        }

        await workspaceAuthTemplateDataConnect().searchPage(params, headers)
            .then(res => {
                if (res.status === 200) {
                    setWorkspaceAuthTemplatePage(res.data.data);
                }
            })
            .catch(err => {
                console.log(err, err.response);
            })
    }

    return {
        workspaceAuthTemplatePage
    }
}