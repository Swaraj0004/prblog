import { SessionUser } from "@/lib/session";
import { Popover } from "@radix-ui/react-popover";
import { PopoverTrigger } from "./ui/popover";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage, AvatarFallback } from "./ui/avatar";
import { UserIcon } from "@heroicons/react/20/solid";
import { PopoverContent } from "./ui/popover";
import { ArrowRightStartOnRectangleIcon, ListBulletIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

type Props = {
    user: SessionUser
}

const Profile = ({ user }: Props) => {
    return (
        <Popover>

            <PopoverTrigger>
                <Avatar>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>
                        <UserIcon className="w-9.5 text-slate-500" />
                    </AvatarFallback>
                </Avatar>
            </PopoverTrigger>

            <PopoverContent>
                <div className="flex justify-center items-center gap-2">
                    <UserIcon className="w-5" />
                    <p>{user.name}</p>
                </div>

                <div className="*:grid *:grid-cols-5 *:gap-3 *:items-center *:my-2 *:py-2  [&>*:hover]:bg-sky-500 [&>*:hover]:text-white *:transition *:rounded-md">
                    <a href="/api/auth/signout">
                        <ArrowRightStartOnRectangleIcon className="w-4 justify-self-end" />
                        <span className="col-span-4">Sign Out</span>
                    </a>

                    <Link href="/user/create-post">
                        <PencilSquareIcon className="w-4 justify-self-end" />
                        <span className="col-span-4">Create New Post</span>
                    </Link>

                    <Link href="/user/create-post">
                        <ListBulletIcon className="w-4 justify-self-end" />
                        <span className="col-span-4">Posts</span>
                    </Link>
                </div>

            </PopoverContent>
        </Popover>
    )
}

export default Profile;