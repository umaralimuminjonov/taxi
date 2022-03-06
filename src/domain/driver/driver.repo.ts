import DriverModel from "./driver.model";

import { IDriver } from "./driver.interface";
import { DriverStatus } from "./driver.enum";

class DriverRepo {
  private model: typeof DriverModel;

  constructor() {
    this.model = DriverModel;
  }

  public create = async (driver: IDriver) => {
    return this.model.create(driver);
  };

  public getByPhone = async (phone: string, excludedStatus?: DriverStatus) => {
    return this.model
      .findOne({
        phone,
        status: { $nin: [DriverStatus.Deleted, excludedStatus] },
      })
      .lean();
  };

  public getById = async (id: string, select?: string) => {
    return this.model
      .findOne({
        _id: id,
        status: { $nin: [DriverStatus.Deleted, DriverStatus.Pending] },
      })
      .select(select)
      .lean();
  };

  public updateByPhone = async (phone: string, update) => {
    return this.model.findOneAndUpdate({ phone }, update).lean();
  };

  public updateById = async (id: string, update) => {
    return this.model.findByIdAndUpdate(id, update).lean();
  };
}

export default new DriverRepo();
