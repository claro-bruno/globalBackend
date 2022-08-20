declare namespace Express {
    export interface Request {
        id_contractor: number;
        access: string;
        files: object;
    }
}