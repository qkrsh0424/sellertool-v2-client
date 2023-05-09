import { uploadDataConnect } from "../../data_connect/uploadDataConnect";

/**
 * 
 * @param {object} params
 * @param {number} params.MAX_FILE_SIZE
 * @returns 
 */
const useImageUploaderHooks = ({
    MAX_FILE_SIZE
}) => {
    const uploadImages = async (files) => {
        let formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            let maxFileSize = MAX_FILE_SIZE;
            let allowedExtension = ['jpeg', 'jpg', 'png', 'gif', 'bmp'];

            if (file.size >= maxFileSize) {
                alert('10MB 이하의 이미지만 등록가능합니다.');
                return;
            }
            if (file.type.split('/')[0] != 'image') {
                alert('only image type file allowed.');
                return;
            }

            if (!allowedExtension.includes(file.type.split('/')[1])) {
                alert('only jpeg,jpg,png,gif,bmp extension allowed.');
                return;
            }
            formData.append('files', files[i]);
        }

        return await uploadDataConnect().uploadImagesToS3(formData)
            .then(res => {
                if (res.status === 200) {
                    return res.data.data;
                }
            })
            .catch(err => {
                let res = err.response;
                if (!res) {
                    alert('네트워크가 연결이 원활하지 않습니다.');
                    return null;
                }

                if (res.status === 500) {
                    alert('undefined error.');
                    return null;
                }

                alert(res.data.memo);
                return null;
            })
    }

    return {
        uploadImages
    }
}
export default useImageUploaderHooks;