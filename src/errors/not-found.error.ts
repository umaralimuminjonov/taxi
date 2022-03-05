import BaseError from "./base.error";

class NotFoundError extends BaseError {
  constructor(name) {
    super(name, 404);
  }
}

export default NotFoundError;
