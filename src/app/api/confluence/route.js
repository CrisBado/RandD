import axios from "axios";

import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    // Replace 'YOUR_API_TOKEN' with your actual API token
    const apiToken = process.env.CONFLUENCE_API_TOKEN;
    const email = process.env.CONFLUENCE_EMAIL;

    // Construct the Confluence API URL
    const confluenceApiUrl = `https://15gifts.atlassian.net/wiki/rest/api/content/3643572235?expand=body.storage`;

    // Make the API request to Confluence with the API token
    const response = await axios.get(confluenceApiUrl, {
      headers: {
        "Content-Type": "application/json",
        username: email,
        password: apiToken,
      },
      auth: {
        username: email,
        password: apiToken,
      },
    });
    // Extract the HTML content from the response
    const pageContent = response.data.body.storage.value;

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

    const cleanedTextObjects = cleanedText.map((text) => ({ text }));

    // Send the modified Confluence API response back to the client
    console.log(cleanedText);

    return NextResponse.json(cleanedTextObjects);
  } catch (error) {
    // Handle errors as needed
    console.error("Error:", error);
    return NextResponse.json({ message: "no" });
  }
}
