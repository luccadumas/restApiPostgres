var express = require('express');
var router = express.Router();

var pg = require('pg');
var conString = "postgres://postgres:root@localhost/teste";

var teste_query = "SELECT * FROM func";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Teste Postgres Api Rest' });
});

router.get('/data', function(req, res){
  var client = new pg.Client(conString);

  client.connect();

  client.query(teste_query, [], (err, result) => {
    // console.log(err ? err.stack : result.rows[0].message) // Hello World!
    res.json(result.rows);
    res.end();
    client.end()
  })  
})

module.exports = router;