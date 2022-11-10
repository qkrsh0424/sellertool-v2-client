import { useRouter } from "next/router";
import FormFieldComponent from "./form-field/FormField.component";
import useProductCategoryHook from "./hooks/useProductCategoryHook";
import { Container } from "./styles/index.styled";

export default function MainComponent(props) {
    const router = useRouter();

    const {
        reqCreateProductCategory
    } = useProductCategoryHook();

    const __handle = {
        submit: {
            createProductCategory: async ({
                body
            }) => {

                await reqCreateProductCategory({
                    body,
                    successCallback: () => {
                        router.back();
                    }
                });
            }
        }
    }
    return (
        <>
            <Container>
                <FormFieldComponent
                    onSubmitCreateProductCategory={__handle.submit.createProductCategory}
                />
            </Container>
        </>
    );
}