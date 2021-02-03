import React, { useState, useEffect, useRef }from 'react'
import { Form, Input, Box, Nav,} from '@alifd/next'
import echarts from 'echarts'
import dealTime from './deal'
import getChartOption from './getChartOption'
import utils from '@/utils'
import * as api from '@/api/record'
import './index.less'

const FormItem = Form.Item
const { Item, SubNav } = Nav;
let myChart = ''
export default function Record() {
    const ref = useRef(null)
    const [recordInfo, setRecordInfo] = useState({})
    const [currentRecord, setCurrentRecord] = useState('')
    const [days, setDays] = useState([])
    const [selectedDay, setSelectedDay] = useState(utils.getToday())
    const handleSubmit = function (res) {
        if (currentRecord) {
            console.log(currentRecord)
            const _result = dealTime(currentRecord)
            console.log(_result)
            const {detail, result} = _result
            setRecordInfo(result)
            api.saveRecord(
                {date: selectedDay, detail, result, stringInfo: currentRecord})
            const option = getChartOption(_result.detail)
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option)
        }   
    }
    useEffect(() => {
        myChart = echarts.init(ref.current)
        setDays(utils.getRecentDays())
        getInfo(selectedDay);
    }, []);

    const getInfo = (selectedDay) => {
        api.getRecord(selectedDay).then((res) => {
            if (!res) {
                // myChart.setOption({})
                setRecordInfo({})
                setCurrentRecord('')
                return
            }
            console.log('res------>', res)
            setRecordInfo(res.result)
            setCurrentRecord(res.stringInfo)
            const option = getChartOption(res.detail)
            myChart.setOption(option)
        })
    }
    const handelDateSelect = (selectedKeys) => {
        setSelectedDay(selectedKeys[0])
        getInfo(selectedKeys[0]);
    }
    const handelRecordChange = (value) => {
        setCurrentRecord(value)
    }
    
    return (<div className="record">
        <Nav style={{ width: '200px' }} 
        defaultSelectedKeys={[selectedDay]} 
        iconOnly={false} hasArrow={true} 
        onSelect={handelDateSelect}
        hasTooltip={false}>
            {days.map((day)=> <Item icon="calendar" key={day}>{day}</Item>)}
        </Nav>
        <Box direction="row" align="center" padding={20} className="box">
            <Form style={{width: 800}}>
                <FormItem label="info:">
                    <FormItem>
                        <Input.TextArea 
                            style={{width: 800, height: 600}}
                            name="info"
                            value={currentRecord}
                            onChange={handelRecordChange}
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