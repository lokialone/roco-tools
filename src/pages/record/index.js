import React, { useState, useEffect, useRef }from 'react'
import { Form, Input, Box, Nav,} from '@alifd/next'
import echarts from 'echarts'
import dealTime from './deal'
import store from './store'
import getChartOption from './getChartOption'
import utils from '@/utils'
import db from '@/db'
import './index.less'

const FormItem = Form.Item
const { Item, SubNav } = Nav;
let myChart = ''
export default function Record() {
    const ref = useRef(null)
    const [recordInfo, serRecordInfo] = useState({})
    const lastUsedInfo = store.getTodayInfo()
    const [days, setDays] = useState([])
    const [selectedDay, setSelectedDay] = useState(utils.getToday())
    const handleSubmit = function (res) {
        if (res.info) {
            console.log(res.info)
            const _result = dealTime(res.info)
            console.log(_result)
            const {detail, result} = _result
            serRecordInfo(result)
            // db.saveRecord(
            //     selectedDay, detail, result)
            const option = getChartOption(_result.detail)
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option)
        }   
    }
    useEffect(() => {
        myChart = echarts.init(ref.current)
        setDays(utils.getRecentDays())
    }, []);
    
    return (<div className="record">
        <Nav style={{ width: '200px' }} 
        defaultSelectedKeys={[selectedDay]} iconOnly={false} hasArrow={true} hasTooltip={false}>
            {days.map((day)=> <Item icon="calendar" key={day}>{day}</Item>)}
        </Nav>
        <Box direction="row" align="center" padding={20} className="box">
            <Form style={{width: 800}}>
                <FormItem label="info:">
                    <FormItem>
                        <Input.TextArea 
                            style={{width: 800, height: 600}}
                            name="info"
                            defaultValue={lastUsedInfo}
                        />
                    </FormItem>
                </FormItem>
                <FormItem label=" ">
                    <Form.Submit onClick={handleSubmit}>计算</Form.Submit>
                </FormItem>
            </Form>
            <Form style={{width: 400}}>
                <div ref={ref} style={{height: 800, width: 600}}></div>
                {  Object.keys(recordInfo).map((key) => {
                    return <div key={key}>{key}: {recordInfo[key]}</div>
                })
                }
            </Form>

        </Box>
    </div>)
}