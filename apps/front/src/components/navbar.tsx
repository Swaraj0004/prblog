import Link from "next/link";
import { getSession } from "@/lib/session";
import SignInPanel from "./signInPanel";

type Props = {};
const Navbar = async (props: Props) => {

    const session = await getSession();

    return (
        <>
            <h1 className="text-2xl font-bold p-2">My Morden Block</h1>
            <div className="flex flex-col md:flex-row gap-2 ml-auto [&>a]:py-2 [&>a]:px-4 [&>a]:rounded-md [&>a]:transition [&>a:hover]:text-sky-100 [&>a:hover]:bg-sky-500">
                <Link href="/" className="">
                    Blog
                </Link>
                <Link href="#about" className="">
                    About
                </Link>
                <Link href="#contact" className="">
                    Contact
                </Link>
                {session && session.user ? <a href="/api/auth/signout">Sign Out</a> : <SignInPanel />}
            </div>
        </>
    );
};

export default Navbar;