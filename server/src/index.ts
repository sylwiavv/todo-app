const port = 9001; 
import cors from "cors";
import express from 'express';

const app = express();
app.use(express.json());


// ------------------------------
app.use("/tasks", require("./routes/taskRoute"));
// ------------------------------

app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  }));

// app.use(
//   cors({
//     origin: ["https://todo-app-one-pearl-43.vercel.app"],
//     methods: ["POST", "GET", "PATCH"],
//   }),
// );

// app.listen(port, () => {
//   console.log(`App is listening on dd ${port}`);
// });
