import { useState } from "react";
import CustomBlockButton from "../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import { St } from "./FdButtonGroup.styled";
import { MdProductOptionList } from "./modals/MdProductOptionList/MdProductOptionList";
import { useRouter } from "next/router";

export function FdButtonGroup(props) {
    const router = useRouter();
    const poListMd = router?.query?.poListMd;

    const toggleProductOptionListModalOpen = (bool) => {
        let query = { ...router.query };

        if (bool) {
            router.push({
                pathname: router?.pathname,
                query: {
                    ...query,
                    poListMd: true
                }
            })
        } else {
            router.back();
        }

    }

    const productOptionListModalOpen = poListMd === 'true' ? true : false;

    return (
        <>
            <St.Container>
                <div className='wrapper'>
                    <CustomBlockButton
                        type='button'
                        onClick={() => toggleProductOptionListModalOpen(true)}
                    >
                        입고제품 추가
                    </CustomBlockButton>
                    <CustomBlockButton>
                        엑셀 일괄등록
                    </CustomBlockButton>
                    <CustomBlockButton>
                        일괄입력
                    </CustomBlockButton>
                </div>
            </St.Container>

            <MdProductOptionList
                open={productOptionListModalOpen}
                onClose={() => toggleProductOptionListModalOpen(false)}
            />
        </>
    );
}