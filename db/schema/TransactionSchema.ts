const TransactionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    stock: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stock",
      required: true,
    },
    quantity: { type: Number, required: true },
    transactionPrice: { type: Number, required: true },
    transactionType: { type: String, enum: ["buy", "sell"], required: true },
  },
  {
    timestamps: true,
  }
);
