const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const router = require('./routes/route');
const routeData = require('./routes/content');


dotenv.config()

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
    console.log("Connected to DB");
})
app.use(express.json());

app.use('/api/user', router);

app.use('/api/user/data', routeData);

app.listen(3000, () => {
    console.log("Running server at 3000");
})