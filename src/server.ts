import express from "express";
import { routes } from "./routes";
import { capture } from "./utils/catchError";
import { errorHandler } from "./middlewares/ErrorMessage";
import cors  from 'cors';


const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

app.use(routes);
app.use(errorHandler);

app.listen(8181, () => console.log("Server is Runninggg"));