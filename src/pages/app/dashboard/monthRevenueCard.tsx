import { getMonthRevenue } from "@/api/getMonthRevenue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Euro } from "lucide-react";
import { MetricCardSkeleton } from "./metricCardSkeleton";


export function MonthRevenueCard() {
    const {data: monthRevenue} = useQuery({
        queryFn: getMonthRevenue,
        queryKey: ['metrics', 'month-receipt'],
    })

    return (
        <Card>
            <CardHeader className="flex-row space-y-0 items-center justify-between pb-2">
                <CardTitle className="text-base">Total revenue (month)</CardTitle>
                <Euro className="h-4 w-4" />
            </CardHeader>
            <CardContent className="space-y-1">
            {monthRevenue ? (
                <>
                    <span className="text-2xl font-bold tracking-tight">{(monthRevenue.receipt/100).toLocaleString('en-IE', {
                        style: 'currency',
                        currency:'EUR'

                    })}</span>
                    <p className="text-xs text-muted-foreground">
                        {monthRevenue.diffFromLastMonth >= 0 ?(
                            <>
                           <span className="text-emerald-500 dark:text-emerald-400">+{monthRevenue.diffFromLastMonth}%</span>{' '}
                           related to last month
                           </>
                        ) : (
                            <>
                            <span className="text-rose-500 dark:text-rose-400">{monthRevenue.diffFromLastMonth}%</span>{' '}
                            related to last mont
                            </>
                        )}
                    </p> 
                </>
                ) : (
                   <MetricCardSkeleton/>
                )}  
            </CardContent>
        </Card>
    )
}
