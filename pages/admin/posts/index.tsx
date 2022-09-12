import axios from 'axios'
import { GetServerSideProps, GetStaticProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import adminLayout from '../../../components/layout/adminLayout'
import { PostType } from '../../../type/post'
import prisma from './../../../lib/prisma'
import style from '../../../styles/Home.module.css'
import { SubmitHandler, useForm } from 'react-hook-form'
import { getPostList } from '../../../client/post'

type InpSearch = {
    title: string
}

const PostList = () => {
    // console.log("list post :", posts);

    const [postList, setPostList] = useState<any>([])

    const [page, setPage] = useState<number>(0)
    const [array, setArray] = useState<any>({ page: 0, title: "undefined", categories: "undefined" })


    async function deleteItem(id: number) {
        const conform = window.confirm("are you sure ?")
        if (conform) {
            const { data } = await axios.delete(`/api/posts/${id}`)
            toast.success("xoa thanh cong")
            setPostList(postList.filter((item: any) => item.id !== id))

        }
    }


    const { register, handleSubmit } = useForm<InpSearch>()

    const onSubmit: SubmitHandler<InpSearch> = async (item: InpSearch) => {
        array.title = item.title
        console.log('item', item);

        array.page = 0
        setArray({ ...array })
        // console.log('array', array);

        const { data } = await getPostList(array)
        setPostList(data)
        // console.log("data search", data.postList);
    }



    // chuyen page
    const nextPage = async (index: number) => {
        // console.log("index",);

        setPage(index)
        array.page = index
        setArray({ ...array })
        const { data } = await getPostList(array)
        setPostList(data)
    }


    // page postList 
    let pageCount = [];
    for (let i = 0; i < postList.count / 3; i++) {
        pageCount.push(i)
    }

    // loc theo danh muc 
    const changeCategory = async (categories: any) => {
        array.page = 0
        array.categories = categories
        setArray({ ...array })
        const { data } = await getPostList(array)
        setPostList(data)
        console.log('categories', data);

    }


    // list data post
    useEffect(() => {
        const getAll = async () => {
            const { data } = await axios.get('/api/posts')
            setPostList(data)
        }
        getAll()
    }, [])

    // console.log("list", postList);


    return (
        <div>

            <div className="max-w-[80rem]  mx-auto">
                <div className="flex my-8 justify-between ">
                    <h2 className="font-sans text-2xl font-bold uppercase"> quản lý tin tức </h2>

                </div>
                <div className={style.box__search}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input {...register("title")} className={style.inp__search} type="text" placeholder='search' />
                        <button type='submit' className={style.btn__search}>
                            Submit
                        </button>
                    </form>
                </div>
                <div>
                    <div className="  mx-auto">
                        <div className="-my-0 sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                    <div className="mt-5 flex lg:mt-0 lg:ml-4">
                                    </div>

                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-slate-200 w-24 ">
                                            <tr>
                                                <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    id
                                                </th>
                                                <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    title
                                                </th>
                                                <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    content
                                                </th>
                                                <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    image
                                                </th>
                                                <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    author
                                                </th>
                                                <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    <span>
                                                        <select name='categories' defaultValue={'categories'} onChange={(e) => changeCategory(e.target.value)} id='categories' className=" bg-[#e2e8f0] px-8 py-2   placeholder-gray-400 rounded-md   focus:none block sm:text-sm focus:ring-1">

                                                            <option value={"categories"} key={1}> categories</option>

                                                            <option value={"living"}> living</option>

                                                            <option value={"fashion"}> fashion</option>

                                                            <option value={"shopping"}> shopping</option>
                                                            <option value={"beauty"}> beauty</option>

                                                        </select>
                                                    </span>

                                                </th>
                                                <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    views
                                                </th>
                                                <th scope="col" className="text-center px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    edit
                                                </th>
                                                <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    delete
                                                </th>

                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {postList?.postList?.map((item: any, index: number) => (
                                                <tr key={index}>
                                                    <td className="px-4 text-center py-4 ">
                                                        {index + 1}
                                                    </td>
                                                    <td className="px-4  py-4 max-w-[200px]">
                                                        {item.title}
                                                    </td>
                                                    <td className="px-4 text-justify max-w-[400px] py-4 ">
                                                        {item.content}
                                                    </td>
                                                    <td className="px-4 text-center py-4 ">
                                                        <img src={item.image} style={{ margin: 'auto' }} width={'80px'} alt="" />
                                                    </td>
                                                    <td className="px-4 text-center py-4 ">
                                                        {item.user.name}
                                                    </td>
                                                    <td className="px-4 text-center py-4 ">
                                                        {item.categories}
                                                    </td>
                                                    <td className="px-4 text-center py-4 ">
                                                        {item.views}
                                                    </td>
                                                    <td className="px-4 text-center py-4 ">
                                                        <Link href={`/admin/posts/${item.id}`}>
                                                            <a className="text-indigo-600 hover:text-indigo-900">Edit</a>
                                                        </Link>
                                                    </td>
                                                    <td className="px-4 text-center py-4 ">
                                                        <button type="button" onClick={() => deleteItem(item.id as number)} className=" btn btn-remove text-rose-600">
                                                            Delete
                                                        </button>
                                                    </td>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }} className='mb-5'>
                    <div className="">
                        <Link href="/admin/posts/add">
                            <a className="sm:ml-3">
                                <button type="button" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    {/* Heroicon name: solid/check */}
                                    <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    Thêm Mới
                                </button>
                            </a>
                        </Link>
                    </div >
                    <div className="box__btn">
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                            <div className={`relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 ${page == 0 ? 'hidden' : ""}`} onClick={() => nextPage(Number(page) - 1)}>
                                <span className="sr-only">Previous</span>
                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                                </svg>
                            </div>
                            {pageCount?.map((item: number, index: number) => {
                                if (index - 1 < Number(postList.count / 3)) {
                                    return (<p className='relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 md:inline-flex' key={index} onClick={() => nextPage(index)}> {index + 1}</p>)
                                }
                            })}


                            <div className={`relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 ${page + 1 >= Number(postList.count / 3) ? 'hidden' : ""}`} onClick={() => nextPage(Number(page) + 1)}>
                                <span className="sr-only">Next</span>
                                {/* Heroicon name: mini/chevron-right */}
                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>

        </div>
    )
}


PostList.Layout = adminLayout
export default PostList

// export const getServerSideProps: GetServerSideProps = async () => {

//     const posts = await prisma?.post.findMany({
//         select: {
//             id: true,
//             title: true,
//             content: true,
//             categories: true,
//             image: true
//         }
//     })

//     return {
//         props: {
//             posts
//         }
//     }
// }