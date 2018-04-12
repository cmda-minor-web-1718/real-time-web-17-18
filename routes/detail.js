var express = require('express');
var router = express.Router();

//FETCH REQUEST EXTERN API
/*
var fetch = require('node-fetch')
var host = 'https://api.data.adamlink.nl/datasets/AdamNet/all/services/hva2018/sparql?default-graph-uri=&query=' + encodedquery + '&format=application%2Fsparql-results%2Bjson&timeout=0&debug=on';
var rows = [];
*/

router.get('/:id', function(req, res, next) {
	var id = req.params.id

	res.render('detail', {
		 id: id
	});
})

	// if(Object.keys(rows).length === 0) {
	// 	fetch(host)
	// 	.then((resp) => resp.json()) // transform the data into json
	// 		.then(function(data) {
	//
	// 		rows = data.results.bindings; // get the results
	// 		res.render('detail/detail', {
	// 			posters: rows,
	// 			id: id,
	// 		});
	// 	}).catch(function(error) {
	// 		// if there is any error you will catch them here
	// 		console.log(error);
	// 	});
	//
	// } else {
	//  res.render('detail/detail', {
	// 	 posters: rows,
	// 	 id: id,
	//  });
	// }
//});

module.exports = router;
