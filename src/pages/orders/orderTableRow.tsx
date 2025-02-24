import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { ArrowRight, Search, X } from "lucide-react";
import { OrdersDetails } from "./ordersDetails";
import { OrderStatus } from "@/components/orderStatus";
import { formatDistanceToNow } from "date-fns"
import { enIE } from "date-fns/locale"
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrder } from "@/api/cancelOrder";
import { GetOrdersResponse } from "@/api/getOrders";
import { approveOrder } from "@/api/approveOrder";
import { deliverOrder } from "@/api/deliverOrder";
import { dispatchOrder } from "@/api/dispatchOrder";


export interface OrderTableRowProps {
    order: {
        orderId: string
        createdAt: string
        status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
        customerName: string
        total: number
    }
}


export function OrderTableRow({ order }: OrderTableRowProps) {
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const queryClient = useQueryClient();

    function updateOrderStatusOnCache(orderId: string, status: OrderStatus) {
        const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
            queryKey: ['orders'],
        })

        ordersListCache.forEach(([cacheKey, cacheData]) => {
            if (!cacheData) {
              return
            }
      
            queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
              ...cacheData,
              orders: cacheData.orders.map((order) => {
                if (order.orderId === orderId) {
                  return { ...order, status }
                }
      
                return order
              }),
            })
          })
    }

    const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } = useMutation({
        mutationFn: cancelOrder,
        async onSuccess(_, { orderId }) {
            updateOrderStatusOnCache(orderId, 'canceled') 
        },

    })

    const { mutateAsync: approveOrderFn, isPending: isApprovingOrder  } = useMutation({
        mutationFn: approveOrder,
        async onSuccess(_, { orderId }) {
            updateOrderStatusOnCache(orderId, 'processing') 
        },

    })

    const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder}  = useMutation({
        mutationFn: dispatchOrder,
        async onSuccess(_, { orderId }) {
            updateOrderStatusOnCache(orderId, 'delivering') 
        },

    })
    
    const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } = useMutation({
        mutationFn: deliverOrder,
        async onSuccess(_, { orderId }) {
            updateOrderStatusOnCache(orderId, 'delivered') 
        },

    })




    return (
        <TableRow>
            <TableCell>
                <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                    <DialogTrigger asChild>
                        <Button variant={'outline'} size={'xs'}>
                            <Search className="h-3 w-3" />
                            <span className="sr-only">Details of the order</span>
                        </Button>
                    </DialogTrigger>
                    <OrdersDetails open={isDetailsOpen} orderId={order.orderId} />
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
                <OrderStatus status={order.status} />
            </TableCell>

            <TableCell className="font-medium">{order.customerName}</TableCell>

            <TableCell className="font-medium">{(order.total / 100).toLocaleString('en-IE', {
                style: 'currency',
                currency: 'EUR',
            })}
            </TableCell>

            <TableCell>
                {order.status === 'pending' && (
                    <Button onClick={() => approveOrderFn({orderId: order.orderId})} disabled={isApprovingOrder}
                    variant={'outline'} size={'xs'}>
                    <ArrowRight className="h-2 w-2" />
                    Aproved
                </Button>
                )}
                
                {order.status === 'processing' && (
                    <Button onClick={() => dispatchOrderFn({orderId: order.orderId})} disabled={isDispatchingOrder}
                    variant={'outline'} size={'xs'}>
                    <ArrowRight className="h-2 w-2" />
                    Delivering
                </Button>
                )}

                {order.status === 'delivering' && (
                    <Button onClick={() => deliverOrderFn({orderId: order.orderId})} disabled={isDeliveringOrder}
                    variant={'outline'} size={'xs'}>
                    <ArrowRight className="h-2 w-2" />
                    Delivered
                </Button>
                )}

            </TableCell>
            <TableCell>
                <Button disabled={!['pending', 'processing'].includes(order.status) || isCancelingOrder}
                    onClick={() => cancelOrderFn({ orderId: order.orderId })}
                    variant={'ghost'} size={'xs'}>
                    <X className="h-2 w-2" />
                    Cancel
                </Button>
            </TableCell>

        </TableRow>
    )
}
