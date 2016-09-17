// ===============================================================================
// LOAD DATA
// We are linking our routes to a "data" source.
// The data source hold an array of information on friends
// ===============================================================================

var friendsArr = require('../data/friends.js');


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app){

	// API GET Request
	// Below code handles when users "visit" a page.
	// In each of the below cases when a user visits a link
	// (ex: localhost:PORT/api/friends... they are shown a JSON of the data in the friends array)
	// ---------------------------------------------------------------------------

	app.get('/api/friends', function(req, res){
		res.json(friendsArr);
	});

	// API POST Request
	// Below code handles when a user submits a form and thus submits data to the server.
	// In the below case, when a user submits form data (a JSON object)
	// ...the JSON is pushed to the appropriate Javascript array
	// (ex. User fills out a reservation request... this data is then sent to the server...
	// Then the server calculates which friend is the best match from the possible friends array)
	// ---------------------------------------------------------------------------

	app.post('/api/friends', function(req, res){




		//Store the answers from the user and their choice

		var userPicks = req.body.scores;

		//Create an array that will store the total difference for each of the 5 possible friends
		var differencesArray = [];
		var totalDifference;
		//console.log(friendsArr)

		//For loop to go through every single possible friend
		for (i = 0; i < friendsArr.length; i++) {
			//reset totalDifference variable to 0 for each friend
			totalDifference = 0;

			//Nested for loops, this loops through the answers of each friend and calculates the absolute difference in points
			for (j = 0; j < friendsArr[i].scores.length; j++) {
				//calculate the absolute difference between user pick and friend pick
				var difference = Math.abs(friendsArr[i].scores[j] - userPicks[j])
				//Keep adding to the totalDifference variable
				totalDifference += difference;
			}
			//At the end of the loop for each friend, store their totalDifference to the differencesArray
			differencesArray.push(totalDifference);
		}

		//console.log(differencesArray)

		//Calculate the lowest totalDifference value and set it as the bestFriendScore, which should be the value for their match
		var bestFriendScore = Math.min.apply(Math, differencesArray);

		//console.log(bestFriendScore)

		//Find the index value that corresponds to the bestFriendScore
		var minIndex = differencesArray.indexOf(bestFriendScore);

		//console.log(friendsArr[minIndex].name);
		//console.log(friendsArr[minIndex].photo);

		friendsArr.push(req.body);

		//Send the object for the friend that's the best match we just calculated as the response
		res.json(friendsArr[minIndex]);

	});
}