'use client'
import React, { useContext, useState, useEffect } from 'react'
import AddModel from './AddModel'
import Expenses from './Expenses'
import { GetExpensesInfo } from '@/context/GetExpensesInfo'
import { IsLogin } from '@/context/IsLogin'

function HomePage() {
    const [debit, setDebit] = useState<number>(0)
    const [credit, setCredit] = useState<number>(0)
    const [balance, setBalance] = useState<number>(0)
    const [searchValue, setSearchValue] = useState<string>('')
    const expensesContext = useContext(GetExpensesInfo)
    const loginContext = useContext(IsLogin)

    if (!loginContext) {
        throw new Error('IsLogin must be only boolean')
    }
    if (!expensesContext) {
        throw new Error('GetExpensesInfo must be only as IExpenses[]')
    }
    const { isLogin, setIsLogin } = loginContext
    const { getExpensesInfo } = expensesContext

    useEffect(() => {
        let newDebit = 0
        let newCredit = 0

        getExpensesInfo.forEach((ele) => {
            if (ele.status === 'debit') {
                newDebit += ele.price
            } else if (ele.status === 'credit') {
                newCredit += ele.price
            }
        })

        setDebit(newDebit)
        setCredit(newCredit)
        setBalance(newDebit - newCredit)
    }, [getExpensesInfo])

    const getItems = getExpensesInfo?.filter((ele) => ele?.title?.includes(searchValue))
    return (
        <div className='grid grid-cols-12 grid-rows-1 rounded-md border m-4 sm:mx-auto sm:my-[20px] sm:w-[60%] h-[70dvh]'>
            <div className='col-span-12 flex flex-col gap-2'>
                <h2 className='col-span-12 text-center text-[30px] underline'>Expense Tracker</h2>
                <div className='grid grid-cols-12 justify-center items-center gap-4 col-span-12'>
                    <h2 className='mx-auto w-[80%] p-2 rounded-md text-[20px] col-span-6 text-center border'>Balance {balance}$</h2>
                    <AddModel isLogin={isLogin} />
                </div>
                <div className='grid grid-cols-12 justify-center items-center gap-4 col-span-12'>
                    <div className='col-span-6 m-auto border w-[80%] p-2 rounded-md'>
                        <h2>Credit</h2>
                        <h2 className='text-red-600'>{credit}$</h2>
                    </div>
                    <div className='col-span-6 m-auto border w-[80%] p-2 rounded-md'>
                        <h2>Debit</h2>
                        <h2 className='text-green-600'>{debit}$</h2>
                    </div>
                </div>
                <h2 className='col-span-12 text-[25px] mx-4'>Transactions</h2>

                <input type="search" placeholder='Search By Title' className='col-span-12 border p-2 rounded-md mx-4' onChange={(e) => setSearchValue(e.target.value)} value={searchValue} disabled={!isLogin} />

                <div className='grid grid-cols-12 mx-4 my-2 gap-2 overflow-auto'>
                    {getItems.map((ele) => (
                        <Expenses items={ele} key={ele?._id} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HomePage
