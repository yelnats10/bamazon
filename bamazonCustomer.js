var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
  
    user: "eric",
  
    password: "password",
    database: "bamazon"
  });

connection.query("SELECT * from products", function(err, rows){
  if(err){
    console.log(err);
    return;
  }
  rows.forEach(function(result) {
    console.log(result.item_id, result.product_name.replace(/['']+/g, ''), result.price);
  });
});

  // connection.connect(function(err) {
  //   if (err) throw err;
  //   // run the start function after the connection is made to prompt the user
  //   // start();
  // });
