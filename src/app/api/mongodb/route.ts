import { NextResponse } from "next/server";
import { dbConnect } from "../mongodb-connection"
import GlossaryData from "../../models/GlossaryData"

export async function GET() {
  await dbConnect();
  try {
    const glossaryData = await GlossaryData.find({})
    return NextResponse.json(glossaryData);
  } catch (error) {
     console.error("Error:", error);
    return NextResponse.json({ error: true, message: error });
  }
}