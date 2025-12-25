
import Link from "next/link";
import SignInForm from "./components/signInForm";

const SignInPage = () => {
    return (
        <div className="bg-white p-8 border rounded-md gap-3 shadow-md w-96 flex flex-col justify-center items-center ">
            <h1 className="text-center text-xl font-bold mb-4">Sign In Page</h1>
            <SignInForm />
            <Link href="/auth/forget"> Forgot your password? </Link>
        </div>
    )
}

export default SignInPage;