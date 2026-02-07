"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from 'next/image';
import Link from "next/link";
import MagicCard from "../ui/magic-card";
import blogs from "@/utils/constants/blogs.json";
import { useState, useEffect } from "react";
import parse from "html-react-parser";

const Blogs = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="flex flex-col items-center justify-center max-w-6xl mx-auto px-4 md:px-0 py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog, id) => (
                    <MagicCard key={id} className="p-0 md:p-0 relative overflow-hidden rounded-xl">
                        <Link href={`/resources/blog/${blog.slug}`} className="absolute inset-0 z-20 cursor-pointer"></Link>

                        <Card className="group border-0 bg-transparent h-full flex flex-col">
                            <CardContent className="p-4 lg:p-6 flex-1 flex flex-col">
                                <div className="relative h-48 lg:h-52 w-full overflow-hidden rounded-lg mb-4">
                                    <Image
                                        src={blog.image}
                                        alt={blog.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        unoptimized
                                    />
                                </div>

                                <div className="flex flex-col flex-1">
                                    <CardTitle className="text-lg font-bold text-white/90 group-hover:text-blue-400 transition-colors duration-300 mb-3">
                                        {blog.title}
                                    </CardTitle>


                                    <div className="text-sm text-gray-400 line-clamp-4 leading-relaxed mb-4">
                                        {parse(blog.description)}
                                    </div>

                                    <div className="mt-auto flex items-center justify-between text-xs text-gray-500 border-t border-gray-800 pt-3">
                                        <div className="flex items-center gap-2">
                                            {blog.author_image && (
                                                <div className="relative w-5 h-5 rounded-full overflow-hidden">
                                                    <Image src={blog.author_image} alt={blog.author_name} fill className="object-cover" />
                                                </div>
                                            )}
                                            <span>{blog.author_name}</span>
                                        </div>
                                        <span>
                                            {new Date(blog.date_published).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </MagicCard>
                ))}
            </div>
        </div>
    );
};

export default Blogs;