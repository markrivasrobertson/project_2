if (!process.env.PORT) {
  require('dotenv').config();
}

process.env.ENV = process.env.ENV || 'dev';

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');
// const app = require('./app/app');
const app = express();

if (process.env.ENV === 'dev') {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    stats: {
      colors: true,
      chunks: false,
    },
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
}

// app.use(express.static(path.join(__dirname, '/dist')));
app.use(express.static(path.join(__dirname, '/src/static')));
app.get('/', (request, response) => {
  // response.sendFile(path.join(__dirname, 'dist/index.html'));
  response.sendFile(path.join(__dirname, 'src/static/index.html'));
});

// const port = process.env.PORT;
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on Port: ${port}`);
});



// const express = require('express');
// const path = require('path');
//
// const app = express();
//
// // app.set('port', (process.env.PORT || 5000));
//
//
// app.get('/', function(request, response) {
//   // response.render('/index');
//   response.sendFile(path.join(__dirname, 'src/static/index.html'));
// });
//
// // app.listen(app.get('port'), function() {
// //   console.log('Node app is running on port', app.get('port'));
// // });
//
// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`Listening on Port: ${port}`);
// });
