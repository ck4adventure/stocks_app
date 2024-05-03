# Stocks App

Stocks dashboard with real-time updates. User should be able to add or remove stocks from the list. Behind the scenes, a sql db will hold the list of stocks, and a polling mechanism will update the stocks prices every second.

## Running this Demo
- Clone this repo locally
- switch to node 18.2.0 

- Ensure local postgres

- Install and Start backend
  - cd backend
	- npm install
	- npm run dev

- Install and Start frontend
  - cd frontend
	- npm install
	- npm run dev

## Backend
Node 18.2.0 LTS/Hydrogen
PostgresDB locally
- Users
- UserStocks
  - id
	- user_id
	- initials
	- timestamps
- getStocksForUser

Mocha for Testing
 - basic tables checks only
 - does not dive into error specificity the way I would in production


Express Server Framework
Routes and Controllers



## Frontend
React + Vite
- Logged Out Page, choose User 1 or User 2 pre-seeded into db
- Stocks Page
 - input for stocks initials
 - list of currently watched stocks
 - if polling, set interval on FE and let it ping server every second
 - if sockets, on connection, set interval to emit stocks list for current user
 - success and error messages on watchlist changes