Feature: Register functionality
  As a new user
  I want to register in the Mini-Library system
  So that I can login and use the system

  Scenario: Successful registration
    Given I am on the register page
    When I enter a valid name, email, and password
    And I click the register button
    Then I should see a success message
    And I should be redirected to the login page

  Scenario: Registration with existing email
    Given I am on the register page
    When I enter an already used email
    And I click the register button
    Then I should see an error message "Email already in use"
