import APIError from './APIError';

class NetworkError extends APIError {
  public constructor(message) {
    super(message);

    this.name = 'NetworkError';
  }
}

export default NetworkError;
