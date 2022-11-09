export class AppError extends Error {
  constructor(message?: string) {
    super(message);
  }
}

export class ConfigError extends AppError {
  constructor(message: string) {
    super(message);
  }
}

export class DataIntegrityError extends AppError {
  constructor(message: string) {
    super(message);
  }
}
