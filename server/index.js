const cors = require('cors'); 
const express = require('express');
const helmet = require('helmet'); 
const mongoose = require('mongoose');
const morgan =  require('morgan'); 

require('dotenv').config();

const middlewares = require('./middlewares')
const logs = require("./api/logs");

const app = express(); 

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log('😇');

app.use(morgan('common')); 
app.use(helmet()); 
app.use(cors({
  origin: process.env.CORS_ORIGIN, 
}));

app.use(express.json());
app.use('/api/logs', logs);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
 
const port = process.env.PORT || 1337; app.listen(port, () => {
  console.log(`listening on port ${port}`);
}); 
