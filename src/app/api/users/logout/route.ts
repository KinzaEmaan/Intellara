import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest, res: Response) {
  try {
    // Clearing the cookie 
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0), // setting expiry to delete the cookie
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
