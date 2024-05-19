require('dotenv').config();
const express = require('express');
const cors = require('cors');
const router = require('./routes/index');
const process = require('process');

const app = express();

app.use(express.json());

app.use(cors());

app.use('/api', router);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
