"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { date, z } from "zod"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import Image from 'next/image'
import Link from "next/link"
import { toast } from "sonner"
import FormField from "./FormField"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { signIn, signUp } from "@/lib/actions/auth.action"
import { auth } from "@/firebase/client"

// const formSchema = z.object({
//     username: z.string().min(2).max(50),
// })

const authFormSchema = ({ type }: { type: FormType }) => {
    return z.object({
        name: type === "sign-up" ? z.string().min(2, "Name must be at least 2 characters") : z.string().optional(),
        email: z.string().email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters")
    })
}

const AuthForm = ({ type }: { type: FormType }) => {
    const router = useRouter()
    const formSchema = authFormSchema(type);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            // username: "",
            name: "",
            email: "",
            password: ""
        },
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            if (type === "sign-up") {
                const { name, email, password } = data;
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                const result = await signUp({
                    uid: userCredential.user.uid,
                    name: name!,
                    email,
                    password
                });
                
                if(!result?.success){
                    toast.error(result?.message || "Sign up failed");
                    return;
                }
                
                toast.success("Account created successfully. Please sign in.");
                router.push("/sign-in");
            } else {
                const { email, password } = data;
                const userCredential = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                const idToken = await userCredential.user.getIdToken();
    
                if (!idToken) {
                    toast.error("Sign in Failed. Please try again.");
                    return;
                }
                
                await signIn({
                    email,
                    idToken,
                });
                
                toast.success('Logged in successfully');
                router.push('/');
            }
        } catch (error: any) {
            console.error("Authentication error:", error);
            
            let errorMessage = "An error occurred";
            if (error.code) {
                switch(error.code) {
                    case 'auth/email-already-in-use':
                        errorMessage = "Email already in use";
                        break;
                    case 'auth/invalid-email':
                        errorMessage = "Invalid email address";
                        break;
                    case 'auth/weak-password':
                        errorMessage = "Password should be at least 6 characters";
                        break;
                    case 'auth/wrong-password':
                    case 'auth/user-not-found':
                        errorMessage = "Invalid email or password";
                        break;
                }
            }
            
            toast.error(errorMessage);
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