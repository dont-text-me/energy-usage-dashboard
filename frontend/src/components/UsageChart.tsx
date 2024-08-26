'use client'
import {DateReading} from "@/utils/types";
import {Label, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

const UsageChart = ({data, domain} : {data: DateReading[], domain?: [number, number]}) => {
    return <ResponsiveContainer width='60%' height={400}>
        <LineChart width={500} height={300} data={data} margin={{left: 20}}>
            <XAxis dataKey={'date'} tick={false}/>
            <YAxis dataKey={'amount'} domain={domain}>
            </YAxis>
            <Line dataKey={'amount'}/>
            <Tooltip/>
            <Legend/>
        </LineChart>
    </ResponsiveContainer>
}

export default UsageChart