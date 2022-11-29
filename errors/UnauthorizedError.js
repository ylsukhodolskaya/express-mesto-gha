import { constants } from 'http2';
import { HTTPError } from './HTTPError.js';

export class UnauthorizedError extends HTTPError {
  constructor(message) {
    super(message, constants.HTTP_STATUS_UNAUTHORIZED);
  }
}
