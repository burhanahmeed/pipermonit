import { Request, Response, NextFunction } from 'express';

export default function userMiddleware (req: Request, res: Response, next: NextFunction) {
  if (req.headers['x-mon-session']) {
    res.locals.session = req.headers['x-mon-session'];
    next();
    return true;
  }
  res.status(400).json({
    description: 'unmatched session credentials!'
  })
}