const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    book: {
      type: mongoose.Types.ObjectId,
      ref: "books",
    },
    status: {
      type: String,
      default: "Order Placed",
      enum: ["Order Placed", "OutfFor delivery", "Delivered", "Canceled"],
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("orders", orderSchema);
module.exports = Order;
