const express = require('express');
const app = express();

app.set('port', (process.env.PORT || 5000));

// app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/src');
app.set('view engine', 'react');

app.get('/', function(request, response) {
  response.render('/static/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
