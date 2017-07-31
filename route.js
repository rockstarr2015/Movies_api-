var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/testing');

var movieSchema = mongoose.Schema({
			Movie_name:{
				type: String,
				required: true
			},
			Ratings:{
				type: Number,
				required: true
			},
			Runtime:{
				type: Number,
				required: true
			},
			Genre:{
				type: String,
				required: true
			},
			Imdb_link:{
				type: String,
				
			},
			Director:{
				type: String,
				required: true
			},
			Country:{
				type: String,
				required: true
			},
			Language:{
				type: String,
				required: true
				
			}

			
		});

//creating model
var MovieModel = mongoose.model("MovieModel", movieSchema);




router.get('/', (req,res) => res.send("Welcome to the Movies API. Please visit the /insertMovies"));

//adding movies in db
router.get('/insertMovies', (req,res) => res.render('form1'));



router.post('/addMovies', (req,res) => {
	var data = req.body;
	var labels = ["Movie name","Ratings","Runtime", "Genre","Imdb_link","Director","Country","Language"];

	function checkObjSize(obj) {
	    var size = 0, key;
	    for (key in obj) {
	        if (obj.hasOwnProperty(key)) size++;
	    }
	    return size;
	};

	var len = checkObjSize(data);

	var k = true;
	for(var i = 0; i< len; i++){

		if(k==true){
			var key = labels[i].split(' ').join('_');
			//console.log(data[key]);
			if(!data[key]){
				k = false;
				break;
			}
		}
	}

	
	if(k != true){
		res.render('show_message',{ message:'Please enter all the data in form', type: 'error'});
	}

	else
	{

		//create documenet from movieModel
		var newMovie = new MovieModel({
			Movie_name: data.Movie_name,
			Ratings: data.Ratings,
			Runtime: data.Runtime,
			Genre: data.Genre,
			Imdb_link: data.Imdb_link,
			Director: data.Director,
			Country: data.Country,
			Language: data.Language });
		

		MovieModel.find({'Movie_name': data.Movie_name}, (err,response) => {
		 	if(err){
		 		console.log(err);
		 	}
		 	else{
		 		if(response[0] == null){
		 			//There is no record with similar movie name
		 			//Then save document in db

		 			newMovie.save((err, newMovie) => {
						if(err){
							console.log(err);
							res.render('show_message',{message:'Failed',type: 'error'});

						}
						else{
							res.render('show_message',{ message:'Movie is successfully added in database...!'});
						}

					});

				}

		 		else{
		 			res.render('show_message',{message: 'Similar Movie record is already exits in db'});
		 		}
		 	}

		});


	}
	
});


//disply all the movie records 
router.get('/getMovies', (req,res) => {
	
	MovieModel.find( { }, (err,response) => {
		if(err){ 
			res.status(503);
			res.render('show_message',{message:'Internal server error', type: 'error'});
		}
		
		else{
			res.send(response);
		}
	});

});

//disply only on movie record.
router.get('/getMovies/:name([a-zA-Z0-9_\']{1,20})', (req,res) => {

	var key = req.params.name.split('_').join(' ');

	
	MovieModel.find({'Movie_name': key}, (err, response) =>{
		if(response.length == 0){
			res.status(404);
			res.render('show_message',{message:'Movie not found', type: 'error'});
		}
		else{
			res.send(response[0]);
		}
	});
	
	
	
});


//Upadate movie record

router.get('/update', (req,res) => {
	res.render('updateMovie');
});


router.post('/updateMovies', (req,res) => {
	//res.render('show_message',{message:'Movie Upadate....'});

	console.log("req.body");
	var key = req.body.Movie_name;

	//res.send(req.body);

	MovieModel.find({'Movie_name': key}, (err, response) =>{
		if(response.length == 0){
			res.status(404);
			res.render('show_message',{message:'Movie not found', type: 'error'});
		}
		else{
			res.send(response[0]);
			var presentMovieInfo = response[0];
			



		}
	});

});





//delete movie record

router.delete('/delete/:name([a-zA-Z0-9_\']{1,20})', (req,res)=>{
	//res.send("delete route");
	//console.log(req.params.name);
	var movie_name = req.params.name;

	//res.send(movie_name);

	var key = req.params.name.split('_').join(' ');

	MovieModel.find({'Movie_name': key}, (err, response) =>{
		if(response.length == 0){
			res.status(404);
			res.render('show_message',{message:'Movie not found', type: 'error'});

		}
		else{
			
			MovieModel.remove({'Movie_name': key}, (err,response)=>{
				if(err){ 
					console.log(err);
				}
				else{ 
					res.send(key+" is successfully removed from API");
				}
			});

		}
	});




});


//,"Ratings","Runtime", "Genre","Imdb_link","Director","Country","Language

module.exports = router;