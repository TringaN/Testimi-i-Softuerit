import { Builder, By, until } from "selenium-webdriver";
import { Given, When, Then, BeforeAll, AfterAll, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "chai";

setDefaultTimeout(60 * 1000);

let driver;

BeforeAll(async () => {
  driver = await new Builder().forBrowser("chrome").build();
});

AfterAll(async () => {
  await driver.quit();
});

Given("I am on the add book page", async () => {
  await driver.get("http://localhost:3000/books/add");
});

When("I enter a valid book title and author", async () => {
  await driver.findElement(By.xpath("//input[@placeholder='Title']")).sendKeys("Selenium Basics");
  await driver.findElement(By.xpath("//input[@placeholder='Author']")).sendKeys("Test Author");
});

When("I click the add book button", async () => {
  await driver.findElement(By.css("button")).click();
});

Then("I should see the book in the book list", async () => {
  const bookList = await driver.wait(until.elementLocated(By.id("bookList")), 10000);
  const text = await bookList.getText();
  expect(text).to.include("Selenium Basics");
});
