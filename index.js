import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cron from "node-cron";
import ScrapData from "./scrapKenNews.js";
import scrapFootball from "./scrapFootball.js";
const app = express();
const port = 3001;

cron.schedule(
  "*/30 * * * *",
  () => {
    ScrapData(
      "https://www.tuko.co.ke/",
      "article a",
      "article h1",
      "article .post__content",
      "article .article-image .article-image__picture"
    );
    console.log("Running a web scrap of tuko news");
  },
  {
    scheduled: true,
    timezone: "Africa/Nairobi",
  }
);

//football
cron.schedule(
  "*/59 * * * *",
  () => {
    scrapFootball(
      "https://africa.espn.com/",
      ".headlineStack__listContainer li a",
      "article div h1",
      ".article-body",
      "article figure .imageLoaded"
    );
    console.log("Running a web scrap of ESPN.FOOTBALL");
  },
  {
    scheduled: true,
    timezone: "Africa/Nairobi",
  }
);

app.listen(port, () => {
  console.log(`verixr scraper listening on port ${port}`);
});
