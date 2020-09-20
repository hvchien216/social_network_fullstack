const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 4000;
const urlencodedParser = bodyParser.urlencoded({ extended: false })

//MIDDLEWARE
const verify = require('./middlewares/verify');

// Import Routes
const userRoute = require('./routes/user');
const postRoute = require('./routes/post');
const commentRoute = require('./routes/comment');

// Middlewares
app.use(cors());
app.use(urlencodedParser);
app.use(bodyParser.json());

//connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
    useFindAndModify: false
  },
  () => {
    console.log("connected DB...");

  }
)

// Route
app.use('/api/auth', userRoute);
app.use('/api/post', verify, postRoute);
app.use('/api/comment', verify, commentRoute);


app.listen(PORT, () => console.log(`Server is running in ${PORT}`));