import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import BannerPage from '../components/Banner'
import styles from '../styles/Home.module.css'
import prisma from '../lib/prisma'

interface Posts {
    posts: {
        id?: number
        title: string
        content: string
        image: string,
        categories: string
    }[]
}


const Home = ({ posts }: Posts) => {

    

    console.log('data', posts);

    return (
        <div className={styles.container}>
            <BannerPage />

            <div className="bg-white">
                <div className="mx-auto max-w-2xl mt-2 px-4 sm:py-[50px] sm:px-6 lg:max-w-7xl lg:px-8">
                    <h2 className="text-lg  font-mono font-semibold tracking-tight text-gray-900 text-center">Most featured post</h2>
                    <div className="mt-6 grid grid-cols-2 gap-[20px]">
                        {posts?.map((item: any, index: number) => (
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
                                        <p className="text-sm font-medium text-cyan-600"> {item.categories}</p>
                                        <h3 className="text-sm text-gray-700 font-bold mt-[10px]">

                                            <a >
                                                {item.title}
                                            </a>



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

export default Home
export const getServerSideProps: GetServerSideProps = async () => {
    const posts = await prisma.post.findMany({
        take: 2,
        select: {
            title: true,
            id: true,
            content: true,
            categories: true,
            image: true
        },
        orderBy: {
            views:"desc"
        }
    })

    return {
        props: {
            posts
        }
    }
}