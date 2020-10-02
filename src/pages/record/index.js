import React, { useState, useEffect, useRef }from 'react'
import { Form, Input, Box } from '@alifd/next'
import echarts from 'echarts'
import dealTime from './deal'
const FormItem = Form.Item
let myChart = ''
export default function Record() {
    const ref = useRef(null)
    const handleSubmit = function (res) {
        if (res.info) {
            const result = dealTime(res.info)
            console.log(result)
        }   
        if (!myChart) myChart = echarts.init(ref.current)
        const option  = {
            title: {
                text: '时间分布',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                // orient: 'vertical',
                // top: 'middle',
                bottom: 10,
                left: 'center',
                data: ['西凉', '益州', '兖州', '荆州', '幽州']
            },
            series: [
                {
                    type: 'pie',
                    radius: '65%',
                    center: ['50%', '50%'],
                    selectedMode: 'single',
                    data: [
                        {
                            value: 1548,
                            name: '幽州',
                        },
                        {value: 535, name: '荆州', label: 'xxx'},
                        {value: 510, name: '兖州'},
                        {value: 634, name: '益州'},
                        {value: 735, name: '西凉'}
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option)
    }
    
    return (<div className="record">
        <Box direction="row" align="center" padding={20} className="box">
            <Form style={{width: 800}}>
                <FormItem label="info:">
                    <FormItem>
                        <Input.TextArea 
                            style={{width: 800, height: 600}}
                            name="info"
                        />
                    </FormItem>
                </FormItem>
                <FormItem label=" ">
                    <Form.Submit onClick={handleSubmit}>计算</Form.Submit>
                </FormItem>
            </Form>
            <Form style={{width: 400}}>
                <div ref={ref} style={{height: 800, width: 600}}></div>
                <div>valid time</div>
                <div>basic time</div>
                <div>waste time</div>
            </Form>

        </Box>
    </div>)
}