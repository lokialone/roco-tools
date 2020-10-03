const option = {
    backgroundColor: '#2c343c',
    title: {
        text: '时间记录',
        left: 'center',
        top: 20,
        textStyle: {
            color: '#ccc'
        }
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
            colorLightness: [0, 1]
        }
    },
    series: [
        {
            name: '时间记录',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [],
            roseType: 'radius',
            label: {
                color: 'rgba(255, 255, 255, 0.3)',
                formatter: function(data) {
                    return data.data.name + ': '+data.data.label
                }
            },
            labelLine: {
                lineStyle: {
                    color: 'rgba(255, 255, 255, 0.3)'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
            },
            itemStyle: {
                color: '#c23531',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
                return Math.random() * 200;
            }
        }
    ]
};

export default function(data) {
    option.series[0].data = Object.keys(data).reduce((acc, current) => {
        acc.push({
            name: current,
            value: data[current].time,
            label: data[current].timeStr
        });
        return acc;
    }, []).sort(function (a, b) { return a.value - b.value; });
    return option;
}