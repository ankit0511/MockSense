"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import Image from 'next/image'
import Link from "next/link"
import { toast } from "sonner"
import FormField from "./FormField"
import { useRouter } from "next/navigation"

// const formSchema = z.object({
//     username: z.string().min(2).max(50),
// })

const authFormSchema = ({type}:{type: FormType})=>{
    return z.object({
        name : type ==="sign-up" ?z.string().min(2).max(50): z.string().optional(),
        email : z.string().min(2).max(50),
        password : z.string().min(2).max(50)
    })
}

const AuthForm = ({ type }: { type: FormType }) => {
    const router = useRouter()
    const formSchema = authFormSchema(type);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
       try {
         console.log(values)
         if(type ==="sign-in"){
            toast.success('Sign In Successfull')
            router.push('/')
            console.log("SignIn", values);
            
         }
         else{
            toast.success('Account Created Successfully')
            router.push('/sign-uo')
            console.log("SignUp", values);
         }
       } catch (error) {
        console.log(error);
        toast.error("there is and error while sign-in ". erorr)
        
       }
    }
    
    const isSignIn = type === 'sign-in';

    return (
        <div className="card-border lg:min-w-[566px]">
            <div className="flex flex-col gap-6 card py-14 px-10">
                <div className="flex flex-row gap-2 justify-center">
                    <Image src="/logo.svg" alt="logo" height={32} width={38} />
                    <h2 className="text-primary-100">MockSense</h2>
                </div>
                <h3 className="text-center">Practice Job Interview With AI</h3>
            </div>
            
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 ml-4 form">
                    <div > 
                        {!isSignIn && (<FormField 
                         control={form.control}
                         name="name"
                         label="Name"
                         placeholder="Enter Your Name Here "
                         
                         
                         />)}
                        <FormField 
                         control={form.control}
                         name="email"
                         label="Email"
                         placeholder="Enter Your Email Here "
                         type="email"
                         
                         
                         />
                       <FormField 
                         control={form.control}
                         name="password"
                         label="Password"
                         placeholder="Enter Your Password Here "
                         type="password"
                         
                         
                         />
                        <div className="flex justify-center">
                            <Button type="submit">
                                {isSignIn ? "Sign In" : "Create an Account"}
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
            
            <p className="text-center mt-4">
                {isSignIn ? "No Account Yet?" : "Have An Account Already"}
                <Link 
                    href={!isSignIn ? '/sign-in' : 'sign-up'} 
                    className="font-bold text-user-primary ml-1"
                >
                    {!isSignIn ? "Sign In" : "Sign up"}
                </Link>
            </p>
        </div>
    )
}

export default AuthForm