import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import CustomImage from "../../../../modules/image/CustomImage";
import useErpCollectionHeadersHook from "./hooks/useErpCollectionHeadersHook";
import { Container, ItemBox, ItemListContainer, TitleContainer, Wrapper } from "./styles/ViewHeader.styled";

export default function ViewHeaderComponent(props) {
    const router = useRouter();
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
                            {(!erpCollectionHeaders || erpCollectionHeaders?.length < 1) &&
                                <div className='isEmpty-notice'>생성된 뷰헤더가 없습니다.</div>
                            }
                            {erpCollectionHeaders?.map(r => {
                                return (
                                    <ItemBox
                                        key={r.id}
                                    >
                                        <div>
                                            <div className='name'>{r.name}</div>
                                            <div className='description'>{r.description || '지정된 설명이 없습니다.'}</div>
                                        </div>
                                        <div className='mgl-flex'>
                                            <SingleBlockButton
                                                type='button'
                                                className='icon-button-item'
                                                onClick={() => handleRouteToPath(`/erp/collection/edit/view-header`, { erpCollectionHeaderId: r.id })}
                                            >
                                                <CustomImage
                                                    src='/images/icon/settings_default_808080.svg'
                                                />
                                            </SingleBlockButton>
                                        </div>
                                    </ItemBox>
                                );
                            })}
                        </ItemListContainer>
                    }
                </Wrapper>
            </Container>
        </>
    );
}