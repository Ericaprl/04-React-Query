import { api } from "@/lib/axios";

export interface GetMonthRevenueReponse{
    receipt: number,
    diffFromLastMonth: number,
}

export async function getMonthRevenue(){
    const response = await api.get<GetMonthRevenueReponse>('/metrics/month-receipt')

    return response.data;
}