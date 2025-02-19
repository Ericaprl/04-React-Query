import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectValue,SelectTrigger } from "@/components/ui/select";
import { Search, X } from "lucide-react";

export function OrderTableFilters() {
    return (
        <form className="flex items-center gap-2">
            <span className="text-sm font-semibold">filters</span>
            <Input placeholder="Order ID" className="h-8 w-auto" />
            <Input placeholder="Customer name" className="h-8 w-[320px]" />
            
            <Select defaultValue="all">
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
            <Button type="submit" variant={'secondary'} size={'xs'}>
                <Search className="mr-2 h-4 w-4"/>
                Filter results
            </Button>
            <Button type="button" variant={'outline'} size={'xs'}>
                <X className="mr-2 h-4 w-4"/>
                Remove filters
            </Button>
        </form>

    )
}
