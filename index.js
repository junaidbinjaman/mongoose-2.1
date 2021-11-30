const express = require('express');
const mongoose = require('mongoose');
const todoHandler = require('./routeHandler/todoHandler.js');

const app = express();
app.use(express.json())

// database connection with mongodb
const URL = 'mongodb+srv://jwolt:jwolt65859j@cluster0.raxaw.mongodb.net/demo?retryWrites=true&w=majority'
mongoose.connect(URL, {useNewUrlParser: true}, { useUnifieldTopology: true })
.then(() => {
  console.log('Connectipn Successful');
})
.catch(err => {
  console.log(err);
})

// application route
app.use('/todo', todoHandler)



// default error handler
const errorHandler = (err, req, res, next) => {
  if(req.headersSent) {
    return next(err);
  }
  res.status(500).join({ error: err })
}


app.listen(3000, () => {
  console.log('app listening at port 3000');
})