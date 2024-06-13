import { IsChange } from '@/context/IsChange'
import Link from 'next/link'
import React, { useContext, useState } from 'react'

function DropDownButton({ status }: { status: boolean }) {
    const [showModel, setShowModel] = useState<boolean>(false)
    const isChangeContext = useContext(IsChange)

    if (!isChangeContext) {
        throw new Error('IsChange must be only Boolean')
    }
    const { isChange, setIsChange } = isChangeContext
    const handelClick = () => {
        localStorage.removeItem('token')
        setIsChange(true)
        setShowModel(false)
    }
    return (
        <div className="relative">
            <div className="inline-flex items-center overflow-hidden rounded-md border bg-white">

                <button className="h-full hover:bg-gray-50 hover:text-gray-700 rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75" onClick={() => setShowModel(!showModel)}>
                    <span className="sr-only">Menu</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {showModel && < div
                className="absolute end-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
                role="menu"
            >
                <div className="p-2">
                    <Link
                        onClick={() => setShowModel(false)}
                        href="/"
                        className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        role="menuitem"
                    >
                        Home
                    </Link>

                    {!status && <Link
                        onClick={() => setShowModel(false)}
                        href="/register"
                        className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        role="menuitem"
                    >
                        Register
                    </Link>}

                    <Link
                        onClick={() => setShowModel(false)}
                        href="/about"
                        className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        role="menuitem"
                    >
                        About
                    </Link>

                    {status && <button onClick={handelClick} className="block rounded-lg px-4 py-2 text-sm text-white bg-red-500 hover:bg-gray-50 hover:text-gray-700 w-full">Logout</button>}
                </div>

            </div>}
        </div >

    )
}

export default DropDownButton