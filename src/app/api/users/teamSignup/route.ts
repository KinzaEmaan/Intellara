import bcrypt from 'bcryptjs';
import Teams from "@/models/teamModel";
import { connect } from "@/dbConfig/dbConfigTeam";

connect();

export async function POST(request) {
  try {

    const reqBody = await request.json();
    const { fullname, email, password } = reqBody;

  
    const existingTeamMember = await Teams.findOne({ email }).exec();

    if (existingTeamMember) {
      // If team member with the given email already exists, return a response indicating failure
      return new Response(JSON.stringify({ message: "Email already exists", success: false }), { status: 400 });
    } else {
      // If team member with the given email does not exist, proceed with signup logic
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new team member document
      const newTeamMember = new Teams({
        fullname,
        email,
        password: hashedPassword,
      });

      // Save the new team member to the database
      await newTeamMember.save();

      // Return a success response
      return new Response(JSON.stringify({ message: "Signup successful", success: true }), { status: 200 });
    }
  } catch (error) {
    // Handle errors and return an error response
    console.error("Error in team signup route:", error);
    return new Response(JSON.stringify({ message: "Internal server error", success: false }), { status: 500 });
  }
}
