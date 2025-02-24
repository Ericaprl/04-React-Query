import { api } from "@/lib/axios";

export interface GetMonthCanceledOrdersAmountReponse{
    amount: number,
    diffFromLastMonth: number,
}

export async function getMonthCanceledOrdersAmount(){
    const response = await api.get<GetMonthCanceledOrdersAmountReponse>('/metrics/month-canceled-orders-amount')

    return response.data;
}