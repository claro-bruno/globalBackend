export class AppError {
    public readonly message: string;
    public readonly statusCode: number;

    constructor(message: string, statusCode = 400) {
        this.message = message;
        this.statusCode = statusCode;
    }

}

/*
class AppError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'AppError';
    
    // Mantém o stack trace apropriado para a classe
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export default AppError; */