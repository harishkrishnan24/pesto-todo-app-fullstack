This repo contains fullstack Task Manager Application that covers features mentioned below

- Can persist tasks to database
- Can view the tasks using client application
- Can filter tasks by status of task
- Can update status of task
- Can delete status of task

# Technologies Used

- Frontend: React.js using vite as bundler, Tailwind CSS and Shadcn UI for styling and components
- Backend: Express.js as server, MongoDB as database hosted in Atlas, Mongoose as ORM, jest & supertest for testing

## Running Server

- Make sure you have latest Node LTS installed
- cd into server directory and run `npm install` or choose the required install command as per package manager chosen
- create a `.env` file in the root directory of server and add two env variables
  - PORT=3000
  - DATABASE_URL=? (replace ? with local mongodb or hosted URL)
- run `npm run dev` to run server locally
- run `npm run test` for running tests. Tests are using Jest and Supertest libraries and can be found under `__tests__` directory

## Running Frontend

- Frontend uses Vite Scaffolding and uses react-ts as template
- cd into `client` folder and run `npm install`
- once packages are installed, run `npm run dev` to run client locally
- access using `http://localhost:5173/` default port number
