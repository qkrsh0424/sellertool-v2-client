import { useEffect, useState } from "react";
import useTargetTimeTimerHook from "../../../../../../../../hooks/timer/useTargetTimeTimerHook";
import { setPlusTime } from "../../../../utils/dateFormatUtils";
import { Wrapper } from "../styles/Button.styled";
import { CustomBoxImage } from "../../../../modules";
import { CustomBlockButton } from "../../../buttons/block-button/v1";
import { CustomProgressBar } from "../../../progress/progress-bar/v1";
import { Fab, LinearProgress } from "@mui/material";

export default function ButtonFieldView({
    currentRecordInfo,
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
        if(!currentRecordInfo) {
            return;
        }

        let targetTime = setPlusTime(currentRecordInfo?.created_at, 1, 0, 0);
        onUpdateTargetTime(targetTime);
        onActiveTimer();
        setDisabledBtn(false)
    }, [currentRecordInfo])

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
                    <>
                        {disabledBtn ?
                            <CustomBlockButton
                                className='button-item'
                                disabled={true}
                            >
                                <span>
                                    조회중입니다...
                                </span>
                                <div className='progress-box'>
                                    <CustomProgressBar type='linear' customColor={'#9aaae0'} />
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
                    </>
                }
            </form>
        </Wrapper>
    )
}