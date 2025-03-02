import cors from "cors";
import "dotenv/config";
import express from "express";

const app = express();
app.use(express.json());
app.use(cors());


export default app;

if (require.main === module) {
  app.listen(3000, () => console.log("Server running on port 3000"));
}
