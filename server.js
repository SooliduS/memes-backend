require('dotenv').config()

const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/dbConn');

const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const credentials = require('./middleware/credentials');
const verifyJWT  = require('./middleware/verifyJWT');
const rejectJWT  = require('./middleware/rejectJWT');
const tagImpressions = require('./middleware/tagImpressions');




const PORT = process.env.PORT || 3500;

// Connect to MongoDB
connectDB();

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//handle tags impressions and log
app.use(tagImpressions)

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

//routes 

app.use('/api/refresh' , require('./routes/users/refresh'))

app.use('/api/register', require('./routes/users/register'))

app.use('/api/login' , require('./routes/users/login'))

app.use('/api/logout', require('./routes/users/logout'))


//underneath routes have influenced by verfication

app.use(verifyJWT)

app.use('/api/public' , require('./routes/posts/publicPosts'))

app.use('/api/users' , require('./routes/users/users'))

app.use('/api/posts' , require('./routes/posts/posts'))

app.use('/api/tags' , require('./routes/tags/tags'))

//underneath routes need verfication

app.use(rejectJWT)

app.use('/api/profile' , require('./routes/users/profile'))

app.use('/api/newpost' , require('./routes/posts/newPost'))

app.use('/api/follow' , require('./routes/follow/index'))

app.use('/api/comments' , require('./routes/posts/comments'))

app.use('/api/notifications' , require('./routes/notifications/notifications'))


//handle errors
app.use(errorHandler);

//to deploy in github

//connect to server
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});


