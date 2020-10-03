import React, { useState, useEffect, useRef }from 'react'
import { Form, Input, Box } from '@alifd/next'
import echarts from 'echarts'
import dealTime from './deal'
import store from './store'
import getChartOption from './getChartOption'

const FormItem = Form.Item
let myChart = ''
export default function Record() {
    const ref = useRef(null)
    const [recordInfo, serRecordInfo] = useState({})
    const lastUsedInfo = store.getTodayInfo()
    console.log('lastUsedInfo', lastUsedInfo)
    const handleSubmit = function (res) {
        if (res.info) {
            console.log(res.info)
            const result = dealTime(res.info)
            console.log(result)
            serRecordInfo(result.result)
            store.saveTodayInfo(res.info);
            const option = getChartOption(result.detail)
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option)
        }   
    }
    useEffect(() => {
        console.log('init myChart', ref.current)
        myChart = echarts.init(ref.current)
    }, [])
    
    return (<div className="record">
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