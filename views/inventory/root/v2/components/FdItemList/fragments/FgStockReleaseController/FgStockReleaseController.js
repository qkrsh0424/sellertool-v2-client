import CustomBlockButton from "../../../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import { St } from "./FgStockReleaseController.styled";
import { useRouter } from "next/router";

export function FgStockReleaseController(props) {
    const router = useRouter();
    const handleClickRegister = () => {
        router.push({
            pathname: '/inventory/stock-register/release'
        });
    }

    return (
        <>
            <St.Container>
                <CustomBlockButton
                    type='button'
                    onClick={() => handleClickRegister()}
                >
                    출고등록
                </CustomBlockButton>
            </St.Container>
        </>
    );
}