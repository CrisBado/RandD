import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function GET(req, res) {
  try {
    const apiToken = process.env.CONFLUENCE_API_TOKEN;
    const email = process.env.CONFLUENCE_EMAIL;

    const confluenceApiUrl = `https://15gifts.atlassian.net/wiki/rest/api/content/3643572235?expand=body.storage`;

    const authString = `${email}:${apiToken}`;
    const encodedAuthString = btoa(authString);

    const response = await fetch(confluenceApiUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${encodedAuthString}`,
      },
    });

    // Extract the HTML content from the response
    const data = await response.json();
    const pageContent = data.body.storage.value;

    // Find all <h3> tags and keep only the text inside
    const h3TextArray = pageContent.match(/<h3[^>]*>[\s\S]*?<\/h3>/g);

    // Remove <h3> tags and keep only the text
    const textWithoutH3 = h3TextArray.map((h3Tag) =>
      h3Tag.replace(/<[^>]+>/g, "")
    );

    // Remove &rdquo; and &ldquo; from textWithoutH3
    const cleanedText = textWithoutH3.map((text) =>
      text.replace(/&ldquo;|&rdquo;/g, "")
    );

    const cleanedTextObjects = cleanedText.map((text) => ({
      id: uuidv4(),
      text,
    }));

    return NextResponse.json(cleanedTextObjects);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.status(500).json({ error: error.message });
  }
}
