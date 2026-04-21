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
    console.error('authorization header missing');
    return next(new AppError('Token de autorização é obrigatório', 401));
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
      console.error('Token expired');
      return next(new AppError('Token expirado', 401));
    }

    console.error('Invalid token');
    return next(new AppError('Token inválido', 401));
  }
}