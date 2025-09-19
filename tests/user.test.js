import { Builder, By, until } from "selenium-webdriver";

(async function testUsers() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    // Hapi 1: Hape login dhe hyn si admin
    await driver.get("http://localhost:3000/login");
    await driver.findElement(By.name("email")).sendKeys("admin@example.com");
    await driver.findElement(By.name("password")).sendKeys("123456");
    await driver.findElement(By.css("button[type='submit']")).click();
    await driver.wait(until.urlContains("/books"), 5000);

    // Hapi 2: Shko te Users
    await driver.findElement(By.linkText("Users")).click();
    await driver.wait(until.urlContains("/users"), 5000);

    // Hapi 3: Kontrollo nëse tabela/lista e userave ekziston
    await driver.wait(until.elementLocated(By.className("list-group")), 5000);
    console.log("✅ Users test passed - Userat po shfaqen");

  } catch (err) {
    console.error("❌ Users test failed:", err);
  } finally {
    await driver.quit();
  }
})();
