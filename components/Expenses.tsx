import { IExpenses } from '@/context/GetExpensesInfo'
import React, { useContext } from 'react'
import EditModel from './EditModel'
import { AxiosExpenses } from '@/axios/MainAxios'
import { IsChange } from '@/context/IsChange'

function Expenses({ items }: { items: IExpenses }) {
    const isChangeContext = useContext(IsChange)

    if (!isChangeContext) {
        throw new Error('IsChange must be only Boolean')
    }
    const { isChange, setIsChange } = isChangeContext

    const handelClick = () => {
        const answer = window.confirm(`Are you sure you want to delete ${items?.title}`)
        if (answer) {
            AxiosExpenses.delete(`/expenses/${items?._id}`, {
                headers: { Authorization: localStorage.getItem('token') }
            })
                .then((response) => {
                    setIsChange(true);
                    console.log(response?.data?.message);
                })
                .catch((error) => {
                    console.log(error?.response?.data?.message);
                });
        }
    };
    return (
        <div className='grid grid-cols-12 col-span-12 items-center justify-center border p-2 rounded-md mx-2'>
            <h2 className='col-span-12 lg:col-span-4 break-words text-center lg:text-start mx-2'>{items?.title}</h2>
            {items?.status === 'debit' && <h3 className='col-span-12 lg:col-span-2 text-green-600 text-center lg:text-start'>{items?.price}$</h3>}
            {items?.status === 'credit' && <h3 className='col-span-12 lg:col-span-2 text-red-600 text-center lg:text-start'>-{items?.price}$</h3>}
            <div className='grid grid-cols-12 col-span-12 lg:col-span-6 gap-2 lg:mx-3'>
                <EditModel item={items} />
                <button onClick={handelClick} className='p-2 text-[12px] sm:text-[15px] text-white rounded-md bg-red-500 col-span-12 lg:col-span-6'>Remove</button>
            </div>
        </div>
    )
}

export default Expenses