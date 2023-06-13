import { v4 as uuidv4 } from 'uuid';

export class FormDetail {
    constructor() {
        this.cid = null;
        this.id = uuidv4();
        this.customCellName = '구성요소명';
        this.mergeYn = 'n';
        this.fieldType = '일반';
        this.fixedValue = '';
        this.viewDetails = [];
        this.mergeSplitter = '\n';
        this.valueSplitter = '-';
        this.orderNumber = null;
        this.erpcExcelDownloadFormId = null;
    }

    toJson() {
        return {
            cid: this.cid,
            id: this.id,
            customCellName: this.customCellName,
            mergeYn: this.mergeYn,
            fieldType: this.fieldType,
            fixedValue: this.fixedValue,
            viewDetails: this.viewDetails,
            mergeSplitter: this.mergeSplitter,
            valueSplitter: this.valueSplitter,
            orderNumber: this.orderNumber,
            erpcExcelDownloadFormId: this.erpcExcelDownloadFormId,
        }
    }
}

export const fieldTypes = [
    '일반',
    '고정값',
    '운송코드'
]
export const splitters = [
    '\n',
    '\t',
    ' ',
    '-',
    '--',
    ',',
    ',,',
    '/',
    '//',
    '|',
    '||',
    '&',
    '&&',
    '|&&|',
    '$',
    '$$',
    '|$$|'
];