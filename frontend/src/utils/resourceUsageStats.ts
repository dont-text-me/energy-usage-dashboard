import {kv} from '@vercel/kv'
import {DateReading, Usage} from "@/utils/types";
import {parseDate} from "@/utils/parseDate";
import {bin} from "d3-array";

export async function retrieveUsage(resourceType: 'electricity_readings' | 'cold_water_readings' | 'heater_readings'): Promise<[DateReading[], Usage[]]> {
    const amountKey = ['electricity_readings', 'heater_readings'].includes(resourceType) ? 'amount (kwh)' : 'amount (m3)'
    const rawData = await kv.get<any[]>(resourceType)
    const data = rawData!!
        .map<DateReading>(it => ({date: parseDate(it['date']), amount: parseInt(it[amountKey])}))
        .toSorted((a, b) => a.date.valueOf() - b.date.valueOf())
    const amounts = data.map(it => it.amount)
    const dailyUsage = amounts.map((before, idx) => amounts[idx + 1] - before).slice(0, amounts.length - 1)
    const bins = bin().thresholds(6)(dailyUsage)
    const binData = bins.map<Usage>(it => ({maxBound: it.x1!!, count: it.length}))
    return [data, binData]
}