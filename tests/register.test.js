import { Builder, By, until } from "selenium-webdriver";

(async function testRegister() {
  let driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("http://localhost:3000/register");

    await driver.findElement(By.name("name")).sendKeys("Test User");
    await driver.findElement(By.name("email")).sendKeys("testuser@example.com");
    await driver.findElement(By.name("password")).sendKeys("123456");

    await driver.findElement(By.css("button[type='submit']")).click();

    await driver.wait(until.urlContains("/login"), 5000);
    console.log("✅ Registration test passed");
  } catch (err) {
    console.error("❌ Registration test failed:", err);
  } finally {
    await driver.quit();
  }
})();
