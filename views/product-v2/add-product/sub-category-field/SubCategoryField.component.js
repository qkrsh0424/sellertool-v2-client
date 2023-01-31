import Image from "next/image";
import { useState } from "react";
import SingleBlockButton from "../../../modules/button/SingleBlockButton";
import CustomImage from "../../../modules/image/CustomImage";
import CustomSelect from "../../../modules/select/CustomSelect";
import { Container, FormWrapper, HeadWrapper, Wrapper } from "./styles/SubCategoryField.styled";

export default function SubCategoryFieldComponent({
    productSubCategories,
    productSubCategoryId,
    onChangeProductSubCategoryId
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
                                서브 카테고리
                            </div>
                        </div>
                        {dropDownOpen ?
                            <SingleBlockButton
                                type='button'
                                className='icon-button'
                                onClick={() => __handle.action.closeDropDown()}
                            >
                                <div className='icon-figure'>
                                    <CustomImage
                                        src={'/images/icon/arrowDropUp_default_808080.svg'}
                                    />
                                </div>
                            </SingleBlockButton>
                            :
                            (

                                <SingleBlockButton
                                    type='button'
                                    className='icon-button'
                                    onClick={() => __handle.action.openDropDown()}
                                >
                                    <div className='icon-figure'>
                                        <CustomImage
                                            src={'/images/icon/arrowDropDown_default_808080.svg'}
                                        />
                                    </div>
                                </SingleBlockButton>
                            )
                        }
                    </HeadWrapper>
                    {dropDownOpen &&
                        (
                            <FormWrapper>
                                <CustomSelect
                                    className='select-item'
                                    value={productSubCategoryId || ''}
                                    onChange={(e) => onChangeProductSubCategoryId(e)}
                                >
                                    <option value=''>선택</option>
                                    {productSubCategories?.map(r => {
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