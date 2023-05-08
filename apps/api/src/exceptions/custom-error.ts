export class CustomError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.name = 'CustomError';
    this.statusCode = statusCode;
  }
}
