# Bookshop frontend

The bookshop frontend is the frontend side that allow to manage book chart and read a list of book.

The project is based on javascript as base technological stack. Other technologies associated are:
- react js v18.3.11


## Table of contents (optional)

- Requirements
- Execution
- How it works
- Missing development part


## Requirements

This module requires the following modules:

- npm v9.8.0
- NodeJs v20.4.0


## Execution

- please run : **npm start**
- access to http://localhost:3000 by basic authentication. The users are extracted from the DB as **user/password** or **user2/password** 

## How it works

- login throw the login screen. In case positive is redirecting to the dashboard 
- The dashboard present a list of all the books. Clicking to any "Add chart" button, an increment is visible on the Chart. Once we are satisfied, we can proceed with the checkout adjusting the number of items. Once we are agree we can finalize the purchase 

## Missing development part

due to the luck of time, the following implementation are missed 
- appropriate unit tests, integration tests and appropriate code coverage
- correct implementation of the error message