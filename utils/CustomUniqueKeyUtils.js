// CustomUniqueKeyUtils.js
export default class CustomUniqueKeyUtils {
    /**
     * total 18 characters
     * dateKey: 4 (base36 of yyMMdd)
     * nanoTimeKey: 10 (hex of truncated UTC-nanos)
     * randomKey: 4 (lower-case alphanumeric)
     */
    static generateCode18() {
        return (
            this._getDateKey() +
            this._getNanoTimeKey() +
            this._getRandomKey(4)
        );
    }

    /**
     * total 20 characters
     * dateKey: 4
     * nanoTimeKey: 10
     * randomKey: 6
     */
    static generateCode20() {
        return (
            this._getDateKey() +
            this._getNanoTimeKey() +
            this._getRandomKey(6)
        );
    }

    /**
     * total 4 characters
     * upper case, lower case, numbers 1~9
     */
    static generateFreightCode() {
        const chars =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789';
        let result = '';
        for (let i = 0; i < 4; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    // ———— 내부 헬퍼들 ————

    // dateKey: base36 문자열 (yyMMdd → number → toString(36))
    static _getDateKey() {
        const now = new Date();
        const yy = String(now.getFullYear() % 100).padStart(2, '0');
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const dd = String(now.getDate()).padStart(2, '0');
        const num = parseInt(yy + mm + dd, 10);
        return num.toString(36);
    }

    // nanoTimeKey: hex 문자열 (UTC 하루 경과 나노초 + 오프셋 → 자르기 → toString(16))
    static _getNanoTimeKey() {
        const nano = this._getNanoTime();
        const offset = 100_000_000_000_000; // 1e14
        const plus = String(nano + offset);
        const truncated = plus.slice(0, -3); // 마지막 3자리 제거
        return parseInt(truncated, 10).toString(16);
    }

    // UTC 자정부터 경과한 나노초 계산 (정수)
    static _getNanoTime() {
        const now = new Date();
        const h = now.getUTCHours();
        const m = now.getUTCMinutes();
        const s = now.getUTCSeconds();
        const ms = now.getUTCMilliseconds();
        // 초까지 → ms 단위 → 나노초 단위
        return ((h * 3600 + m * 60 + s) * 1e3 + ms) * 1e6;
    }

    // randomKey: 지정 길이만큼 lower-case alphanumeric
    static _getRandomKey(length) {
        return this._getRandomAlphanumeric(length);
    }

    static _getRandomAlphanumeric(length) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let s = '';
        for (let i = 0; i < length; i++) {
            s += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return s.toLowerCase();
    }
}
