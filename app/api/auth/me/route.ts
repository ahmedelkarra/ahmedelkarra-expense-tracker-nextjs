import Expenses from "@/models/ExpensesSchema";
import User from "@/models/UserSchema";
import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt'

interface IUser {
    username: string;
    email: string;
    fName: string;
    lName: string;
    pass: string;
    newPass?: string;
    newConfirmPass?: string;
}

interface Payload {
    id: string;
    username: string;
    email: string;
    lName: string;
    fName: string;
    iat?: number;
    exp?: number;
}

export const GET = async (req: NextRequest) => {
    try {
        const token = req.headers.get('Authorization')
        if (!token) {
            return NextResponse.json({ message: 'Authorization token is required' }, { status: 401 });
        }

        const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
        const { payload }: { payload: Payload } = await jwtVerify(token, secret);
        delete payload.iat
        delete payload.exp
        const user = await User.findById(payload.id).select(['fName', 'lName', 'username', 'email'])
        if (user) {
            console.log(user);
            return NextResponse.json({ message: user });
        } else {
            return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }
}

export const PUT = async (req: NextRequest) => {
    const { username, email, fName, lName, pass, newPass, newConfirmPass } = await req.json() as IUser
    const token = req.headers.get('Authorization') as string
    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
    const { payload }: { payload: { id: string } } = await jwtVerify(token, secret);
    if (username && email && fName && lName && pass && !newPass && !newConfirmPass) {
        const user = await User.findById(payload.id)
        try {
            const checkPass = bcrypt.compareSync(pass, user.pass)
            if (checkPass) {
                await User.findByIdAndUpdate(payload.id, { username, email, fName, lName })
                return NextResponse.json({ message: 'User has been updated' }, { status: 200 })
            } else {
                return NextResponse.json({ message: 'Wrong Email or Password' }, { status: 404 })
            }
        } catch (error) {
            if (user) {
                return NextResponse.json({ message: 'User already used' }, { status: 404 })
            } else {
                return NextResponse.json({ message: 'User Not Found' }, { status: 404 })
            }
        }
    } else if (username && email && fName && lName && pass && newPass === newConfirmPass) {
        const hashPass = bcrypt.hashSync(newPass as string, 10)
        try {
            const user = await User.findById(payload.id)
            const checkPass = bcrypt.compareSync(pass, user.pass)
            if (checkPass) {
                await User.findByIdAndUpdate(payload.id, { username, email, fName, lName, pass: hashPass })
                return NextResponse.json({ message: 'User has been updated' }, { status: 200 })
            } else {
                return NextResponse.json({ message: 'Wrong Email or Password' }, { status: 404 })
            }
        } catch (error) {
            return NextResponse.json({ message: 'User Not Found' }, { status: 404 })
        }
    } else {
        return NextResponse.json({ message: 'Plaese Check Your Inputs' }, { status: 400 })
    }
}


export const DELETE = async (req: NextRequest) => {
    const token = req.headers.get('Authorization') as string
    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
    const { payload }: { payload: { id: string } } = await jwtVerify(token, secret);
    try {
        const user = await User.findByIdAndDelete(payload.id)
        if (user) {
            await Expenses.deleteMany({ auther: payload.id })
            return NextResponse.json({ message: 'User has been deleted' }, { status: 200 })
        } else {
            return NextResponse.json({ message: 'User Not Found' }, { status: 404 })
        }
    } catch (error) {
        return NextResponse.json({ message: 'User Not Found' }, { status: 404 })
    }
}