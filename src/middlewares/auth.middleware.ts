import { Request, Response, NextFunction } from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { AppError } from '../errors/app.error';

export interface AuthRequest extends Request {
  userId?: number;
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(new AppError('authorization header is required', 401));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as {
      userId: number;
    };

    req.userId = decoded.userId;

    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return next(new AppError('expired token', 401));
    }

    return next(new AppError('invalid token', 401));
  }
}