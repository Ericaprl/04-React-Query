import { getMonthOrdersAmount } from "@/api/getMonthOrdersAmount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Utensils } from "lucide-react";
import { MetricCardSkeleton } from "./metricCardSkeleton";

export default function MonthOrdersAmountCard() {
    const {data: monthOrdersAmount} = useQuery({
        queryFn: getMonthOrdersAmount,
        queryKey: ['metrics', 'month-orders-amount'],
    })
  return (
    <Card>
    <CardHeader className="flex-row space-y-0 items-center justify-between pb-2">
        <CardTitle className="text-base">Orders (month)</CardTitle>
        <Utensils className="h-4 w-4" />
    </CardHeader>
    <CardContent className="space-y-1">
    {monthOrdersAmount ? (
                <>
                    <span className="text-2xl font-bold tracking-tight">{monthOrdersAmount.amount.toLocaleString('en-IE')}</span>
                    <p className="text-xs text-muted-foreground">
                        {monthOrdersAmount.diffFromLastMonth >= 0 ?(
                            <>
                           <span className="text-emerald-500 dark:text-emerald-400">+{monthOrdersAmount.diffFromLastMonth}%</span>{' '}
                           related to ;ast month
                           </>
                        ) : (
                            <>
                            <span className="text-rose-500 dark:text-rose-400">{monthOrdersAmount.diffFromLastMonth}%</span>{' '}
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
