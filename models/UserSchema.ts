// models/UserSchema.ts
import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  fName: string;
  lName: string;
  pass: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new mongoose.Schema<IUser>(
  {
    username: { type: String, required: true, unique: true, maxlength: 50 },
    email: { type: String, required: true, unique: true, maxlength: 50 },
    fName: { type: String, required: true, maxlength: 25 },
    lName: { type: String, required: true, maxlength: 25 },
    pass: { type: String, required: true, maxlength: 200 },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
