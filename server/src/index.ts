const port = process.env.PORT || 9000;
const path = require("path");
import { NextFunction, Request, Response } from "express";

const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, "build")));

// ------------------------------
app.use("/users", require("./routes/userRoute"));

app.use("/managers", require("./routes/managerRoute"));

app.use("/signin", require("./routes/signInUserRoute"));
// ------------------------------

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  );
  next();
});

app.use(
  cors({
    origin: ["https://todo-app-one-pearl-43.vercel.app"],
    methods: ["POST", "GET", "PATCH"],
  }),
);

app.listen(port, () => {
  console.log(`App is listening on dd ${port}`);
});
