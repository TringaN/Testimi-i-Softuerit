import { Builder, By, until } from "selenium-webdriver";
import { Given, When, Then, BeforeAll, AfterAll } from "@cucumber/cucumber";
import { expect } from "chai";

let driver;

BeforeAll(async () => {
  driver = await new Builder().forBrowser("chrome").build();
});

AfterAll(async () => {
  await driver.quit();
});

Given("I am on the register page", async () => {
  await driver.get("http://localhost:3000/register");
});

When("I enter a valid name, email, and password", async () => {
  await driver.findElement(By.css("input[placeholder='Name']")).sendKeys("Test User");
  await driver.findElement(By.css("input[placeholder='Email']")).sendKeys(`user${Date.now()}@test.com`);
  await driver.findElement(By.css("input[placeholder='Password']")).sendKeys("Secret123!");
});

When("I click the register button", async () => {
  await driver.findElement(By.css("button")).click();
});

Then("I should see a success message", async () => {
  const msg = await driver.wait(until.elementLocated(By.id("successMsg")), 5000);
  const text = await msg.getText();
  expect(text).to.include("Successfully registered");
});

Then("I should be redirected to the login page", async () => {
  await driver.wait(until.urlContains("/login"), 5000);
  const url = await driver.getCurrentUrl();
  expect(url).to.include("/login");
});

When("I enter an already used email", async () => {
  await driver.findElement(By.css("input[placeholder='Name']")).clear();
  await driver.findElement(By.css("input[placeholder='Email']")).clear();
  await driver.findElement(By.css("input[placeholder='Password']")).clear();

  await driver.findElement(By.css("input[placeholder='Name']")).sendKeys("Existing User");
  await driver.findElement(By.css("input[placeholder='Email']")).sendKeys("nevzatit@gmail.com");
  await driver.findElement(By.css("input[placeholder='Password']")).sendKeys("Secret123!");
});

Then("I should see an error message {string}", async (expectedMsg) => {
  const msg = await driver.wait(until.elementLocated(By.id("errorMsg")), 5000);
  const text = await msg.getText();
  expect(text).to.include(expectedMsg);
});
