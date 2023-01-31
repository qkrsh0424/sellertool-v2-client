import Image from "next/image";
import { useRouter } from "next/router";
import SingleBlockButton from "../../../../../modules/button/SingleBlockButton";
import { Container, ContentContainer, ItemBox } from "../styles/SortModal.styled";

export default function SortModalComponent({
    SORT_TYPES,
    onClose
}) {
    const router = useRouter();

    const handleSelect = (sort) => {
        router.replace({
            pathname: router.pathname,
            query: {
                ...router.query,
                sort: sort.join(),
                page: 1,
            }
        }, undefined, { scroll: false })
        onClose();
    }

    return (
        <>
            <Container>
                <div className='header-close-button-box'>
                    <button
                        type='button'
                        onClick={() => onClose()}
                        className='header-close-button-el'
                    >
                        <div className='header-close-button-icon'>
                            <Image
                                loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                src='/images/icon/close_default_959eae.svg'
                                layout='responsive'
                                width={1}
                                height={1}
                                alt="close icon"
                                loading="lazy"
                            ></Image>
                        </div>
                    </button>
                </div>
                <ContentContainer>
                    {SORT_TYPES?.map(r => {
                        return (
                            <ItemBox key={r.name}>
                                <div className='sortName'>{r.name}</div>
                                <div className='button-group'>
                                    {r.sortList?.map(r2 => {
                                        let sort = router?.query?.sort || 'createdAt_asc';
                                        let isSelected = r2.sort.join() === sort;
                                        return (
                                            <SingleBlockButton
                                                key={r2.sort}
                                                type='button'
                                                className='button-item'
                                                onClick={() => handleSelect(r2.sort)}
                                                style={{
                                                    border: isSelected ? '1px solid var(--mainColor)' : '',
                                                    color: isSelected ? 'var(--mainColor)' : ''
                                                }}
                                            >
                                                {r2.direction}
                                            </SingleBlockButton>
                                        );
                                    })}
                                </div>
                            </ItemBox>
                        );
                    })}
                </ContentContainer>
            </Container>
        </>
    );
}