import { NextResponse } from "next/server";
import { connectToDatabase } from "../mongodb-connection";

export async function GET(req, res) {
  try {
    const client = await connectToDatabase();
    const db = client.db();
    const collection = db.collection("data");

    const data = await collection.find({}).toArray();

    console.log("Data:", data);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.status(500).json({
      error: "Error connecting to MongoDB",
    });
  }
}
