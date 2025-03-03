"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const taskRoutes_1 = require("./routes/taskRoutes");
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(taskRoutes_1.router);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
