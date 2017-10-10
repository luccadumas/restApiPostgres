var express = require('express');
var router = express.Router();

var pg = require('pg');

pg.defaults.ssl = process.env.DATABASE_URL != undefined;
var conString = process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5439/test";

var coffee_query = "SELECT id FROM teste WHERE id = 1";

 /* await client.connect();
  var res = await client.query("SELECT * FROM json_test");
  res.rows.forEach(row=>{
      console.log(row);
  });
  await client.end();*/

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Postgres Teste'
  }
  );
});

/* GET Postgres JSON data */
router.get('/data', function (req, res) {
  var client = new pg.Client(conString);
  client.connect();
  console.log("Conexão deu certo!");
  var query = client.query(coffee_query);
  query.on("row", function (row, result) {
    result.addRow(row);
  });
  query.on("end", function (result) {
    res.json(result.rows[0].row_to_json);
    res.end();
  });
});

module.exports = router;