import DriverRepo from "./driver.repo";

import BadRequestError from "../../errors/bad-request.error";
import { Errors } from "../../errors/errors.enum";

import { hashPassword, sign, validatePassword } from "./driver.util";
import verification from "./verification.utils";

import { IDriver } from "./driver.interface";
import { DriverStatus } from "./driver.enum";
import NotFoundError from "../../errors/not-found.error";

class DriverService {
  private repo: typeof DriverRepo;

  constructor() {
    this.repo = DriverRepo;
  }

  public register = async (data) => {
    const { phone, password } = data;

    const hashedPassword = await hashPassword(password);

    const driver = await this.repo.getByPhone(phone);
    if (!driver) await this.repo.create({ ...data, password: hashedPassword });

    if (driver) {
      if (driver.status === DriverStatus.Active)
        throw new BadRequestError(Errors.AlreadyExist);

      if (driver.status === DriverStatus.Blocked)
        throw new BadRequestError(Errors.DriverBlocked);

      if (driver.status === DriverStatus.Pending) {
        await this.repo.updateByPhone(phone, {
          ...data,
          password: hashedPassword,
        });
      }
    }

    await verification.create(phone);
  };

  public verify = async (phone: string, code: string) => {
    const driver = await this.repo.getByPhone(phone);
    if (!driver) throw new NotFoundError(Errors.DriverNotFound);
    if (driver.status === DriverStatus.Active)
      throw new BadRequestError(Errors.AlreadyExist);

    const info = await verification.verify(phone, code);
    if (!info.valid) throw new BadRequestError(Errors.InvalidCode);

    await this.repo.updateByPhone(phone, { status: DriverStatus.Active });

    const { _id, name } = driver;
    return sign({
      id: _id,
      name,
      phone,
    });
  };

  public login = async (phone: string, password: string) => {
    const driver = await this.repo.getByPhone(phone, DriverStatus.Pending);

    if (!driver) {
      throw new NotFoundError(Errors.DriverNotFound);
    }
    if (driver.status === DriverStatus.Blocked) {
      throw new BadRequestError(Errors.DriverBlocked);
    }

    const validPassword = await validatePassword(password, driver.password);
    if (!validPassword) throw new BadRequestError(Errors.IncorrectPassword);

    const { _id, name } = driver;
    return sign({
      id: _id,
      name,
      phone,
    });
  };

  public get = async (id: string) => {
    const driver = await this.repo.getById(id, "-password");
    if (!driver || driver.status !== DriverStatus.Active)
      throw new NotFoundError(Errors.DriverNotFound);

    return driver;
  };

  public update = async (id: string, update) => {
    const { password, newPassword } = update;

    const driver = await this.repo.getById(id);
    if (!driver) throw new NotFoundError(Errors.DriverNotFound);
    if (driver.status === DriverStatus.Blocked)
      throw new NotFoundError(Errors.DriverBlocked);

    const changePassword = password && newPassword;

    if (changePassword) {
      const validPassword = await validatePassword(password, driver.password);
      if (!validPassword) throw new BadRequestError(Errors.IncorrectPassword);
    }

    await this.repo.updateById(id, {
      ...update,
      password: changePassword
        ? await hashPassword(newPassword)
        : driver.password,
    });
  };

  public delete = async (id: string) => {
    const driver = await this.repo.getById(id);
    if (!driver) throw new NotFoundError(Errors.DriverNotFound);

    await this.repo.updateById(id, {
      status: DriverStatus.Deleted,
    });
  };
}

export default new DriverService();
