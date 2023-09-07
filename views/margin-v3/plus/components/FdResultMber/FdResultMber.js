import { useState } from "react";
import { St } from "./FdResultMber.styled";
import { MrBaseExchangeRateModal } from "../../../../../components/MrBaseExchangeRateModal/v1";

export function FdResultMber({
    selectedMrBaseExchangeRate,
    selectedMrBaseExchangeRateValue,
    onSelectResultMberId
}) {
    const [mrBaseExchangeRateModalOpen, setMrBaseExchangeRateModalOpen] = useState(false);

    const toggleMrBaseExchangeRateModalOpen = (bool) => {
        setMrBaseExchangeRateModalOpen(bool);
    }

    const handleSelect = (value) => {
        let mrBaseExchangeRateId = value?.id;
        onSelectResultMberId(mrBaseExchangeRateId);
        toggleMrBaseExchangeRateModalOpen(false);
    }

    return (
        <>
            <St.Container>
                <St.Wrapper>
                    <div>
                        <div className='title'>
                            결과값 기준환율 (1{selectedMrBaseExchangeRate?.name}={selectedMrBaseExchangeRateValue}KRW)
                        </div>
                        <div className='mgl-flex mgl-flex-justifyContent-flexEnd'>
                            <div className="mberItem" onClick={() => toggleMrBaseExchangeRateModalOpen(true)}>{selectedMrBaseExchangeRate?.name}</div>
                        </div>
                    </div>
                </St.Wrapper>
            </St.Container>

            {mrBaseExchangeRateModalOpen &&
                <MrBaseExchangeRateModal
                    open={mrBaseExchangeRateModalOpen}
                    onClose={() => toggleMrBaseExchangeRateModalOpen(false)}
                    onSelect={handleSelect}
                />
            }
        </>
    );
}