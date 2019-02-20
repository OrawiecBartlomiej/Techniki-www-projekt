var express = require('express');
var app = require("../app.js")
var router = express.Router();

router.get('/', function(req, res) {
  app.DB.query('SELECT Title, text FROM File', function(err, result) {
    if(err) 
      throw err; 
    res.send(JSON.stringify(result));
  });
});

router.post('/delete', function(req, res) {
  app.DB.query(`DELETE FROM File WHERE Title='${req.body.title}'`, function(err, result) {
    if(err) 
      throw err; 
    res.send(JSON.stringify(result));
  });
});

router.post('/', function(req, res) {
  app.DB.query(`INSERT INTO File (idFile, Title, createDate, lastChange, text) VALUES(NULL, '${req.body.title}','${req.body.cDate}',
   '${req.body.lChange}', '${req.body.text}')`, function(err, result) {
    if(err) 
      throw err; 
    res.send(JSON.stringify(result));
  });
});

module.exports = router;

