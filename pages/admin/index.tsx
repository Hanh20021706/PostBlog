import React from 'react'
import adminLayout from '../../components/layout/adminLayout'

type Props = {}

const AdminPage = (props: Props) => {
    return (
        <div>
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        <div className="h-96 rounded-lg border-4 border-dashed border-gray-200" />
                    </div>
                </div>
            </main>
        </div>
    )
}
AdminPage.Layout = adminLayout

export default AdminPage