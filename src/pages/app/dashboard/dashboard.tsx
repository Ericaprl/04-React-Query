import DayOrdersAmountCard from "./dayOrdersAmountCard";
import MonthCanceledOrdersAmountCard from "./monthCanceledOrdersAmountCard";
import MonthOrdersAmountCard from "./monthOrdersAmountCard";
import { MonthRevenueCard } from "./monthRevenueCard";
import { PopularProductsChart } from "./popularProductsChart";
import { RevenueChart } from "./revenueChart";

export function Dashboard() {
    return (
        <>
            <title>Dashboard</title>

            <div className="flex flex-col gap-4">
                <h1 className="text-3x1 font-bold tracking-tight">Dashboard</h1>
                <div className="grid grid-cols-4 gap-4">
                    <MonthRevenueCard />
                    <MonthOrdersAmountCard />
                    <DayOrdersAmountCard />
                    <MonthCanceledOrdersAmountCard />
                </div>
                <div className="grid grid-cols-9 gap-4">
                    <RevenueChart/>
                    <PopularProductsChart/>

                </div>
            </div>
        </>
    )
}