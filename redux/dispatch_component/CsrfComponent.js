import { useEffect } from "react";
import { csrfDataConnect } from "../../data_connect/csrfDataConnect";

const INTERVAL_TIME = 25 * 60 * 1000; // 25분

export default function CsrfComponent(props) {
    useEffect(() => {
        csrfDataConnect().getApiCsrf();
        
        let interval = setInterval(() => {
            csrfDataConnect().getApiCsrf();
        }, INTERVAL_TIME);

        return () => clearInterval(interval);
    }, []);

    return null;
}