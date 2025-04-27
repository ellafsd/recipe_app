import express from "express";    // Importing Express module, which is actually a funct
import cors from "cors";
import recipeRouter from "./routes/recipeRoutes.js";

// Calling express() creates an Express application obj, often called app.
const app = express();

const port =4004;

// Middleware that prevents cors errors adds header
app.use(cors());


// express.json() is a Built-in Middleware that parses JSON body - for post. put, and patch requests
app.use(express.json());
app.use(recipeRouter);

app.listen(port, () => {
    console.log(`Server is listening port ${port}`);
});