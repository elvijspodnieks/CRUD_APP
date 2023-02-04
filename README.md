# CRUD_App

# React and MySQL
This project is a simple way to create API by Express.js, then send a message from the server to the client.<br>

## Create and Import a data sample
Extract the download file.<br>
Create and change your database information follow `backend/index.js` file
```
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'personsdb'
```

Import `personsdb_persons.sql` file into your database system.

### In the backend directory, follow these steps:
```sh
cd backend
npm install
npm start
```
Backend part will run on port 8800

### In the frontend directory, follow these steps:

```sh
cd ..
cd client
npm install
npm start
```

Front-end part will run on port 3000


![crud](https://user-images.githubusercontent.com/84780001/216026322-9643bd2b-03b6-4f32-9714-2b40b83c8c3d.gif)

