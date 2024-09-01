const express = require('express');
const colors = require('colors');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDb = require('./connection/mongo');
const imageRoutes = require('./apis/imageApis'); 



dotenv.config();

connectDb();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', imageRoutes);




const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
    console.log(`API RUNNING on port ${PORT}`.bgMagenta);
});
