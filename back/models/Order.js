const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
    originLatitude: {
      type: Number,
    },
    originLongitude: {
      type: Number,
    },
    destinationLatitude: {
      type: Number,
    },
    destinationLongitude: {
      type: Number,
    },
    orderStatus: {
      type: String,
      default: "Not Processed",
      enum: ["Not Processed", "Processing", "Cancelled", "Completed"],
    },
    amount: {
      type: Number,
    },
    reserveSeat: {
      type: Number,
      default: 0,
    },
    orderdBy: {
      type: ObjectId,
      ref: "User",
    },
    receivedBy: {
      type: ObjectId,
      ref: "Driver",
    },
    pickedUp: {
      type: Boolean,
      default: false,
    },
    isFinished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
