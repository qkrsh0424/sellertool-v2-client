import { useRouter } from "next/router";
import FormFieldComponent from "./form-field/FormField.component";
import useProductCategoriesHook from "./hooks/useProductCategoriesHook";
import useProductSubCategoryHook from "./hooks/useProductSubCategoryHook";
import { Container } from "./styles/index.styled";

export default function MainComponent(props) {
    const router = useRouter();

    const {
        productCategories
    } = useProductCategoriesHook();

    const {
        reqCreateProductSubCategory
    } = useProductSubCategoryHook();

    const __handle = {
        submit: {
            createProductSubCategory: async ({
                body
            }) => {
                await reqCreateProductSubCategory({
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
                    productCategories={productCategories}
                    onSubmitCreateProductSubCategory={__handle.submit.createProductSubCategory}
                />
            </Container>
        </>
    );
}