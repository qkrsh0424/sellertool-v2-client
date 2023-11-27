import { useRouter } from "next/router";
import CustomBlockButton from "../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import CustomImage from "../../../../../../components/image/CustomImage";
import { St } from "./FdTopNavBar.styled";

export function FdTopNavBar(props) {
    const router = useRouter();

    const handleRouteToBack = () => {
        router.back();
    }

    return (
        <>
            <St.Container>
                <St.Wrapper>
                    <CustomBlockButton
                        type='button'
                        onClick={() => handleRouteToBack()}
                    >
                        <CustomImage src="/images/icon/arrow_left_000000.svg" />
                    </CustomBlockButton>
                    <div className='title-box'>
                        입고등록
                    </div>
                </St.Wrapper>
            </St.Container>
        </>
    );
}