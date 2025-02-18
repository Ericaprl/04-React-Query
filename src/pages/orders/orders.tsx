import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowRight, Search, X } from "lucide-react";

export function Orders() {
    return (
        <>
            <title>Orders</title>
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
            </div>
            <div className="space-y-2.5">
                <form className="flex items-center gap-2">
                    <span className="text-sm font-semibold">filters</span>
                    <Input placeholder="user name" className="h-8 w-[320px]" />
                </form>

                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[64px]"></TableHead>
                                <TableHead className="w-[140px]">Id</TableHead>
                                <TableHead className="w-[180px]">Order Placed At </TableHead>
                                <TableHead className="w-[140px]">Status</TableHead>
                                <TableHead>Client</TableHead>
                                <TableHead className="w-[140px]">Total</TableHead>
                                <TableHead className="w-[164px]"></TableHead>
                                <TableHead className="w-[132px]"></TableHead>

                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <Button variant={'outline'} size={'xs'}>
                                        <Search className="h-3 w-3" />
                                        <span className="sr-only">Details of the order</span>
                                    </Button>
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
                                        <ArrowRight className="h-2 w-2"/>
                                        Aproved</Button>
                                </TableCell>
                                <TableCell>
                                    <Button variant={'ghost'} size={'xs'}>
                                        <X className="h-2 w-2"/>
                                        Cancel</Button>
                                </TableCell>

                            </TableRow>
                        </TableBody>

                    </Table>
                </div>

            </div>
        </>
    )
}
