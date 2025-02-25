import { getDayOrdersAmount } from "@/api/getDayOrdersAmount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Utensils } from "lucide-react";
import { MetricCardSkeleton } from "./metricCardSkeleton";

export default function DayOrdersAmountCard() {
    const { data: dayOrdersAmount} = useQuery({
        queryFn: getDayOrdersAmount,
        queryKey: ['metrics', 'day-orders-amount'],
    })
    return (
        <Card>
            <CardHeader className="flex-row space-y-0 items-center justify-between pb-2">
                <CardTitle className="text-base">Orders (day)</CardTitle>
                <Utensils className="h-4 w-4" />
            </CardHeader>
            <CardContent className="space-y-1">
                {dayOrdersAmount ?(
                    <>
                        <span className="text-2xl font-bold tracking-tight">{dayOrdersAmount.amount.toLocaleString('en-IE')}</span>
                        <p className="text-xs text-muted-foreground">
                            {dayOrdersAmount.diffFromYesterday >= 0 ? (
                                <>
                                    <span className="text-emerald-500 dark:text-emerald-400">+{dayOrdersAmount.diffFromYesterday}%</span>{' '}
                                    related to yesterday
                                </>
                            ) : (
                                <>
                                    <span className="text-rose-500 dark:text-rose-400">{dayOrdersAmount.diffFromYesterday}%</span>{' '}
                                    related to yesterday
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


