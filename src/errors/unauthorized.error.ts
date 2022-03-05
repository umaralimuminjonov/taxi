import BaseError from "./base.error";
import { Errors } from "./errors.enum";

class UnauthorizedError extends BaseError {
  constructor() {
    super(Errors.Unauthorized, 401);
  }
}

export default UnauthorizedError;
