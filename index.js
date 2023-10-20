import puppeteer from "puppeteer";

// Attempting to practice to scrape ingredients from shea moisture product
const scrapeWebsite = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null
  });

  const page = await browser.newPage();
  await page.goto('https://www.sheamoisture.com/', {
    waitUntil: "domcontentloaded",
  });

  //Have to put waitForSelector for the page to load
  await page.waitForSelector('.c-header-menu > .c-header-menu-item');
  //Clicking the hair dropbox in navbar
  await page.click('.c-header-menu > .c-header-menu-item');
  await page.waitForSelector('.c-header-dropdown-menu-group');
  // await page.click('.c-link');
  await page.click(".c-header-dropdown-wrapper > .c-header-dropdown-section > .c-header-dropdown-menu > .c-header-dropdown-menu-group:nth-child(2) > .c-header-dropdown-menu-list > .c-header-dropdown-menu-item");

  await page.waitForSelector('.button.button.button-septenary.button-size-sm.button-size-sm-.button-form-br-50.product-card__add-to-cart');
  // const productUrls = await page.evaluate(() => {
  //   const h3Tags = document.querySelectorAll('h3.product-card__title');
  //   return Array.from(h3Tags, element => element.querySelector('a.col-6.col-md-4.mb-3.c-link').href);
  // });

  // const productUrls = await page.evaluate(() => {
  //   const h3Tags = document.querySelectorAll('h3.product-card__title');
  //   return Array.from(h3Tags, element => {
  //     const anchor = element.querySelector('a.col-6');
  //     return anchor ? anchor.href : null;
  //   });
  // });

  const productUrls = await page.evaluate(() => {
    Array.from()
  })
  

  for(const url of productUrls) {
    console.log(url)
  }



  // const scrapedData = [];

  // for (const url of productUrls) {
  //   await page.goto(url);
  
  //   // Implement your scraping logic for ingredient data specific to the product page
   
  // }

  // console.log('Scraped Data for All Products:', scrapedData);


  setTimeout(async () => {
    await browser.close();
  }, 5000);
}


scrapeWebsite();
