const mongodb = require("mongodb").MongoClient;
const csvtojson = require("csvtojson");

let url = "mongodb+srv://rweinstein:stoneharbor99@cluster0.enwy9.mongodb.net/stocks?retryWrites=true&w=majority"

csvtojson()
	.fromFile("companies-1.csv")
	.then(csvData => {
		console.log(csvData);

	mongodb.connect(url, function(err, db) {
	  if(err) { return console.log(err); }
	  
	    var dbo = db.db("stocks");
		var collection = dbo.collection('companies');
		collection.insertMany(csvData, (err, res) => {
			if (err) throw err;
			console.log('Inserted: ${res.insertedCount} rows');
			db.close();
		});
	});
});