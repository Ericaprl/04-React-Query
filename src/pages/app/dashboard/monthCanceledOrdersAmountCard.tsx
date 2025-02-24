import { getMonthCanceledOrdersAmount } from "@/api/getMonthCanceledOrdersAmount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Euro } from "lucide-react";


export default function MonthCanceledOrdersAmountCard() {
    const { data: monthCanceledOrdersAmount } = useQuery({
        queryFn: getMonthCanceledOrdersAmount,
        queryKey: ['metrics', 'month-canceled-orders-amoun'],
    })

    return (
        <Card>
            <CardHeader className="flex-row space-y-0 items-center justify-between pb-2">
                <CardTitle className="text-base">Canceled (month)</CardTitle>
                <Euro className="h-4 w-4" />
            </CardHeader>
            <CardContent className="space-y-1">
                {monthCanceledOrdersAmount && (
                    <>
                        <span className="text-2xl font-bold tracking-tight">{monthCanceledOrdersAmount.amount.toLocaleString('en-IE')}</span>
                        <p className="text-xs text-muted-foreground">
                            {monthCanceledOrdersAmount.diffFromLastMonth < 0 ? (
                                <>
                                    <span className="text-emerald-500 dark:text-emerald-400">-{monthCanceledOrdersAmount.diffFromLastMonth}%</span>{' '}
                                    related to ;ast month
                                </>
                            ) : (
                                <>
                                    <span className="text-rose-500 dark:text-rose-400">+{monthCanceledOrdersAmount.diffFromLastMonth}%</span>{' '}
                                    related to last mont
                                </>
                            )}
                        </p>
                    </>
                )}
            </CardContent>
        </Card>

    )
}
