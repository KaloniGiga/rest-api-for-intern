import { ErrorHandler } from '../src/errors/errorHandler';

describe('ErrorHandler', () => {
  it('should create the instance of Error handler', async () => {
    const errorHandler = new ErrorHandler(500, 'Database error');
    expect(errorHandler).toBeInstanceOf(ErrorHandler);
  });

  it('should have the correct properties', async () => {
    const errorHandler = new ErrorHandler(500, 'Database error');
    expect(errorHandler.statusCode).toBe(500);
    expect(errorHandler.message).toBe('Database error');
  });
});
