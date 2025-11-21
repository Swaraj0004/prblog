
import { fetchPostById } from "@/lib/actions/postActions";
import Image from "next/image";
import DOMPurify from "isomorphic-dompurify";


type Props = {
    params: {
        id: string;
    };
};

const PostPage = async ({ params }: Props) => {
    const postId = (await params).id;
    const post = await fetchPostById(+postId);

    return (
        <main className="conatiner mx-auto px-4 py8 mt-24">
            <h1 className="text-4xl font-bold mb-4 text-slate-700">{post.title} </h1>
            <p className="text-slate-500 text-sm mb-4">
                By {post.author.name} | {new Date(post.createdAt).toLocaleDateString()}</p>

            <div className="relative w-80 h-60">
                <Image src={post.thumbnail ?? "/no-image.png"}
                alt={post.title}
                fill
                className="rounded-md object-cover"
                />
            </div>

            <div dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(post.content)}}/>
        </main>
    );
};

export default PostPage