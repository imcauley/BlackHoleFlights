var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

app.listen(port);

app.get("/api_test", (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({"data": "this is test data"});
});

console.log('todo list RESTful API server started on: ' + port);