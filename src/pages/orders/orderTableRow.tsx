import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { ArrowRight, Search, X } from "lucide-react";
import { OrdersDetails } from "./ordersDetails";
import { OrderStatus } from "@/components/orderStatus";
import { formatDistanceToNow } from "date-fns"
import { enIE } from "date-fns/locale"


export interface OrderTableRowProps{
    order: {
        orderId: string
        createdAt: string
        status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
        customerName: string
        total: number
      }
}

export function OrderTableRow({order}:OrderTableRowProps) {
    return (
        <TableRow>
            <TableCell>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant={'outline'} size={'xs'}>
                            <Search className="h-3 w-3" />
                            <span className="sr-only">Details of the order</span>
                        </Button>
                    </DialogTrigger>
                    <OrdersDetails />
                </Dialog>
            </TableCell>

            <TableCell className="font-mono text-sm font-medium">{order.orderId}</TableCell>

            <TableCell className="text-muted-foreground">
               {formatDistanceToNow(
                    order.createdAt, {
                    locale: enIE, 
                    addSuffix: true
                })}
            </TableCell>

            <TableCell>
                <OrderStatus status={order.status}/>
            </TableCell>

            <TableCell className="font-medium">{order.customerName}</TableCell>

            <TableCell className="font-medium">{order.total.toLocaleString('en-IE',{
                style: 'currency',
                currency:'EUR',
                })}
            </TableCell>

            <TableCell>
                <Button variant={'outline'} size={'xs'}>
                    <ArrowRight className="h-2 w-2" />
                    Aproved
                </Button>
            </TableCell>
            <TableCell>
                <Button variant={'ghost'} size={'xs'}>
                    <X className="h-2 w-2" />
                    Cancel
                </Button>
            </TableCell>

        </TableRow>
    )
}
