import { NextResponse } from "next/server";
import cheerio from "cheerio";

export async function GET(req, res) {
  try {
    const apiToken = process.env.CONFLUENCE_API_TOKEN;
    const email = process.env.CONFLUENCE_EMAIL;

    const confluenceApiUrl = `https://15gifts.atlassian.net/wiki/rest/api/content/3643572235?expand=body.storage`;

    const authString = `${email}:${apiToken}`;
    const encodedAuthString = btoa(authString);

    // Function to fetch the page content and handle pagination
    async function fetchPageContent(url, content = "") {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${encodedAuthString}`,
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch page content: ${response.status} - ${response.statusText}`
        );
      }

      const data = await response.json();
      const pageContent = data.body.storage.value;

      content += pageContent;

      if (data._links && data._links.next) {
        return fetchPageContent(data._links.next, content);
      } else {
        return content;
      }
    }

    // Fetch the page content and handle pagination
    const completePageContent = await fetchPageContent(confluenceApiUrl);

    const formattedBlocks = [];
    const $ = cheerio.load(completePageContent);

    $("h3").each((index, element) => {
      const titleWithStrong = $(element).text();
      const content = $(element).nextUntil("h3").html();

      const title = titleWithStrong.replace(/&ldquo;|&rdquo;/g, "");

      formattedBlocks.push({
        title: title,
        innerHTML: content,
      });
    });

    console.log("Formatted blocks:", formattedBlocks);

    return NextResponse.json(formattedBlocks);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.status(500).json({ error: error.message });
  }
}
