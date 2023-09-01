export const AnalysisUtils = {
    eventName: {
        MARGIN_CALCULATE_BTN_CLICKED: 'margin_calculate_btn_clicked'
    },
    /**
     * onClick={()=>AnalysisUtils.gtagClickEventHandler(AnalysisUtils.eventName.MARGIN_CALCULATE_BTN_CLICKED, {custom_service:?, custom_link:?, id:?})}
     */
    gtagClickEventHandler: (eventName = '', options = {}) => {
        if (window?.gtag) {
            gtag('event', eventName, {
                ...options
            })
        }
    }
}