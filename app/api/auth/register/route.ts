import User from "@/models/UserSchema";
import connectDB from "@/utils/ConnectDB";
import { NextResponse, NextRequest } from "next/server"
import bcrypt from 'bcrypt'

interface IUser {
    username: string;
    email: string;
    fName: string;
    lName: string;
    pass: string;
    confirmPass: string;
}

export const POST = async (req: NextRequest) => {
    const { username, email, fName, lName, pass, confirmPass } = await req.json() as IUser
    if (username && email && fName && lName && pass === confirmPass) {
        const hashPass = bcrypt.hashSync(pass.trim(), 12)
        try {
            await connectDB()
            const user = await User.create({ username: username.toLowerCase(), email: email.toLowerCase().trim(), fName: fName.toLowerCase().trim(), lName: lName.toLowerCase().trim(), pass: hashPass })
            return NextResponse.json({ message: 'Account Has Been Created' }, { status: 200 })
        } catch (error) {
            return NextResponse.json({ message: 'Username Or Email is already used' }, { status: 400 })
        }
    } else {
        return NextResponse.json({ message: 'Plaese Check Your Inputs' }, { status: 400 })
    }
}