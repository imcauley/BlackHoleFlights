var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

app.listen(port);

app.get("/", (req, res, next) => {
    res.json(["test data"]);
});

console.log('todo list RESTful API server started on: ' + port);