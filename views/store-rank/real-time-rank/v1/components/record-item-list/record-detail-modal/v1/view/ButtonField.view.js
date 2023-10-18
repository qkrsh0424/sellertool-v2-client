import { useEffect } from "react";
import { setPlusTime } from "../../../../../utils/dateFormatUtils";
import { Wrapper } from "../styles/Button.styled";
import { CustomBoxImage } from "../../../../../modules";
import { CustomBlockButton } from "../../../../../modules/buttons/block-button/v1";
import { CustomProgressBar } from "../../../../../modules/progress/progress-bar/v1";
import useTargetTimeTimerHook from "../../../../../../../../../hooks/timer/useTargetTimeTimerHook";
import { getSearchableDiffSeconds } from "../../../../../../../../../static-data/nRankRecordOptions";
import useDisabledBtn from "../../../../../../../../../hooks/button/useDisabledBtn";

export default function ButtonFieldView({
    lastSearchedRecordInfo,
    isPending,
    isInitSearchLoading,
    onSubmit
}) {
    const [disabledBtn, setDisabledBtn] = useDisabledBtn();

    const {
        timer,
        onUpdateTargetTime,
    } = useTargetTimeTimerHook();

    useEffect(() => {
        if(!lastSearchedRecordInfo) {
            return;
        }
        
        let targetTime = setPlusTime(lastSearchedRecordInfo?.created_at, 0, 0, getSearchableDiffSeconds());
        onUpdateTargetTime(targetTime);
    }, [lastSearchedRecordInfo])

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setDisabledBtn(true);
        onSubmit();
    }

    return (
        <Wrapper>
            <form onSubmit={(e) => handleSubmit(e)}>
                {timer &&
                    <CustomBlockButton
                        type='button'
                        className='disabled-btn timer-button'
                        disabled
                        style={{ height: '45px' }}
                    >
                        <div>
                            <CustomBoxImage
                                src='/images/icon/timer_default_999999.svg'
                                size='20px'
                                />
                        </div>
                        <div>{timer}</div>
                    </CustomBlockButton>
                }

                {!timer && 
                    <>
                        {isPending ?
                            <CustomBlockButton
                                type='button'
                                className='button-item'
                                disabled
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
                                disabled={disabledBtn || isInitSearchLoading}
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