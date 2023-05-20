const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    trips: {
      type: String,
    },
    message: {
      type: String,
    },
    seat: {
      type: Number,
      required: true,
      default: 6,
    },
    bookseat: {
      type: Number,
      default: 0,
    },
    vehicleno: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    freez: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

driverSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

driverSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Driver", driverSchema);
