import express from "express";
import { routes } from "../routes/routes";
import { capture } from "../utils/catchError";
import { errorHandler } from "../middlewares/ErrorMessage";
import cors  from 'cors';
import path from 'path';
import multer from "multer";

const app = express();
app.use(express.json());
app.use('/images', express.static(path.resolve(__dirname, '../uploads')));
app.use(cors());
app.use(express.urlencoded({extended: true}));
// app.post('/contractor', multer().none(), function (req, res, next) {
//     res.send(req.body.body);
// });

app.use(routes);
app.use(errorHandler);

app.listen(3001, () => console.log("Server is Runninggg"));