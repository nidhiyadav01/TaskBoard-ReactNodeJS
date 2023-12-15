import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  comparePassword(password: string): boolean; // Add comparePassword method
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  username: {
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
});

// Add comparePassword method to the User schema
userSchema.methods.comparePassword = function (password: string): boolean {
  const user = this as IUser;
  return user.password === password;
};

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;