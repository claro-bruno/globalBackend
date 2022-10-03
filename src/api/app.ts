import express from "express";
import { router } from "../routes";
import { errorHandler } from "../middlewares/ErrorMessage";
import cors  from 'cors';
import path from 'path';
import "dotenv/config";

const app = express();
app.use(express.json());
app.use('/images', express.static(path.resolve(__dirname, '../uploads')));
app.use(cors());
app.use(express.urlencoded( { extended: true }));
app.use(router);
app.use(errorHandler);


export { app }