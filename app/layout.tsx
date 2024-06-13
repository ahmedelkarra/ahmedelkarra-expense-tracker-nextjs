'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useEffect, useState } from "react";
import GetUserInfo, { IUser } from "@/context/GetUserInfo";
import { AxiosExpenses, AxiosMain } from "@/axios/MainAxios";
import { IsLogin } from "@/context/IsLogin";
import { IsChange } from "@/context/IsChange";
import { GetExpensesInfo, IExpenses } from "@/context/GetExpensesInfo";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout(
  {
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  const [getUserInfo, setGetUserInfo] = useState<IUser>({ _id: '', email: '', username: '', fName: '', lName: '' })
  const [getExpensesInfo, setGetExpensesInfo] = useState<IExpenses[]>([])
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const [isChange, setIsChange] = useState<boolean>(false)

  const handelGetUser = () => {
    AxiosMain.get('/me', { headers: { Authorization: localStorage.getItem('token') } })
      .then((e) => {
        setGetUserInfo(e?.data?.message)
        setIsLogin(true)
      })
      .catch((err) => {
        setGetUserInfo({ _id: '', email: '', username: '', fName: '', lName: '' })
        setIsLogin(false)
      })
  }
  const handelGetExpenses = () => {
    AxiosExpenses.get('/expenses', { headers: { Authorization: localStorage.getItem('token') } })
      .then((e) => {
        setGetExpensesInfo(e?.data?.message)
      })
      .catch((err) => {
        setGetExpensesInfo([])
      })
  }
  useEffect(() => {
    handelGetExpenses()
    handelGetUser()
    setIsChange(false)
  }, [isChange, isLogin])
  return (
    <html lang="en">
      <body className={inter.className && 'flex flex-col justify-between min-h-[100dvh]'}>
        <GetUserInfo.Provider value={{ getUserInfo, setGetUserInfo }}>
          <GetExpensesInfo.Provider value={{ getExpensesInfo, setGetExpensesInfo }}>
            <IsLogin.Provider value={{ isLogin, setIsLogin }}>
              <IsChange.Provider value={{ isChange, setIsChange }}>
                <Header />
                {children}
                <Footer />
              </IsChange.Provider>
            </IsLogin.Provider>
          </GetExpensesInfo.Provider>
        </GetUserInfo.Provider>
      </body>
    </html>
  );
}
