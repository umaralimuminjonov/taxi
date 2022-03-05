import BaseError from "./base.error";
import { Errors } from "./errors.enum";

class ForbiddenError extends BaseError {
  constructor() {
    super(Errors.Forbidden, 403);
  }
}

export default ForbiddenError;
