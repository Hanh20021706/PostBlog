import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import adminLayout from '../../../components/layout/adminLayout'
import { getUser } from '../../../redux/useSlice'
import { PostType } from '../../../type/post'

type Props = {}

const EditPost = (props: Props) => {

    const dispatch = useDispatch()

    const route = useRouter()

    const { id } = route.query


    const user = useSelector((item: any) => item.user)
    console.log('user', user);


    const { register, handleSubmit, formState: { errors }, reset } = useForm<PostType>()

    const onSubmit: SubmitHandler<PostType> = async (post: any) => {
        console.log(post)
        if (user.value.dataUser?.role == "ADMIN") {
            const { data } = await axios.patch(`/api/posts/${id}`, { title: post.title, content: post.content, image: post.image, categories: post.categories })
            // console.log("data", data)
            route.push("/admin/posts")
            toast.success("sửa bài viết thành công")
        }
        if (user.value.dataUser?.role !== "ADMIN") {
            toast.warning("Bạn không có quyền sửa")
            setTimeout(() => {
                route.push("/posts")
             
            }, 2000);
           
            console.log('error');
            return;
        }



    }
    useEffect(() => {
        if (id) {
            const getPost = async (id: number) => {
                const { data } = await axios.get(`/api/posts/${id}`)
                reset(data)
                console.log("data get post", data)
            }
            getPost(Number(id))

            const userPost = async () => {
                const { payload } = await dispatch(getUser())
                console.log('payload', payload);

            }
            userPost()
        }
    }, [id])




    return (
        <div>
            <div className="max-w-5xl mx-auto">
                <div className="-my-0 sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <h2 className="mt-6 text-center text-3xl font-normal uppercase font-sans text-gray-900">
                                    thêm bài viết
                                </h2>
                                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                    <div>
                                        <label className="block">
                                            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700">
                                                Title
                                            </span>
                                            <input
                                                {...register("title", { required: true, minLength: 10 })}
                                                type="text" className="mt-1 px-8 py-2 bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" />
                                            {errors.title && errors.title.type === "required" && (
                                                <span style={{ color: 'red' }}>
                                                    This field is required
                                                </span>
                                            )}
                                            {errors.title && errors.title.type === "minLength" && (
                                                <span style={{ color: 'red' }}>
                                                    Enter at least 5 characters
                                                </span>
                                            )}
                                        </label>
                                    </div>
                                    <div>
                                        <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                                            Content
                                        </label>
                                        <div className="mt-1">
                                            <textarea
                                                {...register("content", { required: true })}
                                                className="mt-1  px-3 py-2 bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" />

                                            {errors.content && errors.content.type === "required" && (
                                                <span style={{ color: 'red' }}>
                                                    This field is required
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block">
                                            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700">
                                                Iamge
                                            </span>
                                            <input
                                                {...register("image", { required: true })}
                                                type="text" className="mt-1 px-8 py-2 bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" />
                                            {errors.image && errors.image.type === "required" && (
                                                <span style={{ color: 'red' }}>
                                                    This field is required
                                                </span>
                                            )}

                                        </label>
                                    </div>
                                    <div>
                                        <label className="block">
                                            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700">
                                                Danh Muc
                                            </span>
                                            <select {...register("categories")} className=" slec-cate w-full border px-8 py-2  shadow-sm border-gray-300 placeholder-gray-400 rounded-md  focus:border-sky-500 focus:ring-sky-500 block sm:text-sm focus:ring-1">

                                                <option value={"living"}> living</option>

                                                <option value={"fashion"}> fashion</option>

                                                <option value={"shopping"}> shopping</option>
                                                <option value={"beauty"}> beauty</option>

                                            </select>
                                            {/* <input
                                                {...register("categories", { required: true})}
                                                type="text" className="mt-1 px-8 py-2 bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" /> */}

                                        </label>

                                    </div>

                                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                        <button type='submit' className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}
EditPost.Layout = adminLayout

export default EditPost