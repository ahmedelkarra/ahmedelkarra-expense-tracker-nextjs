import { Dispatch, SetStateAction, createContext } from "react";


export interface IExpenses {
    title: string;
    price: number;
    status: string;
    _id: string;
}

export const GetExpensesInfo = createContext<{
    getExpensesInfo: IExpenses[],
    setGetExpensesInfo: Dispatch<SetStateAction<IExpenses[]>>
} | undefined>(undefined)