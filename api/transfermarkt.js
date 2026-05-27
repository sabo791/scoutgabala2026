import * as cheerio from "cheerio";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { url } = req.body || {};

    if (!url || !url.includes("transfermarkt")) {
      return res.status(400).json({ error: "Transfermarkt linki düzgün deyil" });
    }

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const html = await response.text();
    const $ = cheerio.load(html);

    const title = $("title").text();
    const name = title.split("-")[0].trim();

    return res.status(200).json({
      name: name || "Ad tapılmadı",
      age: "",
      position: "",
      club: "",
      transfermarkt: url,
    });
  } catch (e) {
    return res.status(500).json({
      error: "Transfermarkt import alınmadı",
      detail: String(e.message || e),
    });
  }
}
