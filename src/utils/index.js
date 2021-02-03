import moment from 'moment'
const format = 'YYYY-MM-DD'
export default {
    getRecentDays: function(n = 10) {
        const result = []
        for (let i = 0; i< n; i ++) {
            result.push(moment().subtract(i, 'days').format(format));
        }
        return result;
    },
    getToday() {
        return moment().format(format);
    },
    getWeekday() {
        
    }
}