Feature: User management
  As an admin
  I want to view all users
  So that I can manage the system

  Scenario: View user list
    Given I am on the users page
    When I request to see the user list
    Then I should see all registered users displayed
