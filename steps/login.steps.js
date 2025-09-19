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

Given("I am on the login page", async () => {
  await driver.get("http://localhost:3000/login");
});

When("I enter a valid email and password", async () => {
  await driver.findElement(By.css("input[placeholder='Email']")).sendKeys("nevzatit@gmail.com");
  await driver.findElement(By.css("input[placeholder='Password']")).sendKeys("fjalekalimi123");
});

When("I click the login button", async () => {
  await driver.findElement(By.css("button")).click();
});

Then("I should be redirected to the books page", async () => {
  await driver.wait(until.urlContains("/books"), 5000);
  const currentUrl = await driver.getCurrentUrl();
  expect(currentUrl).to.include("/books");
});
