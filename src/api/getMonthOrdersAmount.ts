import { api } from "@/lib/axios";

export interface GetMonthOrdersAmountReponse{
    amount: number,
    diffFromLastMonth: number,
}

export async function getMonthOrdersAmount(){
    const response = await api.get<GetMonthOrdersAmountReponse>('/metrics/month-orders-amount')

    return response.data;
}