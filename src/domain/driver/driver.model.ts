import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  license: {
    number: {
      type: String,
      required: true,
      trim: true,
    },
    dateIssue: {
      type: String,
      required: true,
      trim: true,
    },
    dateExpiration: {
      type: String,
      required: true,
      trim: true,
    },
  },
  vehicle: {
    model: {
      type: String,
      required: true,
      trim: true,
    },
    yearIssue: {
      type: String,
      required: true,
      trim: true,
    },
    number: {
      type: String,
      required: true,
      trim: true,
    },
  },
});

export default model("user", userSchema);
