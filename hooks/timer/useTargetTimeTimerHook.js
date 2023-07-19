import { useEffect, useState } from "react"
import { diffTimeToHHmmss } from "../../views/store-rank/real-time-rank/v1/utils/dateFormatUtils";

export default function useTargetTimeTimerHook() {
    const [targetTime, setTargetTime] = useState(null);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [timer, setTimer] = useState(null);

    useEffect(() => {
        if(!isTimerActive) {
            setTimer(null);
            return;
        }

        onSettingTimerValue();
        
        const timer = setInterval(() => {
            onSettingTimerValue()
        }, 1000)

        return () => clearInterval(timer)
    }, [isTimerActive])

    const onSettingTimerValue = () => {
        let currentTime = new Date();

        if(currentTime > targetTime) {
            setIsTimerActive(false);
            setTimer(null);
            return;
        }

        let updateTimeDiff = diffTimeToHHmmss(currentTime, targetTime);
        setTimer(updateTimeDiff);
    }

    const onActiveTimer = () => {
        setIsTimerActive(true);
    }

    const onInactiveTimer = () => {
        setIsTimerActive(false);
    }

    const onUpdateTargetTime = (targetTime) => {
        setTargetTime(targetTime);
    }

    return {
        timer,
        isTimerActive,
        onUpdateTargetTime,
        onActiveTimer,
        onInactiveTimer,
    }
}