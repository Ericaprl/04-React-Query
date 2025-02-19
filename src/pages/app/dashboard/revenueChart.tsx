import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis, } from 'recharts';



const data = [
    { date: '10/01', revenue: 1200 },
    { date: '11/01', revenue: 1290 },
    { date: '12/01', revenue: 200 },
    { date: '13/01', revenue: 1900 },
    { date: '14/01', revenue: 2300 },
    { date: '15/01', revenue: 120 },
    { date: '16/01', revenue: 300 },
    { date: '17/01', revenue: 50 },
]

export function RevenueChart() {
    return (
        <Card className="col-span-6">
            <CardHeader className="flex-row items-center justify-between pb-8">
                <div className="space-y-1">
                    <CardTitle className="text-base font-medium">Revenue for the Period</CardTitle>
                    <CardDescription>Daily Revenue for the Period</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width='100%' height={240}>
                    <LineChart data={data} style={{ fonteSize: 12 }}>
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
                        <CartesianGrid vertical={false} className="stroke-muted"/>
                        <Line type={'linear'} 
                            strokeWidth={2} 
                            dataKey={'revenue'} 
                            stroke={'#8b5cf6'}>
                        </Line>
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
