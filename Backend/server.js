import express from "express";
import morgan from "morgan";
import mongoose from "mongoose"; //Importing mongoose
import dotenv from "dotenv";
import { createEmployee, getAllEmployees, getEmployeeById } from "./controllers/employee.controller.js";
dotenv.config(); //configuring .env file

const app = express();
const PORT = process.env.PORT;


//For logging informations
app.use(morgan("dev"));
app.use(express.json())

//Creating Route
app.get('/', (req, res) => {
    res.status(200).json({ message: "Welcome to Nodejs!" });
});

app.post("/employee/create", createEmployee);
app.get("/employee/getAllEmployees", getAllEmployees);
app.get("/employee/getAllEmployees/:id", getEmployeeById);

//Database Connection
mongoose.connect(process.env.MONGOOSE_URL).then(() => {
    console.log("Database Connection Done.");
    app.listen(PORT, () => {
    console.log("Server is running at port: ", PORT);
    });
}).catch((err) => {
    console.log("Datbase Connection Failed.", err);
});
