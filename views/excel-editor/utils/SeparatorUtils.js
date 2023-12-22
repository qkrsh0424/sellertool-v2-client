export function SeparatorUtils() {
    const separatorList = [
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

    function getValueList() {
        return separatorList;
    }

    function getValueString(value) {
        switch (value) {
            case '\n':
                return '줄바꿈';
            case '\t':
                return '들여쓰기';
            case ' ':
                return '띄어쓰기';
            default:
                return value;

        }
    }

    return {
        getValueList,
        getValueString
    }
}