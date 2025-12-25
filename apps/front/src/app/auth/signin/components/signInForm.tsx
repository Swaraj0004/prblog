"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/SubmitButton";
import { use, useActionState } from "react";
import { signIn } from "@/lib/actions/auth";

const SignInForm = () => {
    const [state ,action] = useActionState(signIn, undefined);

    return (
        <form action={action} className="flex flex-col gap-2 ">
            {!!state?.message && 
            <p className="text-red-500">{state.message}</p>}
            <div>
                <Label defaultValue={state?.data?.email} htmlFor="email">Email</Label>
                <Input id="email" name="email" placeholder="swaraj@gmail.com" type="email" />
            </div>
            {!!state?.errors?.email &&
            (<p className="text-sm text-red-500">{state.errors.email} </p>
            )}

            <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" placeholder="********" type="password" defaultValue={state?.data?.password} />
            </div>
            {!!state?.errors?.password &&
            (<p className="text-sm text-red-500">{state.errors.password} </p>
            )}

            <SubmitButton>Sign In</SubmitButton>
        </form>
    )
};


export default SignInForm;