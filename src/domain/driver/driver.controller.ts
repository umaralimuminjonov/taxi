import { NextFunction, Request, Response } from "express";

import DriverService from "./driver.service";

import { Success } from "../../messages/success.enum";
import { IRequest } from "./driver.interface";

class DriverController {
  private service: typeof DriverService;

  constructor() {
    this.service = DriverService;
  }

  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const driver = req.body;

      await this.service.register(driver);

      res.json({ message: Success.CodeSent });
    } catch (err) {
      next(err);
    }
  };

  public verify = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { phone, code } = req.body;

      const accessToken = await this.service.verify(phone, code);

      res.json({ accessToken });
    } catch (err) {
      next(err);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { phone, password } = req.body;

      const accessToken = await this.service.login(phone, password);

      res.json({ accessToken });
    } catch (err) {
      next(err);
    }
  };

  public get = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.driver;

      const driver = await this.service.get(id);

      res.json(driver);
    } catch (err) {
      next(err);
    }
  };

  public update = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.driver;
      const update = req.body;

      await this.service.update(id, update);

      res.json({ message: Success.DriverUpdated });
    } catch (err) {
      next(err);
    }
  };

  public delete = async (req: IRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.driver;

      await this.service.delete(id);

      res.json({ message: Success.DriverDeleted });
    } catch (err) {
      next(err);
    }
  };
}

export default new DriverController();
