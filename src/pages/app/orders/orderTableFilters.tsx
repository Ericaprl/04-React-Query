import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectValue,SelectTrigger } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router";
import { z } from 'zod'

const orderFiltersSchema = z.object({
    orderId: z.string().optional(),
    customerName: z.string().optional(),
    status: z.string().optional(),
  })
  
  type OrderFiltersSchema = z.infer<typeof orderFiltersSchema>



export function OrderTableFilters() {
    const [searchParams, setSearchParams] = useSearchParams();

    const orderId = searchParams.get('orderId')
    const customerName= searchParams.get('customerName')
    const status= searchParams.get('status')

    const {register, handleSubmit, control, reset } = useForm<OrderFiltersSchema>({
      resolver: zodResolver(orderFiltersSchema),
      defaultValues: {
        orderId: orderId ?? '',
        customerName: customerName ?? '',
        status: status ?? 'all',
      },
      
   
    })

    function handleFilter({orderId,customerName,status}: OrderFiltersSchema){
        setSearchParams(state => {
            if(orderId) {
                state.set('orderId', orderId)
            } else {
                state.delete('orderId')
            }

            if(customerName) {
                state.set('customerName', customerName)
            } else {
                state.delete('customerName')
            }

            if(status) {
                state.set('status', status)
            } else {
                state.delete('status')
            }

            state.set('page', '1')
            return state;
        })

    }

    function handleClearFilter(){
        setSearchParams(state => {
            state.delete('customerName')
            state.delete('orderId')
            state.delete('status')
            state.set('page','1')
            return state;
        })
        reset({
            customerName:'',
            orderId:'',
            status:'all',
        })
    }


    return (
        <form onSubmit={handleSubmit(handleFilter)} className="flex items-center gap-2">
            <span className="text-sm font-semibold">filters</span>
            <Input placeholder="Order ID" className="h-8 w-auto" {...register('orderId')} />
            <Input placeholder="Customer name" className="h-8 w-[320px]" {...register('customerName')} />
            
            <Controller name="status" control={control} render={({field: {name, onChange, value, disabled}}) => {
                return (
                    <Select defaultValue="all" name={name} onValueChange={onChange} value={value} disabled={disabled}>
                    <SelectTrigger className="h-8 w-[180px]">
                        <SelectValue/>
                    </SelectTrigger>
                  
                    <SelectContent>
                        <SelectItem value="all">All status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="canceled">Canceled</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="outForDelivery">Out for delivery</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                )
            }}>

            </Controller>
          
            <Button type="submit" variant={'secondary'} size={'xs'}>
                <Search className="mr-2 h-4 w-4"/>
                Filter results
            </Button>
            <Button onClick={handleClearFilter} type="button" variant={'outline'} size={'xs'}>
                <X className="mr-2 h-4 w-4"/>
                Remove filters
            </Button>
        </form>

    )
}
