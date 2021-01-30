
let deck = []; // the empty deck to be filled in the shuffle function
let player1_name = "";
let player2_name = "";
let player1_logged_in = false;
let player2_logged_in = false;
let player1_cards = [];
let p1_temp = ""
let player2_cards = [];
let p2_temp = "";
let buttonCount = 0; //for creating multiple buttons with different IDs
function shuffle(){ //creates a shuffled array of the cards

    let suit = ["red", "yellow", "black"] //creates every card
    for (let i = 0; i < 3; i++){
        for(let j = 1;j<11;j++){
            deck.push(suit[i]+j.toString())
        }
    }
    for(let i = 0; i < 31; i++){ //shuffle
        let a = Math.floor((Math.random()*30));
        let b = Math.floor((Math.random()*30));
        let temp = deck[b]; //swaps the values
        deck[b] = deck[a];
        deck[a] = temp;
    }
}
shuffle()
let players = [ //stores the players credentials
    {
        username: "John",
        password: "Cena",


    },
    {
        username: "Ben",
        password: "Mynard",

    }
];


function login(){
    event.preventDefault(); //stops the page reloading after form submission
    let login = false;
    let username = $("#htmlUsername").val() // variables for the values of the form submission
    let password = $("#htmlPassword").val()
    $(".input1").val("") //makes the form blank again
    for (let i = 0; i < 2; i++) {
        if (username === players[i]["username"]) { // if the username input matches a username from the "database"
            if (password === players[i]["password"]) { // if the password input matches with the username adjacent to it in the "database"
                login = true;
                if (!player1_logged_in) { // if player 1 is not logged in
                    $("#p1").empty().append("Login for player 1 successful!")
                    player1_logged_in = true
                    player1_name += username
                }else{ //if a player is logged in
                    if(player1_name === username){ //wont let the same person log in twice
                        $("#p1").empty().append("Player already logged in!")
                    }else{
                        $("#p1").empty().append("Login for player 2 successful!") // logs in the second player and hides the form
                        $("#login_form1").css("display", "none")
                        player2_logged_in = true
                        player2_name += username
                    }
                }
            }
        }
    }
    if(!login){
        $("#login_form1").css("border-color", "red").css("transition", "0.5s")
    }else{
        $("#login_form1").css("border-color", "mediumaquamarine").css("transition", "0.5s")
    }
    if(player1_logged_in === true && player2_logged_in === true){ // if both players have logged in
        $("#main_menu_play").css("display", "block")
        $("#p1").empty();
    }
}

function game(){
    $("#main_menu_play").css("display", "none")
    $("#my_button").css("display", "block")
    $("#players_turn").empty().append(player1_name + "'s turn")
    let count = 0

        $("#my_button").click(function(){ //if the draw button is pressed
            if(deck.length !== 0){ // as long as there are cards in the array
                if (count=== 0) {
                    count++ //count is incremented, the card is removed from the deck and added to p1s hand
                    p1_temp = deck[0]
                    deck.splice(0, 1)
                    $("#p3").empty().append("Your card: " + p1_temp) //tells the player their card
                    $("#players_turn").empty().append(player2_name + "'s turn")
                } else if(count === 1){ //same as above but for p2
                    $("#players_turn").empty()
                    count++
                    p2_temp = deck[0]
                    deck.splice(0, 1)

                }


                if(count === 2) {
                    count = 0;

                    if (p1_temp.includes("red")) {
                        if (p2_temp.includes("red")) {
                            //isolates the number after the colour into a substring then converts it into an integer so the sizes can be compared
                            if (parseInt(p1_temp.substring(3, p1_temp.length)) > parseInt(p2_temp.substring(3, p2_temp.length))) {
                                p1Round()
                            } else {
                                p2Round()
                            }
                        } else if (p2_temp.includes("yellow")) { // for if the colours are different, it will decide which colour wins
                            p2Round()
                        } else if (p2_temp.includes("black")) {
                            p1Round()
                        }
                    } else if (p1_temp.includes("yellow")) {
                        if (p2_temp.includes("yellow")) {
                            if (parseInt(p1_temp.substring(6, p1_temp.length)) > parseInt(p2_temp.substring(6, p1_temp.length))) {
                                p1Round()
                            } else {
                                p2Round()
                            }
                        } else if (p2_temp.includes("black")) {
                            p2Round()
                        } else if (p2_temp.includes("red")) {
                            p1Round()
                        }
                    } else if (p1_temp.includes("black")) {
                        if (p2_temp.includes("black")) {
                            if (parseInt(p1_temp.substring(5, p1_temp.length)) > parseInt(p2_temp.substring(5, p1_temp.length))) {
                                p1Round()
                            } else {
                                p2Round()
                            }
                        } else if (p2_temp.includes("red")) {
                            p2Round()
                        } else if (p2_temp.includes("yellow")) {
                            p1Round()
                        }

                    }
                }
            }
            if(count === 0){
                $("#my_button").css("display", "none") //end of round messages + continue button for the next round
                $("#my_button2").css("display", "block")
                $("#my_button2").click(function(){
                    $("#my_button").css("display", "block")
                    $("#my_button2").css("display", "none")
                })
            }

        })




}

function continue_button(){
    $("#p3").empty()
    $("#p4").empty()
    $("#players_turn").empty().append(player1_name + "'s turn")
}
function p1Round(){
    $("#p3").empty().append("The champ is " + player1_name + "! Take your winnings!")
    $("#p4").empty().append("Matchup: " + player1_name + " had " + p1_temp + "| " + player2_name + " had " + p2_temp);
    player1_cards.push(p2_temp, p1_temp); //winner p1
    p1_temp = "";
    p2_temp = "";
}
function p2Round(){
    $("#p3").empty().append("The champ is " + player2_name + "! Take your winnings!")
    $("#p4").empty().append("Matchup: " + player1_name + " had " + p1_temp + "| " + player2_name + " had " + p2_temp);
    player2_cards.push(p2_temp, p1_temp);
    p2_temp = "";
    p1_temp = ""; //winner p2
}




