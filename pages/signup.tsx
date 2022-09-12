import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { UserType } from '../type/user'


const SignupPage = () => {

    const route = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm<UserType>()


    const onSubmit: SubmitHandler<UserType> = async (data) => {

        const user = await axios.post("/api/user/signup", {
            email: data.email,
            name: data.name,
            password: data.password
        })
        console.log("data",);
        route.push('/signin')
        toast.success("dang ky thanh cong")
 
        //    create(data)

    }

    return (
        <div>
            <div className="max-w-[34rem] mx-auto mt-[50px]">
                <div className="-my-0 sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
                                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                    <div>
                                        <label className="block">
                                            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700">
                                                Name
                                            </span>
                                            <input
                                                {...register('name', { required: true, minLength: 5 })}
                                                type="text" className="mt-1 px-8 py-2  bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" />

                                            <div>
                                                {errors.name && errors.name.type === "required" && (
                                                    <span style={{ color: 'red' }}>
                                                        This field is required
                                                    </span>
                                                )}
                                                {errors.name && errors.name.type === "minLength" && (
                                                    <span style={{ color: 'red' }}>
                                                        Enter at least 5 characters
                                                    </span>
                                                )}
                                            </div>
                                        </label>
                                    </div>

                                    <div>
                                        <label className="block">
                                            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700">
                                                email
                                            </span>
                                            <input
                                                {...register("email", { required: true })}
                                                type="email" className="mt-1 px-8 py-2  bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" />
                                            {errors.email && errors.email.type === "required" && (
                                                <span style={{ color: 'red' }}>
                                                    This field is required
                                                </span>
                                            )}
                                        </label>
                                    </div>
                                    <div>
                                        <label className="block">
                                            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700">
                                                password
                                            </span>
                                            <input
                                                {...register("password", { required: true, minLength: 6 })}
                                                type="password" className="mt-1 px-8 py-2  bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" />
                                            {errors.password && errors.password.type === "required" && (
                                                <span style={{ color: 'red' }}>
                                                    This field is required
                                                </span>
                                            )}
                                            {errors.password && errors.password.type === "minLength" && (
                                                <span style={{ color: 'red' }}>
                                                    Enter at least 6 characters
                                                </span>
                                            )}
                                        </label>
                                    </div>

                                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                        <button type='submit' className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            Save
                                        </button>
                                    </div>
                                </div></form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignupPage