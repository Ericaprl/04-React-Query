import { registerRestaurant } from "@/api/register";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const signUpForm = z.object({
    restaurantName: z.string(),
    managerName: z.string(),
    phone: z.string(),
    email: z.string().email(),
})

type SignUpForm = z.infer<typeof signUpForm>



export function SignUp() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { isSubmitting } } = useForm<SignUpForm>();
    const {mutateAsync: restaurants} = useMutation({
        mutationFn: registerRestaurant,
    })
    async function handleSignUp(data: SignUpForm) {
        try {
            console.log(data);
            await restaurants({
                email:data.email, 
                restaurantName: data.restaurantName, 
                managerName:data.managerName, 
                phone: data.phone});

            toast.success("Restaurant successfully registered.", {
                action:{
                    label:'Login',
                    onClick:() => navigate(`/signIn?email=${data.email}`)
                }
            });
           
        } catch {
            toast.error('Failed to register restaurant');
        }
    }

    return (
        <>
            <title>Sign Up</title>
            <div className="p-8">
                <Button variant={"ghost"} asChild className="absolute right-8 top-8">
                    <Link to={"/signIn"}> Sign In
                    </Link>
                </Button>
                <div className="w-[350] flex-col justify-center gap-6">
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">Create Account </h1>
                        <p className="text-sm text-muted-foreground">
                            Be a partner and follow your orders</p>
                    </div>
                    <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">

                        <div className="space-y-2">
                            <Label htmlFor="restaurantName ">Business Name</Label>
                            <Input id="restaurantName" type="text" {...register('restaurantName')} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="managerName">Manager Name</Label>
                            <Input id="managerName" type="text" {...register('managerName')} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" {...register('email')} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" type="tel" {...register('phone')} />
                        </div>

                        <Button disabled={isSubmitting} className="w-full" type="submit">
                            Get Started
                        </Button>
                        <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
                            By proceeding, you agree to our {' '}
                            <a href="" className="underline underline-offset-4">
                                Terms of Service
                            </a>{' '}
                            and{' '}
                            <a href="" className="underline underline-offset-4">
                                Privacy Policy.
                            </a>
                        </p>
                    </form>
                </div>
            </div>

        </>
    )
}