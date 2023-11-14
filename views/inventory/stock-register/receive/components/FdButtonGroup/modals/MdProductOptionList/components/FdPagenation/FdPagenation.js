import CustomBlockButton from "../../../../../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import PagenationComponentStateV2 from "../../../../../../../../../../components/pagenation/PagenationStateComponentV2";
import { St } from "./FdPagenation.styled";

export function FdPagenation({
    productOptionPage,
    selectedItemList,
    size,
    onChangePage,
    onChangeSize,
    onClearAllSelectedItemList
}) {
    return (
        <>
            <St.Container>
                <div className='wrapper'>
                    <CustomBlockButton
                        type='button'
                        className='selectedCount'
                        onClick={() => onClearAllSelectedItemList()}
                    >
                        <span>{selectedItemList?.length} 개 선택됨</span>
                    </CustomBlockButton>
                    <PagenationComponentStateV2
                        pageIndex={productOptionPage?.number}
                        totalElements={productOptionPage?.totalElements}
                        totalPages={productOptionPage?.totalPages}
                        sizeElements={[50, 100]}
                        isFirst={productOptionPage?.first}
                        isLast={productOptionPage?.last}
                        onChangePage={(value) => onChangePage(value)}
                        onChangeSize={(value) => onChangeSize(value)}
                        size={size}
                    />
                </div>
            </St.Container>
        </>
    );
}