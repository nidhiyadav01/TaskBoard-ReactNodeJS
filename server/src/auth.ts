

import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token){
    return res.status(401).json({ message: 'Unauthorized: You need to log in' });
  } 

  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Unauthorized: You need to log in' });

    next();
  });
};
