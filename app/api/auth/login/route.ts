import User from "../../../../models/UserSchema";
import { NextResponse, NextRequest } from "next/server"
import bcrypt from 'bcrypt'
import { SignJWT } from 'jose'
import connectDB from "@/utils/ConnectDB";

interface IUser {
    emailOrusername: string;
    pass: string;
}

export const POST = async (req: NextRequest) => {
    const { emailOrusername, pass } = await req.json() as IUser
    if (!emailOrusername.includes('@' && '.') && pass) {
        try {
            await connectDB()
            const user = await User.findOne({ username: emailOrusername })
            const checkPass = bcrypt.compareSync(pass.trim(), user.pass)
            if (checkPass) {
                const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET)
                const token = await new SignJWT({ id: user._id, username: user.username, email: user.email, lName: user.lName, fName: user.fName })
                    .setProtectedHeader({ alg: 'HS256' })
                    .setIssuedAt()
                    .setExpirationTime('1d')
                    .sign(secret);
                const fName = user.fName.charAt(0).toUpperCase() + user.fName.slice(1);
                const lName = user.lName.charAt(0).toUpperCase() + user.lName.slice(1);
                return NextResponse.json({ message: `Welcome ${fName + ' ' + lName}`, token: token }, { status: 200 })
            } else {
                return NextResponse.json({ message: 'Wrong Username Or Password' }, { status: 400 })
            }
        } catch (error) {
            return NextResponse.json({ message: 'Wrong Username Or Password' }, { status: 400 })
        }
    } else if (emailOrusername.includes('@' && '.') && pass) {
        try {
            await connectDB()
            const user = await User.findOne({ email: emailOrusername })
            const checkPass = bcrypt.compareSync(pass.trim(), user.pass)
            if (checkPass) {
                const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET)
                const token = await new SignJWT({ id: user._id, username: user.username, email: user.email, lName: user.lName, fName: user.fName })
                    .setProtectedHeader({ alg: 'HS256' })
                    .setIssuedAt()
                    .setExpirationTime('1d')
                    .sign(secret);
                const fName = user.fName.charAt(0).toUpperCase() + user.fName.slice(1);
                const lName = user.lName.charAt(0).toUpperCase() + user.lName.slice(1);
                return NextResponse.json({ message: `Welcome ${fName + ' ' + lName}`, token: token }, { status: 200 })
            } else {
                return NextResponse.json({ message: 'Wrong Email Or Password' }, { status: 400 })
            }
        } catch (error) {
            return NextResponse.json({ message: 'Wrong Email Or Password' }, { status: 400 })
        }
    } else {
        return NextResponse.json({ message: 'Plaese Check Your Inputs' }, { status: 400 })
    }
}