import puppeteer from "puppeteer";
import postToGhost from "./ghost.js";

export default async function ScrapData(
  url,
  IdClassesTags,
  articletitle,
  articlebody,
  articleimage
) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: "load",
    // Remove the timeout
    timeout: 0,
  });

  const resultsSelector = IdClassesTags;

  const articleTitle = articletitle;
  const articleBody = articlebody;
  const articleImage = articleimage;

  const links = await page.evaluate((resultsSelector) => {
    return [...document.querySelectorAll(resultsSelector)].map((anchor) => {
      const title = anchor.textContent.split("|")[0].trim();
      return `${anchor.href}`;
    });
  }, resultsSelector);

  if ((links !== null) | undefined) {
    await page.goto(links[1], {
      waitUntil: "load",
      // Remove the timeout
      timeout: 0,
    });

    // Full article title
    const fullArticleTitle = await page.evaluate((articleTitle) => {
      return [...document.querySelectorAll(articleTitle)].map((anchor) => {
        const title = anchor.textContent.split("|")[0].trim();
        return `${title}`;
      });
    }, articleTitle);

    //Full article body
    const fullArticleBody = await page.evaluate((articleBody) => {
      return [...document.querySelectorAll(articleBody)].map((anchor) => {
        const title = anchor.innerHTML.split("|")[0].trim();
        return `${title}`;
      });
    }, articleBody);

    // Full article image
    const fullArticleImage = await page.evaluate((articleImage) => {
      return [...document.querySelectorAll(articleImage)].map((anchor) => {
        const image = anchor.getAttribute("src");
        return `${image}`;
      });
    }, articleImage);

    const tags = [
      {
        created_at: null,
        description: null,
        feature_image: null,
        id: "5ddc9063c35e7700383b27e0",
        meta_description: null,
        meta_title: null,
        name: "Breaking",
        slug: "breaking-news",
        updated_at: null,
        url: "https://verixr.com/tag/breaking-news/",
        visibility: "public",
      },
    ];

    const status = "published";
    const publishBody = fullArticleBody[0];
    postToGhost(
      fullArticleImage[0],
      fullArticleTitle[0],
      publishBody,
      status,
      tags
    );
    console.log(fullArticleTitle + " has been published");
  }
}
