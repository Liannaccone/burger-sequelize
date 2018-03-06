//  MySQL connection set up
var mysql = require('mysql');

var connection;
if(process.env.JAWSDB_URL) {
  //Heroku deployment
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  //local host
    connection = mysql.createConnection({
        root: 3306,
        host: "localhost",
        user: "root",
        password: "",
        database: "burgers_db",
    });
};
// Establish connection...
connection.connect(function(err) {
	if (err) {
		console.log('There was an error connecting: ' + err.stack);
		return;
	}
	console.log('Connected as id ' + connection.threadId);
});

// Export the connection for ORM to use...
module.exports = connection;

