import APIError from './APIError';

class ResponseError extends APIError {
  public constructor(message = 'Response does not have data') {
    super(message);

    this.name = 'ResponseError';
  }
}

export default ResponseError;
