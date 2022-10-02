import {NextFunction, Request, Response} from "express";
import {AppError} from "./AppError";
import { verify } from "jsonwebtoken";
import { getFileContent } from "../helpers/getFileContent";

const secret = getFileContent('jwt.evaluation.key');

interface IPayLoad {
    access: string;
    account_id: number;
    contractor_id: number;
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

        const { access, contractor_id, account_id } = verify(authHeader, secret) as IPayLoad;

        request.account_id = +account_id;
        request.contractor_id = +contractor_id;
        request.access = access;
        return next();

    } catch (err) {
        throw new AppError("Invalid token");
    }
    
}