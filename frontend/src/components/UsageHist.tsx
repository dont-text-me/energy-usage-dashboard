'use client'
import {bin} from 'd3-array'
import {Bar, BarChart, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {DateReading, Usage} from "@/utils/types";
const UsageHist = ({data} : {data: Usage[]}) => {

    return <ResponsiveContainer width='60%' height={400}>
        <LineChart width={500} height={300} data={data} margin={{left: 20}}>
            <XAxis dataKey={'usage'} tick={false}/>
            <YAxis dataKey={'count'}>
            </YAxis>
            <Line dataKey={'count'} />
            <Tooltip/>
            <Legend/>
        </LineChart>
    </ResponsiveContainer>
}
export default UsageHist