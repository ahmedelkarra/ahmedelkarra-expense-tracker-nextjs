"use server"
import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from 'jose'
import Expenses from "@/models/ExpensesSchema";
import connectDB from "@/utils/ConnectDB";
import User from "@/models/UserSchema";

interface IExpenses {
    title: string;
    price: number;
    status: string;
    _id?: string;
}

interface Payload {
    id: string;
}

export const GET = async (req: NextRequest) => {
    await connectDB()
    const token = req.headers.get('Authorization') as string
    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
    const { payload }: { payload: Payload } = await jwtVerify(token, secret);
    await connectDB()
    try {
        const getAllExpenses = await Expenses.find({ auther: payload.id })
        return NextResponse.json({ message: getAllExpenses }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'User Not Found' }, { status: 404 })
    }
}

export const POST = async (req: NextRequest) => {
    await connectDB()
    const token = req.headers.get('Authorization') as string
    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
    const { payload }: { payload: Payload } = await jwtVerify(token, secret);
    const { title, price, status } = await req.json() as IExpenses
    await connectDB()

    if (title && price > 0 && price.toString().length <= 10 && payload.id && status === 'debit' || status === 'credit') {
        try {
            const user = await User.findById(payload.id)
            if (user) {
                await Expenses.create({ title: title.toLowerCase().trim(), price: price, status: status.toLowerCase().trim(), auther: payload.id })
                return NextResponse.json({ message: 'The expense has been created' }, { status: 201 })
            } else {
                return NextResponse.json({ message: 'User Not Found' }, { status: 404 })
            }
        } catch (error) {
            console.log(error)
            return NextResponse.json({ message: 'You are already have the same title' }, { status: 400 })
        }
    } else if (price.toString().length > 10) {
        return NextResponse.json({ message: 'Your price input is more then 10 numbers' }, { status: 401 })
    } else {
        return NextResponse.json({ message: 'Plaese Check Your Inputs' }, { status: 400 })
    }
}

export const PUT = async (req: NextRequest) => {
    const { title, price, _id, status } = await req.json() as IExpenses
    await connectDB()
    if (_id && title && price! > 0 && price.toString().length <= 10 && status === 'debit' || status === 'credit') {
        try {
            const expenses = await Expenses.findByIdAndUpdate(_id, { title: title.toLowerCase().trim(), price: price, status: status.toLowerCase().trim() })
            if (expenses) {
                return NextResponse.json({ message: "Expense has been updated" }, { status: 200 })
            } else {
                return NextResponse.json({ message: 'Expense Not Found' }, { status: 404 })
            }
        } catch (error) {
            return NextResponse.json({ message: 'Expense Not Found' }, { status: 404 })
        }
    } else if (price.toString().length > 10) {
        return NextResponse.json({ message: 'Your price input is more then 10 numbers' }, { status: 401 })
    } else {
        return NextResponse.json({ message: 'Plaese Check Your Inputs' }, { status: 400 })
    }
}