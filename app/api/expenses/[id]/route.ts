import Expenses from "@/models/ExpensesSchema"
import connectDB from "@/utils/ConnectDB"
import { NextRequest, NextResponse } from "next/server"







export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
    const id = params.id
    await connectDB()
    if (id) {
        try {
            await Expenses.findByIdAndDelete(id)
            return NextResponse.json({ message: "Expense has been deleted" }, { status: 200 })
        } catch (error) {
            return NextResponse.json({ message: 'Expense Not Found' }, { status: 404 })
        }
    } else {
        return NextResponse.json({ message: 'Plaese Check Your Inputs' }, { status: 400 })
    }
}