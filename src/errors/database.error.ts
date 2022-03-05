import BaseError from "./base.error";
import { Errors } from "./errors.enum";

class DatabaseError extends BaseError {
  constructor() {
    super(Errors.DatabaseError, 500);
  }
}

export default DatabaseError;
