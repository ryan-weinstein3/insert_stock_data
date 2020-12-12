var http = require('http');
var port = process.env.PORT || 3000;
console.log("This goes to the console window");
http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write("<h1>Query Result</h1>");
	var qobj = url.parse(req.url, true).query;
	var query_by = qobj.query_by;
	var query_string = qobj.query;

    	MongoClient.connect(db_url, { useUnifiedTopology: true }, async function(err, db) {
		try {
		    if(err) { return console.log(err); }
		    var dbo = db.db("stocks");
			var collection = dbo.collection('companies');
			if (query_by == 'name') {
				var query = {Company: query_string};
			}
			else if (query_by == 'ticker') {
				var query = {Ticker: query_string}
			}

			await collection.find(query, {projection: {_id: 0, Company: 1, Ticker: 1}}).toArray(function (err, result) {
				if (err) throw err;
				var result_str = JSON.stringify(result, null, 2);
				res.write(result_str);
			})
			await db.close();
			await res.end();
		}
		catch(err) {
			console.log(err);
		}
 
	});
}).listen(port);
