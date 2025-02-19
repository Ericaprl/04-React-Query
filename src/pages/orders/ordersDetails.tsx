import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function OrdersDetails() {
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Order: 02</DialogTitle>
                <DialogDescription> Order details</DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
                <Table>
                    <TableBody>

                        <TableRow>
                            <TableCell className="text-muted-foreground">Status</TableCell>
                            <TableCell className="flex justify-end">
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-slate-400"></span>
                                    <span className="font-medium text-muted-foreground">Pending</span>
                                </div>
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="text-muted-foreground">Client</TableCell>
                            <TableCell className="flex justify-end">
                               Erica Pereira
                            </TableCell>
                        </TableRow>
                        
                        <TableRow>
                            <TableCell className="text-muted-foreground">Phone</TableCell>
                            <TableCell className="flex justify-end">
                              548646454
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="text-muted-foreground">Email</TableCell>
                            <TableCell className="flex justify-end">
                             erica@gmail.com
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableCell className="text-muted-foreground">Order Placed At</TableCell>
                            <TableCell className="flex justify-end">
                              20 minutos ago
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
                    <TableRow>
                        <TableCell>Pepperoni Pizza</TableCell>
                        <TableCell className="text-right">2</TableCell>
                        <TableCell className="text-right">€ 15,00</TableCell>
                        <TableCell className="text-right">€ 30,00 </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Margherita Pizza</TableCell>
                        <TableCell className="text-right">1</TableCell>
                        <TableCell className="text-right">€ 13,00</TableCell>
                        <TableCell className="text-right">€ 13,00 </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Coca Cola</TableCell>
                        <TableCell className="text-right">5</TableCell>
                        <TableCell className="text-right">€ 2,50</TableCell>
                        <TableCell className="text-right">€ 12,50 </TableCell>
                    </TableRow>
                </TableBody>
                <TableFooter>
                    <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right font-medium">€ 55,55</TableCell>

                    </TableRow>
                </TableFooter>
                </Table>


            </div>

        </DialogContent>


    )
}
