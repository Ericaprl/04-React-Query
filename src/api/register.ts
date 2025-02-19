import { api } from "@/lib/axios";

export interface RegisterBody {
    restaurantName: string,
    managerName: string,
    email: string,
    phone:string,
  }
export async function registerRestaurant({restaurantName, managerName, email, phone}: RegisterBody){
    await api.post('/restaurants', {restaurantName, managerName, email, phone })
}