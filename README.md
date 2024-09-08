Smart Search Algorithm
A Node.js project with Express for a smart search algorithm.

Setup
1. Install dependencies
bash
Copy code
npm install
2. Start the application using Docker
bash
Copy code
docker compose up
3. Run database migrations
bash
Copy code
docker exec -it smart-search-algorithm-app-1 npx knex migrate:latest
4. Seed the database
bash
Copy code
docker exec -it smart-search-algorithm-app-1 npx knex seed:run
Running the App
The app will be running on:

arduino
Copy code
http://localhost:3000
Testing the Endpoint
To test the algorithm, use the following endpoint:

bash
Copy code
GET http://localhost:3000/test?term=desired_term
Replace desired_term with the search term you want to test.