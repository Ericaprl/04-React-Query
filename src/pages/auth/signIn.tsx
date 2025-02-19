import { signIn } from "@/api/signIn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const signInForm = z.object({
    email: z.string().email(),
})
type SignInForm = z.infer<typeof signInForm>



export function SignIn() {
    const [searchParams ] = useSearchParams();

    const { register, 
            handleSubmit, 
            formState:{ isSubmitting} 
        } = useForm<SignInForm>({
            defaultValues: {
               email: searchParams.get('email') ?? '',
            }
         
        });

    const {mutateAsync: authenticate } = useMutation({
        mutationFn: signIn,
    })
    async function handleSignIn(data: SignInForm) {
        try {
            console.log(data);
            await authenticate({email: data.email})

            toast.success("Authentication link sent by email");
        } catch {
            toast.error('Invalid credential');
        }
    }

    return (
        <>
        <title>Sign In</title>
            <div className="p-8">
                <Button variant={"ghost"} asChild className="absolute right-8 top-8">
                <Link to={"/signUp"}> New Registration
                </Link>
                </Button>
               
                <div className="w-[350] flex-col justify-center gap-6">
                    <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">Login Dashboard </h1>
                        <p className="text-sm text-muted-foreground"> Track your orders through the Partner Dashboard</p>
                    </div>
                    <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" {...register('email')} />
                        </div>
                        <Button disabled={isSubmitting} className="w-full" type="submit">
                            Access Dashboard
                        </Button>
                    </form>
                </div>
            </div>

        </>
    )
}