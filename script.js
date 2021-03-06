$(document).ready(function() {

	//what does this do?
	var convert_value_to_string = function(value) {
		if (value > 10) {
			switch (value) {
				case 11:
				return 'Jack';
				break;
				case 12:
				return 'Queen';
				break;
				case 13:
				return 'King';
				break;
			}
		}
		return value.toString();
	};

	//what does this do? (my note: assigns a suit to 13 numbers, creating 52 total instances)

	var deck = [];
	var suits = ['hearts', 'diamonds', 'spades', 'clubs'];
	for (var i = 0; i<suits.length; i++) {
		var suit = suits[i];
		for (var j = 0; j<13; j++) {
			deck.push({number: j+1, suit: suit});
		}
	};
	
	//what does this do?  (my note: the if statement removes all other numbers from the array other than the one 
	//randomly selected in the while statement.)

	var shuffle = function(array) { 
		var copy = [];
		var n = array.length; 
		var i; 
		while (n) { i = Math.floor(Math.random() * array.length);  
			if (i in array) { 
		 		copy.push(array[i]); 
		 		delete array[i]; 
		 		n--; 
		 	} 
		} 
		return copy; 
	};
	
	//Now call the shuffle function and save the result of what the shuffle returns into your deck variable

//my code
	deck = shuffle(deck);

	
	var cards_player_1 = [];
	var cards_player_2 = [];
	// write a function called deal that will evenly divide the deck up between the two players


//my code
	var deal = function(arr) {
		for (var i = 0; i < arr.length; i++) {
			if (i % 2 === 0) {
				cards_player_1.push(arr[i]);
			}
			else {
				cards_player_2.push(arr[i]);
			}
		}
	};

//my code
	deal(deck);      		//this is here to run(call) the function
	
	
	//create a function (algorithm) called "war" that takes two cards as parameters, compares them and 
	//returns a winner. A tie should return false.

//my code
	var war = function(cardOne, cardTwo){
		if (cardOne > cardTwo) {
				return 1;
		}
		else if (cardOne < cardTwo) {
				return 2;
		}
		else {
			return false;
		}
	};
	
	var advance = function(){
		//take the top two cards and display them
		if (cards_player_1.length) {
			var card_1 = cards_player_1[0];
			var card_2 = cards_player_2[0];
			$("#opp-card").html(convert_value_to_string(card_1.number)+" "+card_1.suit);
			$("#opp-card-count").html(cards_player_1.length);
			$("#my-card").html(convert_value_to_string(card_2.number)+" "+card_2.suit);
			$("#my-card-count").html(cards_player_2.length);
			
		}
	};
	
	
	//create a play function
		//compare the cards
		//give the winner both cards (at end of deck)

//my code
	var play = function(){
		var result = war(cards_player_1[0].numbers, cards_player_2[0].numbers);
		if (result === 1) {
			cards_player_1.push(cards_player_1[0], cards_player_2[0]);
			cards_player_2.shift();
			cards_player_1.shift();
		}
		else if (result === 2) {
			cards_player_2.push(cards_player_1[0], cards_player_2[0]);
			cards_player_2.shift();
			cards_player_1.shift();
		}
		else if (result === false) {
			var tied = war(cards_player_1[3].numbers, cards_player_2[3].numbers);
			if (result === 1) {
				cards_player_1.push(cards_player_1[0], cards_player_2[0]);
				cards_player_2.shift();
				cards_player_1.shift();
			}
			else if (result === 2) {
				cards_player_2.push(cards_player_1[0], cards_player_2[0]);
				cards_player_2.shift();
				cards_player_1.shift();
			}
		}

		//this function (defined below) will continue to the next turn
		advance();
	};
	

	advance();
	
	$(".btn").click(function() {
		play();
	});
});
