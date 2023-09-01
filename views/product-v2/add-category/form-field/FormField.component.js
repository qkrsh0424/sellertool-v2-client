import { useRef } from "react";
import { useSelector } from "react-redux";
import useDisabledBtn from "../../../../hooks/button/useDisabledBtn";
import SingleBlockButton from "../../../modules/button/SingleBlockButton";
import { Container, FormGroup, InputBox, Title, Wrapper } from "./styles/FormField.styled";
import { customBackdropController } from "../../../../components/backdrop/default/v1";

export default function FormFieldComponent({
    onSubmitCreateProductCategory
}) {
    const workspaceRedux = useSelector(state => state.workspaceRedux);
    const categoryNameRef = useRef();

    const [disabledBtn, setDisabledBtn] = useDisabledBtn();
    const customBackdropControl = customBackdropController();

    const __handle = {
        submit: {
            add: async (e) => {
                e.preventDefault();
                setDisabledBtn(true);
                let categoryName = categoryNameRef.current.value;

                try {
                    __handle.check.nameFormatValid(categoryName);
                } catch (err) {
                    alert(err.message);
                    return;
                }

                let body = {
                    workspaceId: workspaceRedux?.workspaceInfo?.id,
                    name: categoryName
                }
                customBackdropControl.showBackdrop();
                await onSubmitCreateProductCategory({
                    body: body
                });
                customBackdropControl.hideBackdrop();
            }
        },
        check: {
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
                        카테고리 추가
                    </Title>
                    <FormGroup onSubmit={(e) => __handle.submit.add(e)}>
                        <InputBox>
                            <input
                                type='text'
                                className={`input-item`}
                                name='username'
                                ref={categoryNameRef}
                                placeholder={'카테고리명'}
                            // required
                            ></input>
                        </InputBox>
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