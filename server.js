const express = require('express');
const app = express();

const cors = require('cors');
app.use(express.json());

const connectDatabase = require('./config/database');
require('dotenv').config({ path: 'config/config.env' });

connectDatabase();

const userRoute = require('./routes/auth');
const waterRoute = require('./routes/WaterDetails');

app.use(cors({ origin: '*' }));

app.use('/api/auth', userRoute);
app.use('/api/water', waterRoute);
const server = app.listen(process.env.PORT || 4104, () => {
  console.log(
    `Server started on Port ${process.env.PORT} in ${process.env.NODE_ENV}`
  );
});

process.on('unhandledRejection', (err) => {
  console.log('shutting down down due to unhandled Rejection in the database');
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
