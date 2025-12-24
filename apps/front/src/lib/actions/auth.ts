"use server";

import { object } from "zod";
import { SignUpFormState } from "../types/formState";
import { SignUpFormSchema } from "../zodSchemas/signUpFromSchema";
import { fetchGraphQL } from "../fetchGraphQL";
import { print } from "graphql";
import { Create_User_MUTATION } from "../gqlQueries";
import { redirect } from "next/navigation";

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


    if (data.errors)
        return {
            data: Object.fromEntries(formData.entries()),
            message: "Something went wrong. Please try again later."
        };
    redirect("/auth/signin");

}
