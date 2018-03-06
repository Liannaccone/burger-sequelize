// requiring mysql connection
var connection = require('../config/connection.js');

// can implement this in queryString vars to put in question marks
// function printQuestionMarks(num) {
//   var arr = [];

// // function to create a string of question marks should an argument have multiple values
//   for (var i = 0; i < num; i++) {
//     arr.push("?");
//   }

//   return arr.toString();
// }

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}


// creating an object for all SQL statement functions
var orm = {
	selectAll: function(tableName, cb) {
		var queryString = 'SELECT * FROM ' + tableName + ';';
		connection.query(queryString, function(err, result) {
			if(err) {
				throw err;
			}
			cb(result);
		})
	},
	// might have to put cols.toString(); in queryString here...
	insertOne: function(table, cols, vals, cb) {
		// console.log('TABLE:', table,'\nCOLS:',cols,'\nVALS:',vals)
		var queryString = 'INSERT INTO ' + table + ' (' + cols + ') VALUES ("' + vals + '");';
		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}
			cb(result);
		});
	},
	updateOne: function(table, objColVals, condition, cb) {
		var queryString = 'UPDATE ' + table + ' SET ' + objToSql(objColVals) + ' WHERE ' + condition
		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}
			cb(result);
		})
	}
}


// exporting the orm object for the model (burger.js) to use
module.exports = orm