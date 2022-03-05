import BaseError from "./base.error";

class BadRequestError extends BaseError {
  constructor(name) {
    super(name, 400);
  }
}

export default BadRequestError;
