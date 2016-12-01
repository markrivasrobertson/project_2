const express = require('express');
const path = require('path');

const app = express();

// app.set('port', (process.env.PORT || 5000));


app.get('/', function(request, response) {
  // response.render('/index');
  response.sendFile(path.join(__dirname, 'src/static/index.html'));
});

// app.listen(app.get('port'), function() {
//   console.log('Node app is running on port', app.get('port'));
// });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on Port: ${port}`);
});
