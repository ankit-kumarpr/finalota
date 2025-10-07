const express = require("express");
const cors = require("cors");
const connectToDb = require("./DB/db");

const app = express();
const authRoutes = require('./routes/authRoutes');
const hotelRoutes = require('./routes/hotelRoutes');

connectToDb(); 

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:6500','https://finalota.vercel.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/auth', authRoutes);
app.use('/api/hotel', hotelRoutes);


module.exports = app;
