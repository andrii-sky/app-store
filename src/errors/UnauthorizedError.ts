import APIError from './APIError';

class UnauthorizedError extends APIError {
  public constructor(message?, code?) {
    super(message, 401, code);

    this.name = 'UnauthorizedError';
  }
}

export default UnauthorizedError;
