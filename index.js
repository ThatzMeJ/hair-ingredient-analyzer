import puppeteer from "puppeteer";

// Attempting to practice to scrape ingredients from shea moisture product
const scrapeWebsite = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null
  });

  const allIngredients = {};

  const page = await browser.newPage();
  await page.goto('https://www.sheamoisture.com/', {
    waitUntil: "domcontentloaded",
  });

  //Have to put waitForSelector for the page to load
  await page.waitForSelector('.c-header-menu > .c-header-menu-item');
  //Clicking the hair dropbox in navbar
  await page.click('.c-header-menu > .c-header-menu-item');
  await page.waitForSelector('.c-header-dropdown-menu-group');

  await page.click(".c-header-dropdown-wrapper > .c-header-dropdown-section > .c-header-dropdown-menu > .c-header-dropdown-menu-group:nth-child(2) > .c-header-dropdown-menu-list > .c-header-dropdown-menu-item");

  await page.waitForSelector('.button.button.button-septenary.button-size-sm.button-size-sm-.button-form-br-50.product-card__add-to-cart');

  //To get each href attribute from each a tag for all the products I wanna scrape!
  const productUrls = await page.evaluate(() => {
    let links = [];
    let elements2 = document.querySelectorAll('a.col-6.col-md-4.mb-3.c-link');
    for (let elements of elements2) {
      links.push(elements.href);
    }
    return links;
  });

  for (const url of productUrls) {
    await page.goto(url);
    await page.waitForSelector('div.grid-col.grid-col-md-6.title-and-description');
    await page.click('div.closed.card-header');

    const ingredients = await page.evaluate(() => {
      const ingredientsElement = document.querySelector('div.ingredients-text');
      return ingredientsElement ? ingredientsElement.innerText : 'Ingredients not found';
    });

    // Extract individual ingredients and update the count
    const ingredientList = ingredients.split(', '); // Assuming ingredients are separated by commas
    for (const ingredient of ingredientList) {
      if (ingredient in allIngredients) {
        allIngredients[ingredient]++;
      } else {
        allIngredients[ingredient] = 1;
      }
    }
  }
  
  //Convert the object into an array to sort into descending order then back into an object
  const ingredientArray = Object.entries(allIngredients);
  ingredientArray.sort((a, b) => b[1] - a[1]);
  const sortedIngredients = Object.fromEntries(ingredientArray);

  console.log('Ingredients count: ', sortedIngredients);

  
  //Original Code 

  // for (const url of productUrls) {
  //   await page.goto(url); 
  //   await page.waitForSelector('div.grid-col.grid-col-md-6.title-and-description');
  //   await page.click('div.closed.card-header');

  //   const ingredients = await page.evaluate(() => {
  //     const ingredientsElement = document.querySelector('div.ingredients-text'); 
  //     return ingredientsElement ? ingredientsElement.innerText : 'Ingredients not found';
  //   });
  //   console.log('Ingredients for', url, ':', ingredients);


  // }

  setTimeout(async () => {
    await browser.close();
  }, 5000);
}


scrapeWebsite();
