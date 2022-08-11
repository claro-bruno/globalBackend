import express, {NextFunction, Request, Response} from "express";

export const capture = (fn: Function) => async (req: Request, res: Response, next: NextFunction) => {
    await fn(req, res, next).catch(next)
}
