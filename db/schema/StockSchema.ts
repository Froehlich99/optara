const StockSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    symbol: { type: String, required: true, unique: true },
    currentPrice: { type: Number, required: true },
    historicData: [
      {
        date: { type: Date, required: true },
        price: { type: Number, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);
