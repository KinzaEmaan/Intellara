import { connect } from "@/dbConfig/dbConfig";
import Team from "@/models/teamModel"; // Import the Team model
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import toast from "react-hot-toast";

connect();


export async function POST(req: NextRequest, res: Response) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    // Use the Team model directly
    const teamMember = await Team.findOne({ email: email });

    if (!teamMember) {
      console.log("Team member not found");
      return NextResponse.json({ error: "Team member not found" }, { status: 404 });
    }

    // Check if password is correct
    const isPasswordCorrect = await bcryptjs.compare(password, teamMember.password);
    if (!isPasswordCorrect) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 400 });
    }

    // Token data
    const token = {
      id: teamMember._id,
      username: teamMember.fullname,
      email: teamMember.email,
      role: teamMember.role,
    };

    // Generate token
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
    console.error("Error in POST:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
