const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// const nodemailer = require('nodemailer')
require('dotenv').config();

//import routes
const authRoutes = require('../Routes/authRoutes');
const productRoutes = require('../Routes/productRoutes');
const { db } = require('../models/User');
const productStore = require('../store/store');



//app
const app = express();

// db
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('DB Connected'));

//middlewares
app.use(bodyParser.json());
app.use(cors());


//routes middleware
app.use('/api', authRoutes);
app.use('/products', productRoutes);
app.use('/createProducts', productRoutes);
app.use('/deleteProducts', productRoutes);
app.use('/updateProducts', productRoutes);
const port = 8000;

app.listen(port, () => {
    console.log(`server is running on ${port}`)

});

