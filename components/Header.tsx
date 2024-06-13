'use client'
import Link from 'next/link'
import React, { useContext } from 'react'
import icon from '@/public/icon.png'
import Image from 'next/image'
import { IsLogin } from '@/context/IsLogin'
import DropDownButton from './DropDownButton'
import { IsChange } from '@/context/IsChange'


function Header() {
    const loginContext = useContext(IsLogin)
    const isChangeContext = useContext(IsChange)
    if (!loginContext) {
        throw new Error('IsLogin must be only boolean')
    }

    if (!isChangeContext) {
        throw new Error('IsChange must be only Boolean')
    }
    const { isChange, setIsChange } = isChangeContext
    const handelClick = () => {
        localStorage.removeItem('token')
        setIsChange(true)
    }
    const { isLogin, setIsLogin } = loginContext
    return (
        <header className="bg-gray-100 shadow-md">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="md:flex md:items-center md:gap-12">
                        <Link className="block text-teal-600" href="/">
                            <span className="sr-only">Home</span>
                            <Image src={icon} alt='' className="h-10 w-10" />
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <nav aria-label="Global">
                            <ul className="flex items-center gap-6 text-sm">
                                <li>
                                    <Link className="text-gray-500 transition hover:text-gray-500/75 border p-2 rounded-md" href="/"> Home</Link>
                                </li>
                                <li>
                                    <Link className="text-gray-500 transition hover:text-gray-500/75 border p-2 rounded-md" href="/about"> About</Link>
                                </li>
                                <li>
                                    {isLogin && <button onClick={handelClick} className="text-gray-500 transition hover:text-gray-500/75 border p-2 rounded-md" > Logout</button>}
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        {!isLogin && <div className="sm:flex sm:gap-4">
                            <Link
                                className="rounded-md bg-mainButton text-mainButton px-5 py-2.5 text-sm font-medium shadow hover:bg-secondButton duration-[200ms]"
                                href="/login"
                            >
                                Login
                            </Link>

                            <div className="hidden sm:flex">
                                <Link
                                    className="rounded-md bg-secondButton px-5 py-2.5 text-sm font-medium text-secondButton hover:bg-mainButton duration-[200ms]"
                                    href="/register"
                                >
                                    Register
                                </Link>
                            </div>
                        </div>}

                        {isLogin && <div>
                            <Link href={'/profile'} className='border-[2px] p-2 rounded-full'>AA</Link>
                        </div>}

                        <div className="block md:hidden">
                            <DropDownButton status={isLogin} />
                        </div>

                    </div>
                </div>
            </div>
        </header>

    )
}

export default Header