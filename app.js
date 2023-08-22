import express from "express";
import { config } from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import { register, login, logout } from "./controllers/user.js";

import { isAuthenticated } from "./middlewares/auth.js";

// Create an instance of Express
export const app = express();

// Load environment variables
config({
    path: "./data/config.env"
});

// Serve static files (CSS, JS, images, etc.) from the "public" directory
app.use(express.static(path.join(path.resolve(), "public"), { extensions: ["html", "css", "js"] }));

// Other middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Set the view engine and specify the views directory
app.set("view engine", "ejs");

// User routes
app.get("/", (req, res) => {
    res.render("login");
});
app.post("/", login);

app.post("/api/v1/users/new", register);
app.get("/api/v1/users/new", (req, res) => {
    res.render("register");
});

app.post("/", login);
app.get("/api/v1/users/logout", logout);
app.get("/api/v1/users/me", isAuthenticated,(req,res)=>{
    res.render("home", { name: req.user.name });
});

// Error handling middleware
app.use(errorMiddleware);


