import axios from "axios"

export function ExcelTranslatorCdnConnect(props) {
    return {
        getExcelTranslatorSampleListJson: getExcelTranslatorSampleListJson
    }
}

async function getExcelTranslatorSampleListJson() {
    return await axios.get(`https://s3.ap-northeast-2.amazonaws.com/json.sellertool.io/excel-editor/excelTranslatorSampleList.json`)
}