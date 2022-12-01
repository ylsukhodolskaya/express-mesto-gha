import { constants } from 'http2';
import { HTTPError } from './HTTPError.js';

export class ForbiddenError extends HTTPError {
  constructor(message) {
    super(message);
    this.name = 'ForbiddenError';
    this.statusCode = constants.HTTP_STATUS_FORBIDDEN;
  }
}
