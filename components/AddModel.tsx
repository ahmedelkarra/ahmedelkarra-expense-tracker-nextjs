import { AxiosExpenses } from "@/axios/MainAxios";
import { IsChange } from "@/context/IsChange";
import Link from "next/link";
import React, { useContext, useState } from "react";

interface ValueInputs {
    title: string;
    price: number;
    status: string;
}

export default function AddModel({ isLogin }: { isLogin: boolean }) {
    const [handelSuccess, setHandelSuccess] = useState<string>('')
    const [handelError, setHandelError] = useState<string>('')
    const [showModal, setShowModal] = React.useState(false);
    const [valueInputs, setValueInputs] = useState<ValueInputs>({ title: '', price: 0, status: '' })
    const isChangeContext = useContext(IsChange)

    if (!isChangeContext) {
        throw new Error('IsChange must be only Boolean')
    }
    const { isChange, setIsChange } = isChangeContext

    const handelAdd = () => {
        if (valueInputs.price < 0) {
            setHandelError('Positive number only accept but you can choose Credit')
            setTimeout(() => {
                setHandelError('')
                setHandelSuccess('')
            }, 3000)
        } else if (!valueInputs.title && !valueInputs.status) {
            setHandelError('Please fill up every input')
            setTimeout(() => {
                setHandelError('')
                setHandelSuccess('')
            }, 3000)
        } else if (valueInputs.title && valueInputs.price! > 0 && valueInputs.status) {
            AxiosExpenses.post('/expenses', valueInputs, { headers: { Authorization: localStorage.getItem('token') } })
                .then((e) => {
                    setHandelSuccess(e?.data?.message)
                    setIsChange(true)
                    setValueInputs({ title: '', price: 0, status: '' })
                    setTimeout(() => {
                        setHandelError('')
                        setHandelSuccess('')
                        setShowModal(false)
                    }, 3000)
                })
                .catch((err) => {
                    setHandelError(err?.response?.data?.message)
                    setTimeout(() => {
                        setHandelError('')
                        setHandelSuccess('')
                    }, 3000)
                })
        } else {
            setHandelError('Please fill up every input')
            setTimeout(() => {
                setHandelError('')
                setHandelSuccess('')
            }, 3000)
        }
    }
    return (
        <>
            {isLogin ?
                <button
                    className="col-span-6 m-auto border w-[80%] p-2 bg-green-600 text-white rounded-md"
                    type="button"
                    onClick={() => setShowModal(true)}
                >
                    ADD
                </button>
                :
                <Link
                    href={'/register'}
                    className="col-span-6 m-auto border w-[80%] p-2 bg-green-600 text-white rounded-md text-center"
                >
                    Register
                </Link>
            }
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="justify-center items-center flex relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none w-[80dvw] lg:w-[70dvw] ">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Add Expense
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}

                                {handelError && <div role="alert" className="w-[95%] mx-auto rounded border-s-4 border-red-500 bg-red-50 p-4 my-3">
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

                                {handelSuccess && <div role="alert" className="w-[95%] mx-auto rounded-xl border border-gray-100 bg-white p-4 my-3">
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

                                <div className="grid grid-cols-12 gap-2 relative p-6">
                                    <input type="text" className="col-span-12 lg:col-span-6 border p-3 rounded-md" placeholder="Enter Title" onChange={(e) => setValueInputs({ ...valueInputs, title: e.target.value.toLocaleLowerCase().trim() })} required maxLength={50} />
                                    <input type="number" className="col-span-12 lg:col-span-6 border p-3 rounded-md" placeholder="Enter Price" min={0} onChange={(e) => setValueInputs({ ...valueInputs, price: Number(e.target.value) })} required maxLength={10} />


                                    <div className="col-span-6 flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                                        <input onChange={(e) => setValueInputs({ ...valueInputs, status: e.target.value.toLocaleLowerCase().trim() })} id="bordered-radio-1" type="radio" value="debit" name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label htmlFor="bordered-radio-1" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Debit</label>
                                    </div>
                                    <div className="col-span-6 flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                                        <input onChange={(e) => setValueInputs({ ...valueInputs, status: e.target.value.toLocaleLowerCase().trim() })} id="bordered-radio-2" type="radio" value="credit" name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label htmlFor="bordered-radio-2" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Credit</label>
                                    </div>


                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={handelAdd}
                                    >
                                        ADD
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}
