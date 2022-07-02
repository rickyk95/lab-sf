const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
require('dotenv').config();
const app = express();
const port =  3000;
const connectToMongoose = require('./src/public/assets/js/promiseWrapper');
connectToMongoose
  .then((value) => {
    console.log(value)
    const router = require('./src/public/assets/js/routes');
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
    app.use(express.static(path.join(__dirname, '/src/public/assets')));
    app.use(router);
    app.set('view engine', 'handlebars');
    app.engine('handlebars', exphbs({}));
    app.set('views', __dirname + '/src/views');
  })
  .catch((e) => {
    console.log(e);
  });


