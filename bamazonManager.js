var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "eric",

    password: "password",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

function start() {
    inquirer.prompt({
        name: "userPickID",
        type: "rawlist",
        message: "What would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    })
        .then(function (answer) {

            if (answer.userPickID === "View Products for Sale") {
                viewProducts();
            } else if (answer.userPickID === "View Low Inventory") {
                lowCount();
            } else if (answer.userPickID === "Add to Inventory") {
                add();
            } else if (answer.userPickID === "Add New Product") {
                console.log("this worked 4");
            }


        });
}

function viewProducts() {
    connection.query("SELECT * from products", function (err, rows) {
        if (err) {
            console.log(err);
            return;
        }
        rows.forEach(function (result) {
            console.log("ID " + result.item_id, "Item " + result.product_name, "Price $" + result.price, "Items left " + result.stock_quantity);
        });
        console.log("");
        start();
    });
}

function lowCount() {
    connection.query("SELECT * from products where stock_quantity < 5", function (err, rows) {
        if (err) {
            console.log(err);
            return;
        }
        rows.forEach(function (result) {
            console.log("ID " + result.item_id, "Item " + result.product_name, "Price $" + result.price, "Items left " + result.stock_quantity);
           
        });
        console.log("");
        start();
    });
}

function add() {
    
    inquirer.prompt([{
        name: "userPickID",
        type: "input",
        message: "What ID would you like to add product to?"
    },
    {
        name: "userAmount",
        type: "input",
        message: "How many would you like to add?"
    }])
        .then(function (answer) {
            connection.query("SELECT * from products WHERE item_id =" + answer.userPickID, function (err, data) {
                addProduct(answer.userPickID, answer.userAmount);
            });
        });
}

function addProduct(ID, amount){
    connection.query("SELECT * from products WHERE item_id =" + ID, function(err,data){
        var total = parseInt(amount) + parseInt(data[0].stock_quantity);
        console.log("Total for Item ID" + ID + " is now " + total);
        quantityUpdated(ID, parseInt(amount), data[0].stock_quantity);
      });
}

function  quantityUpdated(item, stockAmount, quantity){
    
      connection.query("UPDATE  products set ? where ?",
      [
        {
          stock_quantity: quantity + stockAmount
        },
        {
          item_id: item
        }
      ],
      function(error,data){
        if (error) throw error;
        console.log("Updated successfully");
        console.log("");
        start();
      });
      
    }