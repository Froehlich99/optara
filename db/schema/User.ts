import mongoose from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  username: string;
  money: number;
  totalInvestment: number;
  portfolioValue: number;
  gainLoss: number;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    clerkId: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    money: { type: Number, default: 25000, required: true },
    portfolioValue: { type: Number, default: 0 },
    totalInvestment: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.getGainLoss = function (this: IUser) {
  return this.portfolioValue - this.totalInvestment;
};

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
