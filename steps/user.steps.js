import { Builder, By, until } from "selenium-webdriver";
import { Given, When, Then, BeforeAll, AfterAll, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "chai";

// rrit timeout në 60 sekonda
setDefaultTimeout(60 * 1000);

let driver;

BeforeAll(async () => {
  driver = await new Builder().forBrowser("chrome").build();
  console.log("✅ Chrome u hap me sukses");
});

AfterAll(async () => {
  await driver.quit();
  console.log("✅ Chrome u mbyll");
});

Given("I am on the users page", async () => {
  console.log("🌐 Po hap faqen e users...");
  await driver.get("http://localhost:3000/users");
  console.log("✅ Users page u hap");
});

When("I request to see the user list", async () => {
  console.log("🔎 Duke pritur userList...");
  await driver.wait(until.elementLocated(By.id("userList")), 10000);
  console.log("✅ userList u gjet");
});

Then("I should see all registered users displayed", async () => {
  console.log("📋 Duke lexuar userList...");
  const list = await driver.findElement(By.id("userList")).getText();
  console.log("ℹ️ userList content:", list);
  expect(list).to.not.be.empty;
  console.log("✅ Testi kaloi: lista e përdoruesve nuk është bosh");
});
