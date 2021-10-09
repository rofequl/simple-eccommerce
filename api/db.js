const mongoose = require('mongoose');

// Database connection with mongoose

mongoose.connect('mongodb://localhost/loyel', {useNewUrlParser: true, useUnifiedTopology: true})
  // eslint-disable-next-line no-console
  .then(() => console.log("Database Connection Successfully"))
  // eslint-disable-next-line no-console
  .catch((err) => console.log(err))
