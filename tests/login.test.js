import { Builder, By, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";

async function loginTest() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // 1. Hape faqen e login
    await driver.get("http://localhost:3000/login");

    // 2. Gjej input-at me placeholder
    await driver.findElement(By.css("input[placeholder='Email']")).sendKeys("nevzatit@gmail.com");
    await driver.findElement(By.css("input[placeholder='Password']")).sendKeys("fjalekalimi123");

    // 3. Kliko butonin Login
    await driver.findElement(By.css("button")).click();

    // 4. Prit redirect te /books
    await driver.wait(until.urlContains("/books"), 5000);

    console.log("✅ Login test PASSED!");
  } catch (err) {
    console.error("❌ Login test FAILED:", err);
  } finally {
    await driver.quit();
  }
}

loginTest();
