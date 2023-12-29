export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  money: number;
  totalInvestment: number;
  portfolioValue: number;
  gainLoss: number;
}

export const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
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
