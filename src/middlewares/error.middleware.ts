import { NextFunction, Request, Response } from "express";

import { Errors } from "../errors/errors.enum";

export const errorResponder = (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(error.statusCode || 500).json({
    error: {
      code: error.statusCode ? error.name : Errors.ServerError,
      message: error.transactionMessage,
      data: error.data,
    },
    id: error.id,
  });
};

export const errorLogger = (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error);
  next(error);
};
