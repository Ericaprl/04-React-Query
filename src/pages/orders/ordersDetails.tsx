import { getOrderDetails } from "@/api/getOrderDetails";
import { OrderStatus } from "@/components/orderStatus";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow} from "date-fns";
import { enIE } from "date-fns/locale"

export interface OrdersDetailsProps {
    orderId: string,
    open: boolean,
}


export function OrdersDetails({ orderId, open }: OrdersDetailsProps) {
    const { data: order } = useQuery({
        queryKey: ['order', orderId],
        queryFn: () => getOrderDetails({ orderId }),
        enabled: open,
    })

 
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Order: {orderId}</DialogTitle>
                <DialogDescription> Order details</DialogDescription>
            </DialogHeader>
            {order && (
                <div className="space-y-6">
                    <Table>
                        <TableBody>

                            <TableRow>
                                <TableCell className="text-muted-foreground">Status</TableCell>
                                <TableCell className="flex justify-end">
                               <OrderStatus status={order.status}/>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell className="text-muted-foreground">Client</TableCell>
                                <TableCell className="flex justify-end">
                                   {order.customer.name}
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell className="text-muted-foreground">Phone</TableCell>
                                <TableCell className="flex justify-end">
                                    {order.customer.phone ?? 'Not informed'}
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell className="text-muted-foreground">Email</TableCell>
                                <TableCell className="flex justify-end">
                                {order.customer.email}
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell className="text-muted-foreground">Order Placed At</TableCell>
                                <TableCell className="flex justify-end">
                                {formatDistanceToNow(
                                    order.createdAt, {
                                    locale: enIE, 
                                    addSuffix: true
                                })}
                                </TableCell>
                            </TableRow>


                        </TableBody>
                    </Table>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product</TableHead>
                                <TableHead className="text-right">Qtd.</TableHead>
                                <TableHead className="text-right">Price</TableHead>
                                <TableHead className="text-right">Subtotal</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        {order.orderItems.map(item =>{
                            return (
                                <TableRow key={item.id}>
                                <TableCell>{item.product.name}</TableCell>
                                <TableCell className="text-right">{item.quantity}</TableCell>
                                <TableCell className="text-right">{(item.priceInCents/100).toLocaleString('en-IE',{style: 'currency',currency:'EUR',})}</TableCell>
                                <TableCell className="text-right">{(item.priceInCents * item.quantity / 100).toLocaleString('en-IE',{style: 'currency',currency:'EUR',})} </TableCell>
                            </TableRow>
                            )
                        })}
        
                    
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={3}>Total</TableCell>
                                <TableCell className="text-right font-medium">{(order.totalInCents/100).toLocaleString('en-IE',{style: 'currency',currency:'EUR',})}</TableCell>

                            </TableRow>
                        </TableFooter>
                    </Table>


                </div>
            )}


        </DialogContent>


    )
}
