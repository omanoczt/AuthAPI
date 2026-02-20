import express from "express";
import router from "./router/index";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/v1', router);

export default app;