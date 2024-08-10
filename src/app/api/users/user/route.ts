import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import toast from "react-hot-toast";

connect();

export async function POST(req: NextRequest, res:Response) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;
    console.log(reqBody);  

    // if user exists
    const user = await User.findOne({email: email });
    console.log("user:", user);
    
    if (!user) {
      console.log("user not found");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // if password is correct
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    }

    // Token data
    const token = {
      id: user._id,
      username: user.fullname,
      email: user.email,
    };

    // token
    const tokenData = await jwt.sign(token, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

    // Set cookie
    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });
    response.cookies.set("token", tokenData, {
      httpOnly: true,
    });
    return response;


 
 
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
