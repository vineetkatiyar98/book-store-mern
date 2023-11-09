import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./dbConfig.js";
import bookRouter from "./routes/bookRoute.js"
import cors from "cors"

app.use(express.json());

app.use(cors({
  origin : "http://localhost:5173",
  methods : ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders : ["content-type"]
}))

connectDB();

app.use("/book", bookRouter);

const port = process.env.PORT || 8000;

app.get("/test", (req, response) => {
  response.send("Welcome");
});


app.listen(port, function () {
  console.log(`listening on ${port}`);
});
