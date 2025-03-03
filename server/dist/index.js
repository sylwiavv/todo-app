"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskRoutes_1 = require("./routes/taskRoutes");
const app = (0, express_1.default)();
const port = process.env.PORT || 9001;
app.use(express_1.default.json());
app.use(taskRoutes_1.router);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
