var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
  
    user: "root",
  
    password: "fzappaappazf",
    database: "bamazon"
  });

  connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
   
  });


connection.query("SELECT * from products", function(err, rows){
  if(err){
    console.log(err);
    return;
  }
  rows.forEach(function(result) {
    console.log(result.item_id, result.product_name, result.price, result.stock_quantity);
  });
  start();
});

function start() {
  inquirer.prompt ([{
    name: "userPickID",
    type: "input",
    message: "What ID would you like to buy?"
  },
{
  name: "userAmount",
  type: "input",
  message: "How many would you like to buy?"
}])
    .then(function(answer){
      console.log(answer.userAmount);
      console.log(answer.userPickID);
      connection.query("SELECT * from products WHERE item_id =" + answer.userPickID, function(err,data){
        console.log(data[0].stock_quantity);
        if(data[0].stock_quantity < answer.userAmount){
          console.log("Insufficient quantity!");
        }else{
          totalCost(answer.userPickID, answer.userAmount);
        }
      } )
    })
}

function totalCost(ID, amount){
  connection.query("SELECT * from products WHERE item_id =" + ID, function(err,data){
    var total = amount * data[0].price;
    console.log("$" + total.toFixed(2));
    quantityUpdated(ID, amount, data[0].stock_quantity);
  })
  
}

function  quantityUpdated(item, stockAmount, quantity){

  connection.query("UPDATE  products set ? where ?",
  [
    {
      stock_quantity: quantity - stockAmount
    },
    {
      item_id: item
    }
  ],
  function(error,data){
    if (error) throw error;
    console.log("Updated successfully");
  })
}