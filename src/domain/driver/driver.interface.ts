import { Request } from "express";
import { Document } from "mongoose";

import { DriverStatus } from "./driver.enum";

export interface IDriver extends Document {
  name: string;
  phone: string;
  password: string;
  license: ILicense;
  vehicle: IVehicle;
  resetId: string;
  status: DriverStatus;
}

interface ILicense {
  number: string;
  dateIssue: number;
  dateExpiration: number;
}

interface IVehicle {
  model: string;
  yearIssue: number;
  number: string;
}

export interface IRequest extends Request {
  driver?: IDriver;
}
