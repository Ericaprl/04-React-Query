import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { ArrowRight, Search, X } from "lucide-react";
import { OrdersDetails } from "./ordersDetails";

export function OrderTableRow() {
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
            <TableCell className="font-mono text-sm font-medium">23</TableCell>
            <TableCell className="text-muted-foreground">15 minutes ago</TableCell>
            <TableCell>
                <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-slate-400"></span>
                    <span className="font-medium text-muted-foreground">Pending</span>
                </div>
            </TableCell>
            <TableCell className="font-medium">Erica Pereira</TableCell>
            <TableCell className="font-medium">
                €20,00
            </TableCell>
            <TableCell>
                <Button variant={'outline'} size={'xs'}>
                    <ArrowRight className="h-2 w-2" />
                    Aproved</Button>
            </TableCell>
            <TableCell>
                <Button variant={'ghost'} size={'xs'}>
                    <X className="h-2 w-2" />
                    Cancel</Button>
            </TableCell>

        </TableRow>
    )
}
