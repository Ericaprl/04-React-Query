import { getDailyRevenueInPeriod } from "@/api/getDailyRevenueInPeriod";
import { DateRangePicker } from "@/components/ui/dateRangePicker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis, } from 'recharts';
import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { subDays} from 'date-fns'


export function RevenueChart() {
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: subDays(new Date(),7),
        to: new Date(),
    })

    const { data: dailyRevenue } = useQuery({
        queryKey: ['metrics', 'daily-receipt-in-period', dateRange],
        queryFn: () => getDailyRevenueInPeriod({
            from: dateRange?.from,
            to: dateRange?.to,
        }),

    })

    const charData = useMemo(()=>{
        return dailyRevenue?.map(chartItem => {
            return{
                data: chartItem.date,
                receipt: chartItem.receipt /100 
            }
        })

    },[dailyRevenue])

    return (
        <Card className="col-span-6">
            <CardHeader className="flex-row items-center justify-between pb-8">
                <div className="space-y-1">
                    <CardTitle className="text-base font-medium">Revenue for the Period</CardTitle>
                    <CardDescription>Daily Revenue for the Period</CardDescription>
                </div>
                <div className="flex items-center gap-3">
                    <Label>Period</Label>
                    <DateRangePicker date={dateRange} onDateChange={setDateRange}/>

                </div>
            </CardHeader>
            <CardContent>
                {charData && (
                    <ResponsiveContainer width='100%' height={240}>
                        <LineChart data={charData} style={{ fonteSize: 12 }}>
                            <XAxis dataKey={'date'}
                                tickLine={false}
                                axisLine={false}
                                dy={16}
                            />
                            <YAxis stroke="#888"
                                axisLine={false}
                                tickLine={false}
                                width={88}
                                tickFormatter={(value: number) =>
                                    value.toLocaleString('en-IE', {
                                        style: 'currency',
                                        currency: 'EUR',
                                    })} />
                            <CartesianGrid vertical={false} className="stroke-muted" />
                            <Line type={'linear'}
                                strokeWidth={2}
                                dataKey={'receipt'}
                                stroke={'#8b5cf6'}>
                            </Line>
                        </LineChart>
                    </ResponsiveContainer>
                )}

            </CardContent>
        </Card>
    )
}
