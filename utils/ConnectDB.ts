"use server"
import mongoose from "mongoose";

const urlDB = process.env.NEXT_PUBLIC_DB_URL as string
const connectDB = async () => {
    try {
        await mongoose.connect(urlDB)
        console.log('DB Has Been Coneccted')
    } catch (error) {
        console.log('Faild To Connect To DB', error)
    }
}

export default connectDB