Feature: Login functionality
  As a registered user
  I want to login to the Mini-Library system
  So that I can access my account

  Scenario: Successful login
    Given I am on the login page
    When I enter a valid email and password
    And I click the login button
    Then I should be redirected to the books page
