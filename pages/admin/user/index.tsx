import { GetServerSideProps } from 'next'
import React, { useEffect, useState } from 'react'
import adminLayout from '../../../components/layout/adminLayout'
import prisma from '../../../lib/prisma'



interface Posts {
    users: {
        id?: number
        name: string,
        email: string,
    }[]
}


const UserList = ({ users }: Posts) => {


    return (


        <div>
            <div className="max-w-[80rem]  mx-auto">
                <div className="flex my-8 justify-between ">
                    <h2 className="font-sans text-2xl font-bold uppercase"> quản lý người dùng </h2>

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
                                                    Name
                                                </th>
                                                <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Email
                                                </th>
                                                <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    ROLE
                                                </th>

                                                <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    delete
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {users.map((item: any, index: number) => (
                                                <tr key={index}>
                                                    <td className="px-4 text-center py-4 ">
                                                        {index + 1}
                                                    </td>
                                                    <td className="px-4 text-center py-4 ">
                                                        {item.name}
                                                    </td>
                                                    <td className="px-4 text-center py-4 ">
                                                        {item.email}
                                                    </td>
                                                    <td className="px-4 text-center py-4 ">
                                                        {item.role}
                                                    </td>

                                                    <td className="px-4 text-center py-4 ">
                                                        <button type="button" className=" btn btn-remove text-rose-600">
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

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                    <div className="box__btn">

                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                            <a href="#" className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                                <span className="sr-only">Previous</span>
                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a href="#" aria-current="page" className="relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20">1</a>
                            <a href="#" className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">2</a>
                            <a href="#" className="relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 md:inline-flex">3</a>

                            <a href="#" className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20">
                                <span className="sr-only">Next</span>
                                {/* Heroicon name: mini/chevron-right */}
                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </nav>

                    </div>
                </div>
            </div>
        </div>
    )
}


UserList.Layout = adminLayout

export default UserList

export const getServerSideProps: GetServerSideProps = async () => {
    const users = await prisma.user.findMany({
        take: 6,
        select: {
            id: true,
            name: true,
            email: true,
            role : true
        },
        orderBy: {
            id: "desc"
        }
    })

    return {
        props: {
            users
        }
    }
}