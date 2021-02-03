import React, {useRef} from 'react'
import { DatePicker, Button } from '@alifd/next'
import echarts from 'echarts'

const { RangePicker} = DatePicker;
// const startValue = moment('2017-11-20', 'YYYY-MM-DD', true);
// const endValue = moment('2017-12-15', 'YYYY-MM-DD', true);

export default function report(params) {
    const ref = useRef(null)
    const onChange = () => {

    }
    return (<div>
        <div>
            <Button type="primary">本周</Button> &nbsp;&nbsp;
            <Button type="primary">本月</Button> &nbsp;&nbsp;
            <RangePicker onChange={onChange} />
        </div>
        <div ref={ref} style={{height: 800, width: 600}}></div>
    </div>)
}

