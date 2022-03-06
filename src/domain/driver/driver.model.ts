import { Schema, model } from "mongoose";

import { IDriver } from "./driver.interface";
import { DriverStatus } from "./driver.enum";

const driverSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
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
        type: Number,
        required: true,
      },
      dateExpiration: {
        type: Number,
        required: true,
      },
    },
    vehicle: {
      model: {
        type: String,
        required: true,
        trim: true,
      },
      yearIssue: {
        type: Number,
        required: true,
      },
      number: {
        type: String,
        required: true,
        trim: true,
      },
    },
    resetId: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: DriverStatus.Pending,
      enum: Object.values(DriverStatus),
    },
  },
  { timestamps: true }
);

export default model<IDriver>("driver", driverSchema);
