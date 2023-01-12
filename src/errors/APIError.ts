class APIError extends Error {
  public name = 'APIError';

  public code?: string;

  public status?: number;

  public toJSON: () => any;

  public constructor(message: string, status?: number, code?: string) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, APIError);
    }

    this.status = status;
    this.code = code;

    this.toJSON = function toJSON() {
      return {
        name: this.name,
        message: this.message,
        status: this.status,
        code: this.code,
        stack: this.stack,
      };
    };
  }
}

export default APIError;
