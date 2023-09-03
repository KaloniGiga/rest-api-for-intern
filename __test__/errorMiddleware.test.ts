import { NextFunction, Request, Response } from 'express';
import { ErrorHandler } from '../src/errors/errorHandler';
import errorMiddleware from '../src/middlewares/error.middleware';
import User from '../src/models/user.model';
import { userController } from '../src/controllers/user.controller';

describe('errorMiddleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.Mock<NextFunction>;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  it('should handle ErrorHandler', async () => {
    const errorHandler = new ErrorHandler(500, 'Database error');
    errorMiddleware(errorHandler, mockRequest as Request, mockResponse as Response, mockNext);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: errorHandler.message });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should handle thrown Error handler instance in controller methods.', async () => {
    const errorHandler = new ErrorHandler(500, 'Something went wrong while deleting user.');
    jest.spyOn(User, 'destroy').mockRejectedValue(new Error('Database Error'));

    await userController.deleteUser(mockRequest as Request, mockResponse as Response, mockNext);

    expect(mockNext).toHaveBeenCalledWith(errorHandler);
  });
});
