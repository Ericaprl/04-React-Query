import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils } from "lucide-react";

export default function MonthOrdersAmountCard() {
  return (
    <Card>
    <CardHeader className="flex-row space-y-0 items-center justify-between pb-2">
        <CardTitle className="text-base">Orders (month)</CardTitle>
        <Utensils className="h-4 w-4" />
    </CardHeader>
    <CardContent className="space-y-1">
        <span className="text-2xl font-bold tracking-tight">120</span>
        <p className="text-xs text-muted-foreground">
            <span className="text-emerald-500">+ 6%</span> related to the last month</p>
    </CardContent>
</Card>

)
}
