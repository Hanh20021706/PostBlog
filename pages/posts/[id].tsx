import axios from 'axios'
import { GetServerSideProps, GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { PostType } from '../../type/post'
import stylle from '../../styles/Home.module.css'
import Head from 'next/head'
import prisma from '../../lib/prisma'


import {
    FacebookShareButton,
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    FacebookMessengerIcon,
    FacebookMessengerShareButton,
    EmailShareButton,
    EmailIcon,
    TelegramShareButton,
    TelegramIcon,
} from 'next-share';
import Link from 'next/link'



interface Posts {
    posts: {
        id?: number
        title: string
        content: string
        image: string,
        categories: string
    }[]
}

const DetailPost = ({ posts }: Posts) => {


    const [post, setPost] = useState<any>()

    const route = useRouter()

    const { id } = route.query

    useEffect(() => {
        if (id) {
            const getDetail = async (id: number) => {
                const { data } = await axios.get(`/api/posts/${id}`)

                console.log('view', data);

                const { data: listPost } = await axios.patch(`/api/posts/${id}?views=${data.views}`)
                console.log('list', listPost);
                setPost(listPost)
            }
            getDetail(Number(id));
        }
    }, [id])

    if(!post){
        return <div className='mt-[55px]'>Loading ....</div>
    }

    return (
        <div className='mt-[100px]'>
            <Head>
                <title>
                    Chi tiết bài viết
                </title>
                <meta content="text/html; charset=utf-8" />
                <meta name='description' content='danh sách bài viết' />
                <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
            </Head>

            <div className=" w-8/12 m-auto flex mt-[40px] items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">

                <div className="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8">

                    <div className="aspect-w-2 aspect-h-3 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                        <img src={post?.image} alt="Two each of gray, white, and black shirts arranged on table." className="object-cover object-center" />
                    </div>
                    <div className="sm:col-span-8 lg:col-span-7">
                        <p className="text-sm font-medium text-cyan-600">{post?.categories}</p>
                        <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">  {post?.title}</h2>
                        <p className="text-sm font-medium text-red-600	">{post?.user?.name}</p>

                        <p>{post?.content}</p>
                        <nav className={stylle.list__nav}>
                            <li>

                                <svg style={{ display: 'unset', marginRight: '10px' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>

                                {post?.views}

                            </li>
                            <li>
                                <FacebookShareButton style={{ margin: '10px 0px' }}
                                    url={'https://post-blog-bice.vercel.app/'}
                                    quote={'next-share is a social share buttons for your next React apps.'}
                                    hashtag={'#nextshare'}
                                >
                                    <FacebookIcon size={32} round />
                                </FacebookShareButton>

                                <TwitterShareButton style={{ margin: '0px 5px' }}
                                    url={'https://post-blog-bice.vercel.app/'}
                                    title={'next-share is a social share buttons for your next React apps.'}
                                >
                                    <TwitterIcon size={32} round />
                                </TwitterShareButton>

                                <FacebookMessengerShareButton style={{ margin: '0px 5px' }}
                                    url={'https://post-blog-bice.vercel.app/'}
                                    appId={''}
                                >
                                    <FacebookMessengerIcon size={32} round />
                                </FacebookMessengerShareButton>

                                <EmailShareButton
                                    url={'https://post-blog-bice.vercel.app/'}
                                    subject={'Next Share'}
                                    body="body"
                                >
                                    <EmailIcon size={32} round />
                                </EmailShareButton>
                                <TelegramShareButton style={{ margin: '0px 5px' }}
                                    url={'https://post-blog-bice.vercel.app/'}
                                    title={'next-share is a social share buttons for your next React apps.'}
                                >
                                    <TelegramIcon size={32} round />
                                </TelegramShareButton>
                            </li>

                            <li>

                                <svg style={{ display: 'unset', marginRight: '10px' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                </svg>

                                coments
                            </li>
                        </nav>



                    </div>




                </div>
            </div>









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
                                    {/* <p className="mt-1 text-sm text-gray-500">{item.content}</p> */}
                                </div>

                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>


    )
}
export default DetailPost



export const getServerSideProps: GetServerSideProps = async () => {
    const posts = await prisma.post.findMany({
        take: 3,
        select: {
            title: true,
            id: true,
            content: true,
            categories: true,
            image: true
        },
        orderBy: {
            views: "desc"
        }
    })

    return {
        props: {
            posts
        }
    }
}