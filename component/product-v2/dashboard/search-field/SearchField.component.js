import Image from "next/image";
import { useRouter } from "next/router";
import SingleBlockButton from "../../../modules/button/SingleBlockButton";
import CustomSelect from "../../../modules/select/CustomSelect";
import { CategoryWrapper, Container, ContentWrapper, LinkButton, SearchButtonWrapper, SearchConsoleWrapper, Title } from "./styles/SearchField.styled";

export default function SearchFieldComponent({
    productCategories
}) {
    const router = useRouter();

    return (
        <>
            <Container>
                <Title>
                    상품조회
                </Title>
                <ContentWrapper>
                    <CategoryWrapper>
                        <div className='title'>카테고리</div>
                        <div className='mgl-flex'>
                            <SingleBlockButton
                                type='button'
                                className='select-button'
                            >
                                {productCategories?.find(r => r.id === router?.query?.productCategoryId)?.name || '전체'}
                            </SingleBlockButton>
                            <SingleBlockButton
                                type='button'
                                className='icon-button'
                            >
                                <div
                                    className='icon-figure'
                                >
                                    <Image
                                        loader={({ src, width, quality }) => `${src}?q=${quality || 75}`}
                                        src='/images/icon/settings_default_808080.svg'
                                        layout='responsive'
                                        width={1}
                                        height={1}
                                        objectFit={'cover'}
                                        alt='image'
                                        loading='lazy'
                                    ></Image>
                                </div>
                            </SingleBlockButton>
                        </div>
                    </CategoryWrapper>
                    <SearchConsoleWrapper>
                        <div className='title'>조회 조건</div>
                        <CustomSelect
                            className='select-button'
                        >
                            <option>선택</option>
                            <option>상품명</option>
                            <option>옵션명</option>
                            <option>상품코드</option>
                            <option>옵션코드</option>
                        </CustomSelect>
                        <div className='input-box'>
                            <input
                                type='text'
                                className='input-el'
                                placeholder="검색어를 입력하세요."
                            ></input>
                        </div>
                        <SingleBlockButton
                            type='button'
                            className='search-button'
                        >
                            조회
                        </SingleBlockButton>
                    </SearchConsoleWrapper>
                </ContentWrapper>
            </Container>
        </>
    );
}