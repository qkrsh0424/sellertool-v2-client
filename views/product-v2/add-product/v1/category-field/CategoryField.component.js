import { useState } from "react";
import CustomImage from "/components/image/CustomImage";
import CustomSelect from "/components/select/default/v1/CustomSelect";
import { Container, FormWrapper, HeadWrapper, Wrapper } from "./styles/CategoryField.styled";
import CustomBlockButton from "/components/buttons/block-button/v1/CustomBlockButton";

export default function CategoryFieldComponent({
    productCategories,
    productCategoryId,
    onChangeProductCategoryId
}) {
    const [dropDownOpen, setDropDownOpen] = useState(true);

    const __handle = {
        action: {
            openDropDown: () => {
                setDropDownOpen(true);
            },
            closeDropDown: () => {
                setDropDownOpen(false);
            }
        }
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
                                onClick={() => __handle.action.closeDropDown()}
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
                                    onClick={() => __handle.action.openDropDown()}
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
                                    value={productCategoryId || ''}
                                    onChange={(e) => onChangeProductCategoryId(e)}
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