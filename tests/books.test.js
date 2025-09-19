import { Builder, By, until } from "selenium-webdriver";

(async function testBooks() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    // Hapi 1: Hape login dhe hyn si admin
    await driver.get("http://localhost:3000/login");
    await driver.findElement(By.name("email")).sendKeys("admin@example.com");
    await driver.findElement(By.name("password")).sendKeys("123456");
    await driver.findElement(By.css("button[type='submit']")).click();
    await driver.wait(until.urlContains("/books"), 5000);

    // Hapi 2: Shto një libër të ri
    await driver.findElement(By.css("input[placeholder='Title']")).sendKeys("Selenium Book");
    await driver.findElement(By.css("input[placeholder='Author']")).sendKeys("QA Tester");
    await driver.findElement(By.css("input[placeholder='Year']")).sendKeys("2025");
    await driver.findElement(By.css("input[placeholder='Price']")).sendKeys("15");
    await driver.findElement(By.css("button[type='submit']")).click();

    // Hapi 3: Kontrollo nëse libri u shtua
    await driver.wait(until.elementLocated(By.xpath("//li[contains(., 'Selenium Book')]")), 5000);
    console.log("✅ Books test passed - Libri u shtua me sukses");

  } catch (err) {
    console.error("❌ Books test failed:", err);
  } finally {
    await driver.quit();
  }
})();
