'use client'
import React, { useState } from 'react'
import registerImage from '@/public/registerImage.jpeg'
import Image from 'next/image'
import icon from '@/public/icon.png'
import { AxiosMain } from '@/axios/MainAxios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'


interface InputsTypes {
    fName: string;
    lName: string;
    username: string;
    email: string;
    pass: string;
    confirmPass: string;
}

function RegisterForm() {
    const route = useRouter()
    const [valueInputs, setValueInputs] = useState<InputsTypes>({ fName: '', lName: '', username: '', email: '', pass: '', confirmPass: '', })
    const [handelSuccess, setHandelSuccess] = useState<string>('')
    const [handelError, setHandelError] = useState<string>('')

    const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (valueInputs.fName && valueInputs.lName && valueInputs.username && valueInputs.email && valueInputs.pass === valueInputs.confirmPass) {
            AxiosMain.post('/register', valueInputs)
                .then((e) => {
                    setHandelError('')
                    setHandelSuccess(e?.data?.message)
                    setTimeout(() => {
                        setHandelSuccess('')
                        route.push('/login')
                    }, 2000)
                })
                .catch((err) => {
                    setHandelError(err?.response?.data?.message)
                    setTimeout(() => {
                        setHandelError('')
                    }, 10000)
                })
        } else if (valueInputs.pass !== valueInputs.confirmPass) {
            setHandelError('Your Password Not Match')
            setTimeout(() => {
                setHandelError('')
            }, 10000)
        } else {
            setHandelError('Please check your inputs')
            setTimeout(() => {
                setHandelError('')
            }, 10000)
        }
    }
    return (
        <section className="bg-white">
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
                    <Image
                        alt=""
                        src={registerImage}
                        className="absolute inset-0 h-full w-full object-cover opacity-80"
                    />

                    <div className="hidden lg:relative lg:block lg:p-12">
                        <a className="block text-white" href="#">
                            <Image src={icon} alt='' className="h-16 w-16" />
                        </a>

                        <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                            Welcome to Expense-Tracker
                        </h2>

                        <p className="mt-4 leading-relaxed text-white/90">
                            Create your account on Expense Tracker to easily and efficiently manage your daily expenses,
                            helping you achieve your financial goals and accurately track your spending.
                        </p>
                    </div>
                </section>

                <main
                    className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
                >
                    <div className="max-w-xl lg:max-w-3xl">
                        <div className="relative -mt-16 block lg:hidden px-3">
                            <Link
                                className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
                                href="/"
                            >
                                <span className="sr-only">Home</span>
                                <Image src={icon} className='w-[100%] h-[100%]' alt='icon' />
                            </Link>

                            <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                                Welcome to Expense-Tracker
                            </h1>

                            <p className="mt-4 leading-relaxed text-gray-500">
                                Create your account on Expense Tracker to easily and efficiently manage your daily expenses,
                                helping you achieve your financial goals and accurately track your spending.
                            </p>
                        </div>

                        {handelError && <div role="alert" className="rounded border-s-4 border-red-500 bg-red-50 p-4">
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

                        {handelSuccess && <div role="alert" className="rounded-xl border border-gray-100 bg-white p-4">
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
                                <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
                                    First Name
                                </label>

                                <input
                                    maxLength={25}
                                    type="text"
                                    id="FirstName"
                                    name="first_name"
                                    onChange={(e) => setValueInputs({ ...valueInputs, fName: e.target.value })}
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm border p-3"
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
                                    Last Name
                                </label>

                                <input
                                    maxLength={25}
                                    type="text"
                                    id="LastName"
                                    name="last_name"
                                    onChange={(e) => setValueInputs({ ...valueInputs, lName: e.target.value })}
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm border p-3"
                                />
                            </div>

                            <div className="col-span-6">
                                <label htmlFor="Username" className="block text-sm font-medium text-gray-700"> Username </label>

                                <input
                                    maxLength={50}
                                    type="text"
                                    id="Username"
                                    name="Username"
                                    onChange={(e) => setValueInputs({ ...valueInputs, username: e.target.value })}
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm border p-3"
                                />
                            </div>

                            <div className="col-span-6">
                                <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Email </label>

                                <input
                                    maxLength={50}
                                    type="email"
                                    id="Email"
                                    name="email"
                                    onChange={(e) => setValueInputs({ ...valueInputs, email: e.target.value })}
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm border p-3"
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="Password" className="block text-sm font-medium text-gray-700"> Password </label>

                                <input
                                    maxLength={100}
                                    type="password"
                                    id="Password"
                                    name="password"
                                    onChange={(e) => setValueInputs({ ...valueInputs, pass: e.target.value })}
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm border p-3"
                                />
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="PasswordConfirmation" className="block text-sm font-medium text-gray-700">
                                    Password Confirmation
                                </label>

                                <input
                                    maxLength={100}
                                    type="password"
                                    id="PasswordConfirmation"
                                    name="password_confirmation"
                                    onChange={(e) => setValueInputs({ ...valueInputs, confirmPass: e.target.value })}
                                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm border p-3"
                                />
                            </div>

                            <div className="col-span-6">
                                <p className="text-sm text-gray-500">
                                    By creating an account, you agree to our
                                    <a href="#" className="text-gray-700 underline"> terms and conditions </a>
                                    and
                                    <a href="#" className="text-gray-700 underline">privacy policy</a>.
                                </p>
                            </div>

                            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                <button
                                    className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                                >
                                    Create an account
                                </button>

                                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                                    Already have an account?
                                    <a href="/login" className="text-gray-700 underline">Log in</a>.
                                </p>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </section>

    )
}

export default RegisterForm