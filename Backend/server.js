import express from "express";
import morgan from "morgan";
import mongoose from "mongoose"; //Importing mongoose
import dotenv from "dotenv";
import cors from "cors";
import { createEmployee, deleteEmployee, getAllEmployees, getEmployeeById, updateEmployee } from "./controllers/employee.controller.js";
import { loginEmployee } from "./controllers/auth.controller.js";
import { authorizeToken } from "./middleware/auth.middleware.js";
dotenv.config(); //configuring .env file

const app = express();
const PORT = process.env.PORT;

//Middlewares
app.use(morgan("dev"));
app.use(express.json())
app.use(cors()); //Cors middleware

//Employee to Routes
app.post("/employee", authorizeToken, createEmployee);
app.get("/employee", authorizeToken, getAllEmployees);
app.get("/employee/:id", getEmployeeById);
app.put("/employee/:id", updateEmployee);
app.delete("/employee/:id", authorizeToken, deleteEmployee);
app.post("/auth", loginEmployee);

//Route to verify token
app.get("/", authorizeToken, (req, res) => {
    res.status(200).json({Message: "Token Verified."});
});

//Database Connection
mongoose.connect(process.env.MONGOOSE_URL).then(() => {
    console.log("Database Connection Done.");
    app.listen(PORT, () => {
    console.log("Server is running at port: ", PORT);
    });
}).catch((err) => {
    console.log("Datbase Connection Failed.", err);
});
