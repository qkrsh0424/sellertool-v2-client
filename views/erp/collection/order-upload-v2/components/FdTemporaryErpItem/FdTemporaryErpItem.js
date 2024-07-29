import CustomBlockButton from '../../../../../../components/buttons/block-button/v1/CustomBlockButton';
import * as St from './FdTemporaryErpItem.styled';

export function FdTemporaryErpItem({
    temporaryErpItemList,
    onLoadTemporaryErpItemList,
    onReqDeleteTemporaryErpItemList
}) {
    return (
        <>
            <St.Container>
                <St.Wrapper>
                    <div className='flexBox'>
                        <St.DescriptionText>
                            {temporaryErpItemList?.length} 건의 임시 주문건이 있습니다.
                        </St.DescriptionText>
                        <St.EventButton
                            type='button'
                            className='confirm'
                            onClick={() => onLoadTemporaryErpItemList()}
                        >전체 가져오기</St.EventButton>
                        <St.EventButton
                            type='button'
                            className='delete'
                            onClick={() => onReqDeleteTemporaryErpItemList()}
                        >전체 비우기</St.EventButton>
                    </div>
                </St.Wrapper>
            </St.Container>
        </>
    );
}