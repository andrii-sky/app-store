import APIError from './APIError';

class ForbiddenError extends APIError {
  public constructor(message?, code?) {
    super(message, 403, code);

    this.name = 'ForbiddenError';
  }
}

export default ForbiddenError;
