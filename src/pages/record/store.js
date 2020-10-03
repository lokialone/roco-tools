import moment from 'moment'
export default  {
    getTodayInfo() {
        let key = 'record-'+ moment().format('YYYY/MM/DD')
        return localStorage.getItem(key);
    },
    saveTodayInfo(val) {
        let key = 'record-'+ moment().format('YYYY/MM/DD')
        localStorage.setItem(key, val);
    }
}