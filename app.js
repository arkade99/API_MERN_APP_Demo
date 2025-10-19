import express from "express";
import router from "./route/userRoute.js";
import cors from "cors";

const app = express();
//app.use(cors);

app.use(express.json()); // to parse JSON
app.use(cors());
app.use("/api", router);

export default app;
