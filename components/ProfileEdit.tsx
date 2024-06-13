'use client'
import { AxiosMain } from '@/axios/MainAxios';
import GetUserInfo, { IUser } from '@/context/GetUserInfo'
import { IsChange } from '@/context/IsChange';
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'

interface IValueInputs extends IUser {
    pass: string;
    newPass?: string;
    newConfirmPass?: string;
}

function ProfileEdit() {
    const [handelSuccess, setHandelSuccess] = useState<string>('')
    const [handelError, setHandelError] = useState<string>('')
    const userContext = useContext(GetUserInfo)
    const isChangeContext = useContext(IsChange)
    if (!userContext) {
        throw new Error('getUserInfo must be like IUser type')
    }

    if (!isChangeContext) {
        throw new Error('IsChange must be only Boolean')
    }

    const { isChange, setIsChange } = isChangeContext
    const { getUserInfo, setGetUserInfo } = userContext

    const [valueInputs, setValueInputs] = useState<IValueInputs>({ _id: '', lName: '', fName: '', email: "", username: '', pass: "", newPass: "", newConfirmPass: "" })
    const handelSubmit = () => {
        if (valueInputs.lName && valueInputs.fName && valueInputs.email && valueInputs.username && valueInputs.pass && valueInputs.newPass === valueInputs.newConfirmPass) {
            AxiosMain.put('/me', valueInputs, { headers: { Authorization: localStorage.getItem('token') } })
                .then((e) => {
                    setHandelError('')
                    setHandelSuccess(e?.data?.message)
                    setIsChange(true)
                    setTimeout(() => {
                        setHandelSuccess('')
                    }, 5000)
                })
                .catch((err) => {
                    setHandelSuccess('')
                    setHandelError(err?.response?.data?.message)
                    setTimeout(() => {
                        setHandelError('')
                    }, 5000)
                })
        } else if (valueInputs.newPass !== valueInputs.newConfirmPass) {
            setHandelError('Your Password not mach')
            setTimeout(() => {
                setHandelSuccess('')
                setHandelError('')
            }, 5000)
        } else if (!valueInputs.lName || !valueInputs.fName || !valueInputs.email || !valueInputs.username || !valueInputs.pass) {
            setHandelError('Please check your inputs')
            setTimeout(() => {
                setHandelSuccess('')
                setHandelError('')
            }, 5000)
        } else {
            setHandelError('Please check your inputs')
            setTimeout(() => {
                setHandelSuccess('')
                setHandelError('')
            }, 5000)
        }
    }

    const handelDelete = () => {
        const confirmValue = window.confirm('Are you sure you want to delete your account')
        if (confirmValue) {
            AxiosMain.delete('/me', {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
                .then((e) => {
                    setHandelError('')
                    setHandelSuccess(e?.data?.message)
                    setIsChange(true)
                    setTimeout(() => {
                        setHandelSuccess('')
                    }, 5000)
                })
                .catch((err) => {
                    setHandelSuccess('')
                    setHandelError(err?.response?.data?.message)
                    setTimeout(() => {
                        setHandelError('')
                    }, 5000)
                })
        }
    }

    useEffect(() => {
        setValueInputs({ _id: getUserInfo?._id, lName: getUserInfo?.lName, fName: getUserInfo?.fName, email: getUserInfo?.email, username: getUserInfo?.username, pass: "", newPass: "", newConfirmPass: "" })
    }, [getUserInfo])
    return (
        <div className='grid grid-cols-12 border justify-center items-center md:w-[75%] h-[80dvh] lg:h-[60dvh] mx-5 my-5 md:mx-auto rounded-md'>
            <h2 className='col-span-12 border w-[80%] md:w-[30%] text-center my-3 mx-auto p-2 rounded-md text-[20px]'>Profile Edit</h2>

            {handelError && <div role="alert" className="col-span-12 mx-3 my-3 rounded border-s-4 border-red-500 bg-red-50 p-4">
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

            {handelSuccess && <div role="alert" className="col-span-12 mx-3 my-3 rounded-xl border border-gray-100 bg-white p-4">
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

            <div className='col-span-12 grid grid-cols-12 gap-5 mx-2'>

                <div className='col-span-6 grid grid-cols-12 items-center justify-center'>
                    <label htmlFor="fName" className='col-span-12 lg:col-span-2 mx-3 lg:mx-0'>First Name</label>
                    <input className='col-span-12 lg:col-span-10 p-2 border mx-3 rounded-md' value={valueInputs?.fName} id='fName' onChange={(e) => setValueInputs({ ...valueInputs, fName: e.target.value })} />
                </div>

                <div className='col-span-6 grid grid-cols-12 items-center justify-center'>
                    <label htmlFor="lName" className='col-span-12 lg:col-span-2 mx-3 lg:mx-0'>Last Name</label>
                    <input className='col-span-12 lg:col-span-10 p-2 border mx-3 rounded-md' value={valueInputs?.lName} id='lName' onChange={(e) => setValueInputs({ ...valueInputs, lName: e.target.value })} />
                </div>

                <div className='col-span-6 grid grid-cols-12 items-center justify-center'>
                    <label htmlFor="username" className='col-span-12 lg:col-span-2 mx-3 lg:mx-0'>Username</label>
                    <input className='col-span-12 lg:col-span-10 p-2 border mx-3 rounded-md' value={valueInputs?.username} id='username' onChange={(e) => setValueInputs({ ...valueInputs, username: e.target.value })} />
                </div>

                <div className='col-span-6 grid grid-cols-12 items-center justify-center'>
                    <label htmlFor="email" className='col-span-12 lg:col-span-2 mx-3 lg:mx-0'>Email</label>
                    <input className='col-span-12 lg:col-span-10 p-2 border mx-3 rounded-md' value={valueInputs?.email} id='email' onChange={(e) => setValueInputs({ ...valueInputs, email: e.target.value })} />
                </div>

                <div className='col-span-12 grid grid-cols-12 items-center justify-center'>
                    <label htmlFor="Passwrod" className='col-span-12 lg:col-span-1 mx-3 lg:mx-0'>Passwrod</label>
                    <input type='password' className='col-span-12 lg:col-span-11 p-2 border mx-3 rounded-md' id='Passwrod' onChange={(e) => setValueInputs({ ...valueInputs, pass: e.target.value })} />
                </div>

                <div className='col-span-6 grid grid-cols-12 items-center justify-center'>
                    <label htmlFor="NewPasswrod" className='col-span-12 lg:col-span-2 mx-3 lg:mx-0'>New Passwrod</label>
                    <input type='password' className='col-span-12 lg:col-span-10 p-2 border mx-3 rounded-md' id='NewPasswrod' onChange={(e) => setValueInputs({ ...valueInputs, newPass: e.target.value })} />
                </div>

                <div className='col-span-6 grid grid-cols-12 items-center justify-center'>
                    <label htmlFor="NewPasswrodConfirm" className='col-span-12 lg:col-span-2 mx-3 lg:mx-0'>New Confirm Passwrod</label>
                    <input type='password' className='col-span-12 lg:col-span-10 p-2 border mx-3 rounded-md' id='NewPasswrodConfirm' onChange={(e) => setValueInputs({ ...valueInputs, newConfirmPass: e.target.value })} />
                </div>

                <div className='col-span-12 grid grid-cols-12 items-center justify-center gap-3 m-3'>
                    <button className='col-span-12 lg:col-span-4 w-full lg:w-[70%] place-self-center p-3 border rounded-md text-white bg-red-500' onClick={handelDelete}>Delete Account</button>
                    <Link className='col-span-12 lg:col-span-4 w-full lg:w-[70%] place-self-center p-3 border rounded-md text-white text-center bg-green-500' href={`/profile`}>See Your Profile</Link>
                    <button className='col-span-12 lg:col-span-4 w-full lg:w-[70%] place-self-center p-3 border rounded-md text-white bg-yellow-500' onClick={handelSubmit}>Submit</button>
                </div>
            </div>

        </div>
    )
}

export default ProfileEdit