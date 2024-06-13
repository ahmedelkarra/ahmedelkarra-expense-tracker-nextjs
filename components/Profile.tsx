'use client'
import GetUserInfo from '@/context/GetUserInfo'
import Link from 'next/link'
import React, { useContext } from 'react'

function Profile() {
    const userContext = useContext(GetUserInfo)
    if (!userContext) {
        throw new Error('getUserInfo must be like IUser type')
    }
    const { getUserInfo, setGetUserInfo } = userContext
    return (
        <div className='grid grid-cols-12 border justify-center items-center md:w-[80%] md:h-[45dvh] mx-3 md:mx-auto rounded-md gap-3 p-5'>
            <h2 className='col-span-12 border w-[80%] md:w-[30%] text-center my-3 mx-auto p-2 rounded-md text-[20px]'>User Profile</h2>

            <div className='col-span-12 grid grid-cols-12 gap-5 mx-2'>

                <div className='col-span-6 grid grid-cols-12'>
                    <label htmlFor="fName" className='col-span-12 lg:col-span-2 mx-3 lg:mx-0'>First Name</label>
                    <input className='col-span-12 lg:col-span-10 p-3 border mx-3 rounded-md' value={getUserInfo?.fName} id='fName' readOnly disabled />
                </div>

                <div className='col-span-6 grid grid-cols-12'>
                    <label htmlFor="lName" className='col-span-12 lg:col-span-2 mx-3 lg:mx-0'>Last Name</label>
                    <input className='col-span-12 lg:col-span-10 p-3 border mx-3 rounded-md' value={getUserInfo?.lName} id='lName' readOnly disabled />
                </div>

                <div className='col-span-6 grid grid-cols-12'>
                    <label htmlFor="username" className='col-span-12 lg:col-span-2 mx-3 lg:mx-0'>Username</label>
                    <input className='col-span-12 lg:col-span-10 p-3 border mx-3 rounded-md' value={getUserInfo?.username} id='username' readOnly disabled />
                </div>

                <div className='col-span-6 grid grid-cols-12'>
                    <label htmlFor="email" className='col-span-12 lg:col-span-2 mx-3 lg:mx-0'>Email</label>
                    <input className='col-span-12 lg:col-span-10 p-3 border mx-3 rounded-md' value={getUserInfo?.email} id='email' readOnly disabled />
                </div>

                <div className='col-span-12 grid grid-cols-12 items-center justify-center'>
                    <Link className='col-span-12 md:w-[50%] mx-auto p-3 border rounded-md text-white text-center bg-red-500' href={`/profile/${getUserInfo?._id}`}>Edit Your Profile</Link>
                </div>

            </div>

        </div>
    )
}

export default Profile