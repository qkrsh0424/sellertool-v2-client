import { useEffect, useState } from "react";
import CustomBlockButton from "../../../../../../components/buttons/block-button/v1/CustomBlockButton";
import useTargetTimeTimerHook from "../../../../../../hooks/timer/useTargetTimeTimerHook";
import { setPlusTime } from "../../../utils/dateFormatUtils";
import { Wrapper } from "../styles/Button.styled";
import { CustomBoxImage } from "../../../modules";

export default function ButtonFieldView({
    record,
    onSubmit
}) {
    const [disabledBtn, setDisabledBtn] = useState(false);

    const {
        isTimerActive,
        timer,
        onUpdateTargetTime,
        onActiveTimer
    } = useTargetTimeTimerHook();

    useEffect(() => {
        if(!record) {
            return;
        }

        let targetTime = setPlusTime(record.last_searched_at, 1, 0, 0);
        onUpdateTargetTime(targetTime);
        onActiveTimer();
        setDisabledBtn(false)
    }, [record])

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setDisabledBtn(true);
        onSubmit();
    }

    return (
        <Wrapper>
            <form onSubmit={(e) => handleSubmit(e)}>
                {isTimerActive ?
                    <CustomBlockButton
                        type='button'
                        className='disabled-btn timer-button'
                        disabled
                    >
                        <div>{timer}</div>
                        <div>
                            <CustomBoxImage
                                src='/images/icon/timer_default_999999.svg'
                                size='20px'
                            />
                        </div>
                    </CustomBlockButton>
                    :
                    <CustomBlockButton
                        type='submit'
                        className='button-item'
                        disabled={disabledBtn}
                    >
                        조회
                    </CustomBlockButton>
                }
            </form>
        </Wrapper>
    )
}