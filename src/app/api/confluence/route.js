import { NextResponse } from "next/server";

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

    // Extract HTML blocks between <h3> and <hr />
    const blockPattern = /<h3[^>]*>([\s\S]*?)<\/h3>([\s\S]*?)<hr \/>/g;

    const formattedBlocks = [];
    let match;
    while ((match = blockPattern.exec(pageContent)) !== null) {
      let titleWithStrong = match[1]; // Title with <strong> tag
      const content = match[2]; // Extract the content between <h3> and <hr />

      // Remove <strong> tags and get only the text from the title
      titleWithStrong = titleWithStrong.replace(/<[^>]*>/g, "");

      // Remove &ldquo; and &rdquo; from the title
      const title = titleWithStrong.replace(/&ldquo;|&rdquo;/g, "");

      formattedBlocks.push({
        title: title,
        innerHTML: content,
      });
    }

    return NextResponse.json(formattedBlocks);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.status(500).json({ error: error.message });
  }
}
