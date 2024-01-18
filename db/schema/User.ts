import mongoose from "mongoose";

interface IQuest {
  name: string;
  rewardPoints: number;
  completion: number; // Percentage of completion
}

export interface IUser extends Document {
  clerkId: string;
  username: string;
  money: number;
  totalInvestment: number;
  portfolioValue: number;
  gainLoss: number;
  points: number;
  quests: IQuest;
}

const QuestSchema = new mongoose.Schema<IQuest>({
  name: { type: String, required: true },
  rewardPoints: { type: Number, required: true },
  completion: { type: Number, required: true }
});

const UserSchema = new mongoose.Schema<IUser>(
  {
    clerkId: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    money: { type: Number, default: 25000, required: true },
    portfolioValue: { type: Number, default: 0 },
    totalInvestment: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
    quests: [QuestSchema]
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
