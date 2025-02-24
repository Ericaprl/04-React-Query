import { api } from "@/lib/axios";

export interface GetDayOrdersAmountReponse{
    amount: number,
    diffFromYesterday: number,
}

export async function getDayOrdersAmount(){
    const response = await api.get<GetDayOrdersAmountReponse>('/metrics/day-orders-amount')

    return response.data;
}