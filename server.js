import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import contactRouter from './routes/contactRoutes.js';
import userRouter from './routes/userRoutes.js';

import { errorHandler } from "./middleware/errorHandler.js";
import { connectDb } from "./config/dbConnection.js";

connectDb();
const app = express();

const port = process.env.PORT || 5000;

//middleware
app.use(express.json()); // provides parser to parse data recieved at server from client side. needs to be written first before listening on an endpoint

app.use("/api/contacts", contactRouter);
app.use("/api/users", userRouter);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})


// 3. mongodb interaction returns a promise, to resolve it we need to use async
// 4. create schema model for the contacts
// 5. APPLY crud database
// 6. authentication

// a 201 status code is used when a new resource is created, 
// while a 200 status code is used when the request is successful and data is returned
// database -> collection -> document 
// endpoint for login-> getting a accesstoken corresponding to the login (using jswebtoken)

// 7. make public routes as private and make validation on each router
// create middleware to verify the token
// 8. We need to protech the contact routes now. Only logged-in user will be able to do CRUD operations.
/**
 * Whenever a contact is created, we associate the user-id with it who is creating the contact
 * 
 * */