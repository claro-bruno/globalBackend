import {NextFunction, Request, Response} from "express";
import {AppError} from "./AppError";
import { verify } from "jsonwebtoken";
import { getFileContent } from "../helpers/getFileContent";

const secret = getFileContent('jwt.evaluation.key');

interface IPayLoad {
    access: string;
    id: number;
}

declare module 'express-serve-static-core' {
    interface Request {
        id: number;
        access: string;
    }
}



export async function ensureAuthenticate(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;
    if(!authHeader) {
        throw new AppError("Token missing");
    }

    //Bearer asdjasdhjasdhjasdhaskdj
    //[0] Bearer
    //[1] asdjasdhjasdhjasdhaskdj
    // const [,token] = authHeader.split(" ")
    
    try {

        const { id, access } = verify(authHeader, secret) as IPayLoad;

        request.id = id;
        request.access = access;
        return next();

    } catch (err) {
        throw new AppError("Invalid token");
    }
    
}