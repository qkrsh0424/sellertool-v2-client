import { useRouter } from "next/router";
import SingleBlockButton from "../../../../modules/button/SingleBlockButton";
import CustomImage from "../../../../modules/image/CustomImage";
import useErpCollectionHeadersHook from "./hooks/useErpCollectionHeadersHook";
import { Container, ItemBox, ItemListContainer, TitleContainer, Wrapper } from "./styles/ViewHeader.styled";

export default function ViewHeaderComponent(props) {
    const router = useRouter();
    const {
        erpCollectionHeaders
    } = useErpCollectionHeadersHook();

    const handleRouteToPath = (path, query) => {
        router.push({
            pathname: path,
            query: { ...query }
        })
    }

    return (
        <>
            <Container>
                <Wrapper>
                    <TitleContainer>
                        <div className='title'>
                            뷰헤더 관리
                        </div>
                        <div>
                            <SingleBlockButton
                                type='button'
                                className='button-item'
                                onClick={() => handleRouteToPath('/erp/collection/create/view-header')}
                            >
                                <CustomImage
                                    src='/images/icon/add_default_808080.svg'
                                />
                            </SingleBlockButton>
                        </div>
                    </TitleContainer>
                    <ItemListContainer>
                        {erpCollectionHeaders?.map(r => {
                            return (
                                <ItemBox key={r.id}>
                                    <div>
                                        <div className='name'>{r.name}</div>
                                        <div className='description'>{r.description}</div>
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
                </Wrapper>
            </Container>
        </>
    );
}