import { useState } from 'react';
import CustomBlockButton from '../../../../../../components/buttons/block-button/v1/CustomBlockButton';
import * as St from './FdIntelligenceOperator.styled';
import { MdIntelligenceSelector } from './modal/MdIntelligenceSelector/MdIntelligenceSelectorV3';
import CustomImage from '../../../../../../components/image/CustomImage';

export function FdIntelligenceOperator(props) {
    const [intelligenceSelectorModalOpen, setIntelligenceSelectorModalOpen] = useState(false);

    const toggleIntelligenceSelectorModalOpen = (bool) => {
        setIntelligenceSelectorModalOpen(bool);
    }

    return (
        <>
            <St.Container>
                <St.Wrapper>
                    <h3>
                        <div>Intelligence Functions</div>
                        <div className='icon'>
                            <CustomImage src='/images/icon/rocket_boom_ai.svg' />
                        </div>
                    </h3>
                    <div className='flexBox'>
                        <div className='buttonBox'>
                            <CustomBlockButton
                                type='button'
                                onClick={() => toggleIntelligenceSelectorModalOpen(true)}
                            >
                                <div className='flexBox'>
                                    <section className='icon'>
                                        <CustomImage src='/images/icon/stars_default_000000.svg' />
                                    </section>
                                    <section>출고가능 주문건 선택</section>
                                </div>
                            </CustomBlockButton>
                        </div>
                    </div>
                </St.Wrapper>
            </St.Container>

            {intelligenceSelectorModalOpen &&
                <MdIntelligenceSelector
                    open={intelligenceSelectorModalOpen}
                    toggleIntelligenceSelectorModalOpen={toggleIntelligenceSelectorModalOpen}
                />
            }
        </>
    );
}