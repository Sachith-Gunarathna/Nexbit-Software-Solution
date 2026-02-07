"use client";

import { useParams } from "next/navigation";
import blogs from "@/utils/constants/blogs.json";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
interface Props {
    params: {
        slug: string
    }
}

const BlogPage = ({ params }: Props) => {

    const { slug } = useParams();
    const [blog, setBlog] = useState<any>(null);

    useEffect(() => {
        if (slug) {
            const foundBlog = blogs.find((b) => b.slug === slug);
            setBlog(foundBlog);
        }
    }, [slug]);

    if (!blog) return (
        <div className="min-h-screen bg-black flex items-center justify-center text-white">
            <div className="animate-pulse text-xl font-light tracking-widest">LOADING...</div>
        </div>
    );

    return (
        <div className="min-h-screen bg-black text-white pt-32 pb-20 px-4 flex flex-col items-center">
            
            <div className="max-w-4xl w-full">
               
                <Link 
                    href="/resources/blog" 
                    className="group inline-flex items-center text-gray-500 hover:text-blue-400 mb-8 transition-colors duration-300"
                >
                    <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span> 
                    Back to all posts
                </Link>

               
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent text-center md:text-left">
                    {blog.title}
                </h1>

               
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-12 border-b border-white/10 pb-8">
                    <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                        <div className="relative w-6 h-6 rounded-full overflow-hidden">
                             <Image src={blog.author_image} alt={blog.author_name} fill className="object-cover" />
                        </div>
                        <span className="text-gray-200 font-medium">{blog.author_name}</span>
                    </div>
                    <span className="hidden md:block text-gray-600">•</span>
                    <span className="tracking-wide">
                        {new Date(blog.date_published).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                </div>

               
                <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_-10px_rgba(59,130,246,0.2)] mb-16 group">
                    <Image 
                        src={blog.image} 
                        alt={blog.title} 
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
                </div>

                
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl">
                    <div 
                        className="
                            text-gray-300 
                            text-lg md:text-xl 
                            leading-loose 
                            
                            /* Bold Tags Styles */
                            [&>b]:text-blue-400 
                            [&>b]:font-semibold 
                            [&>b]:tracking-wide
                            
                            /* Bullet Points Alignment (JSON එකේ • තියෙන නිසා) */
                            whitespace-pre-line
                        "
                        dangerouslySetInnerHTML={{ __html: blog.description }} 
                    />
                </div>

                
                <div className="mt-24 text-center space-y-6">
                    <h3 className="text-3xl font-bold text-white">Ready to transform your business?</h3>
                    <p className="text-gray-400 text-lg">Join Nexcentauri and step into the future.</p>
                    <Link href="/contact" className="inline-block bg-blue-600 hover:bg-blue-500 text-white text-lg font-medium px-10 py-4 rounded-full transition-all hover:shadow-[0_0_30px_-5px_rgba(37,99,235,0.5)]">
                        Get Started Now
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogPage
