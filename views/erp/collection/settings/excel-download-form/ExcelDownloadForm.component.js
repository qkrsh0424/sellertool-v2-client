import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import CustomImage from "../../../../modules/image/CustomImage";
import useErpcExcelDownloadFormsHook from "./hooks/useErpcExcelDownloadFormsHook";
import { Container, ItemBox, ItemListContainer, ItemListWrapper, ListTitle, TitleContainer, Wrapper } from "./styles/ExcelDownloadForm.styled";
import { useLocalStorageHook } from "../../../../../hooks/local_storage/useLocalStorageHook";
import { useSelector } from "react-redux";

export default function ExcelDownloadForm({
    erpcFavoriteDownloadFormIds,
    onActionSetFavoriteDownloadFormIds
}) {
    const router = useRouter();
    const [favoriteListOpen, setFavoriteListOpen] = useState(true);
    const [itemListOpen, setItemListOpen] = useState(true);
    let edF = router?.query?.edF === 'unfold' ? 'unfold' : 'fold';

    const {
        erpcExcelDownloadForms
    } = useErpcExcelDownloadFormsHook(edF);

    const handleRouteToPath = (path, query) => {
        router.push({
            pathname: path,
            query: { ...query }
        })
    }

    const toggleViewBoardOpen = () => {
        router.replace({
            pathname: router.pathname,
            query: {
                ...router.query,
                edF: edF === 'unfold' ? 'fold' : 'unfold'
            }
        }, undefined, { scroll: false })
    }

    const toggleFavoriteListOpen = () => {
        setFavoriteListOpen(!favoriteListOpen);
    }

    const toggleItemListOpen = () => {
        setItemListOpen(!itemListOpen);
    }

    const handleSelectFavoriteDownloadFormId = (id) => {
        let currFavoriteDownloadFormIds = new Set([...erpcFavoriteDownloadFormIds]);
        if (currFavoriteDownloadFormIds.has(id)) {
            currFavoriteDownloadFormIds.delete(id);
        } else {
            currFavoriteDownloadFormIds.add(id);
        }

        currFavoriteDownloadFormIds = [...currFavoriteDownloadFormIds].filter(r => erpcExcelDownloadForms?.some(r2 => r2.id === r));
        onActionSetFavoriteDownloadFormIds(currFavoriteDownloadFormIds);
    }

    return (
        <>
            <Container>
                <Wrapper>
                    <TitleContainer onClick={() => toggleViewBoardOpen()}>
                        <div className='title mgl-flex mgl-flex-alignItems-center'>
                            다운로드 폼 관리
                            <div style={{ width: '20px', height: '20px' }}>
                                <CustomImage
                                    src={'/images/icon/arrowUpDown_default_808080.svg'}
                                />
                            </div>
                        </div>
                        <div>
                            <SingleBlockButton
                                type='button'
                                className='button-item'
                                onClick={(e) => { e.stopPropagation(); handleRouteToPath('/erp/collection/create/excel-download-form') }}
                            >
                                <CustomImage
                                    src='/images/icon/add_default_808080.svg'
                                />
                            </SingleBlockButton>
                        </div>
                    </TitleContainer>
                    {edF === 'unfold' &&
                        <ItemListContainer>
                            <ListTitle
                                type='button'
                                onClick={() => toggleFavoriteListOpen()}
                            >즐겨찾기</ListTitle>
                            {favoriteListOpen &&
                                <ItemListWrapper>
                                    {(!erpcFavoriteDownloadFormIds || erpcFavoriteDownloadFormIds?.length < 1) ?
                                        <div className='isEmpty-notice'>등록된 즐겨찾기가 없습니다.</div>
                                        :
                                        <>
                                            {erpcFavoriteDownloadFormIds?.map(favoriteDownloadFormId => {
                                                const erpcExcelDownloadForm = erpcExcelDownloadForms?.find(r => r.id === favoriteDownloadFormId);
                                                if (!erpcExcelDownloadForm) {
                                                    return null;
                                                }

                                                return (
                                                    <ItemBox
                                                        key={erpcExcelDownloadForm?.id}
                                                    >
                                                        <div>
                                                            <div className='name'>{erpcExcelDownloadForm?.name}</div>
                                                            <div className='description'>{erpcExcelDownloadForm?.description || '지정된 설명이 없습니다.'}</div>
                                                        </div>
                                                        <div className='mgl-flex'>
                                                            <SingleBlockButton
                                                                type='button'
                                                                className='icon-button-item'
                                                                onClick={() => handleSelectFavoriteDownloadFormId(erpcExcelDownloadForm?.id)}
                                                                style={{
                                                                    marginRight: '10px'
                                                                }}
                                                            >
                                                                <CustomImage
                                                                    src='/images/icon/star_default_ffdf00.svg'
                                                                />
                                                            </SingleBlockButton>
                                                            <SingleBlockButton
                                                                type='button'
                                                                className='icon-button-item'
                                                                onClick={() => handleRouteToPath(`/erp/collection/edit/excel-download-form`, { erpcExcelDownloadFormId: erpcExcelDownloadForm?.id })}
                                                            >
                                                                <CustomImage
                                                                    src='/images/icon/settings_default_808080.svg'
                                                                />
                                                            </SingleBlockButton>
                                                        </div>
                                                    </ItemBox>
                                                );
                                            })}
                                        </>
                                    }
                                </ItemListWrapper>
                            }
                            <ListTitle
                                type='button'
                                onClick={() => toggleItemListOpen()}
                            >목록</ListTitle>
                            {itemListOpen &&
                                <ItemListWrapper>
                                    {(!erpcExcelDownloadForms || erpcExcelDownloadForms?.length < 1) ?
                                        <div className='isEmpty-notice'>생성된 다운로드 폼이 없습니다.</div>
                                        :
                                        <>
                                            {erpcExcelDownloadForms?.filter(r => !erpcFavoriteDownloadFormIds?.includes(r?.id))?.map(erpcExcelDownloadForm => {
                                                return (
                                                    <ItemBox
                                                        key={erpcExcelDownloadForm?.id}
                                                    >
                                                        <div>
                                                            <div className='name'>{erpcExcelDownloadForm?.name}</div>
                                                            <div className='description'>{erpcExcelDownloadForm?.description || '지정된 설명이 없습니다.'}</div>
                                                        </div>
                                                        <div className='mgl-flex'>
                                                            <SingleBlockButton
                                                                type='button'
                                                                className='icon-button-item'
                                                                onClick={() => handleSelectFavoriteDownloadFormId(erpcExcelDownloadForm?.id)}
                                                                style={{
                                                                    marginRight: '10px'
                                                                }}
                                                            >
                                                                <CustomImage
                                                                    src='/images/icon/star_border_808080.svg'
                                                                />
                                                            </SingleBlockButton>
                                                            <SingleBlockButton
                                                                type='button'
                                                                className='icon-button-item'
                                                                onClick={() => handleRouteToPath(`/erp/collection/edit/excel-download-form`, { erpcExcelDownloadFormId: erpcExcelDownloadForm?.id })}
                                                            >
                                                                <CustomImage
                                                                    src='/images/icon/settings_default_808080.svg'
                                                                />
                                                            </SingleBlockButton>
                                                        </div>
                                                    </ItemBox>
                                                );
                                            })}
                                        </>
                                    }
                                </ItemListWrapper>
                            }
                        </ItemListContainer>
                    }
                </Wrapper>
            </Container >
        </>
    );
}