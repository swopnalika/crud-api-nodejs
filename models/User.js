const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let userSchema = new Schema(
  {

    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true

    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    // dateOfbirth: {
    //   type: Date,
    //   // required: true,
    // },
    // avatar: {
    //   type: String,
    // },
  },
  {
    timestamps: true,
    collection: "users",
    status: true,
  }
);
module.exports = mongoose.model("User", userSchema);
