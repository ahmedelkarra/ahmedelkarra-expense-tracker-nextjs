'use client'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import loginImage from '@/public/loginImage.jpg'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { AxiosMain } from '@/axios/MainAxios'
import { IsChange } from '@/context/IsChange'


interface InputsTypes {
    emailOrusername: string;
    pass: string;
}

function LoginForm() {
    const route = useRouter()
    const [valueInputs, setValueInputs] = useState<InputsTypes>({ emailOrusername: '', pass: '' })
    const [handelSuccess, setHandelSuccess] = useState<string>('')
    const [handelError, setHandelError] = useState<string>('')
    const isChangeContext = useContext(IsChange)

    if (!isChangeContext) {
        throw new Error('IsChange must be only Boolean')
    }
    const { isChange, setIsChange } = isChangeContext

    const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (valueInputs.emailOrusername && valueInputs.pass) {
            AxiosMain.post('/login', valueInputs)
                .then((e) => {
                    setHandelError('')
                    setHandelSuccess(e?.data?.message)
                    localStorage.setItem('token', e?.data?.token)
                    setIsChange(true)
                    setTimeout(() => {
                        setHandelSuccess('')
                        route.push('/')
                    }, 2000)
                })
                .catch((err) => {
                    setHandelError(err?.response?.data?.message)
                    setTimeout(() => {
                        setHandelError('')
                    }, 10000)
                })
        }
        else {
            setHandelError('Please check your inputs')
            setTimeout(() => {
                setHandelError('')
            }, 10000)
        }
    }
    return (
        < section className="bg-white" >
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                <aside className="relative block h-[50vh] lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
                    <Image
                        alt=''
                        src={loginImage}
                        className="absolute inset-0 w-[100%] h-[100%] object-fill"
                    />
                </aside>

                <main
                    className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
                >
                    <div className="max-w-xl lg:max-w-3xl w-[100%]">
                        <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                            Welcome To Login Page
                        </h1>

                        {handelError && <div role="alert" className="rounded border-s-4 border-red-500 bg-red-50 p-4 my-3">
                            <div className="flex items-center gap-2 text-red-800">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                                    <path
                                        fillRule="evenodd"
                                        d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                        clipRule="evenodd"
                                    />
                                </svg>

                                <strong className="block font-medium"> {handelError} </strong>
                            </div>
                        </div>}

                        {handelSuccess && <div role="alert" className="rounded-xl border border-gray-100 bg-white p-4 my-3">
                            <div className="flex items-start gap-4">
                                <span className="text-green-600">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="h-6 w-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </span>

                                <div className="flex-1">
                                    <strong className="block font-medium text-gray-900"> Success </strong>

                                    <p className="mt-1 text-sm text-gray-700">{handelSuccess}</p>
                                </div>
                            </div>
                        </div>}

                        <form onSubmit={handelSubmit} className="mt-8 grid grid-cols-6 gap-6">
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="emailUsername" className="block text-sm font-medium text-gray-700">
                                    Email / Username
                                </label>

                                <input
                                    type="text"
                                    id="emailUsername"
                                    name="emailUsername"
                                    onChange={(e) => setValueInputs({ ...valueInputs, emailOrusername: e.target.value })}
                                    className="mt-1 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-3"
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="Password" className="block text-sm font-medium text-gray-700"> Password </label>

                                <input
                                    type="password"
                                    id="Password"
                                    name="password"
                                    onChange={(e) => setValueInputs({ ...valueInputs, pass: e.target.value })}
                                    className="mt-1 w-full rounded-md border border-gray-200 bg-white text-sm text-gray-700 shadow-sm p-3"
                                />
                            </div>

                            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                <button
                                    className="inline-block shrink-0  bg-mainButton text-mainButton rounded-md border px-12 py-3 text-sm font-medium transition hover:bg-secondButton"
                                >
                                    Login
                                </button>

                                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                                    Already have an account? <Link href="/register" className="text-gray-700 underline">Register</Link>.
                                </p>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </section >

    )
}

export default LoginForm