const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
var cors = require('cors')

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))
// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/event'));


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
