"use server"
import mongoose, { Document, Schema } from 'mongoose';

interface IExpenses extends Document {
  title: string;
  status: string;
  price: number;
  auther: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ExpensesSchema: Schema = new mongoose.Schema<IExpenses>(
  {
    title: { type: String, required: true, maxlength: 50 },
    status: { type: String, required: true, maxlength: 6 },
    price: { type: Number, required: true, maxlength: 10 },
    auther: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const Expenses = mongoose.models.Expenses || mongoose.model<IExpenses>('Expenses', ExpensesSchema);

export default Expenses;
