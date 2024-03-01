## Setup

### Dependencies

- Run `npm install` in project directory. This will install server-related dependencies such as `express`.
- `cd client` and run `npm install`. This will install client dependencies (React).

### Database Prep

- Access the MySQL interface in your terminal by running `mysql -u root -p`
- Create a new database `CREATE DATABASE NAME;`
- Add a `.env` file to the project folder of this repository containing the MySQL authentication information for MySQL user. For example:

```bash
  DB_HOST=localhost
  DB_USER=root
  DB_NAME=
  DB_PASS=YOURPASSWORD
```
- Use db: `SHOW DATABASE NAME;` +  `USE DATABASE NAME;`
- Run `npm run migrate` in the project folder of this repository, in a new terminal window. This will create a table called 'students' in your database.

- In your MySQL console, you can run `show tables ;` and then `describe table;` to see the structure of the table.

### Development

- Run `npm start` in project directory to start the Express server on port 4000
- In another terminal, do `cd client` and run `npm run dev` to start the client in development mode with hot reloading in port 5173.

##### In the Client terminal >>

```
npm install
```
```
npm run dev
```
```
npm run build
```

## Tips

Suggested Process:

1. Try and write the correct query in `mysql`.
1. Use that query to finish the endpoints in `/routes/.js`.
1. Test your endpoints using Postman.
1. Call the endpoints from the front end.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
