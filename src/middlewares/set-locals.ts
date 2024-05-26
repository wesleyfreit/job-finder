import { NextFunction, Request, Response } from 'express';

export const setLocals = (req: Request, res: Response, next: NextFunction) => {
  res.locals.user = req.session.user;
  next();
};
