Feature: Add book functionality
  As a logged-in user
  I want to add a new book
  So that it appears in the library list

  Scenario: Successful book addition
    Given I am on the add book page
    When I enter a valid book title and author
    And I click the add book button
    Then I should see the book in the book list
