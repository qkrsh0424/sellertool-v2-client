import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import CustomImage from "../../../../modules/image/CustomImage";
import useErpCollectionHeadersHook from "./hooks/useErpCollectionHeadersHook";
import { Container, ItemBox, ItemListContainer, ItemListWrapper, ListTitle, TitleContainer, Wrapper } from "./styles/ViewHeader.styled";
import { useLocalStorageHook } from "../../../../../hooks/local_storage/useLocalStorageHook";
import { useSelector } from "react-redux";

export default function ViewHeaderComponent({
    erpcFavoriteViewHeaderIds,
    onActionSetFavoriteViewHeaderIds
}) {
    const router = useRouter();
    const [favoriteListOpen, setFavoriteListOpen] = useState(true);
    const [itemListOpen, setItemListOpen] = useState(true);
    let vhF = router?.query?.vhF === 'unfold' ? 'unfold' : 'fold';

    const {
        erpCollectionHeaders,
    } = useErpCollectionHeadersHook(vhF);

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
                vhF: vhF === 'unfold' ? 'fold' : 'unfold'
            }
        }, undefined, { scroll: false })
    }

    const toggleFavoriteListOpen = () => {
        setFavoriteListOpen(!favoriteListOpen);
    }

    const toggleItemListOpen = () => {
        setItemListOpen(!itemListOpen);
    }

    const handleSelectFavoriteViewHeaderId = (id) => {
        let currFavoriteViewHeaderIds = new Set([...erpcFavoriteViewHeaderIds]);
        if (currFavoriteViewHeaderIds.has(id)) {
            currFavoriteViewHeaderIds.delete(id);
        } else {
            currFavoriteViewHeaderIds.add(id);
        }

        currFavoriteViewHeaderIds = [...currFavoriteViewHeaderIds].filter(r => erpCollectionHeaders?.some(r2 => r2.id === r));
        onActionSetFavoriteViewHeaderIds(currFavoriteViewHeaderIds);
    }

    return (
        <>
            <Container>
                <Wrapper>
                    <TitleContainer onClick={() => toggleViewBoardOpen()}>
                        <div className='title mgl-flex mgl-flex-alignItems-center'>
                            뷰헤더 관리
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
                                onClick={(e) => { e.stopPropagation(); handleRouteToPath('/erp/collection/create/view-header') }}
                            >
                                <CustomImage
                                    src='/images/icon/add_default_808080.svg'
                                />
                            </SingleBlockButton>
                        </div>
                    </TitleContainer>
                    {vhF === 'unfold' &&
                        <ItemListContainer>
                            <ListTitle
                                type='button'
                                onClick={() => toggleFavoriteListOpen()}
                            >즐겨찾기</ListTitle>
                            {favoriteListOpen &&
                                <ItemListWrapper>
                                    {(!erpcFavoriteViewHeaderIds || erpcFavoriteViewHeaderIds?.length < 1) ?
                                        <div className='isEmpty-notice'>등록된 즐겨찾기가 없습니다.</div>
                                        :
                                        <>
                                            {erpcFavoriteViewHeaderIds?.map(favoriteViewHeaderId => {
                                                const erpCollectionHeader = erpCollectionHeaders?.find(r => r.id === favoriteViewHeaderId);
                                                if (!erpCollectionHeader) {
                                                    return null;
                                                }

                                                return (
                                                    <ItemBox
                                                        key={erpCollectionHeader?.id}
                                                    >
                                                        <div>
                                                            <div className='name'>{erpCollectionHeader?.name}</div>
                                                            <div className='description'>{erpCollectionHeader?.description || '지정된 설명이 없습니다.'}</div>
                                                        </div>
                                                        <div className='mgl-flex'>
                                                            <SingleBlockButton
                                                                type='button'
                                                                className='icon-button-item'
                                                                onClick={() => handleSelectFavoriteViewHeaderId(erpCollectionHeader.id)}
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
                                                                onClick={() => handleRouteToPath(`/erp/collection/edit/view-header`, { erpCollectionHeaderId: erpCollectionHeader?.id })}
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
                                    {(!erpCollectionHeaders || erpCollectionHeaders?.length < 1) &&
                                        <div className='isEmpty-notice'>생성된 뷰헤더가 없습니다.</div>
                                    }
                                    {erpCollectionHeaders?.filter(r => !erpcFavoriteViewHeaderIds?.includes(r?.id))?.map(erpCollectionHeader => {
                                        return (
                                            <ItemBox
                                                key={erpCollectionHeader?.id}
                                            >
                                                <div>
                                                    <div className='name'>{erpCollectionHeader?.name}</div>
                                                    <div className='description'>{erpCollectionHeader?.description || '지정된 설명이 없습니다.'}</div>
                                                </div>
                                                <div className='mgl-flex'>
                                                    <SingleBlockButton
                                                        type='button'
                                                        className='icon-button-item'
                                                        onClick={() => handleSelectFavoriteViewHeaderId(erpCollectionHeader.id)}
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
                                                        onClick={() => handleRouteToPath(`/erp/collection/edit/view-header`, { erpCollectionHeaderId: erpCollectionHeader?.id })}
                                                    >
                                                        <CustomImage
                                                            src='/images/icon/settings_default_808080.svg'
                                                        />
                                                    </SingleBlockButton>
                                                </div>
                                            </ItemBox>
                                        );
                                    })}
                                </ItemListWrapper>
                            }
                        </ItemListContainer>
                    }
                </Wrapper>
            </Container>
        </>
    );
}