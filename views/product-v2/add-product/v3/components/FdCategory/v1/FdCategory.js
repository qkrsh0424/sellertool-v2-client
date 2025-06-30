import { useState } from "react";
import { Container, FormWrapper, HeadWrapper, Wrapper } from "./FdCategory.styled";
import CustomBlockButton from "/components/buttons/block-button/v1/CustomBlockButton";
import CustomImage from "/components/image/CustomImage";
import CustomSelect from "/components/select/default/v1/CustomSelect";

export function FdCategory({
    productCategories,
    selectedProductCategory,
    onSelectProductCategory
}) {
    const [dropDownOpen, setDropDownOpen] = useState(true);

    const toggleDropDownOpen = (setOpen) => {
        setDropDownOpen(setOpen);
    }

    const handleSelectProductCategory = (e) => {
        const productCategoryId = e.target.value;
        const productCategory = productCategories?.find(r => r.id === productCategoryId) ?? null;
        onSelectProductCategory(productCategory);
    }
    return (
        <>
            <Container>
                <Wrapper>
                    <HeadWrapper className='mgl-flex mgl-flex-alignItems-center mgl-flex-justifyContent-spaceBetween'>
                        <div className='mgl-flex mgl-flex-alignItems-center'>
                            <span className='required-tag'></span>
                            <div className='title'>
                                카테고리
                            </div>
                        </div>
                        {dropDownOpen ?
                            <CustomBlockButton
                                type='button'
                                className='icon-button'
                                onClick={() => toggleDropDownOpen(false)}
                            >
                                <div className='icon-figure'>
                                    <CustomImage
                                        src={'/images/icon/arrowDropUp_default_808080.svg'}
                                    />
                                </div>
                            </CustomBlockButton>
                            :
                            (

                                <CustomBlockButton
                                    type='button'
                                    className='icon-button'
                                    onClick={() => toggleDropDownOpen(true)}
                                >
                                    <div className='icon-figure'>
                                        <CustomImage
                                            src={'/images/icon/arrowDropDown_default_808080.svg'}
                                        />
                                    </div>
                                </CustomBlockButton>
                            )
                        }
                    </HeadWrapper>
                    {dropDownOpen &&
                        (
                            <FormWrapper>
                                <CustomSelect
                                    className='select-item'
                                    value={selectedProductCategory?.id || ''}
                                    onChange={(e) => handleSelectProductCategory(e)}
                                >
                                    <option value=''>선택</option>
                                    {productCategories?.map(r => {
                                        return (
                                            <option key={r.id} value={r.id}>{r.name}</option>
                                        );
                                    })}
                                </CustomSelect>
                            </FormWrapper>
                        )
                    }
                </Wrapper>
            </Container>
        </>
    );
}