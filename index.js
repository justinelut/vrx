import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cron from "node-cron";
import ScrapData from "./scrapKenNews.js";
import scrapFootball from "./scrapFootball.js";
import scrapIntNews from "./scrapIntNews.js";
const app = express();
const port = 3001;

cron.schedule(
  "*/30 * * * *",
  () => {

    try {
      console.log("Running a web scrap of tuko news");
      ScrapData(
        "https://www.tuko.co.ke/",
        "article a",
        "article h1",
        "article .post__content",
        "article .article-image .article-image__picture"
      );
    } catch (err) {
      console.log(err)
    }

  },
  {
    scheduled: true,
    timezone: "Africa/Nairobi",
  }
);

//internationa news
cron.schedule(
  "*/40 * * * *",
  () => {

    try {
      console.log("Running a web scrap of NBC.NEWS");
      scrapIntNews(
        "https://www.nbcnews.com/latest-stories/",
        ".tease-card__info h2 a",
        "header div h1",
        ".article-body .article-body__content",
        ".article-hero__main .article-hero__main-image img"
      );
    } catch (err) {
      console.log(err)
    }
  },
  {
    scheduled: true,
    timezone: "Africa/Nairobi",
  }
);


app.get('/share', (req, res) =>{
  console.log(req)
})


app.listen(port, () => {
  console.log(`verixr scraper listening on port ${port}`);
});
