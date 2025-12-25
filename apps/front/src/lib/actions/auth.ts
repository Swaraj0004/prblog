"use server";

import { object } from "zod";
import { SignUpFormState } from "../types/formState";
import { SignUpFormSchema } from "../zodSchemas/signUpFromSchema";
import { fetchGraphQL } from "../fetchGraphQL";
import { print } from "graphql";
import { Create_User_MUTATION } from "../gqlQueries";
import { redirect } from "next/navigation";
import { Sign_In_MUTATION } from "../gqlQueries";
import { LoginFormSchema } from "../zodSchemas/loginFormSchema";
import { revalidatePath } from "next/cache";
import { createSession } from "../session";

export async function signUp(
    state: SignUpFormState,
    formData: FormData
): Promise<SignUpFormState> {

    const validatedFields = SignUpFormSchema.safeParse(
        Object.fromEntries(formData.entries()));
    if (!validatedFields.success)
        return {
            data: Object.fromEntries(formData.entries()),
            errors: validatedFields.error.flatten().fieldErrors,
        };

    const data = await fetchGraphQL(print(Create_User_MUTATION), {
        input: {
            ...validatedFields.data,
        }
    });


    if (data.errors) {
        return {
            data: Object.fromEntries(formData.entries()),
            message: "Something went wrong. Please try again later."
        };
    }
    redirect("/auth/signin");

}

export async function signIn(
    state: SignUpFormState,
    formData: FormData
): Promise<SignUpFormState> {

    const validatedFields = LoginFormSchema.safeParse(
        Object.fromEntries(formData.entries()));

    if (!validatedFields.success)
        return {
            data: Object.fromEntries(formData.entries()),
            errors: validatedFields.error.flatten().fieldErrors,
        };

    const data = await fetchGraphQL(print(Sign_In_MUTATION), {
        input: {
            ...validatedFields.data,
        }
    });

    if (data.errors) {
        return {
            data: Object.fromEntries(formData.entries()),
            message: "Invalid Credentials. Please try again.",
        };
    }

    //todo set cookie 
    await createSession({
        user: {
            id: data.SignIn.id,
            name: data.SignIn.name,
            avatar: data.SignIn.avatar,
        },
        acessToken: data.SignIn.accessToken,
    });
    revalidatePath("/");
    redirect("/");
}