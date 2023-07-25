import { useEffect, useState } from "react"
import { diffTimeToHHmmss } from "../../views/store-rank/real-time-rank/v1/utils/dateFormatUtils";

export default function useTargetTimeTimerHook() {
    const [targetTime, setTargetTime] = useState(null);
    const [timer, setTimer] = useState(null);

    useEffect(() => {
        if(!targetTime) {
            setTimer(null);
            return;
        }

        onSettingTimerValue();
        
        const timer = setInterval(() => {
            onSettingTimerValue()
        }, 1000)

        return () => clearInterval(timer)
    }, [targetTime])

    const onSettingTimerValue = () => {
        let currentTime = new Date();

        if(currentTime > targetTime) {
            setTargetTime(null);
            setTimer(null);
            return;
        }

        let updateTimeDiff = diffTimeToHHmmss(currentTime, targetTime);
        setTimer(updateTimeDiff);
    }
    
    const onUpdateTargetTime = (targetTime) => {
        setTargetTime(targetTime);
    }

    return {
        timer,
        onUpdateTargetTime,
    }
}