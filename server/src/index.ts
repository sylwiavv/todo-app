const express = require("express");
import { router } from "./routes/taskRoutes";

const app = express();
const port = process.env.PORT || 9001;

app.use(express.json());

app.use(router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
