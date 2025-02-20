import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Building, ChevronDown, LogOut } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getProfile } from "@/api/getProfile";
import { getManagedRestaurant } from "@/api/getManagedRestaurante";
import { Skeleton } from "./ui/skeleton";
import { Dialog, DialogTrigger } from "./ui/dialog";
import RestaurantProfileDialog from "./ui/restaurantProfileDialog";
import { signOut } from "@/api/signOut";
import { useNavigate } from "react-router";



export function AccountMenu() {
    const navigate = useNavigate();
    const { data: profile, isLoading: isLoadingprofile } = useQuery({
        queryKey: ['profile'],
        queryFn: getProfile,
    })

    const { data: managedRestaurant, isLoading: isLoadingManagedRestaurant } = useQuery({
        queryKey: ['managed-restaurant'],
        queryFn: getManagedRestaurant,
    })

    const { mutateAsync: signOutFn, isPending: isPendingSignOut} = useMutation({
        mutationFn: signOut,
        onSuccess: () => {
            navigate('/signIn', {
                replace: true
            })
        },
    })


    return (
        <Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant={'outline'}
                        className="flex select-none items-center gap-2">
                        {isLoadingManagedRestaurant ? (
                            <Skeleton className="h-4 w-40" />
                        ) : (
                            managedRestaurant?.name)
                        }

                        <ChevronDown className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56">

                    <DropdownMenuLabel className="flex flex-col">
                        {isLoadingprofile ? (
                            <div className="space-y-1.5">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                        ) : (
                            <>
                                <span>{profile?.name}</span>
                                <span className="text-xs font-normal text-muted-foreground">
                                    {profile?.email}
                                </span>
                            </>
                        )}
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    <DialogTrigger asChild>
                    <DropdownMenuItem >
                        <Building className="mr-2 w-4 h-4" />
                        <span> Restaurant Profile</span>
                    </DropdownMenuItem>
                    </DialogTrigger>

                    <DropdownMenuItem asChild className="text-rose-500 dark:text-rose-400"
                        disabled={isPendingSignOut}>
                         <button className="w-full" onClick={() => signOutFn()}>
                        <LogOut className="mr-2 w-4 h-4" />
                        <span>Sign Out</span>
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
           <RestaurantProfileDialog/>
        </Dialog>

    )
}
