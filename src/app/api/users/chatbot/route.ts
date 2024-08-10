import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig'; // Adjust the path to your dbConfig file
import UserMessageData from '@/models/UserMessageSchema'; // Adjust the path to your schema file

connect();

export async function POST(request: NextRequest) {
  const headers = new Headers();
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  headers.set('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  try {
    const body = await request.text(); 
    if (!body) {
      return NextResponse.json(
        { success: false, message: 'Request body is empty' },
        { status: 400, headers }
      );
    }

    const parsedBody = JSON.parse(body); 
    const { message } = parsedBody;

    if (!message) {
      return NextResponse.json(
        { success: false, message: 'Message is required' },
        { status: 400, headers }
      );
    }

    const newUserMessage = new UserMessageData({ message });
    await newUserMessage.save();

    return NextResponse.json(
      { success: true, message: 'User message stored successfully' },
      { status: 201, headers }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: 'Error storing user message' },
      { status: 500, headers }
    );
  }
}

export function OPTIONS() {
  const headers = new Headers();
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  headers.set('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  return new NextResponse(null, { status: 204, headers });
}
