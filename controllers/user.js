import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";


export const login=async (req,res,next)=>{
   try {
    const {email, password}= req.body;

    const user = await User.findOne({email}).select("+password");

    if(!user) return res.render("login", { email, message: "Register First" });

    const isMatch = await bcrypt.compare(password, user.password);
 
    if(!isMatch) return res.render("login", { email, message: "Incorrect Email or Password" });

    sendCookie(user,res, 200);
    
    res.redirect("/api/v1/users/me");
   } catch (error) {
    next(error);
   }
};

export const register=async (req,res,next)=>{
    try {
        const {name, email, password}= req.body;

    let user = await User.findOne({email});
    
    if(user) return res.render("register", { email, message: "User Already Exist , Login please" });
   
    const hashedPassword = await bcrypt.hash(password,10);

     user = await User.create({name, email, password: hashedPassword});

    res.redirect("/");

    } catch (error) {
        next(error);
    }

};



export const logout=(req,res)=>{
 
    res.status(200)
    .cookie("token", "", {
       expires: new Date(Date.now()),
       sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
       secure: process.env.NODE_ENV === "development" ? false : true
    });
    res.redirect("/");
};
