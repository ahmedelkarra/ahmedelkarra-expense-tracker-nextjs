'use client'
import { Dispatch, SetStateAction, createContext } from "react"



export interface IUser {
    _id: string;
    username: string;
    email: string;
    fName: string;
    lName: string;
}

const GetUserInfo = createContext<{
    getUserInfo: IUser,
    setGetUserInfo: Dispatch<SetStateAction<IUser>>
} | undefined>(undefined)

export default GetUserInfo