import jwt, { VerifyErrors } from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";

import ForbiddenError from "../../errors/forbidden.error";
import UnauthorizedError from "../../errors/unauthorized.error";

export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, 12);
};

export const validatePassword = async (
  plainPassword: string,
  hashedPassword: string
) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

export const randomId = async () => crypto.randomBytes(4).toString("hex");

export const sign = (driverInfo) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      driverInfo,
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "3d" },
      async (err: Error | null, token: string) => {
        if (err) return reject(err);

        resolve(token);
      }
    );
  });
};

export const verify = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      (err: VerifyErrors | null, driverInfo) => {
        if (err) return reject(new ForbiddenError());

        resolve(driverInfo);
      }
    );
  });
};

export const checkToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) throw new UnauthorizedError();

    req.driver = await verify(token);
    next();
  } catch (err) {
    next(err);
  }
};
