import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "./dialog";
import { getManagedRestaurant } from "@/api/getManagedRestaurante";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Textarea } from "./textarea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from 'zod'
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { updateProfile } from "@/api/updateProfile";
import { toast } from "sonner";


const restauranteProfileSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable(),
})

type RestauranteProfileSchema = z.infer<typeof restauranteProfileSchema>

export default function RestaurantProfileDialog() {
  const queryClient = useQueryClient()


  const { data: managedRestaurant } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
  })

  const {register,handleSubmit,formState: { isSubmitting },} = useForm<RestauranteProfileSchema>({
      resolver: zodResolver(restauranteProfileSchema),
      values: {
        name: managedRestaurant?.name ?? '',
        description: managedRestaurant?.description ?? '',
      },
  })

  
  // const {mutateAsync: updateProfileFn} = useMutation({
  //   mutationFn: updateProfile,
  //   onSuccess:(_,{name, description}) {
  //     const cached = queryClient.getQueriesData(['managed-restaurant'])
  //     if(cached){
  //       queryClient.getQueriesData(['managed-restaurant'],{
  //         ...cached,
  //         name, 
  //         description,
  //       })

  //     }      
  //   },
  // })

  async function handleUpdateProfile(data: RestauranteProfileSchema){
    try {
      await updateProfileFn({
        name: data.name,
        description: data.description,
      })
      toast.success('Profile updated successfully!')

    } catch{
      toast.error('Failed to update profile, please try again')

    }
  }


  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Restaurant Profile</DialogTitle>
        <DialogDescription>
          Update your establishment's information visible to your customer
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className="justify-start">
        <form onSubmit={handleSubmit(handleUpdateProfile)}>
          <div className="space-y-4 pb-2">

            <div className="grid grid-cols-4 items-center gap-4 ">
              <Label className="text-right" htmlFor="name">Name</Label>
              <Input id="name" className="col-span-3" {...register('name')}/>
            </div>

            <div className="grid grid-cols-4 items-center gap-4 ">
              <Label className="text-left" htmlFor="description">Description</Label>
              <Textarea id="description" className="col-span-3" {...register('description')}/>
            </div>

          </div>
          <DialogClose asChild>
          <Button type="button" variant={'ghost'}>
            cancel
          </Button>
          </DialogClose>
       
          <Button type="submit" variant={'success'} disabled={isSubmitting}>
            save
          </Button>
        </form>
      </DialogFooter>
    </DialogContent>
  )
}
