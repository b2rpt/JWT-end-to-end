import mongoose, { Schema, Model, Document } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  displayName: string;
  email: string;
  password: string;
  mobile: number;
  location: any; // TODO
  requirement: any; //TODO
  displayPicture?: String;
  isBlocked: boolean;
  isPremium: boolean;
  rating: number;
  priority: number;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  displayName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
    unique: true,
  },
  rating: {
    type: Number,
  },
  priority: {
    type: Number,
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'location',
  },
  requirement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'category',
  },
  isBlocked: {
    type: Boolean,
  },
  isPremium: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

const UserModel: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default UserModel;
