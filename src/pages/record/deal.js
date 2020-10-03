const tags = [
    'study',
    'sleep',
    'daily-road',
    'daily',
    'waste',
    'work',
    'tech',
    'fun',
    'plan'
]

const reg = /(\d{1,2}\s*[:]\s*\d{1,2}\s*-\s*\d{1,2}\s*[:]\s*\d{1,2})/;
const reg2 =  /(\d{1,2}\s*[:]\s*\d{1,2})/;

function formatTimeDuration(time) {
    const h = parseInt(time / 60);
    const m = time - h * 60;
    return h ? `${h}h${m}m` : `${m}m`;
}  
function timeStrToNumber(time) {
    let [h, m] = time.split(':');
    h = Number(h);
    m = Number(m);
    return h * 60 + m;
}

export default function deal(data) {
    let timeStr = '';
    let timeStartStr = '0:00';
    const tagsInfo = tags.reduce((acc, tag) => {
        acc[tag] = {time: 0, items: []}
        return acc;
    }, {});

    function calcTimeDuration(timeStr) {
        //- 中文和英文的都是一样的
        let [timeStart, timeEnd] = timeStr.split('-');
        timeStartStr = timeEnd;
        return  timeStrToNumber(timeEnd) - timeStrToNumber(timeStart);
    }

    function dealLineInfo(str) {
        //处理中文的冒号
        str = str.replace(/：/g, ':');
        timeStr = '';
        if (str.match(reg)) {
            timeStr = str.match(reg)[0]
        } else if (str.match(reg2)){
            timeStr = timeStartStr+ '-' +str.match(reg2)[0];
        }
        //去除时间的空格
        timeStr = timeStr.replace(/\s+/g, "");
        const time = calcTimeDuration(timeStr);
        const flag = tags.some((tag) => {
            let index = str.indexOf(tag);
            if (index !== -1) {
                tagsInfo[tag].time += time;
                tagsInfo[tag].items.push({timeStr: timeStr, duration: time, durationStr: formatTimeDuration(time) , thing: str.slice(index)});
                return true;
            };
        });
        if (!flag) {
            throw new Error(str);
        }
    }

    data.split('\n').forEach((line) => {
        if (line) {
            dealLineInfo(line);
        } 
    })
    const result = {};
    let validate = 0;
    const validateMap = ['study', 'work', 'tech', 'plan'];
    const basicMap = ['sleep', 'daily', 'daily-road'];
    let basicTime = 0;
    let total = 0;
    Object.keys(tagsInfo).forEach((key)=> {
        const tagInfo = tagsInfo[key]; 
        tagInfo.timeStr =formatTimeDuration(tagInfo.time);
        total += tagInfo.time;
        if (validateMap.includes(key)) {
            validate += tagInfo.time;
        } 
        if (basicMap.includes(key)) {
            basicTime += tagInfo.time;
        }

        result[key] = tagInfo.timeStr;
    });
    result.validate = formatTimeDuration(validate);
    result.basic = formatTimeDuration(basicTime);
    result.total = formatTimeDuration(total);

    return {
        result,
        detail: tagsInfo
    };
}
