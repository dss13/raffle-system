# Grofers
## Pre-requisites
- Node.js (v12 or above)
- MongoDB

## Setup
1. Clone the repository using the below command.
    ```
    git clone https://github.com/dss13/grofers.git
    ```
2. Install both dependencies and devDependencies using
    ```
    npm install
    ```
3. After successful installation of all the dependencies, you can start the API and React app using
    ```
    npm run dev:serve
    ```
  **Note** the API server listens on port `3333` and React app runs on `4200` and also make sure that MongoDB server is running

## Usage

### React app
#### Admin page
- After running the above commands, the app would run on `http://localhost:4200`.
- To access the admin page where users and events can be created, go to `http://localhost:4200/admin`.
- The login credential is `admin`
- To compute and get winners of events in last 7 days, simply hit `http://localhost:3333/api/winners`.

#### Customer portal
- To login to customer portal, create a customer/user through admin page and enter the email id of the registered customers.
- After logging in, you would see the dashboard where you could find your participations and upcoming events.
- You can also request for raffle tickets, using the `Get Raffle ticket` link in the navbar.
- To participate in an active event, click on participate and choose a raffle ticket to try your luck.

### Customer API
- To create a customer(name and email are mandatory and email should be unique)
  ```
  POST http://localhost:3333/api/customer/create
  {
    "name": "Sumugan Swaroop",
    "email": "sumuganswaroop@gmail.com"
  }
  ```
- To fetch all the customers
  ```
  GET http://localhost:3333/api/customer/all
  ```
### Raffle ticket API
- To create raffle tickets for a customer(customerId is the _id field in the customer document in MongoDB)
  ```
  POST http://localhost:3333/api/raffleticket/create
  {
      "customerId": "609fcee73c799305b4159572"
  }
  ```
- To fetch all the raffle tickets that a customer holds
  ```
  POST http://localhost:3333/api/raffleticket/customer
  {
      "customerId": <_id present in customer document>
  }
  ```
### Event API
- To create an event
  ```
  POST http://localhost:3333/api/event/create
  {
      "name": "Grofers sale",
      "reward": "iPhone XR",
      "endsAt": "2021-05-07T18:21:57"
  }
  ```
- To get upcoming events
  ```
  GET http://localhost:3333/api/event/upcoming
  ```
- To get winners of events in last 7 days
  ```
  GET http://localhost:3333/api/winners
  ```
- To compute the winners of events
  ```
  GET http://localhost:3333/api/winners/populate
  ```
- To participate in an event
  ```
  POST http://localhost:3333/api/participant/create
  {
      "customerId": "609fcee73c799305b4159572",
      "eventId": "60a0172e098c6b18d4e6ec15",
      "raffleId": "60a00a357a23d030081733d9"
  }
  ```
