"use server"
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';


interface Payload {
    id: string;
    username: string;
    email: string;
    lName: string;
    fName: string;
    iat?: number;
    exp?: number;
}

export async function middleware(req: NextRequest) {
    const token = req.headers.get('Authorization');
    if (!token) {
        return NextResponse.json({ message: 'Authorization token is required' }, { status: 401 });
    }
    try {
        const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
        const { payload }: { payload: Payload } = await jwtVerify(token, secret);
        if (payload) {
            return NextResponse.next();
        } else {
            return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }
}

export const config = {
    matcher: ['/api/expenses']
};
