# Stocks App

Stocks dashboard with real-time updates. User should be able to add or remove stocks from the list. Behind the scenes, a sql db will hold the list of stocks, and a polling mechanism will update the stocks prices every second.

## Running this Demo
- Clone this repo locally
- switch to node 18.2.0 

- Ensure local postgres
- Create a local db to be used
- Add a .env file to the backend folder with the following values
```bash
# local pg setup
PG_DATABASE=
PG_HOST=
PG_USER=
```

- Install and Start backend
  - cd backend
	- npm install
	- node `./backend/scripts/setupDB.js`
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
- broken into app, routes, and controllers
- no logging, no auth, very barebones api

Routes and Controllers
GET /api/stocks?user=1
POST /api/stocks?user=1&name=AAA

Each returns an array of the current user's watched stocks

No ability to delete from the list.


## Frontend
React + Vite
- Logged Out Page, choose User 1 or User 2 pre-seeded into db
- Stocks Page
 - input for stocks initials
 - list of currently watched stocks
 - I chose polling, set interval on FE and let it ping server every second
- did not implement any testing or user error messages