import { GetServerSideProps } from 'next'
import Link from 'next/link'
import React from 'react'
import { PostType } from '../../type/post'
import prisma from '../../lib/prisma'
import Head from 'next/head'

interface Posts {
    posts: {
        id?: number
        title: string
        content: string
        image: string,
        categories: string
    }[]
}


const PostPage = ({ posts }: Posts) => {
    return (

        <div className='z-10'>
            <Head>
                <title>
                    Danh sách bài viết
                </title>
                <meta content="text/html; charset=utf-8" />
                <meta  name='description' content='danh sách bài viết'/>
                <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
            </Head>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl mt-2 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Featured Posts</h2>
                    <div className="mt-6 grid grid-cols-3 gap-x-8 gap-y-10">
                        {posts.map((item: PostType, index: number) => (
                            <div key={index} className="group relative">
                                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                                    <Link href={`/posts/${item.id}`}>
                                        <a >
                                            <img src={item.image} alt="Front of men's Basic Tee in black." className="h-full w-full object-cover object-center lg:h-full lg:w-full" />

                                        </a>
                                    </Link>

                                </div>
                                <div className="mt-[10px] flex justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-cyan-600">{item.categories}</p>
                                        <h3 className="text-sm text-gray-700 font-bold mt-[10px]">

                                            <Link href={`/posts/${item.id}`}>
                                                <a >

                                                    <span aria-hidden="true" className="absolute inset-0" />
                                                    {item.title}
                                                </a>
                                            </Link>
                                        </h3>
                                    </div>

                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>

        </div>
    )
}

export default PostPage


export const getServerSideProps: GetServerSideProps = async () => {
    const posts = await prisma.post.findMany({
        take: 6,
        select: {
            title: true,
            id: true,
            content: true,
            categories: true,
            image: true
        },
        orderBy: {
            id: "desc"
        }
    })

    return {
        props: {
            posts
        }
    }
}