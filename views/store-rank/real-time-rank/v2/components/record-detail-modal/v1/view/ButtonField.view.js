import { useEffect } from "react";
import { setPlusTime } from "../../../../utils/dateFormatUtils";
import { Wrapper } from "../styles/Button.styled";
import { CustomBoxImage } from "../../../../modules";
import { CustomBlockButton } from "../../../../modules/buttons/block-button/v1";
import { CustomProgressBar } from "../../../progress/progress-bar/v1";
import useTargetTimeTimerHook from "../../../../../../../../hooks/timer/useTargetTimeTimerHook";

// 변경 시 server SEARCHABLE_DIFF_TIME도 함께 변경해야 함
const SEARCHABLE_DIFF_HOUR = 1

export default function ButtonFieldView({
    targetRecordInfo,
    isPending,
    onSubmit
}) {
    const {
        timer,
        onUpdateTargetTime,
    } = useTargetTimeTimerHook();

    useEffect(() => {
        if(!targetRecordInfo) {
            return;
        }
        
        // let targetTime = setPlusTime(targetRecordInfo?.created_at, SEARCHABLE_DIFF_HOUR, 0, 0);
        let targetTime = setPlusTime(targetRecordInfo?.created_at, 0, 1, 0);
        onUpdateTargetTime(targetTime);
    }, [targetRecordInfo])

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();

        onSubmit();
    }

    return (
        <Wrapper>
            <form onSubmit={(e) => handleSubmit(e)}>
                {timer ?
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
                        {isPending ?
                            <CustomBlockButton
                                type='button'
                                className='button-item'
                                disabled={true}
                            >
                                <span>
                                    조회중입니다...
                                </span>
                                <div className='progress-box'>
                                    <CustomProgressBar type='linear' customcolor={'#9aaae0'} />
                                </div>
                            </CustomBlockButton>
                            :
                            <CustomBlockButton
                                type='submit'
                                className='button-item'
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