import { useEffect } from "react";
import { setPlusTime } from "../../../../utils/dateFormatUtils";
import { Wrapper } from "../styles/Button.styled";
import { CustomBoxImage } from "../../../../modules";
import { CustomBlockButton } from "../../../buttons/block-button/v1";
import { CustomProgressBar } from "../../../progress/progress-bar/v1";
import useTargetTimeTimerHook from "../../../../../../../../hooks/timer/useTargetTimeTimerHook";

export default function ButtonFieldView({
    targetRecordInfo,
    isRecordSearchLoading,
    isRecordDetailsSearchLoading,
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
        
        let targetTime = setPlusTime(targetRecordInfo?.created_at, 1, 0, 0);
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
                        {(isRecordSearchLoading || isRecordDetailsSearchLoading) ?
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