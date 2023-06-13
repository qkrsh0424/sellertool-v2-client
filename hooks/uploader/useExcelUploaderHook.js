import { excelFormDataConnect } from "../../data_connect/excelFormDataConnect"

export default function useExcelUploaderHook() {

    const reqCheckValid = async (formData) => {
        return await excelFormDataConnect().checkValid(formData)
            .then(res => {
                if (res.status === 200) {
                    return res.data.data;
                }
            })
            .catch(err => {
                let res = err.response;

                if (!res) {
                    alert('네트워크 연결이 원활하지 않습니다.');
                    return null;
                }

                if (res.status === 500) {
                    alert('undefined error. 관리자에 문의해 주세요.');
                    return null;
                }

                alert(res.data.memo);
                return null;
            })
    }

    return {
        reqCheckValid
    }
}