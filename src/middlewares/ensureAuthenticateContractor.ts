import {NextFunction, Request, Response} from "express";
import {AppError} from "./AppError";
import { verify } from "jsonwebtoken";

interface IPayLoad {
    sub: string;
}

export async function ensureAuthenticateContractor(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;
    if(!authHeader) {
        throw new AppError("Token missing");
    }

    //Bearer asdjasdhjasdhjasdhaskdj
    //[0] Bearer
    //[1] asdjasdhjasdhjasdhaskdj
    const [,token] = authHeader.split(" ")
    
    try {

        const { sub } = verify(token, "7dfb4ababc7a6b6d9d57c737c2188402") as IPayLoad;
        // request.id_client = sub;
        return next();

    } catch (err) {
        throw new AppError("Invalid token");
    }
    
}