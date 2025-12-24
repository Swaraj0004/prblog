"use client";

import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/actions/auth";
import { useActionState } from "react";

const SignUpForm = () => {

    const [state, action] = useActionState(signUp, undefined);

    return <form action={action} className="flex flex-col gap-2" >
        {!!state?.message &&
            (<p className="text-sm text-red-500">{state.message} </p>
            )}

        <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" placeholder="Swaraj Harode" defaultValue={state?.data?.name}/>
        </div>
        {!!state?.errors?.name &&
            (<p className="text-sm text-red-500">{state.errors.name} </p>
            )}

        <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" placeholder="swaraj@gmail.com" defaultValue={state?.data?.email}/>
        </div>
        {!!state?.errors?.email &&
            (<p className="text-sm text-red-500">{state.errors.email} </p>
            )}

        <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" placeholder="********" type="password" defaultValue={state?.data?.password}/>
        </div>
        {!!state?.errors?.password &&
            (<div className="text-sm text-red-500">
                <p>Password must :</p>
                <ul>{state.errors.password.map(err => <li key={err}>{err}</li>)}</ul>
            </div>
            )}

        <SubmitButton>Sign Up</SubmitButton>

    </form>
};

export default SignUpForm;