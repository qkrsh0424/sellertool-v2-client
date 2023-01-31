import { useRef } from "react";
import useDisabledBtn from "../../../../hooks/button/useDisabledBtn";
import SingleBlockButton from "../../../modules/button/SingleBlockButton";
import CustomSelect from "../../../modules/select/CustomSelect";
import { Container, FormGroup, ControlBox, Title, Wrapper } from "./styles/FormField.styled";

export default function FormFieldComponent({
    productCategories,
    onSubmitCreateProductSubCategory
}) {
    const productCategoryIdRef = useRef();
    const categoryNameRef = useRef();

    const [disabledBtn, setDisabledBtn] = useDisabledBtn();

    const __handle = {
        submit: {
            add: (e) => {
                e.preventDefault();
                setDisabledBtn(true);
                let productCategoryId = productCategoryIdRef.current.value;
                let categoryName = categoryNameRef.current.value;

                try {
                    __handle.check.productCategoryIdExist(productCategoryId);
                    __handle.check.nameFormatValid(categoryName);
                } catch (err) {
                    alert(err.message);
                    return;
                }

                let body = {
                    productCategoryId: productCategoryId,
                    name: categoryName
                }
                onSubmitCreateProductSubCategory({
                    body: body
                });
            }
        },
        check: {
            productCategoryIdExist: (id) => {
                if (!id) {
                    throw new Error('상위 카테고리를 먼저 선택해 주세요.');
                }
            },
            nameFormatValid: (name) => {
                let spaceSearchRegex = /^(\s)|(\s)$/;

                if (name.search(spaceSearchRegex) !== -1) {
                    throw new Error('앞뒤 공백은 허용하지 않습니다.');
                }

                if (name.length < 2 || name.length > 20) {
                    throw new Error('최소 2자 이상 20자 이하로 입력해 주세요.');
                }
            }
        }
    }

    return (
        <>
            <Container>
                <Wrapper>
                    <Title>
                        서브 카테고리 추가
                    </Title>
                    <FormGroup onSubmit={(e) => __handle.submit.add(e)}>
                        <ControlBox>
                            <CustomSelect
                                ref={productCategoryIdRef}
                                className='select-item'
                            >
                                <option value=''>상위 카테고리 선택</option>
                                {productCategories?.map(r => {
                                    return (
                                        <option key={r.id} value={r.id} > {r.name}</option>
                                    );
                                })}
                            </CustomSelect>
                        </ControlBox>
                        <ControlBox>
                            <input
                                type='text'
                                className={`input-item`}
                                name='username'
                                ref={categoryNameRef}
                                placeholder={'서브 카테고리명'}
                            // required
                            ></input>
                        </ControlBox>
                        <SingleBlockButton
                            type='submit'
                            className='submit-button'
                            disabled={disabledBtn}
                        >
                            추가
                        </SingleBlockButton>
                    </FormGroup>
                </Wrapper>
            </Container>
        </>
    );
}