import { customToast, defaultOptions } from "../components/toast/custom-react-toastify/v1";

export const ClipboardUtils = {
    copyToClipboard: async (text) => {
        const successMessage = '클립보드에 복사되었습니다.';
        await navigator.clipboard.writeText(text);
        customToast.info(successMessage, {
            ...defaultOptions
        })
    }
}